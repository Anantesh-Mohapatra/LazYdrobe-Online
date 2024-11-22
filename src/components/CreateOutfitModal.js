// src/components/CreateOutfitModal.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styling/CreateOutfitModal.css';
import axios from 'axios';

const CreateOutfitModal = ({ closeModal, wardrobeItems, userInfo, setOutfitSuggestions }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSelectItem = (item_id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item_id)
        ? prevSelected.filter((id) => id !== item_id)
        : [...prevSelected, item_id]
    );
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      setError("Please select at least one clothing item.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/outfit/', {
        user_id: userInfo.user_id,
        clothings: selectedItems,
        occasion: [], // You can add occasion selection if needed
        for_weather: null, // Or derive from weather data
      });

      setOutfitSuggestions([response.data, ...outfitSuggestions]); // Assuming you have access to outfitSuggestions
      setError(null);
      alert("Outfit created successfully!");
      closeModal();
    } catch (err) {
      console.error("Failed to create outfit:", err);
      setError(err.response?.data?.detail || "Failed to create outfit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Outfit</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="wardrobe-items">
          {wardrobeItems.map((item) => (
            <div key={item.item_id} className="wardrobe-item">
              <img src={item.image_url} alt={item.clothing_type} />
              <p>{item.clothing_type}</p>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.item_id)}
                  onChange={() => toggleSelectItem(item.item_id)}
                />
                Select
              </label>
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create Outfit'}
          </button>
          <button onClick={closeModal} className="close-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CreateOutfitModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  wardrobeItems: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
};

export default CreateOutfitModal;
