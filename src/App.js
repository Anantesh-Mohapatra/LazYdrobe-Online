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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  });
  const [userInfo, setUserInfo] = useState(() => {
    return JSON.parse(localStorage.getItem('userInfo')) || null;
  });
  const [loading, setLoading] = useState(false);

  // Separate error states for different operations
  const [userError, setUserError] = useState(null);
  const [wardrobeError, setWardrobeError] = useState(null);
  const [outfitError, setOutfitError] = useState(null);

  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [outfit, setOutfits] = useState([]);
  const [outfitSuggestions, setOutfitSuggestions] = useState([]);

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      fetchWardrobeItems();
      fetchOutfitSuggestions();
    }
  }, [isLoggedIn, userInfo]);

  const clearLocalStorage = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
  }

  const clearData = () => {
    setIsLoggedIn(null);
    setUserInfo(null);
    setLoading(false);
    setUserError(null);
    setWardrobeError(null);
    setOutfitError(null);
    setWardrobeItems([]);
    setOutfitSuggestions([]);
    setWeather([]);
  };

  // Handling User Account Management
  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/${userId}`);
      handleLogin(response.data)
      setUserError(null);
    } catch (err) {
      setUserError(err.response?.data?.detail || 'An unexpected error occurred.');
      console.error("Error fetching user data:", err);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Handling User Account Management
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`/users/${userInfo.user_id}`);
      handleLogout();
      alert("Your account has been successfully deleted.");
  } catch (err) {
      setUserError(err.response?.data?.detail || err.message);
      console.error("Error deleting account:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);

    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('userInfo', JSON.stringify(user));
  };

  const handleLogout = () => {
    clearLocalStorage();
    clearData();
    setUserError(null);
  };

  // Function to fetch outfit suggestions
  const fetchOutfitSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/outfits/suggestions/${userInfo.user_id}`);
      setOutfitSuggestions(response.data);
      setOutfitError(null);
    } catch (err) {
      setOutfitError(err.response?.data?.detail || err.message);
      console.error("Error fetching outfit suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to trigger outfit suggestion generation
  const suggestOutfit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/outfits/suggest', { user_id: userInfo.user_id });
      setOutfitSuggestions([response.data, ...outfitSuggestions]);
      setOutfitError(null);
      alert("Outfit suggested successfully!");
    } catch (err) {
      setOutfitError(err.response?.data?.detail || err.message);
      console.error("Error suggesting outfit:", err);
      alert("Failed to suggest outfit.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/users/${userInfo.user_id}`, updatedData);
      setUserInfo(response.data);
      setUserError(null);
      alert("Your profile has been updated successfully.");
    } catch (err) {
      setUserError(err.response?.data?.detail || err.message);
      console.error("Error updating user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handling Wardrobe Items Data
  const handleAddWardrobeItem = async (newWardrobeItem) => {
    setLoading(true);
    try {
      const wardrobeItemToAdd = {
        ...newWardrobeItem,
        user_id: userInfo.user_id,
      };
      const response = await axios.post('/wardrobe_item/', wardrobeItemToAdd);
      setWardrobeItems([...wardrobeItems, response.data]);
      setWardrobeError(null);
      console.log("Added wardrobe item:", response.data);
    } catch (err) {
      console.error("Failed to add wardrobe item:", err);
      setWardrobeError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWardrobeItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/wardrobe_items/user/${userInfo.user_id}`);
      setWardrobeItems(response.data);
      setWardrobeError(null);
      console.log("Obtained wardrobe items:", response.data);
    } catch (err) {
      console.error("Failed to get wardrobe items:", err);
      setWardrobeError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWardrobeItem = async (item_id, updatedItem) => {
    setLoading(true);
    try {
      const wardrobeItemToEdit = {
        ...updatedItem,
        color: Array.isArray(updatedItem.color)
          ? updatedItem.color
          : updatedItem.color.split(',').map((c) => c.trim()),
        tags: Array.isArray(updatedItem.tags)
          ? updatedItem.tags
          : updatedItem.tags.split(',').map((tag) => tag.trim()),
      };
      console.log("Updating item:", item_id);
      const response = await axios.put(`/wardrobe_items/${item_id}`, wardrobeItemToEdit);
      console.log("Update response:", response.data);
      setWardrobeItems((prevItems) =>
        prevItems.map((item) => (item.item_id === item_id ? response.data : item))
      );
      setWardrobeError(null);
      alert("Wardrobe item has been updated successfully.");
    } catch (err) {
      console.error("Failed to edit wardrobe item:", err);
      setWardrobeError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWardrobeItem = async (itemIds) => {
    console.log("Trying to delete", itemIds);
    if (!window.confirm("Are you sure you want to delete the selected item(s)?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`/wardrobe_items/`, { data: { item_ids: itemIds } });
      setWardrobeItems((prevItems) => prevItems.filter((item) => !itemIds.includes(item.item_id)));
      setWardrobeError(null);
      alert("Wardrobe item has been deleted successfully.");
    } catch (err) {
      console.error("Failed to delete wardrobe item:", err);
      setWardrobeError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWeather = (newWeather) => {
    setWeather(newWeather);
  };

  const handleCreateOutfit = async (newOutfit) => {
    setLoading(true);
    try {
      const outfitToAdd = {
        ...newOutfit,
        user_id: userInfo.user_id
      };
  
      const response = await axios.post('/outfit/', outfitToAdd);
  
      setOutfits([...outfits, response.data]);
      setOutfitError(null);
      console.log("Created new outfit:", response.data);
    } catch (err) {
      console.error("Failed to create outfit:", err);
      setOutfitError(err.response?.data?.detail || err.message);
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
              <Login
                setIsLoggedIn={setIsLoggedIn}
                fetchUserData={fetchUserData}
              />
            ) : (
              <>
                <Navbar handleLogout={handleLogout} />
                <main className="main-content">
                  <Switch>
                    <Route path="/wardrobe">
                      <Wardrobe
                        items={wardrobeItems}
                        onAdd={handleAddWardrobeItem}
                        onUpdate={handleUpdateWardrobeItem}
                        onDelete={handleDeleteWardrobeItem}
                        loading={loading}
                        error={wardrobeError}
                        createOutfit={handleCreateOutfit}
                      />
                    </Route>
                    <Route path="/outfits">
                      <OutfitSuggestions
                        outfits={outfitSuggestions}
                        error={outfitError}
                      />
                      <button
                        onClick={suggestOutfit}
                        disabled={loading}
                        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
                      >
                        {loading ? 'Suggesting...' : 'Suggest New Outfit'}
                      </button>
                    </Route>
                    <Route path="/profile">
                      <div className="profile-section">
                        {loading ? (
                          <p>Loading...</p>
                        ) : userInfo ? (
                          <Profile
                            userInfo={userInfo}
                            onUpdate={handleUpdateUser}
                            onDelete={handleDeleteAccount}
                            loading={loading}
                            error={userError}
                          />
                        ) : (
                          <p>Please log in to view your profile.</p>
                        )}
                      </div>
                    </Route>
                    <Route path="/" exact>
                      <Home 
                        userInfo={userInfo} 
                        weather={weather}
                        updateWeather={handleUpdateWeather}
                      />
                    </Route>
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
