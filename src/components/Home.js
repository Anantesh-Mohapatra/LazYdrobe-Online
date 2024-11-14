// src/components/Home.js

import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './styling/Home.css';
import FiveDayWeather from './FiveDayWeather'; // Import the component

const Home = ({ userInfo }) => {
  return (
    <div className="home-page">
      <div className="home">
        {/* Personalized Welcome Message */}
        <h1>
          {userInfo ? `Welcome Back, ${userInfo.username}!` : 'Welcome to LazYdrobe!'}
        </h1>
        <hr className="rounded" />
        
        {/* Personalized Intro Text */}
        <div className="intro-text">
          {userInfo ? (
            <>
              It's great to have you back, {userInfo.username}! Ready to organize your wardrobe and discover stylish outfits tailored just for you?
              <br/><br/>
              <strong>Here’s what you can do today:</strong>
              <ul>
                <li>Browse your wardrobe to see all your items.</li>
                <li>Get personalized outfit suggestions based on the latest fashion trends and upcoming weather.</li>
                <li>Shop for new clothing items to complete your collection.</li>
              </ul>
              Dive in and make your wardrobe management effortless and fun!
            </>
          ) : (
            <>
              Trouble picking outfits for the upcoming days?<br/>
              Too much clothes to keep track of?<br/>
              Look no further! LazYdrobe is here to assist you in keeping up with fashion trends and weather.
              <br/><br/>
              Simply upload items in your wardrobe so that we can suggest future outfits based on the weather conditions and the current fashion trends for you while providing clothing suggestions to fill in the gaps in your wardrobe.
            </>
          )}
        </div>

        {/* Weather Component */}
        <FiveDayWeather /> {/* Add the weather component here */}
      </div>
    </div>
  );
};

// Define PropTypes for type checking
Home.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    // Add other user info properties if needed
  }),
};

// Define default props in case userInfo is not provided
Home.defaultProps = {
  userInfo: null,
};

export default Home;
