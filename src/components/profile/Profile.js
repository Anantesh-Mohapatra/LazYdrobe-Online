// src/components/profile/Profile.js

import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

const Profile = ({ userInfo, onUpdate, onDelete, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileError, setProfileError] = useState(null);

  if (!userInfo) {
    return <p>Please log in to view your profile.</p>;
  }

  const handleUpdate = async (updatedData) => {
    try {
      await onUpdate(updatedData);
      setIsEditing(false);
      setProfileError(null);
    } catch (err) {
      setProfileError(err.response?.data?.detail || 'An error occurred while updating your profile.');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      setProfileError(null);
    } catch (err) {
      setProfileError(err.response?.data?.detail || 'An error occurred while deleting your account.');
    }
  };

  return (
    <div className="profile-container">
      <h3>{`${userInfo.username}'s Profile`}</h3>

      {loading && <p>Processing...</p>}
      {profileError && <p className="error-text">Error: {profileError}</p>}

      {isEditing ? (
        <ProfileEdit
          userInfo={userInfo}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView
          userInfo={userInfo}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Profile;
