// PreferencesInput.js
import React from 'react';
import './Profile.css';

const PreferencesInput = ({ value, onChange }) => (
  <label>
    Fashion Preferences:
    <input type="text" name="preferences" value={value} onChange={onChange} placeholder="e.g., Casual, Formal" className="input-field" required />
  </label>
);

export default PreferencesInput;
