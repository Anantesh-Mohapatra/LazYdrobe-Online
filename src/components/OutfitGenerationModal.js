// src/components/OutfitGenerationModal.js

import React from 'react';
import PropTypes from 'prop-types';
import './styling/OutfitGenerationModal.css';

const OutfitGenerationModal = ({ outfit, closeModal }) => {
  if (!outfit) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Your Suggested Outfit</h2>
        <div className="outfit-details">
          {outfit.outfit_details.map((outfitComponents, index) => (
            <div key={index} className="outfit-section">
              <div className="clothing-items">
                {outfitComponents.map((component) => (
                  <div key={component.item_id} className="clothing-item">
                    <img src={component.image_url} alt={component.product_name} />
                    <p>{component.product_name}</p>
                    {component.eBay_link && component.eBay_link.length > 0 && (
                      <a
                        href={component.eBay_link[0]} // Assuming first link is primary
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-button"
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

OutfitGenerationModal.propTypes = {
  outfit: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default OutfitGenerationModal;
