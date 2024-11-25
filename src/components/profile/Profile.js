// src/components/profile/Profile.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileEdit from './ProfileEdit';
import './Profile.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaExclamationTriangle, FaTimes, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Profile = ({ userInfo, onUpdate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteAccount = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      await axios.delete(`/users/${userInfo.user_id}`);
      toast.success("Your account has been successfully deleted.");
      onLogout();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      toast.error("Error deleting account: " + (err.response?.data?.detail || err.message));
      console.error("Error deleting account:", err);
    } finally {
      setLoading(false);
    }
  };

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  if (!userInfo) {
    return <p>Please log in to view your profile.</p>;
  }

  const handleUpdate = async (updatedData) => {
    setLoading(true);
    try {
      await onUpdate(updatedData);
      setIsEditing(false);
      setError(null);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      toast.error("Error updating profile: " + (err.response?.data?.detail || err.message));
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      {isEditing ? (
        <ProfileEdit userInfo={userInfo} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <h2>{userInfo.username}'s Profile</h2>
          <p>Email: {userInfo.email}</p>
          {userInfo.location && <p>Location: {userInfo.location}</p>}
          {userInfo.gender && <p>Gender: {userInfo.gender}</p>}
          <p>
            {userInfo.preferences && userInfo.preferences.length > 0 ? (
              <>Preferences: {userInfo.preferences.join(', ')}</>
            ) : (
              <span className="no-preferences">No preferences provided</span>
            )}
          </p>
          <div className="button-group">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <FaEdit className="icon" /> Edit Profile
            </button>
            <button className="delete-button" onClick={openConfirmationModal}>
              <FaTrashAlt className="icon" /> Delete Account
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-content profile-modal-glow">
            <p className="modal-message">
              Are you sure you want to delete your account?
            </p>
            <p className="modal-submessage">
              This action cannot be undone.
            </p>
            <div className="modal-buttons">
              <button onClick={handleDeleteAccount} className="confirm-button">
                <FaExclamationTriangle className="icon" /> Yes
              </button>
              <button onClick={closeConfirmationModal} className="cancel-button">
                <FaTimes className="icon" /> No
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Profile;
