import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PreviousOutfitItem = ({ outfit, isSelected, onSelect, onUnselect }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleItemClick = () => {
    if (isSelected) {
      onUnselect();
    } else {
      onSelect();
    }
  };

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
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
                        onMouseEnter={(e) => handleMouseEnter(item, e)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.product_name}
                      </a>
                    ) : (
                      <span className="link-unavailable">Unavailable</span>
                    )}
                    {hoveredItem === item && (
                      <div
                        className="hover-overlay"
                        style={{ top: hoverPosition.y - 10, left: hoverPosition.x + 10 }}
                      >
                        <img src={item.image_url} alt={item.product_name} />
                      </div>
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
