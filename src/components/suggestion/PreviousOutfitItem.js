import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PreviousOutfitItem = ({ outfit, isSelected, onSelect, onUnselect }) => {
  const handleItemClick = () => {
    if (isSelected) {
      onUnselect();
    } else {
      onSelect();
    }
  };

  return (
    <div
      className={`outfit-item ${isSelected ? 'selected' : ''}`}
      onClick={handleItemClick}
    >
      <div className="outfit-header">
        {outfit.image_url ? (
          <img src={outfit.image_url} alt="Outfit" className="outfit-image-large" />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="outfit-details">
        <table className="outfit-details-table">
          <tbody>
            {outfit.outfit_details.map((clothingList, outfitIndex) => (
              clothingList.map((item) => (
                <tr key={item.item_id}>
                  <td>{item.clothing_type}</td>
                  <td>
                    {item.eBay_link && item.eBay_link.length > 0 ? (
                      <a
                        href={item.eBay_link[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.product_name}
                      </a>
                    ) : (
                      <span className="link-unavailable">Unavailable</span>
                    )}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PreviousOutfitItem.propTypes = {
  outfit: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUnselect: PropTypes.func.isRequired,
};

export default PreviousOutfitItem;
