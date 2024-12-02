// ProfileView.js

import React from 'react';
import './Profile.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProfileView = ({ userInfo, onEdit, onDelete }) => {
  if (!userInfo) {
    return <p>User information is not available.</p>;
  }

  return (
    <div>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {userInfo.location && <p><strong>Location:</strong> {userInfo.location}</p>}
      {userInfo.gender && <p><strong>Gender:</strong> {userInfo.gender}</p>}
      {userInfo.height && <p><strong>Height:</strong> {userInfo.height}</p>}
      {userInfo.weight && <p><strong>Weight:</strong> {userInfo.weight}</p>}
      {userInfo.preferences && userInfo.preferences.length > 0 ? (
        <p><strong>Fashion Preferences:</strong> {userInfo.preferences.join(', ')}</p>
      ) : (
        <p><strong>Fashion Preferences:</strong> No preferences provided.</p>
      )}
      <div className="button-group">
        <button type='button' onClick={onEdit} className="edit-button">
          <FaEdit className="icon" />
          <span className="button-text">Edit Profile</span>
        </button>
        <button type='button' onClick={onDelete} className="delete-button">
          <FaTrash className="icon" />
          <span className="button-text">Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
