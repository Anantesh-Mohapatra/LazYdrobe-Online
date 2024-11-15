// ProfileEdit.js
import React, { useState } from 'react';
import './Profile.css';

const ProfileEdit = ({ userInfo, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    username: userInfo.username || '',
    email: userInfo.email || '',
    location: userInfo.location || '',
    preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
    gender: userInfo.gender || '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Existing fields */}
      {/* Added Location Field */}
      <div>
        <label>Location:</label>
        <input 
          type="text" 
          name="location" 
          value={form.location} 
          onChange={handleChange} 
          placeholder="e.g., New York, US" 
          required 
        />
      </div>
      {/* Rest of the form */}
      <button type="submit" className="save-button">Save Changes</button>
      <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ProfileEdit;
