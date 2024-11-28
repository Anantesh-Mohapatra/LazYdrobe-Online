// src/components/Home.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import '../App.css'; // Ensure this import is present
import './styling/Home.css';
import FiveDayWeather from './FiveDayWeather';
import HotTrends from './HotTrends';
import HotTrendsExplanation from './HotTrendsExplanation';

const Home = ({ userInfo, weather, updateWeather }) => {
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    const isCardClosed = localStorage.getItem('getStartedCardClosed');
    if (isCardClosed) {
      setShowGetStarted(false);
    }
  }, []);

  const handleCloseCard = () => {
    localStorage.setItem('getStartedCardClosed', 'true');
    setShowGetStarted(false);
  };

  const handleResetMemory = () => {
    localStorage.removeItem('getStartedCardClosed');
    setShowGetStarted(true);
  };

  const handleTrendClick = (trend) => {
    setSelectedTrend(trend);
  };

  const handleCloseTrendExplanation = () => {
    setSelectedTrend(null);
  };

  const hasFashionPreferences = userInfo && userInfo.fashionPreferences && userInfo.fashionPreferences.length > 0;
  const hasWardrobeItems = userInfo && userInfo.wardrobeItems && userInfo.wardrobeItems.length > 0;
  const hasGeneratedOutfits = userInfo && userInfo.generatedOutfits && userInfo.generatedOutfits.length > 0;

  return (
    <div className="home-page">
      <div className="home">
        <h1 className="welcome-message">
          {userInfo ? `Welcome Back, ${userInfo.username}!` : 'Welcome to LazYdrobe!'}
        </h1>
        <hr className="rounded" />
        <div className="intro-text">
          {userInfo ? (
            <>
              It's great to have you back, <span className="username">{userInfo.username}</span>! Ready to organize your wardrobe and discover stylish outfits tailored just for you?
              {/* ... rest of the content ... */}
            </>
          ) : (
            <>
              {/* Content for non-logged-in users */}
            </>
          )}
        </div>
        {userInfo && showGetStarted && (
          <div className="get-started-card">
            <button className="close-button" onClick={handleCloseCard}>✖</button>
            <h2>Get Started</h2>
            <ul>
              {!hasFashionPreferences && (
                <li>
                  <Link to="/profile">Add your fashion preferences</Link> to get personalized outfit suggestions.
                </li>
              )}
              {!hasWardrobeItems && (
                <li>
                  <Link to="/wardrobe">Add items to your wardrobe</Link> to start organizing your outfits.
                </li>
              )}
              {!hasGeneratedOutfits && (
                <li>
                  <Link to="/outfits">Use the DressMeUp feature</Link> to generate stylish outfits.
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="hot-trends-container">
          <HotTrends onTrendClick={handleTrendClick} />
        </div>
        <FiveDayWeather 
          userInfo={userInfo} 
          weather={weather}
          updateWeather={updateWeather}
        />
        {selectedTrend && (
          <HotTrendsExplanation 
            trend={selectedTrend} 
            onClose={handleCloseTrendExplanation} 
          />
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    fashionPreferences: PropTypes.array,
    wardrobeItems: PropTypes.array,
    generatedOutfits: PropTypes.array,
    // Add other user info properties if needed
  }),
};

Home.defaultProps = {
  userInfo: null,
};

export default Home;
