// src/components/OutfitSuggestions.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/OutfitSuggestions.css';
import axios from 'axios';
import OutfitGenerationModal from './OutfitGenerationModal';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const OutfitSuggestions = ({
  outfits,
  setOutfitSuggestions,
  wardrobeItems,
  error,
  loading,
  setLoading,
  userInfo,
}) => {
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const history = useHistory(); // Initialize useHistory

  const handleCreateOutfit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/outfits/suggest', { user_id: userInfo.user_id });
      setOutfitSuggestions([response.data, ...outfits]);
      setCurrentOutfit(response.data);
      setIsGenerationModalOpen(true);
      setSuccessMessage('Outfit suggested successfully!');
      // Automatically hide the message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error("Error suggesting outfit:", err);
      alert("Failed to suggest outfit.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewPreviousOutfits = () => {
    history.push('/previous-outfits'); // Navigate to the previous outfits page
  };

  const closeGenerationModal = () => {
    setIsGenerationModalOpen(false);
    setCurrentOutfit(null);
  };

  return (
    <div className="outfit-suggestions">
      <h2>Outfit Suggestions</h2>
      <div className="buttons-container">
        <button
          onClick={handleCreateOutfit}
          className="create-outfit-button"
          disabled={loading}
        >
          {loading ? 'Suggesting Outfit...' : 'Create New Outfit'}
        </button>
        <button
          onClick={handleViewPreviousOutfits}
          className="view-previous-button"
        >
          View Previous Outfits
        </button>
      </div>

      {/* Success Message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Outfit Generation Modal */}
      {isGenerationModalOpen && currentOutfit && (
        <OutfitGenerationModal
          outfit={currentOutfit}
          closeModal={closeGenerationModal}
        />
      )}

      {/* Optionally display errors */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.array.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
  wardrobeItems: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default OutfitSuggestions;
