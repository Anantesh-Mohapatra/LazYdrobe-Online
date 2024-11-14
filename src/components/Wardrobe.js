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

  const weatherOptions = ["Summer", "Winter", "Rainy", "All Year Around"];

  const filteredItems = items.filter(item =>
    item.clothing_type.toLowerCase().includes(filter.toLowerCase()) &&
    (weatherFilter == '' || weatherFilter == item.for_weather ||
      (weatherFilter == "Other" && !weatherOptions.includes(item.for_weather))
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

  return (
    <div className="wardrobe">
      <div className='on-top'>
        <button onClick={() => openModal(null)} className='add-button'>Add Item</button>
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
      </div>
      
      <div className="wardrobe-grid">
        {filteredItems.map(item => (
          <WardrobeItem 
            key={item.item_id} 
            item={item} 
            onClick={() => {openModal(item)}}
          />
        ))}
      </div>

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
