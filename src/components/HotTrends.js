import React, { useEffect, useState } from 'react'; 
import PropTypes from 'prop-types';
import axios from 'axios';
import './styling/HotTrends.css';

const HotTrends = ({ onTrendClick }) => {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get('/fashion-trends/latest');
        setTrends(response.data);
        console.log(response)
      } catch (err) {
        console.error('Error fetching trends:', err);
        setError('Unable to fetch trends. Please try again later.');
      }
    };

    fetchTrends();
  }, []);

  if (error) {
    return <div className="hot-trends error">{error}</div>;
  }

  return (
    <div className="hot-trends">
      <h2>Hot Trends</h2>
      <div className="trends-container">
        {trends.map(trend => (
          <div 
            key={trend.trend_id} 
            className="trend-pill" 
            onClick={() => onTrendClick(trend)}
          >
            {trend.trend_name}
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