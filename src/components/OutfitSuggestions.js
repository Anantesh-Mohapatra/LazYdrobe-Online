// src/components/OutfitSuggestions.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/OutfitSuggestions.css';
import axios from 'axios';

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
      <div className="outfit-list">
        {outfits.map(outfit => (
          // Use outfit_id as the unique key
          <div key={outfit.outfit_id} className="outfit-card">
            <h3>{outfit.occasion.type} Outfit</h3>
            <p><strong>Weather:</strong> {outfit.for_weather}</p>
            <div className="clothing-items">
              {outfit.clothings.map(clothing => (
                <div key={clothing.item_id} className="clothing-item">
                  <img src={clothing.image_url} alt={clothing.clothing_type} />
                  <p>{clothing.clothing_type}</p>
                  <button onClick={() => handleBuyClick(clothing)}>Buy</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Purchase {selectedItem.clothing_type}</h2>
            <img src={selectedItem.image_url} alt={selectedItem.clothing_type} />
            <p><strong>Name:</strong> {selectedItem.product_name}</p>
            <p><strong>Price:</strong> ${selectedItem.price}</p>
            <a href={selectedItem.product_url} target="_blank" rel="noopener noreferrer">
              <button className="buy-button">Proceed to Purchase</button>
            </a>
            <button className="close-button" onClick={handleCloseModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.arrayOf(PropTypes.shape({
    outfit_id: PropTypes.number.isRequired,
    occasion: PropTypes.shape({
      type: PropTypes.string.isRequired,
      season: PropTypes.string.isRequired,
    }).isRequired,
    for_weather: PropTypes.string.isRequired,
    clothings: PropTypes.arrayOf(PropTypes.shape({
      item_id: PropTypes.number.isRequired,
      clothing_type: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      product_name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      product_url: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

export default OutfitSuggestions;
