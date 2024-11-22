import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PreviousOutfitItem = ({ outfit }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleItemClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`outfit-item ${isSelected ? 'selected' : ''}`}
      onClick={handleItemClick}
    >
      <div className="outfit-header"></div>
      <div className="outfit-details">
        {/* Iterate through each clothing item in the outfit */}
        {outfit.outfit_details.map((clothingList, outfitIndex) => (
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
    </div>
  );
};

PreviousOutfitItem.propTypes = {
  outfit: PropTypes.object.isRequired,
};

export default PreviousOutfitItem;
