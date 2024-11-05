// WardrobeItem.js
import React from 'react';
import '../App.css';

const WardrobeItem = ({ item }) => {
  return (
    <div className="wardrobe-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.category}</p>
    </div>
  );
};

export default WardrobeItem;
