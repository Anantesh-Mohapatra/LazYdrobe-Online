import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WardrobeItem from './WardrobeItem';
import '../App.css';
import './styling/Wardrobe.css';

const Wardrobe = ({ items }) => {
  console.log("Wardrobe Items:", items);
  const [filter, setFilter] = useState('');
  const [addItem, setAddItem] = useState(null);
  const [newItem, setNewItem] = useState({
    clothing_type: '',
    for_weather: '',
    color: '',
    size: '',
    tags: '',
    image_url: ''
  });

  // Filter wardrobe items based on the `clothing_type`
  const filteredItems = items.filter(item => 
    item.clothing_type.toLowerCase().includes(filter.toLowerCase())
  );


  // Handler to close the add item pop up
  const handleCloseAdd = () => {
    setAddItem(null);
  };

  // Closes pop up when pressing esc
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseAdd();
      }
    };

    if (addItem) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [addItem]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  // Handle submission and sending to db
  const handleAddItem = async () => {
    // To do
    console.log("Adding new item:", newItem);
  };

  return (
    <div className="wardrobe">
      <div className='on-top'>
        <input 
          type="text" 
          placeholder="Filter by clothing type" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setAddItem(true)}>Add Item</button>
      </div>
      <div className="wardrobe-grid">
        {filteredItems.map(item => (
          // Using item_id as key to avoid warnings
          <WardrobeItem key={item.item_id} item={item} />
        ))}
      </div>

      {/* Add item */}
      {addItem && (
        <div className="modal-overlay" onClick={handleCloseAdd}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseAdd}>Close</button>
            <h2>Add New Wardrobe Item</h2>
            <form>
              <label>Clothing Type</label>
              <input 
                type="text" 
                name="clothing_type" 
                value={newItem.clothing_type} 
                onChange={handleChange} 
                placeholder="Enter clothing type" 
                required 
              />

              <label>For Weather</label>
              <input 
                type="text" 
                name="for_weather" 
                value={newItem.for_weather} 
                onChange={handleChange} 
                placeholder="Enter suitable weather" 
                required 
              />

              <label>Color</label>
              <input 
                type="text" 
                name="color" 
                value={newItem.color} 
                onChange={handleChange} 
                placeholder="Enter color" 
                required 
              />

              <label>Size</label>
              <input 
                type="text" 
                name="size" 
                value={newItem.size} 
                onChange={handleChange} 
                placeholder="Enter size" 
                required 
              />

              <label>Any Other Tags</label>
              <input 
                type="text" 
                name="tags" 
                value={newItem.tags} 
                onChange={handleChange} 
                placeholder="Enter tags" 
                required 
              />

              <label>Image URL</label>
              <input 
                type="text" 
                name="image_url" 
                value={newItem.image_url} 
                onChange={handleChange} 
                placeholder="Enter image URL" 
                required 
              />
            </form>
            <button onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      )}
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
    item_id: PropTypes.number.isRequired,
    clothing_type: PropTypes.string.isRequired,
    // Add other expected properties here if needed
  })).isRequired
};

export default Wardrobe;
