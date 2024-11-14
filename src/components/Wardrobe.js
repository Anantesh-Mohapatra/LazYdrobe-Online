import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WardrobeItem from './WardrobeItem';
import WardrobeModal from './WardrobeModal'; // Import the new WardrobeModal component
import '../App.css';
import './styling/Wardrobe.css';

const Wardrobe = ({ items, onAdd, onUpdate, onDelete }) => {
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  const filteredItems = items.filter(item =>
    item.clothing_type.toLowerCase().includes(filter.toLowerCase())
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
        <input 
          type="text" 
          placeholder="Filter by clothing type" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => openModal(null)} className='add-button'>Add Item</button>
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
