// OutfitModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styling/OutfitModal.css';

Modal.setAppElement('#root');

const OutfitModal = ({ isOpen, onRequestClose, onCreate, clothings = {} }) => {
  const [occasion, setOccasion] = useState('');
  const [for_weather, setForWeather] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      handleClear();
    }
  }, [isOpen, clothings]); 

  const handleCreate = async () => {
    if (occasion && for_weather) {
      try {
        await onCreate({ occasion: occasion.split(',').map(s => s.trim()), 
          for_weather, clothings });
        handleClose();
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

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} contentLabel="Outfit Modal" className="modal-overlay">
      <div className='modal-content'>
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>Add Outfit</h2>
        {error && <p className="error">{error}</p>}
        <form>
          <label>Occasion</label>
          <input 
            type="text" 
            value={occasion} 
            onChange={(e) => setOccasion(e.target.value)} 
            placeholder="Enter occassion (e.g., formal, casual)" 
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
            {clothings?.map((item, index) => (
              <img key={index} src={item?.image_url} alt={item?.alt} />
            ))}
          </div>

          <div className='button-group'>
            <button type="button" className="create-button" onClick={handleCreate}>Create</button>
            <button type="button" className='clear-button' onClick={handleClear}>Clear</button>
          </div>
          {/* <button type="button" className="delete-button" onClick={handleDelete}>Delete</button> */}
        </form>
      </div>
    </Modal>
  );
};

export default OutfitModal;
