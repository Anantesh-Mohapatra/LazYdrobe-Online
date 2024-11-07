// OutfitSuggestions.js
import React from 'react';
import '../App.css';
import './styling/OutfitSuggestions.css';

const OutfitSuggestions = ({ outfits }) => {
  console.log("Outfit Suggestions:", outfits);
  return (
    <div className="outfit-suggestions">
      <h2>Outfit Suggestions</h2>
      <div className="outfit-list">
        {outfits.map(outfit => (
          // Use outfit_id as the unique key
          <div key={outfit.outfit_id} className="outfit-card">
            {/* Use the correct properties based on mock data */}
            <h3>{outfit.occasion.type} Outfit</h3>
            <p>Weather: {outfit.for_weather}</p>
            <p>Clothings: {outfit.clothings.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitSuggestions;
