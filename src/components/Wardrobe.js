// Wardrobe.js
import React, { useState } from 'react';
import WardrobeItem from './WardrobeItem';
import '../App.css';
import './styling/Wardrobe.css';

const Wardrobe = ({ items }) => {
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => 
    item.category ? item.category.toLowerCase().includes(filter.toLowerCase()) : false
  );

  return (
    <div className="wardrobe">
      <input 
        type="text" 
        placeholder="Filter by category" 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="wardrobe-grid">
        {filteredItems.map(item => (
          <WardrobeItem key={item.id} item={item} />
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
