// Profile.js
import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ userInfo, onUpdate, onDelete, loading, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    gender: userInfo.gender || '',
    preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
  });
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderClick = (gender) => {
    if (gender === 'Other') {
      setIsOtherSelected(true);
      setFormData({ ...formData, gender: '' });
    } else {
      setIsOtherSelected(false);
      setFormData({ ...formData, gender });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      gender: formData.gender,
      preferences: formData.preferences.split(',').map((pref) => pref.trim()),
    };
    onUpdate(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      gender: userInfo.gender || '',
      preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
    });
    setIsOtherSelected(false);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h3>Profile</h3>
      {loading && <p>Processing...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {!isEditing ? (
        <>
          <p><strong>Gender:</strong> {userInfo.gender || 'Not specified'}</p>
          <p><strong>Fashion Preferences:</strong> {userInfo.preferences && userInfo.preferences.length > 0 ? userInfo.preferences.join(', ') : 'Not specified'}</p>
          <div className="button-group">
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              Edit Profile
            </button>
            <button 
              onClick={onDelete} 
              className="delete-button"
            >
              Delete Account
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Gender:</label>
          <div className="gender-buttons">
            <button
              type="button"
              className={`gender-button ${formData.gender === 'Male' ? 'active' : ''}`}
              onClick={() => handleGenderClick('Male')}
            >
              Male
            </button>
            <button
              type="button"
              className={`gender-button ${formData.gender === 'Female' ? 'active' : ''}`}
              onClick={() => handleGenderClick('Female')}
            >
              Female
            </button>
            <button
              type="button"
              className={`gender-button ${isOtherSelected ? 'active' : ''}`}
              onClick={() => handleGenderClick('Other')}
            >
              Other
            </button>
            {isOtherSelected && (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Please specify"
                className="input-field other-input"
              />
            )}
          </div>

          <label>
            Fashion Preferences:
            <input
              type="text"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              placeholder="e.g., Casual, Formal"
              className="input-field"
              required
            />
          </label>
          <div className="button-group">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;

