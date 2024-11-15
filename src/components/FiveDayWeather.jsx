import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../api/axiosInstance';
import '../App.css';
import './styling/FiveDayWeather.css';

const FiveDayWeather = ({ userInfo, weather, updateWeather }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!userInfo || !userInfo.user_id) {
      setError("User information is missing. Please log in.");
      return;
    }

    setError(null);
    try { 
      const weatherRequest = {
        user_id: userInfo.user_id
      };
      const response = await axios.post('/weather/', weatherRequest);
      if (response.data != weather) {
        setLoading(true);
      }
      updateWeather(response.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.response?.data?.detail || err.message || 'Unable to retrieve weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [userInfo]);

  return (
    <div className='five-day-component'>
      <div className='component'>
        {error && <p className='error'>{error}</p>}
        <div className="day-name" >Weather for: {userInfo?.location}</div>

        {loading ? (
          <p>Loading weather data...</p>
        ) : weather.length > 0 ? (
          <div className='forecast-component'> 
            {weather.map((day, index) => (
              <div key={index} className='day'>
                <div className="day-name">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="icon">
                  {day.weather_icon ? (
                    <img
                      src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/1st%20Set%20-%20Color/${day.weather_icon}.png`}
                      alt={day.weather_icon}
                    />
                  ) : (
                    <p>Icon not available</p> 
                  )}
                </div>
                <div className="temperature">
                  <p><span className="label">Temperature:</span> <span className="data">{day.temp_min}°F - {day.temp_max}°F</span></p>
                  <p><span className="label">Feels Like:</span> <span className="data">{day.feels_min}°F - {day.feels_max}°F</span></p>
                </div>
                <div className="wind">
                  <p><span className="label">Wind Speed:</span> <span className="data">{day.wind_speed} mph</span></p>
                </div>
                <div className="humidity">
                  <p><span className="label">Humidity:</span> <span className="data">{day.humidity}%</span></p>
                </div>
                <div className="precipitation">
                  <p><span className="label">Precipitation:</span> <span className="data">{day.precipitation} inches</span></p>
                  <p><span className="label">Precipitation Probability:</span> <span className="data">{day.precipitation_probability}%</span></p>
                </div>
                <div className="special-conditions">
                  <p><span className="label">Special Conditions:</span> <span className="data">{day.special_condition}</span></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No weather data available. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

FiveDayWeather.propTypes = {
  userInfo: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    // other user info properties
  })
};

export default FiveDayWeather;
