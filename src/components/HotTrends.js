
import React from 'react';
import PropTypes from 'prop-types';
import './styling/HotTrends.css';

const trends = [
  { id: 1, name: 'Trend 1', description: 'Description for Trend 1' },
  { id: 2, name: 'Trend 2', description: 'Description for Trend 2' },
  { id: 3, name: 'Trend 3', description: 'Description for Trend 3' },
];

const HotTrends = ({ onTrendClick }) => {
  return (
    <div className="hot-trends">
      <h2>Hot Trends</h2>
      <div className="trends-container">
        {trends.map(trend => (
          <div 
            key={trend.id} 
            className="trend-pill" 
            onClick={() => onTrendClick(trend)}
          >
            {trend.name}
          </div>
        ))}
      </div>
    </div>
  );
};

HotTrends.propTypes = {
  onTrendClick: PropTypes.func.isRequired,
};

export default HotTrends;