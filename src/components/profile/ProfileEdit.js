// ProfileEdit.js
import React, { useState } from 'react';
import GenderSelection from './GenderSelection';
import PreferencesInput from './PreferencesInput';
import './Profile.css';

const ProfileEdit = ({ userInfo, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    gender: userInfo.gender || '',
    preferences: userInfo.preferences ? userInfo.preferences.join(', ') : '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      gender: formData.gender,
      preferences: formData.preferences.split(',').map(pref => pref.trim()),
    };
    onUpdate(updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <GenderSelection gender={formData.gender} onGenderChange={(gender) => setFormData({ ...formData, gender })} />
      <PreferencesInput value={formData.preferences} onChange={handleChange} />
      <div className="button-group">
        <button type="submit" className="save-button">Save</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </form>
  );
};

export default ProfileEdit;
