// FiveDayWeather.jsx

import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance'; // Ensure axiosInstance.js is correctly set up
import '../App.css';
import './styling/FiveDayWeather.css';

const FiveDayWeather = () => {
  const [forecast, setForecast] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleFetchWeather = async () => {
    if (!locationInput.trim()) {
      setError("Please enter a valid location.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [locationPart1, locationPart2] = locationInput.split(',').map(part => part.trim());
      if (!locationPart1) {
        throw new Error("Please provide at least the city name.");
      }
      const weatherRequest = {
        location_part1: locationPart1,
        location_part2: locationPart2 || null,
      };
      const response = await axios.post('/weather/', weatherRequest);
      setForecast(response.data);
      console.log(forecast);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.response?.data?.detail || err.message || 'Unable to retrieve weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchWeather();
    }
  };

  useEffect(() => {
    if (locationInput) {
      handleFetchWeather();
    }
  }, []);

  return (
    <div className='five-day-component'>
      <div className='component'>
        <div className='input'>
          <input
            type="text"
            value={locationInput}
            onChange={handleLocationChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter location (e.g., New York, US)"
          />
          <button onClick={handleFetchWeather} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Weather'}
          </button>
        </div>

        {error && <p className='error'>{error}</p>}

        {forecast.length > 0 ? (
          <div className='forecast-component'> 
            {forecast.map((day, index) => (
              <div key={index} className='day'>
                <div>
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </div>
                
                {day.weather_icon ? (
                  <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/1st%20Set%20-%20Color/${day.weather_icon}.png`}
                    alt={day.weather_icon}
                    style={{ width: '40px', height: '40px' }}
                  />
                ) : (
                  <p>{day.weather_icon} icon not available</p> 
                )}
                <div>
                  <p>
                    <p className="label">Temperature:</p>
                    <div className="data">{day.temp_min}°F - {day.temp_max}°F</div>
                    <p className="label">Feels Like:</p>
                    <div className="data">{day.feels_min}°F - {day.feels_max}°F</div>
                  </p>

                  <div>
                    <p className="label">Wind Speed:</p>
                    <div className="data">{day.wind_speed} mph</div>
                    <p className="label">Humidity:</p>
                    <div className="data">{day.humidity}%</div>
                    <p className="label">Precipitation:</p>
                    <div className="data">{day.precipitation} inches</div>
                    <p className="label">Precipitation Probability:</p>
                    <div className="data">{day.precipitation_probability}%</div>
                    <p className="label">Special Conditions:</p>
                    <div className="data">{day.special_condition}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>Please enter a valid location to view the weather forecast.</p>
        )}
      </div>
    </div>
  );
};

export default FiveDayWeather;
