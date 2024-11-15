// src/components/Home.js

import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/Home.css';
import FiveDayWeather from './FiveDayWeather';

const Home = ({ userInfo }) => {
  return (
    <div className="home-page">
      <div className="home">
        <h1>
          {userInfo ? `Welcome Back, ${userInfo.username}!` : 'Welcome to LazYdrobe!'}
        </h1>
        <hr className="rounded" />
        <div className="intro-text">
          {userInfo ? (
            <>
              It's great to have you back, {userInfo.username}! Ready to organize your wardrobe and discover stylish outfits tailored just for you?
              {/* ... rest of the content ... */}
            </>
          ) : (
            <>
              {/* Content for non-logged-in users */}
            </>
          )}
        </div>
        <FiveDayWeather userInfo={userInfo} /> {/* Pass userInfo to FiveDayWeather */}
      </div>
    </div>
  );
};

Home.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    // Add other user info properties if needed
  }),
};

Home.defaultProps = {
  userInfo: null,
};

export default Home;
