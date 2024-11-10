// src/components/profile/Profile.js

import React, { useState } from 'react';

const Profile = ({ userInfo, onUpdate, onDelete, loading, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    gender: userInfo.gender || '',
    preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert preferences string back to array
    const updatedData = {
      gender: formData.gender,
      preferences: formData.preferences.split(',').map(pref => pref.trim()),
    };
    onUpdate(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      gender: userInfo.gender || '',
      preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
    });
    setIsEditing(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      maxWidth: '500px', 
      margin: '20px auto',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Profile</h3>
      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!isEditing ? (
        <>
          <p><strong>Gender:</strong> {userInfo.gender || 'Not specified'}</p>
          <p><strong>Fashion Preferences:</strong> {userInfo.preferences && userInfo.preferences.length > 0 ? userInfo.preferences.join(', ') : 'Not specified'}</p>
          <button 
            onClick={() => setIsEditing(true)} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#1890ff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Edit Profile
          </button>
          <button 
            onClick={onDelete} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#ff4d4f', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Delete Account
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="e.g., Female"
              style={{ 
                display: 'block', 
                margin: '8px 0', 
                padding: '8px', 
                width: '100%', 
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              required
            />
          </label>
          <label>
            Fashion Preferences:
            <input
              type="text"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              placeholder="e.g., Casual, Formal"
              style={{ 
                display: 'block', 
                margin: '8px 0', 
                padding: '8px', 
                width: '100%', 
                border: '1px solid #ccc',
                borderRadius: '4px' 
              }}
              required
            />
          </label>
          <div style={{ marginTop: '10px' }}>
            <button 
              type="submit" 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#52c41a', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={handleCancel} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#f5222d', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
