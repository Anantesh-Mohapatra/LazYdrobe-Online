// Wardrobe.js
import React, { useState } from 'react';
import WardrobeItem from './WardrobeItem';
import '../App.css';
import './styling/Wardrobe.css';

const Wardrobe = ({ items }) => {
  console.log("Wardrobe Items:", items);
  const [filter, setFilter] = useState('');

  // Filter wardrobe items based on the `clothing_type`
  const filteredItems = items.filter(item => 
    item.clothing_type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="wardrobe">
      <input 
        type="text" 
        placeholder="Filter by clothing type" 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="wardrobe-grid">
        {filteredItems.map(item => (
          // Using item_id as key to avoid warnings
          <WardrobeItem key={item.item_id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Set default props to avoid undefined errors
Wardrobe.defaultProps = {
  items: []
};

export default Wardrobe;
