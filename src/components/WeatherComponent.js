// src/components/WeatherComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherIconMapping from '../utils/weatherIconMapping'; 

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
      const message = err.response?.data?.detail || err.message || "Unknown error";
      setError({ message });
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
      setError({ message: "City name cannot be empty." });
      setWeather(null);
      return;
    }
    fetchWeather(city, country);
  };

  // Determine the icon based on special_condition
  const iconSrc = weatherIconMapping[weather?.special_condition] || weatherIconMapping["Unknown"];

  return (
    <div style={styles.container}>
      <h2>LazYdrobe Weather Dashboard</h2>
      
      {/* Weather Search Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="city" style={styles.label}>City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
            placeholder="Enter city"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="country" style={styles.label}>Country Code:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())} // Convert to uppercase
            style={styles.input}
            placeholder="Enter country code (e.g., US)"
            maxLength="2" // Country codes are typically 2 letters
          />
        </div>
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>

      {/* Display Loading, Error, or Weather Data */}
      {error && (
        <div style={styles.error}>
          <p>Error fetching weather data: {error.message}</p>
        </div>
      )}

      {weather && (
        <div style={styles.weatherInfo}>
          <h3>Weather in {weather.location} on {new Date(weather.date).toLocaleDateString()}</h3>
          <div style={styles.iconContainer}>
            <img src={iconSrc} alt={weather.special_condition} style={styles.icon} />
            <p style={styles.condition}>{weather.special_condition}</p>
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

// Inline styles for simplicity; consider using CSS or styled-components for larger projects
const styles = {
  container: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '20px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  form: {
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '10px'
  },
  label: {
    marginRight: '10px',
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    width: '60%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textTransform: 'uppercase' // Automatically capitalize country codes
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '20px'
  },
  weatherInfo: {
    borderTop: '1px solid #eee',
    paddingTop: '20px'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  icon: {
    width: '50px',
    height: '50px',
    marginRight: '10px'
  },
  condition: {
    fontSize: '24px',
    margin: 0
  }
};

export default WeatherComponent;
