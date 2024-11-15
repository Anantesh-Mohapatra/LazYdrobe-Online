// ProfileView.js

import React from 'react';
import './Profile.css';

const ProfileView = ({ userInfo, onEdit, onDelete }) => {
  if (!userInfo) {
    return <p>User information is not available.</p>;
  }

  return (
    <div>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Location:</strong> {userInfo.location || 'Not specified'}</p>
      <p><strong>Gender:</strong> {userInfo.gender || 'Not specified'}</p>
      <p><strong>Fashion Preferences:</strong> {userInfo.preferences?.length > 0 ? userInfo.preferences.join(', ') : 'Not specified'}</p>
      <div className="button-group">
        <button type='button' onClick={onEdit} className="edit-button">Edit Profile</button>
        <button type='button' onClick={onDelete} className="delete-button">Delete Account</button>
      </div>
    </div>
  );
};

export default ProfileView;
