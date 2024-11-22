// src/components/OutfitGenerationModal.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styling/OutfitGenerationModal.css';

const OutfitGenerationModal = ({ outfit, closeModal }) => {
  const [showBuyLinks, setShowBuyLinks] = useState(false);

  if (!outfit) return null;

  // Function to categorize links
  const categorizeLinks = () => {
    const categories = {
      Top: [],
      Bottom: [],
      Shoes: [],
      Outerwear: [],
    };

    outfit.outfit_details.forEach(outfitComponents => {
      outfitComponents.forEach(component => {
        const { clothing_type, eBay_link } = component;
        if (
          clothing_type.toLowerCase().includes('top') ||
          clothing_type.toLowerCase().includes('sweater') ||
          clothing_type.toLowerCase().includes('t-shirt')
        ) {
          categories.Top.push(eBay_link[0]);
        } else if (
          clothing_type.toLowerCase().includes('bottom') ||
          clothing_type.toLowerCase().includes('jeans') ||
          clothing_type.toLowerCase().includes('pants')
        ) {
          categories.Bottom.push(eBay_link[0]);
        } else if (
          clothing_type.toLowerCase().includes('shoe') ||
          clothing_type.toLowerCase().includes('boots') ||
          clothing_type.toLowerCase().includes('sneakers')
        ) {
          categories.Shoes.push(eBay_link[0]);
        } else if (
          clothing_type.toLowerCase().includes('jacket') ||
          clothing_type.toLowerCase().includes('coat') ||
          clothing_type.toLowerCase().includes('outerwear')
        ) {
          categories.Outerwear.push(eBay_link[0]);
        }
      });
    });

    return categories;
  };

  const categories = categorizeLinks();

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <div className="outfit-container">
          <div className="image-section">
            <img src={outfit.image_url} alt="Generated Outfit" className="generated-image" />
            <p className="info-text">
              *The image is AI-generated and the original clothing might not fully match what you are seeing now.*
            </p>
            <button
              className="buy-button-main"
              onClick={() => setShowBuyLinks(!showBuyLinks)}
            >
              {showBuyLinks ? 'Hide Purchase Links' : 'Purchase'}
            </button>
            {showBuyLinks && (
              <div className="buy-links-container">
                {Object.keys(categories).map((category) => (
                  categories[category].length > 0 && (
                    <a
                      key={category}
                      href={categories[category][0]} // Assuming first link is primary
                      target="_blank"
                      rel="noopener noreferrer"
                      className="buy-link"
                    >
                      Buy {category}
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
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
