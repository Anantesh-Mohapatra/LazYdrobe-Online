// OutfitModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styling/OutfitModal.css';

Modal.setAppElement('#root');

const OutfitModal = ({ isOpen, onRequestClose, onCreate, unselectAll, onUpdate, onDelete, clothings = [], wardrobeItems = [], outfit = {}}) => {
  const [occasion, setOccasion] = useState(outfit?.occasion || '');
  const [for_weather, setForWeather] = useState(outfit?.for_weather || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (outfit?.outfit_id) {
      setOccasion(outfit?.occasion?.join(', ') || '');
      setForWeather(outfit?.for_weather || '');
    } else {
      setOccasion('');
      setForWeather('');
    }
  }, [outfit, isOpen]);

  const handleCreate = async () => {
    if (occasion && for_weather ) {
      try {
        await onCreate({ occasion: occasion.split(',').map(s => s.trim()), 
          for_weather, clothings });
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
        console.log(occasion, for_weather)
        const result = await onUpdate(outfit.outfit_id, {occasion, for_weather}); 
        console.log(occasion)
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
    
    const result = await onDelete(outfit.outfit_id);
    handleClose();
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
            value={occasion} 
            onChange={(e) => setOccasion(e.target.value)} 
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
                <div>
                  <img src={item.image_url} alt={item.alt} />
                </div>
            ))}
          </div>

          <div className='button-group'>
            {outfit?.outfit_id ? (
              <button type="button" className="edit-button" onClick={handleUpdate}>Edit</button>
            ) : (
              <button type="button" className="add-button" onClick={handleCreate}>Add</button>
            )}<button type="button" className='clear-button' onClick={handleClear}>Clear</button>
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
