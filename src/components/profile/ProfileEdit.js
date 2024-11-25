// ProfileEdit.js
import React, { useState } from 'react';
import './Profile.css';
import { FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const fetchWeather = async (location, apiKey) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next5days?key=${apiKey}&unitGroup=us&iconSet=icons2`
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching weather data: ${response.statusText} - ${errorText}`);
      throw new Error(`Error fetching weather data: ${response.statusText} - ${errorText}`);
    }
    const data = await response.json();
    return data.days.slice(0, 5); // Get the next 5 days, including today
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const ProfileEdit = ({ userInfo, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    username: userInfo.username || '',
    email: userInfo.email || '',
    location: userInfo.location || '',
    preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
    gender: userInfo.gender || '',
    password: ''
  });

  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(null);
  const [isLocationInvalid, setIsLocationInvalid] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLocationInvalid(false);
    try {
      const apiKey = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }

      // Only check if the location is valid if the location has been changed
      if (form.location !== userInfo.location) {
        await fetchWeather(form.location, apiKey);
      }

      // Prepare updated data
      const updatedData = {
        username: form.username,
        email: form.email,
        location: form.location,
        preferences: form.preferences.split(',').map(pref => pref.trim()),
        gender: form.gender,
      };
      if (form.password) {
        updatedData.password = form.password;
      }
      onUpdate(updatedData);
      setIsChanged(false);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Invalid location. Please enter a valid location.');
      setIsLocationInvalid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username */}
      <div>
        <label>Username:</label>
        <input 
          className='input-field'
          type="text" 
          name="username" 
          value={form.username} 
          onChange={handleChange} 
          placeholder="Enter your username" 
          minLength={3}
          maxLength={50}
          required 
        />
      </div>

      <div>
        <label>Email:</label>
        <input 
          className='input-field'
          type="text" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          placeholder="Enter your email" 
          required 
        />
      </div>

      <div>
        <label>New Password:</label>
        <input 
          className='input-field'
          type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          placeholder="Leave blank to keep current password" 
          minLength={6}
        />
      </div>

      <div>
        <label>Location:</label>
        <input 
          className={`input-field ${isLocationInvalid ? 'input-error' : ''}`}
          type="text" 
          name="location" 
          value={form.location} 
          onChange={handleChange} 
          placeholder="e.g., New York, US" 
          required 
        />
      </div>

      {/* Gender */}
      <div>
        <label>Gender:</label>
        <select 
          className='input-field'
          type="select" 
          name="gender" 
          value={form.gender} 
          onChange={handleChange} 
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Fashion Preference */}
      <div>
        <label>Fashion preferences:</label>
        <input 
          className='input-field'
          type="text" 
          name="preferences" 
          value={form.preferences} 
          onChange={handleChange} 
          placeholder="e.g., Unisex, Comfortable, ..." 
        />
      </div>

      {error && <p className="error-text">{error}</p>}
      <div className='button-group'>
        <button 
          type="submit" 
          className={`save-button ${isChanged ? 'active' : 'inactive'}`} 
          disabled={!isChanged}
        >
          <FaSave className="icon" />
          <span className="button-text">Save Changes</span>
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          <FaTimes className="icon" />
          <span className="button-text">Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;
