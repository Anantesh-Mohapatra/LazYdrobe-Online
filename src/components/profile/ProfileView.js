// ProfileView.js
import React from 'react';
import './Profile.css';

const ProfileView = ({ userInfo, onEdit, onDelete }) => (
  <div>
    <p><strong>Gender:</strong> {userInfo.gender || 'Not specified'}</p>
    <p><strong>Fashion Preferences:</strong> {userInfo.preferences?.length > 0 ? userInfo.preferences.join(', ') : 'Not specified'}</p>
    <div className="button-group">
      <button onClick={onEdit} className="edit-button">Edit Profile</button>
      <button onClick={onDelete} className="delete-button">Delete Account</button>
    </div>
  </div>
);

export default ProfileView;
