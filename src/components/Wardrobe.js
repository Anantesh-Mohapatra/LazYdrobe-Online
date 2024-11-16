import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WardrobeItem from './WardrobeItem';
import WardrobeModal from './WardrobeModal'; // Import the new WardrobeModal component
import '../App.css';
import './styling/Wardrobe.css';

const Wardrobe = ({ items, onAdd, onUpdate, onDelete }) => {
  const [filter, setFilter] = useState('');
  const [weatherFilter, setWeatherFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiSelect, setMultiSelect] = useState([]);

  const weatherOptions = ["Summer", "Winter", "Rainy", "All Year Around"];

  const filteredItems = items.filter(item =>
    // Filter by item name
    (item.clothing_type.toLowerCase().includes(filter.toLowerCase()) ||
      // Filter by color
      item.color.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
      // Filter by item tag
      item.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    ) &&
    // Filter by weather
    (weatherFilter === '' || weatherFilter === item.for_weather ||
      (weatherFilter === "Other" && !weatherOptions.includes(item.for_weather))
    )
  );
  
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const toggleSelection = (itemId) => {
    if (multiSelect.includes(itemId)) {
      setMultiSelect(multiSelect.filter(id => id !== itemId));
    } else {
      setMultiSelect([...multiSelect, itemId]);
    }
  };

  const deleteSelectedItems = () => {
    onDelete(multiSelect);
    setMultiSelect([]);
  };

  return (
    <div className="wardrobe">
      <div className='on-top'>
        <button onClick={() => openModal(null)} className='add-button'>Add Item</button>
        
        {/* Filter */}
        <input 
          type="text" 
          placeholder="Filter by clothing type" 
          className="type-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select 
          value={weatherFilter} 
          onChange={(e) => setWeatherFilter(e.target.value)}
          className="weather-filter"
        >
          <option value="">Select weather filter</option>
          <option value="All Year Around">All Year Around</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Rainy">Rainy</option>
          <option value="Other">Other</option>
        </select>

        <button 
          onClick={deleteSelectedItems} 
          className='delete-button' 
          disabled={multiSelect.length == 0}
        >
          Delete Selected
        </button>
      </div>

      {filteredItems.length == 0 ? (
        <p>No items in your wardrobe. Please add one!</p>
      ) : (
        <div className="wardrobe-grid">
          {filteredItems.map(item => (
            <div>
              <WardrobeItem 
                key={item.item_id} 
                item={item} 
                onClick={() => {openModal(item)}}
                isSelected={multiSelect.includes(item.item_id)}
                toggleSelect={toggleSelection}
              />
            </div>
          ))}
        </div>
      )}

      {/* Wardrobe Modal */}
      <WardrobeModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        item={selectedItem}
      />
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
  })).isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Wardrobe;
