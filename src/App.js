// src/App.js

import React, { useState, useEffect } from 'react';
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

import { ecommerceItems, weatherData, outfitSuggestions, fashionTrends } from './mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wardrobeItems, setWardrobeItems] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      fetchWardrobeItems();
    }
  }, [isLoggedIn, userInfo]);
  

  // Handling User Data

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
      history.push('/');
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
  
  // Handling Wardrobe Items Data

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
      console.log("Added wardrobe item")
      console.log(response.data)
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
      console.log(response)
      console.log("Obtained wardrobe items")
      setError(null);
    } catch (err) {
      console.error("Failed to get wardrobe item:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateWardrobeItem = async (item_id, updatedItem) => {
    setLoading(true);
    try {
      console.log("Updating item: ", item_id);
      const response = await axios.put(`/wardrobe_items/${item_id}`, updatedItem);

      console.log("Update response:", response.data);
      
      // Update wardrobeItems state with the updated item
      setWardrobeItems((prevItems) =>
        prevItems.map((item) => (item.item_id == item_id ? response.data : item))
      );
      setError(null);
      alert("Wardrobe item has been updated successfully.");
      return 0
    } catch (err) {
      console.error("Failed to edit wardrobe item:", err);
      return -1
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWardrobeItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`/wardrobe_items/${itemId}`);
      setWardrobeItems((prevItems) => prevItems.filter((item) => item.item_id !== itemId));
      setError(null);
      alert("Wardrobe item has been deleted successfully.");
    } catch (err) {
      console.error("Failed to delete wardrobe item:", err);
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
                <Login setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData}/>
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
                        onUpdate={handleUpdateWardrobeItem}
                        onDelete={handleDeleteWardrobeItem} 
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
