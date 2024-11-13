// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wardrobe from './components/Wardrobe';
import OutfitSuggestions from './components/OutfitSuggestions';
import Profile from './components/profile/Profile';
import Login from './components/Login';
import Register from './components/Register'; 
import Home from './components/Home';
import axios from 'axios';

import { wardrobeItems, ecommerceItems, weatherData, outfitSuggestions, fashionTrends } from './mockData';
import WardrobeItem from './components/WardrobeItem';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wardrobeItems, setWardrobeItems] = useState([]);

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

  const handleAddWardrobeItem = async(newWardrobeItem) => {
    try {
      const wardrobeItemToAdd = {
        ...newWardrobeItem,
        user_id: userInfo.user_id,
        // Convert color and tags into JSON array 
        color: Array.isArray(newWardrobeItem.color)
          ? newWardrobeItem.color
          : newWardrobeItem.color.split(',').map((c) => c.trim()),
        tags: Array.isArray(newWardrobeItem.tags)
          ? newWardrobeItem.tags
          : newWardrobeItem.tags.split(',').map((tag) => tag.trim())
      }
      const response = await axios.post('/wardrobe_item/', wardrobeItemToAdd);

      setWardrobeItems([...wardrobeItems, response.data]);
      console.log(response)
      return 0
    } catch (err) {
      console.error("Failed to add wardrobe item:", err);
      return -1
    }
  }

  const fetchWardrobeItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/wardrobe_items/user/${userInfo.user_id}`);
      setWardrobeItems(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }

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
                <Login setIsLoggedIn={setIsLoggedIn} 
                fetchUserData={fetchUserData} 
                fetchWardrobeItems={fetchWardrobeItems}/>
            ) : (
              <>
                {/* When logged in, display app functions */}
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <main className="main-content">
                  <Switch>
                    <Route path="/wardrobe">
                      <Wardrobe 
                        items={wardrobeItems} 
                        onAdd={handleAddWardrobeItem}
                      />
                    </Route>
                    {/* <Route path="/shopping">
                      <ECommerce items={ecommerceItems} />
                    </Route> */} {/* Removed */}
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
