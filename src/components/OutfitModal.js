// OutfitModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styling/OutfitModal.css';

Modal.setAppElement('#root');

const OutfitModal = ({ isOpen, onRequestClose, onCreate, unselectAll, onUpdate, onDelete, clothings = [], wardrobeItems = [], outfit = {}}) => {
  const [occasion, setOccasion] = useState('');
  const [for_weather, setForWeather] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setOccasion(outfit?.occasion.join(', ') || ''); // Ensure occasion is set without unnecessary transformations
      setForWeather(outfit?.for_weather || '');
    }
  }, [isOpen]); // Only reset when modal opens

  const handleOccasionChange = (e) => {
    const value = e.target.value;
    console.log('Occasion Input:', value); // Debug log
    setOccasion(value); // Update state
    console.log('Updated Occasion State:', occasion); // Debug to confirm
  };

  const handleCreate = async () => {
    if (occasion && for_weather) {
      try {
        await onCreate({ 
          occasion: occasion.split(',').map(s => s.trim()), 
          for_weather, 
          clothings 
        });
        handleClose();
        unselectAll();
      } catch (err) {
        setError('Failed to add outfit. Please try again.');
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  const handleClear = () => {
    setOccasion('');
    setForWeather('');
    setError(null);
  };
  
  const handleClose = () => {
    handleClear();
    onRequestClose();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (occasion && for_weather) {
      try {
        console.log('Updating:', { occasion, for_weather }); // Debug log
        await onUpdate(outfit.outfit_id, { occasion, for_weather }); 
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
    try {
      await onDelete(outfit.outfit_id);
      handleClose();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const selectedItemImgs = (ids, items) => {
    return ids.map(id => {
      const theItem = items.find(item => item.item_id === id);
      if (theItem) {
        return {
          image_url: theItem?.image_url || '',
          alt: theItem?.clothing_type || 'No name available'
        };
      }
      return null;
    }).filter(Boolean);
  };

  const clothingImgs = selectedItemImgs(clothings, wardrobeItems);

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} contentLabel="Outfit Modal" className="modal-overlay">
      <div className='modal-content'>
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>{outfit?.outfit_id ? 'Edit' : 'Add'} Outfit</h2>
        {error && <p className="error">{error}</p>}
        <form>
          <label>Occasion</label>
          <input 
            type="text" 
            value={occasion || ''} // Default to empty string
            onChange={handleOccasionChange}
            placeholder="Enter occasion (e.g., formal, casual)" 
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

          <div className='img-grid'>
            {clothingImgs.map((item) => (
                <div key={item.image_url}>
                  <img src={item.image_url} alt={item.alt} />
                </div>
            ))}
          </div>

          <div className='button-group'>
            {outfit?.outfit_id ? (
              <button type="button" className="edit-button" onClick={handleUpdate}>Edit</button>
            ) : (
              <button type="button" className="add-button" onClick={handleCreate}>Add</button>
            )}
            <button type="button" className='clear-button' onClick={handleClear}>Clear</button>
          </div>
          {outfit?.outfit_id && (
            <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default OutfitModal;
