// src/components/PreviousOutfitsList.js

import React from 'react';
import PropTypes from 'prop-types';
import './styling/PreviousOutfitsList.css';
import axios from 'axios';

const PreviousOutfitsList = ({ outfits, closeModal, setOutfitSuggestions }) => {
  const handleDelete = async (suggestion_id) => {
    if (!window.confirm("Are you sure you want to delete this outfit suggestion?")) {
      return;
    }

    try {
      await axios.delete(`/outfits/suggestions/${suggestion_id}`);
      setOutfitSuggestions((prevOutfits) => prevOutfits.filter((suggestion) => suggestion.suggestion_id !== suggestion_id));
      alert("Outfit suggestion deleted successfully.");
    } catch (err) {
      console.error("Failed to delete outfit suggestion:", err);
      alert("Failed to delete outfit suggestion.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Previous Outfit Suggestions</h2>
        <button className="close-button" onClick={closeModal}>X</button>
        {outfits.length === 0 ? (
          <p>No previous outfits found.</p>
        ) : (
          <div className="previous-outfits">
            {outfits.map((suggestion) => (
              <div key={suggestion.suggestion_id} className="outfit-card">
                <h3>Suggestion ID: {suggestion.suggestion_id}</h3>
                <p>
                  <strong>Date Suggested:</strong>{" "}
                  {new Date(suggestion.date_suggested).toLocaleString()}
                </p>
                <div className="outfit-details">
                  {suggestion.outfit_details.map((outfit, index) => (
                    <div key={index} className="outfit-components">
                      <h4>Outfit {index + 1}</h4>
                      <div className="clothing-items">
                        {outfit.map((component) => (
                          <div key={component.item_id} className="clothing-item">
                            <img src={component.image_url} alt={component.product_name} />
                            <p>{component.product_name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDelete(suggestion.suggestion_id)} className="delete-button">
                  Delete Suggestion
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

PreviousOutfitsList.propTypes = {
  outfits: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
};

export default PreviousOutfitsList;
