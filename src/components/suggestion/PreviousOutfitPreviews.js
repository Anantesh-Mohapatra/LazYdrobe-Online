import React from 'react';
import PropTypes from 'prop-types';

const PreviousOutfitPreviews = ({ outfits, currentOutfitIndex, setCurrentOutfitIndex }) => {
  return (
    <div className="outfit-preview">
      {outfits.map((outfit, index) => (
        outfit.image_url ? (
          <img
            key={outfit.suggestion_id}
            src={outfit.image_url}
            alt="Outfit Preview"
            className={`outfit-preview-image ${index === currentOutfitIndex ? 'active' : ''}`}
            onClick={() => setCurrentOutfitIndex(index)}
          />
        ) : (
          <div
            key={outfit.suggestion_id}
            className={`outfit-preview-placeholder ${index === currentOutfitIndex ? 'active' : ''}`}
            onClick={() => setCurrentOutfitIndex(index)}
          >
            {index + 1}
          </div>
        )
      ))}
    </div>
  );
};

PreviousOutfitPreviews.propTypes = {
  outfits: PropTypes.array.isRequired,
  currentOutfitIndex: PropTypes.number.isRequired,
  setCurrentOutfitIndex: PropTypes.func.isRequired,
};

export default PreviousOutfitPreviews;