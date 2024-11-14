import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WardrobeItem from './WardrobeItem';
import '../App.css';
import './styling/Wardrobe.css';

const Wardrobe = ({ items, onAdd }) => {
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
  const [error, setError] = useState(null);

  // Filter wardrobe items based on the `clothing_type`
  const filteredItems = items.filter(item => 
    item.clothing_type.toLowerCase().includes(filter.toLowerCase())
  );

  const handleResetForm = () => {
    setNewItem({
      clothing_type: '',
      for_weather: '',
      color: '',
      size: '',
      tags: '',
      image_url: ''
    });
  };

  // Handler to close the add item pop up
  const handleCloseAdd = () => {
    setAddItem(null);
    handleResetForm();
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
    if (
      !newItem.clothing_type ||
      !newItem.for_weather ||
      !newItem.color ||
      !newItem.size ||
      !newItem.tags ||
      !newItem.image_url
    ) {
      setError('Please fill in all fields.');
      return;
    }
    else {
      setError(null);
    }
    if (onAdd(newItem) == -1)
    {
      setError("Failed to add item")
    }
  };

  return (
    <div className="wardrobe">
      <div className='on-top'>
        <button onClick={() => setAddItem(true)} className='add-button'>Add Item</button>
        <input 
          type="text" 
          placeholder="Filter by clothing type" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
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
            {error && <p className="error">{error}</p>}
            <form>
              <label>Clothing Type</label>
              <input 
                type="text" 
                name="clothing_type" 
                value={newItem.clothing_type} 
                onChange={handleChange} 
                placeholder="Enter clothing type (e.g., tshirt)" 
                required 
              />

              <label>For Weather</label>
              <input 
                type="text" 
                name="for_weather" 
                value={newItem.for_weather} 
                onChange={handleChange} 
                placeholder="Enter suitable weather (e.g., warm)" 
                required 
              />

              <label>Color</label>
              <input 
                type="text" 
                name="color" 
                value={newItem.color} 
                onChange={handleChange} 
                placeholder="Enter color (e.g., blue)" 
                required 
              />

              <label>Size</label>
              <input 
                type="text" 
                name="size" 
                value={newItem.size} 
                onChange={handleChange} 
                placeholder="Enter size (e.g., L)" 
                required 
              />

              <label>Any Other Tags</label>
              <input 
                type="text" 
                name="tags" 
                value={newItem.tags} 
                onChange={handleChange} 
                placeholder="Enter tags (e.g., casual, summer)" 
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
            <button onClick={handleAddItem} className='add-button'>Add Item</button>
            <button onClick={handleResetForm} className='clear-button'>Clear</button>
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
