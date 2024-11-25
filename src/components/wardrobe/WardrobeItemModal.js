import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaEdit, FaTrash, FaEraser, FaPlus } from 'react-icons/fa'; // Import the new icon
import './WardrobeItemModal.css';

Modal.setAppElement('#root');

const WardrobeItemModal = ({ isOpen, onRequestClose, onAdd, onUpdate, onDelete, item = {}, errorFromAbove }) => {
  const [clothing_type, setClothingType] = useState(item?.clothing_type || '');
  const [for_weather, setForWeather] = useState(item?.for_weather || 'All year around');
  const [color, setColor] = useState(item?.color?.join(', ') || '');
  const [size, setSize] = useState(item?.size || '');
  const [tags, setTags] = useState(item?.tags?.join(', ') || '');
  const [image_url, setImageUrl] = useState(item?.image_url || '');
  const [error, setError] = useState(errorFromAbove || null);
  const [isEdited, setIsEdited] = useState(false);
  const [isClearable, setIsClearable] = useState(false);
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  useEffect(() => {
    // Reset form fields when modal is opened or closed, if `item` is null
    if (!isOpen) {
      handleClear();
    } else if (item) {
      setError(errorFromAbove || null);
      setClothingType(item.clothing_type || '');
      setForWeather(item.for_weather || '');
      setColor(item.color.join(', ') || '');
      setSize(item.size || '');
      setTags(item.tags.join(', ') || '');
      setImageUrl(item.image_url || '');
    }
  }, [isOpen, item]); 

  useEffect(() => {
    setIsEdited(
      clothing_type !== item?.clothing_type ||
      for_weather !== item?.for_weather ||
      color !== item?.color?.join(', ') ||
      size !== item?.size ||
      tags !== item?.tags?.join(', ') ||
      image_url !== item?.image_url
    );
  }, [clothing_type, for_weather, color, size, tags, image_url, item]);

  useEffect(() => {
    setIsClearable(
      clothing_type !== '' ||
      for_weather !== '' ||
      color !== '' ||
      size !== '' ||
      tags !== '' ||
      image_url !== ''
    );
  }, [clothing_type, for_weather, color, size, tags, image_url]);

  useEffect(() => {
    setIsAddDisabled(
      !clothing_type || !for_weather || !color || !size || !image_url
    );
  }, [clothing_type, for_weather, color, size, image_url]);

  const handleAdd = async () => {
    if (clothing_type && for_weather && color && size && image_url) {
      if (clothing_type.length < 3) {
        setError('Clothing type must be at least 3 characters long.');
        return;
      }
      try {
        const result = await onAdd({ 
          clothing_type, 
          for_weather, 
          size, 
          image_url,
          color: color.split(',').map(s => s.trim()), 
          tags: tags.split(',').map(s => s.trim())
        });
        handleClose();
      } catch (err) {
        setError('Failed to add item');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (clothing_type && for_weather && color && size && tags && image_url) {
      try {
        const result = await onUpdate(item.item_id, {
          clothing_type, 
          for_weather, 
          color: color.split(',').map(s => s.trim()), 
          size, 
          tags: tags.split(',').map(s => s.trim()), 
          image_url
        }); 
        handleClose();
      } catch (err) {
        setError('Failed to edit item');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    
    const result = await onDelete([item.item_id]);
    handleClose();
  };

  const handleClear = () => {
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
        <div className="modal-header">
          <h2>{item?.item_id ? 'Edit' : 'Add'} Wardrobe Item</h2>
          <button className="close-button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <form>
          <label>Clothing Type</label>
          <input 
            type="text" 
            value={clothing_type} 
            onChange={(e) => setClothingType(e.target.value)} 
            placeholder="Enter clothing type (e.g., tshirt)" 
            minLength={3}
            maxLength={50}
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
            minLength={1}
            maxLength={50}
            required
          />

          <label>Tags</label>
          <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Enter tags (e.g., casual, short)" 
          />

          <label>Image URL</label>
          <input 
            type="text" 
            value={image_url} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="Enter image URL" 
            required
            maxLength={500}
          />

          <div className='button-group'>
            {item?.item_id ? (
              <button type="button" className={`edit-button ${!isEdited ? 'greyed-out' : ''}`} onClick={handleUpdate} disabled={!isEdited}>
                <FaEdit style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Edit
              </button>
            ) : (
              <button type="button" className={`add-button ${isAddDisabled ? 'greyed-out' : ''}`} onClick={handleAdd} disabled={isAddDisabled}>
                <FaPlus style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Add
              </button>
            )}
            <button type="button" className={`clear-button ${!isClearable ? 'greyed-out' : ''}`} onClick={handleClear} disabled={!isClearable}>
              <FaEraser style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Clear
            </button>
            {item?.item_id && (
              <button type="button" className="delete-button" onClick={handleDelete}>
                <FaTrash style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WardrobeItemModal;