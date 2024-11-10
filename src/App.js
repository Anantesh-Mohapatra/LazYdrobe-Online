// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wardrobe from './components/Wardrobe';
import OutfitSuggestions from './components/OutfitSuggestions';
import FiveDayWeather from './components/FiveDayWeather';
import HelloUser from './components/profile/HelloUser';
import Profile from './components/profile/Profile';
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
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`/users/${userInfo.user_id}`);
      setIsLoggedIn(false);
      setUserInfo(null);
      setError(null);
      alert("Your account has been successfully deleted.");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/users/${userInfo.user_id}`, updatedData);
      setUserInfo(response.data);
      setError(null);
      alert("Your profile has been updated successfully.");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
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
            {/* If not logged in */}
            {!isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData} />
            ) : (
              <>
                {/* When logged in, display app functions */}
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
                      <OutfitSuggestions outfits={outfitSuggestions} />
                    </Route>
                    <Route path="/profile">
                      <div className="profile-section">
                        {loading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p style={{ color: 'red' }}>Error: {error}</p>
                        ) : (
                          userInfo && (
                            <Profile 
                              userInfo={userInfo} 
                              onUpdate={handleUpdateUser} 
                              onDelete={handleDeleteAccount} 
                              loading={loading} 
                              error={error} 
                            />
                          )
                        )}
                      </div>
                    </Route>
                    <Route path="/" exact>
                      <Home userInfo={userInfo} /> {/* Pass userInfo to Home */}
                    </Route>
                    {/* Redirect any unknown routes to home */}
                    <Redirect to="/" />
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
