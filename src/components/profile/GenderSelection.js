// GenderSelection.js
import React, { useState } from 'react';
import './Profile.css';

const GenderSelection = ({ gender, onGenderChange }) => {
  const [isOtherSelected, setIsOtherSelected] = useState(gender === 'Other');

  const handleGenderClick = (selectedGender) => {
    setIsOtherSelected(selectedGender === 'Other');
    onGenderChange(selectedGender === 'Other' ? '' : selectedGender);
  };

  return (
    <div>
      <label>Gender:</label>
      <div className="gender-buttons">
        <button type="button" className={`gender-button ${gender === 'Male' ? 'active' : ''}`} onClick={() => handleGenderClick('Male')}>Male</button>
        <button type="button" className={`gender-button ${gender === 'Female' ? 'active' : ''}`} onClick={() => handleGenderClick('Female')}>Female</button>
        <button type="button" className={`gender-button ${isOtherSelected ? 'active' : ''}`} onClick={() => handleGenderClick('Other')}>Other</button>
        {isOtherSelected && (
          <input type="text" name="gender" value={gender} onChange={(e) => onGenderChange(e.target.value)} placeholder="Please specify" className="input-field other-input" />
        )}
      </div>
    </div>
  );
};

export default GenderSelection;
