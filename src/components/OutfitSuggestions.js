import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/OutfitSuggestions.css';
import axios from 'axios';
import { suggestOutfit } from '../api/api';

const OutfitSuggestions = ({ outfits, setOutfits, customOutfits, setCustomOutfits, wardrobeItems, weather, occasion }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isOutfitModal, setIsOutfitModal] = useState(false);
  const [generatedOutfits, setGeneratedOutfits] = useState([]);

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
      setOutfits((prevOutfits) => prevOutfits.filter((suggestion) => suggestion.suggestion_id !== suggestion_id));
      alert("Outfit suggestion deleted successfully.");
    } catch (err) {
      console.error("Failed to delete outfit suggestion:", err);
      alert("Failed to delete outfit suggestion.");
    }
  };

  // Generate outfits based on weather and occasion
  useEffect(() => {
    if (weather && occasion && wardrobeItems.length > 0) {
      const suggestions = suggestOutfit(weather, occasion, wardrobeItems);
      setGeneratedOutfits(suggestions);
    }
  }, [weather, occasion, wardrobeItems]);

  const renderOutfitSuggestions = () => {
    if (outfits.length === 0 && generatedOutfits.length === 0) {
      return <p>No outfit suggestions available. Please generate one!</p>;
    }

    return (
      <div className="outfit-list">
        {generatedOutfits.length > 0 && (
          <div className="generated-outfits">
            <h3>Generated Outfits</h3>
            {generatedOutfits.map((item, index) => (
              <div key={index} className="clothing-item">
                <img src={item.image_url} alt={item.clothing_type} />
                <p>{item.product_name}</p>
              </div>
            ))}
          </div>
        )}
        {outfits.map((outfitSuggestion) => (
          <div key={outfitSuggestion.suggestion_id} className="outfit-card">
            <h3>Suggestion ID: {outfitSuggestion.suggestion_id}</h3>
            <p>
              <strong>Date Suggested:</strong>{" "}
              {new Date(outfitSuggestion.date_suggested).toLocaleString()}
            </p>
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
                    {outfit.map((component) => (
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
          <div
            key={index}
            className="custom-outfit"
            onClick={() => {
              openOutfitModal(customOutfit);
            }}
          >
            <div className="outfit-info">
              <p>
                <strong>Occasion:</strong> {customOutfit.occasion.join(", ")}
              </p>
              <p>
                <strong>Weather:</strong> {customOutfit.for_weather}
              </p>
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
            <p>
              <strong>Name:</strong> {selectedItem.product_name}
            </p>
            <div>
              <strong>Buy Links:</strong>
              <ul>
                {selectedItem.eBay_link.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{`Buy Option ${idx + 1}`}</a>
                  </li>
                ))}
              </ul>
            </div>
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}

      {/* Outfit Modal for Custom Outfits */}
      {isOutfitModal && selectedOutfit && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Custom Outfit Details</h2>
            <p>
              <strong>Occasion:</strong> {selectedOutfit.occasion.join(", ")}
            </p>
            <p>
              <strong>Weather:</strong> {selectedOutfit.for_weather}
            </p>
            <div className="custom-outfit-images">
              {selectedOutfit.clothings.map((clothingId) => {
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
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.array.isRequired,
  setOutfits: PropTypes.func.isRequired,
  customOutfits: PropTypes.array.isRequired,
  setCustomOutfits: PropTypes.func.isRequired,
  wardrobeItems: PropTypes.array.isRequired,
  weather: PropTypes.string.isRequired,
  occasion: PropTypes.string.isRequired,
};

export default OutfitSuggestions;
