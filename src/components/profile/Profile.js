// Profile.js
import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

const Profile = ({ userInfo, onUpdate, onDelete, loading, error }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-container">
      <h3>{userInfo ? `${userInfo.username}'s Profile` : 'Profile'}</h3>
      {/* Personalized Profile Message */}

      {loading && <p>Processing...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {isEditing ? (
        <ProfileEdit
          userInfo={userInfo}
          onUpdate={(updatedData) => { onUpdate(updatedData); setIsEditing(false); }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView
          userInfo={userInfo}
          onEdit={() => setIsEditing(true)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default Profile;
