// src/components/LoadingPopup.js

import React from 'react';
import PropTypes from 'prop-types';
import './styling/LoadingPopup.css';

const LoadingPopup = ({ timeLeft }) => {
  return (
    <div className="loading-popup">
      <div className="loading-content">
        <p>Generating your outfit...</p>
        <p>Time remaining: {timeLeft} seconds</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

LoadingPopup.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};

export default LoadingPopup;
