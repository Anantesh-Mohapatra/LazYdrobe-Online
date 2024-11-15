// src/components/OutfitSuggestions.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/OutfitSuggestions.css';

const OutfitSuggestions = ({ outfits }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Handler to open the purchase modal
  const handleBuyClick = (item) => {
    setSelectedItem(item);
  };

  // Handler to close the purchase modal
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Closes pop up when pressing esc
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedItem) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedItem]);

  return (
    <div className="outfit-suggestions">
      <h2>Outfit Suggestions</h2>
      {outfits.length === 0 ? (
        <p>No outfit suggestions available. Please generate one!</p>
      ) : (
        <div className="outfit-list">
          {outfits.map(outfitSuggestion => (
            // Use suggestion_id as the unique key
            <div key={outfitSuggestion.suggestion_id} className="outfit-card">
              <h3>Suggestion ID: {outfitSuggestion.suggestion_id}</h3>
              <p><strong>Date Suggested:</strong> {new Date(outfitSuggestion.date_suggested).toLocaleString()}</p>
              <div className="outfit-details">
                {outfitSuggestion.outfit_details.map((outfit, index) => (
                  <div key={index} className="outfit-components">
                    <h4>Outfit {index + 1}</h4>
                    <div className="clothing-items">
                      {outfit.map(component => (
                        <div key={component.item_id} className="clothing-item">
                          <img src={component.image_url} alt={component.clothing_type} />
                          <p>{component.product_name}</p>
                          <button onClick={() => handleBuyClick(component)}>Buy</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Purchase {selectedItem.clothing_type}</h2>
            <img src={selectedItem.image_url} alt={selectedItem.clothing_type} />
            <p><strong>Name:</strong> {selectedItem.product_name}</p>
            <div>
              <strong>Buy Links:</strong>
              <ul>
                {selectedItem.eBay_link.map((link, idx) => (
                  <li key={idx}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{`Buy Option ${idx + 1}`}</a>
                  </li>
                ))}
              </ul>
            </div>
            <button className="close-button" onClick={handleCloseModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.arrayOf(PropTypes.shape({
    suggestion_id: PropTypes.number.isRequired,
    outfit_details: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      clothing_type: PropTypes.string.isRequired,
      item_id: PropTypes.number.isRequired,
      product_name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      eBay_link: PropTypes.arrayOf(PropTypes.string).isRequired,
    }))).isRequired,
    date_suggested: PropTypes.string.isRequired,
  })).isRequired,
};

export default OutfitSuggestions;
