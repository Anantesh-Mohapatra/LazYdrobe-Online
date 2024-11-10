// src/components/WeatherComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherIconMapping from '../utils/weatherIconMapping'; 
import '../App.css';
import './styling/WeatherComponent.css';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // State variables for city and country inputs
  const [city, setCity] = useState('New York'); // Default city
  const [country, setCountry] = useState('US');  // Default country code

  // Function to fetch weather data based on city and country
  const fetchWeather = async (cityName, countryCode) => {
    try {
      const response = await axios.post('http://localhost:8000/weather/', {
        location_part1: cityName,
        location_part2: countryCode
      });

      setWeather(response.data);
      setError(null); // Reset error on successful fetch
    } catch (err) {
      console.error("Error fetching weather data:", err);
      // Extract meaningful error message
      setError(err.response?.data?.detail || err.message || "Unknown error");
      setWeather(null); // Reset weather data on error
    }
  };

  // Fetch weather data on component mount with default city and country
  useEffect(() => {
    fetchWeather(city, country);
  }, []);  // Empty dependency array ensures this runs once on mount

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (city.trim() === '') {
      setError( "City name cannot be empty." );
      setWeather(null);
      return;
    }
    fetchWeather(city, country);
  };

  // Determine the icon based on special_condition
  const iconSrc = weatherIconMapping[weather?.special_condition] || weatherIconMapping["Unknown"];

  return (
    <div className="weather-component">
      <h2>LazYdrobe Weather Dashboard</h2>
      
      {/* Weather Search Form */}
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor="country">Country Code:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())} // Convert to uppercase
            placeholder="Enter country code (e.g., US)"
            maxLength="2" // Country codes are typically 2 letters
          />
        </div>
        <button type="submit">Get Weather</button>
      </form>

      {/* Display Loading, Error, or Weather Data */}
      {error && <p className="error" >Error fetching weather data: {error}</p>}

      {weather && (
        <div className='weather-info'>
          <h3>Weather in {weather.location} on {new Date(weather.date).toLocaleDateString()}</h3>
          <div className='icon-container'>
            <img src={iconSrc} alt={weather.special_condition} className='icon' />
            <p className='condition'>{weather.special_condition}</p>
          </div>
          <p>Temperature: {weather.temp_min}°F - {weather.temp_max}°F</p>
          <p>Feels Like: {weather.feels_min}°F - {weather.feels_max}°F</p>
          <p>Wind Speed: {weather.wind_speed} mph</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Precipitation: {weather.precipitation} inches</p>
          <p>Precipitation Probability: {weather.precipitation_probability}%</p>
        </div>
      )}

      {!weather && !error && <div>Loading...</div>}
    </div>
  );
};

export default WeatherComponent;