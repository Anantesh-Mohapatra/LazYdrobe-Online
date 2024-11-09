import React from 'react';
import '../App.css';
import './styling/WardrobeItem.css';

const WardrobeItem = ({ item }) => {
  // Ensure that item properties exist before rendering
  const clothingType = item.clothing_type || 'Unknown Clothing Type';
  const color = item.color?.primary || 'Unknown Color';
  const size = item.size || 'Unknown Size';
  const imageUrl = item.image_url || '/default-image.png'; // Provide a default image if image_url is missing

  return (
    <div className="wardrobe-item">
      <img src={imageUrl} alt={clothingType} />
      <h3>{clothingType}</h3>
      <p>Color: {color}</p>
      <p>Size: {size}</p>
    </div>
  );
};

export default WardrobeItem;
