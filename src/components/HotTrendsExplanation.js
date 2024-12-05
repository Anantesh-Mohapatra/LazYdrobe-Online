import React from 'react';
import PropTypes from 'prop-types';
import './styling/HotTrendsExplanation.css';

const HotTrendsExplanation = ({ trend, onClose }) => {
  return (
    <div className="hot-trends-explanation-overlay">
      <div className="hot-trends-explanation">
        <button className="close-button" onClick={onClose}>✖</button>
        <div className="trend-content">
          {/* <div className="trend-image">
            Placeholder for image
          </div> */}
          <div className="trend-details">
            <h2>{trend.trend_name.replace(/^\d+\.\s*/, '')}</h2>
            <p>{trend.trend_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

HotTrendsExplanation.propTypes = {
  trend: PropTypes.shape({
    trend_id: PropTypes.number.isRequired,    // Updated to match the actual prop
    trend_name: PropTypes.string.isRequired,  // Updated to match the actual prop
    trend_description: PropTypes.string.isRequired,  // Updated to match the actual prop
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HotTrendsExplanation;
