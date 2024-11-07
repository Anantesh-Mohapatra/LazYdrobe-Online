// WardrobeItem.js
import React from 'react';
import '../App.css';
import './styling/WardrobeItem.css';

const WardrobeItem = ({ item }) => {
  return (
    <div className="wardrobe-item">
      <img src={item.image_url} alt={item.clothing_type} />
      <h3>{item.clothing_type}</h3>
      <p>Color: {item.color.primary}</p>
      <p>Size: {item.size}</p>
    </div>
  );
};

export default WardrobeItem;
