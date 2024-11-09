// FiveDayWeather.jsx

import React, { useState } from 'react';
import axios from '../api/axiosInstance'; // Ensure axiosInstance.js is correctly set up

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
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.response?.data?.detail || err.message || 'Unable to retrieve weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          background: '#e0f7fa',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={locationInput}
            onChange={handleLocationChange}
            placeholder="Enter location (e.g., New York, US)"
            style={{ padding: '8px', width: '250px', marginRight: '10px' }}
          />
          <button onClick={handleFetchWeather} style={{ padding: '8px' }} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Weather'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {forecast.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {forecast.map((day, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div>
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </div>
                {day.special_condition && (
                  <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${encodeURIComponent(day.special_condition)}.png`}
                    alt={day.special_condition}
                    style={{ width: '40px', height: '40px' }}
                  />
                )}
                <div>
                  {Math.round(day.temp_min)}° / {Math.round(day.temp_max)}°F
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
