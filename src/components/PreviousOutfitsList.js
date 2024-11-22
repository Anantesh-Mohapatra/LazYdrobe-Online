// src/components/PreviousOutfitsList.js

import React from 'react';
import PropTypes from 'prop-types';
import './styling/PreviousOutfitsList.css';
import axios from 'axios';

const PreviousOutfitsList = ({ outfits, closeModal, setOutfitSuggestions }) => {
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all outfit suggestions?")) {
      return;
    }

    try {
      // Assuming your backend endpoint expects a query parameter for user_id
      const userId = outfits.length > 0 ? outfits[0].user_id : null;
      if (!userId) {
        alert("User ID not found.");
        return;
      }

      await axios.delete(`/outfits/suggestions/all`, { params: { user_id: userId } });
      setOutfitSuggestions([]);
      alert("All outfit suggestions deleted successfully.");
    } catch (err) {
      console.error("Failed to delete all outfit suggestions:", err);
      alert("Failed to delete all outfit suggestions.");
    }
  };

  if (!outfits || outfits.length === 0) {
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="previous-outfits">
            <h2>Previous Outfit Recommendations</h2>
            <p>No previous outfits found.</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort outfits by date, newest first
  const sortedOutfits = [...outfits].sort((a, b) => new Date(b.date_suggested) - new Date(a.date_suggested));

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="previous-outfits">
          <div className="modal-header">
            <h2>Previous Outfit Recommendations</h2>
            <button onClick={handleDeleteAll} className="delete-all-button">
              Delete All
            </button>
          </div>
          <ol className="suggestion-list">
            {sortedOutfits.map((suggestion, suggestionIndex) => (
              <li key={suggestion.suggestion_id} className="suggestion-item">
                <div className="suggestion-header">
                  <span className="suggestion-number">{suggestionIndex + 1}.</span>
                  <span className="suggestion-date">{new Date(suggestion.date_suggested).toLocaleDateString()}</span>
                </div>
                <div className="outfit-combinations">
                  {suggestion.outfit_details.map((outfit, outfitIndex) => (
                    <div key={outfitIndex} className="outfit-combination">
                      <div className="clothing-categories">
                        {['Top', 'Bottom', 'Shoes', 'Outerwear', 'Accessories', 'Set'].map((category) => {
                          // Filter items by category
                          const itemsInCategory = outfit.filter(
                            (item) => item.clothing_type.toLowerCase() === category.toLowerCase()
                          );

                          if (itemsInCategory.length === 0) return null;

                          return (
                            <p key={category}>
                              <strong>{category}:</strong>{' '}
                              {itemsInCategory.map((item, idx) => (
                                <React.Fragment key={item.item_id}>
                                  {item.image_url && (
                                    <img src={item.image_url} alt={item.product_name} className="clothing-thumbnail" />
                                  )}
                                  <a
                                    href={item.eBay_link && item.eBay_link.length > 0 ? item.eBay_link[0] : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`clothing-link ${!(item.eBay_link && item.eBay_link.length > 0) ? 'disabled' : ''}`}
                                  >
                                    {item.product_name}
                                  </a>
                                  {idx < itemsInCategory.length - 1 && ', '}
                                  {!(item.eBay_link && item.eBay_link.length > 0) && <span className="link-unavailable">(Unavailable)</span>}
                                </React.Fragment>
                              ))}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

PreviousOutfitsList.propTypes = {
  outfits: PropTypes.array.isRequired, // Array of OutfitSuggestionResponse
  closeModal: PropTypes.func.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
};

export default PreviousOutfitsList;
