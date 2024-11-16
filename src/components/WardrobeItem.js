import React from 'react';
import '../App.css';
import './styling/WardrobeItem.css';

const WardrobeItem = ({ item, onClick, isSelected, toggleSelect }) => {
  // Ensure that item properties exist before rendering
  const clothingType = item.clothing_type || 'Unknown Clothing Type';
  const color = item.color || 'Unknown Color';
  const size = item.size || 'Unknown Size';
  const imageUrl = item.image_url || '/default-image.png'; // Provide a default image if image_url is missing

  const listToStr = (list) => {
    if (list.length === 1) return list[0];
    return `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`;
  };

  return (
    <div className="wardrobe-item">
      <div className="checkbox">
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={(e) => {
              e.stopPropagation();
              toggleSelect(item.item_id);
            }} 
          />
        </div>
      <div onClick={onClick}>
        <img src={imageUrl} alt={clothingType} />
        <h3>{clothingType}</h3>
        <p>Color: {listToStr(color)}</p>
        <p>Size: {size}</p>
      </div>
    </div>
  );
};

export default WardrobeItem;
