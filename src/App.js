// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wardrobe from './components/Wardrobe';
import OutfitSuggestions from './components/OutfitSuggestions';
import FiveDayWeather from './components/FiveDayWeather';
import HelloUser from './components/profile/HelloUser';
import UserInfo from './components/profile/UserInfo';
import UserFashionPreferences from './components/profile/UserFashionPreferences';
import Login from './components/Login';
import Register from './components/Register'; 
import Home from './components/Home';
import ECommerce from './components/ECommerce';
import axios from 'axios';

import { users, wardrobeItems, ecommerceItems, weatherData, outfitSuggestions, fashionTrends } from './mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/${userId}`); 
      setUserInfo(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            {!isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData} />
            ) : (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <main className="main-content">
                  <Switch>
                    <Route path="/wardrobe">
                      <Wardrobe items={wardrobeItems} />
                    </Route>
                    <Route path="/shopping">
                      <ECommerce items={ecommerceItems} />
                    </Route>
                    <Route path="/outfits">
                      <div>
                        <FiveDayWeather />
                        <OutfitSuggestions outfits={outfitSuggestions} />
                      </div>
                    </Route>
                    <Route path="/profile">
                      <div className="profile-section">
                        {loading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error: {error}</p>
                        ) : (
                          userInfo && ( // Ensure userInfo is not null
                            <>
                              <HelloUser user={userInfo} />
                              <UserInfo initialUserInfo={userInfo} />
                              <UserFashionPreferences initialPreferences={userInfo.preferences || []} /> 
                            </>
                          )
                        )}
                      </div>
                    </Route>
                    <Route path="/" exact>
                      <Home />
                    </Route>
                  </Switch>
                </main>
                <Footer />
              </>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
