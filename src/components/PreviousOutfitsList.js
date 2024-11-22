// src/components/PreviousOutfitsList.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styling/PreviousOutfitsList.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure this is imported

const PreviousOutfitsList = ({ outfits, setOutfitSuggestions, userId }) => {
  const history = useHistory();

  // State to control the visibility of the confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to open and close the modal
  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  // Handle the delete action when confirmed
  const confirmDeleteAll = async () => {
    closeConfirmationModal(); // Close the modal

    try {
      // Ensure outfits array is not empty
      if (outfits.length === 0) {
        toast.info("No outfit suggestions to delete.");
        return;
      }

      if (!userId) {
        toast.error("User ID not found.");
        console.error("Deletion failed: userId is undefined or null.");
        return;
      }

      await axios.delete(`/outfits/suggestions/all`, { params: { user_id: userId } });
      setOutfitSuggestions([]);
      toast.success("All outfit suggestions deleted successfully."); // Replaced alert with toast
      history.push('/outfits'); // Redirect to Outfit Suggestions page after deletion
    } catch (err) {
      console.error("Failed to delete all outfit suggestions:", err);
      toast.error("Failed to delete all outfit suggestions."); // Replaced alert with toast
    }
  };

  const handleDeleteAll = () => {
    openConfirmationModal();
  };

  if (!outfits || outfits.length === 0) {
    return (
      <div className="previous-outfits-page">
        <h2>Previous Outfit Recommendations</h2>
        <p>No previous outfits found.</p>
      </div>
    );
  }

  // Sort outfits by date, newest first
  const sortedOutfits = [...outfits].sort((a, b) => new Date(b.date_suggested) - new Date(a.date_suggested));

  return (
    <div className="previous-outfits-page">
      <div className="previous-outfits-header">
        <h2>Previous Outfit Recommendations</h2>
        <button onClick={handleDeleteAll} className="delete-all-button">
          Delete All
        </button>
      </div>
      <ol className="outfit-list">
        {sortedOutfits.map((suggestion, suggestionIndex) => (
          <li key={suggestion.suggestion_id} className="outfit-item">
            <div className="outfit-header"></div>
            <div className="outfit-details">
              {/* Iterate through each clothing item in the outfit */}
              {suggestion.outfit_details.map((clothingList, outfitIndex) => (
                <div key={outfitIndex} className="clothing-list">
                  {clothingList.map((item) => (
                    <div key={item.item_id} className="clothing-group">
                      <strong>{item.clothing_type}:</strong>{' '}
                      {item.eBay_link && item.eBay_link.length > 0 ? (
                        <a
                          href={item.eBay_link[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clothing-link"
                        >
                          {item.product_name}
                        </a>
                      ) : (
                        <span className="link-unavailable">Unavailable</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="previous-outfits-modal-overlay">
          <div className="previous-outfits-modal-content">
            <p className="modal-message">
              Are you sure you want to delete all outfit suggestions? This action cannot be undone.
            </p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteAll} className="confirm-button">
                Yes
              </button>
              <button onClick={closeConfirmationModal} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PreviousOutfitsList.propTypes = {
  outfits: PropTypes.array.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default PreviousOutfitsList;
