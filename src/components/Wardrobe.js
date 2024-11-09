import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

// Default props to handle missing `items` prop
Wardrobe.defaultProps = {
  items: []
};

// Prop types for validation
Wardrobe.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    item_id: PropTypes.string.isRequired,
    clothing_type: PropTypes.string.isRequired,
    // Add other expected properties here if needed
  })).isRequired
};

export default Wardrobe;
