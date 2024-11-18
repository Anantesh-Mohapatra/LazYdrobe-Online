import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/OutfitSuggestions.css';
import axios from 'axios';

const OutfitSuggestions = ({ outfits, setOutfits, customOutfits, setCustomOutfits, wardrobeItems }) => {
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isOutfitModal, setIsOutfitModal] = useState(false);

  const handleBuyClick = (item) => {
    setSelectedItem(item);
  };

  const openOutfitModal = (outfit) => {
    setSelectedOutfit(outfit);
    setIsOutfitModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsOutfitModal(false);
    setSelectedOutfit(null);
  };

  const handleDeleteSuggestion = async (suggestion_id) => {
    if (!window.confirm("Are you sure you want to delete this outfit suggestion?")) {
      return;
    }
  
    try {
      await axios.delete(`/outfits/suggestions/${suggestion_id}`);
      setOutfits(prevOutfits => prevOutfits.filter(suggestion => suggestion.suggestion_id !== suggestion_id));
      alert("Outfit suggestion deleted successfully.");
    } catch (err) {
      console.error("Failed to delete outfit suggestion:", err);
      alert("Failed to delete outfit suggestion.");
    }
  };

  // Handle empty outfits gracefully
  const renderOutfitSuggestions = () => {
    if (outfits.length === 0) {
      return <p>No outfit suggestions available. Please generate one!</p>;
    }

    return (
      <div className="outfit-list">
        {outfits.map(outfitSuggestion => (
          <div key={outfitSuggestion.suggestion_id} className="outfit-card">
            <h3>Suggestion ID: {outfitSuggestion.suggestion_id}</h3>
            <p><strong>Date Suggested:</strong> {new Date(outfitSuggestion.date_suggested).toLocaleString()}</p>
            <button
              className="delete-button"
              onClick={() => handleDeleteSuggestion(outfitSuggestion.suggestion_id)}
            >
              Delete Suggestion
            </button>
            <div className="outfit-details">
              {outfitSuggestion.outfit_details.map((outfit, index) => (
                <div key={index} className="outfit-components">
                  <h4>Outfit {index + 1}</h4>
                  <div className="clothing-items">
                    {outfit.map(component => (
                      <div key={component.item_id} className="clothing-item">
                        <img src={component.image_url} alt={component.clothing_type} />
                        <p>{component.product_name}</p>
                        <button onClick={() => handleBuyClick(component)}>Buy</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomOutfits = () => {
    if (customOutfits.length === 0) {
      return <p>No custom outfits created.</p>;
    }

    return (
      <div className="custom-outfits-container">
        {customOutfits.map((customOutfit, index) => (
          <div key={index} className="custom-outfit" onClick={() => {openOutfitModal(customOutfit)}}>
            <div className="outfit-info">
              <p><strong>Occasion:</strong> {customOutfit.occasion.join(", ")}</p>
              <p><strong>Weather:</strong> {customOutfit.for_weather}</p>
            </div>
            <div className="outfit-images">
              {customOutfit.clothings.map((clothingId) => {
                const wardrobeItem = wardrobeItems.find(
                  (item) => item.item_id === clothingId
                );
                return wardrobeItem ? (
                  <div key={clothingId} className="clothing-item">
                    <p>{wardrobeItem.clothing_type}</p>
                    <img
                      src={wardrobeItem.image_url}
                      alt={wardrobeItem.clothing_type}
                    />
                  </div>
                ) : (
                  <p key={clothingId}>Wardrobe Missing Item</p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="outfit-suggestions">
      <h2>Outfit Suggestions</h2>
      {renderOutfitSuggestions()}

      <h2>Custom Outfits</h2>
      {renderCustomOutfits()}

      {/* Purchase Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Purchase {selectedItem.clothing_type}</h2>
            <img src={selectedItem.image_url} alt={selectedItem.clothing_type} />
            <p><strong>Name:</strong> {selectedItem.product_name}</p>
            <div>
              <strong>Buy Links:</strong>
              <ul>
                {selectedItem.eBay_link.map((link, idx) => (
                  <li key={idx}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{`Buy Option ${idx + 1}`}</a>
                  </li>
                ))}
              </ul>
            </div>
            <button className="close-button" onClick={handleCloseModal}>X</button>
          </div>
        </div>
      )}

      {/* Outfit Modal for Custom Outfits */}
      {isOutfitModal && selectedOutfit && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Custom Outfit Details</h2>
            <p><strong>Occasion:</strong> {selectedOutfit.occasion.join(", ")}</p>
            <p><strong>Weather:</strong> {selectedOutfit.for_weather}</p>
            <div className="custom-outfit-images">
              {selectedOutfit.clothings.map((clothingId) => {
                const wardrobeItem = wardrobeItems.find(
                  (item) => item.item_id === clothingId
                );
                return wardrobeItem ? (
                  <div key={clothingId} className="clothing-item">
                    <p>{wardrobeItem.clothing_type}</p>
                    <img src={wardrobeItem.image_url} alt={wardrobeItem.clothing_type} />
                  </div>
                ) : (
                  <p key={clothingId}>Wardrobe Missing Item</p>
                );
              })}
            </div>
            <button className="close-button" onClick={handleCloseModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.arrayOf(PropTypes.shape({
    suggestion_id: PropTypes.number.isRequired,
    outfit_details: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      clothing_type: PropTypes.string.isRequired,
      item_id: PropTypes.number.isRequired,
      product_name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      eBay_link: PropTypes.arrayOf(PropTypes.string).isRequired,
    }))).isRequired,
    date_suggested: PropTypes.string.isRequired,
  })).isRequired,

  customOutfits: PropTypes.arrayOf(PropTypes.shape({
    occasion: PropTypes.arrayOf(PropTypes.string).isRequired,
    for_weather: PropTypes.string.isRequired,
    clothings: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,

  wardrobeItems: PropTypes.arrayOf(PropTypes.shape({
    item_id: PropTypes.number.isRequired,
    clothing_type: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    eBay_link: PropTypes.arrayOf(PropTypes.string).isRequired,
    gender: PropTypes.string.isRequired,
  })).isRequired,

  setOutfits: PropTypes.func.isRequired,
  setCustomOutfits: PropTypes.func.isRequired,
};

export default OutfitSuggestions;
