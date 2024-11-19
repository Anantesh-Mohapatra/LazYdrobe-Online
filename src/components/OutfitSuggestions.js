import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/OutfitSuggestions.css';
import axios from 'axios';

const OutfitSuggestions = ({ outfits, setOutfits, wardrobeItems, weather, occasion, loading, setLoading, userInfo }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [generatedOutfits, setGeneratedOutfits] = useState([]);

  const handleBuyClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
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

  const suggestOutfit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/outfits/suggest', { user_id: userInfo.user_id });
      setOutfits([response.data, ...outfits]);
      alert("Outfit suggested successfully!");
    } catch (err) {
      console.error("Error suggesting outfit:", err);
      alert("Failed to suggest outfit.");
    } finally {
      setLoading(false);
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
        <div className="suggestion-container">
          {outfits.map((outfitSuggestion) => (
            <div key={outfitSuggestion.suggestion_id} className='outfit-card'>
              <h3>Suggestion ID: {outfitSuggestion.suggestion_id}</h3>
              <p>
                <strong>Date Suggested:</strong>{" "}
                {new Date(outfitSuggestion.date_suggested).toLocaleString()}
              </p>
              <button
                key={outfitSuggestion.suggestion_id}
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
      </div>
    );
  };

  return (
    <div className="outfit-suggestions">
      <h2>Outfit Suggestions</h2>
      <button
        onClick={suggestOutfit}
        disabled={loading}
        className={`${outfits.length === 0 && generatedOutfits.length === 0 
                      ? 'big-glowing-button' 
                      : 'small-glowing-button'}`}
      >
        {loading ? 'Suggesting...' : 'Suggest New Outfit'}
      </button>
      {renderOutfitSuggestions()}

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
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.array.isRequired,
  setOutfits: PropTypes.func.isRequired,
  wardrobeItems: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default OutfitSuggestions;
