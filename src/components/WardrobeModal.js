// WardrobeModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styling/WardrobeModal.css';

Modal.setAppElement('#root');

const WardrobeModal = ({ isOpen, onRequestClose, onAdd, onUpdate, onDelete, item = {} }) => {
  const [clothing_type, setClothingType] = useState(item?.clothing_type || '');
  const [for_weather, setForWeather] = useState(item?.for_weather || 'All year around');
  const [color, setColor] = useState(item?.color || '');
  const [size, setSize] = useState(item?.size || '');
  const [tags, setTags] = useState(item?.tags || '');
  const [image_url, setImageUrl] = useState(item?.image_url || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset form fields when modal is opened or closed, if `item` is null
    if (!isOpen) {
      handleClear();
    } else if (item) {
      setClothingType(item.clothing_type || '');
      setForWeather(item.for_weather || '');
      setColor(item.color || '');
      setSize(item.size || '');
      setTags(item.tags || '');
      setImageUrl(item.image_url || '');
    }
  }, [isOpen, item]); 

  const handleAdd = async () => {
    if (clothing_type && for_weather && color && size && tags && image_url) {
      const result = await onAdd({clothing_type, for_weather, color, size, tags, image_url});
      
      if (result == -1) {
        setError('Failed to add item');
      } else {
        setError(null);
        handleClose();
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (clothing_type && for_weather && color && size && tags && image_url) {
      const result = await onUpdate(item.item_id, {
        clothing_type, for_weather, color, size, tags, image_url
      });
      
      if (result === -1) {
        setError('Failed to update item');
      } else {
        setError(null);
        handleClose();
      }
    } else {
      setError('Please fill in all fields.');
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    
    const result = await onDelete(item.item_id);
    handleClose();
  };
  

  const handleClear = () => {
    console.log(item);
    setClothingType('');
    setForWeather('');
    setColor('');
    setSize('');
    setTags('');
    setImageUrl('');
    setError(null);
  };
  
  const handleClose = () => {
    handleClear();
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} contentLabel="Wardrobe Item Modal" className="modal-overlay">
      <div className='modal-content'>
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>{item?.item_id ? 'Edit' : 'Add'} Wardrobe Item</h2>
        {error && <p className="error">{error}</p>}
        <form>
          <label>Clothing Type</label>
          <input 
            type="text" 
            value={clothing_type} 
            onChange={(e) => setClothingType(e.target.value)} 
            placeholder="Enter clothing type (e.g., tshirt)" 
            required
          />

          <label>For Weather</label>
          <select
            value={for_weather}
            onChange={(e) => setForWeather(e.target.value)}
            required
          >
            <option value="" disabled>Select weather suitability</option>
            <option value="Other">Other</option>
            <option value="All Year Around">All Year Around</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Rainy">Rainy</option>
            </select>

          <label>Color</label>
          <input 
            type="text" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            placeholder="Enter color (e.g., blue)" 
            required
          />

          <label>Size</label>
          <input 
            type="text" 
            value={size} 
            onChange={(e) => setSize(e.target.value)} 
            placeholder="Enter size (e.g., L)" 
            required
          />

          <label>Any Other Tags</label>
          <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Enter tags (e.g., casual, summer)" 
            required
          />

          <label>Image URL</label>
          <input 
            type="text" 
            value={image_url} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="Enter image URL" 
            required
          />

          <div>
            {item?.item_id ? (
              <button type="button" className="edit-button" onClick={handleUpdate}>Edit</button>
            ) : (
              <button type="button" className="add-button" onClick={handleAdd}>Add</button>
            )}<button type="button" className='clear-button' onClick={handleClear}>Clear</button>
          </div>
          {item?.item_id && (
          <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
        )}
        </form>
      </div>
    </Modal>
  );
};

export default WardrobeModal;
