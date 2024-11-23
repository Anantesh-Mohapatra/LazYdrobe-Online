// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wardrobe from './components/Wardrobe';
import OutfitSuggestions from './components/OutfitSuggestions';
import PreviousOutfitsList from './components/PreviousOutfitsList';
import Profile from './components/profile/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    return loggedIn || false;
  });
  const [userInfo, setUserInfo] = useState(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return user || null;
  });
  const [loading, setLoading] = useState(false);

  // Separate error states for different operations
  const [userError, setUserError] = useState(null);
  const [wardrobeError, setWardrobeError] = useState(null);
  const [outfitError, setOutfitError] = useState(null);

  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [customOutfits, setCustomOutfits] = useState([]);
  const [outfitSuggestions, setOutfitSuggestions] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      fetchWardrobeItems();
      fetchOutfitSuggestions();
      fetchOutfits();
    }
  }, [isLoggedIn, userInfo]);

  const clearLocalStorage = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
  }

  const clearData = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    setLoading(false);

    setUserError(null);
    setWardrobeError(null);
    setOutfitError(null);

    setWardrobeItems([]);
    setCustomOutfits([]);
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
      setIsLoggedIn(false);
      clearLocalStorage();
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
      console.log("Obtained outfit suggestions:", response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // No outfit suggestions found; set to empty array
        setOutfitSuggestions([]);
        setOutfitError(null);
        console.warn("No outfit suggestions found for this user.");
      } else {
        setOutfitError(err.response?.data?.detail || err.message);
        console.error("Error fetching outfit suggestions:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/users/${userInfo.user_id}`, updatedData);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setUserInfo(response.data);
      setUserError(null);
      console.log("Your profile has been updated successfully.");
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
        color: Array.isArray(newWardrobeItem.color)
          ? newWardrobeItem.color
          : newWardrobeItem.color.split(',').map((c) => c.trim()),
        tags: Array.isArray(newWardrobeItem.tags)
          ? newWardrobeItem.tags
          : newWardrobeItem.tags.split(',').map((tag) => tag.trim()),
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
      const response = await axios.get(`/wardrobe_item/user/${userInfo.user_id}`);
      setWardrobeItems(response.data);
      setWardrobeError(null);
      console.log("Obtained wardrobe items:", response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // No wardrobe items found; set to empty array
        setWardrobeItems([]);
        setWardrobeError(null);
        console.warn("No wardrobe items found for this user.");
      } else {
        console.error("Failed to get wardrobe items:", err);
        setWardrobeError(err.response?.data?.detail || err.message);
      }
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
      const response = await axios.put(`/wardrobe_item/${item_id}`, wardrobeItemToEdit);
      console.log("Update response:", response.data);
      setWardrobeItems((prevItems) =>
        prevItems.map((item) => (item.item_id === item_id ? response.data : item))
      );
      setWardrobeError(null);
      console.log("Wardrobe item has been updated successfully.");
    } catch (err) {
      console.error("Failed to edit wardrobe item:", err);
      setWardrobeError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWardrobeItem = async (itemIds) => {
    console.log("Trying to delete", itemIds);

    setLoading(true);
    try {
      await axios.delete(`/wardrobe_item/`, { data: { item_ids: itemIds } });
      setWardrobeItems((prevItems) => prevItems.filter((item) => !itemIds.includes(item.item_id)));
      setWardrobeError(null);
      console.log("Wardrobe item has been deleted successfully.");
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

  const handleCreateOutfit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/outfits/suggest', { user_id: userInfo.user_id });
      setOutfitSuggestions([response.data, ...outfitSuggestions]); // Ensure correct variable
      setCustomOutfits(response.data);
      setSuccessMessage('Outfit suggested successfully!');
      // Automatically hide the message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error("Error suggesting outfit:", err);
      alert("Failed to suggest outfit.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOutfits = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/outfit/user/${userInfo.user_id}`);
      setCustomOutfits(response.data);
      setOutfitError(null);
      console.log("Obtained outfits:", response.data);
    } catch (err) {
      console.error("Failed to get outfits:", err);
      setOutfitError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOutfit = async (outfit_id, updatedOutfit) => {
    console.log(updatedOutfit);
    setLoading(true);
    try {
      const updatedOutfitToEdit = {
        ...updatedOutfit,
        occasion: Array.isArray(updatedOutfit.occasion) 
          ? updatedOutfit.occasion
          : updatedOutfit.occasion.split(',').map((s) => s.trim()),
      };

      console.log("Updating outfit:", outfit_id);
      const response = await axios.put(`/outfit/${outfit_id}`, updatedOutfitToEdit); 
      console.log("Update response:", response.data);

      setCustomOutfits((prevOutfits) =>
        prevOutfits.map((outfit) => (outfit.outfit_id === outfit_id ? response.data : outfit))
      );

      setOutfitError(null);
      console.log("Outfit has been updated successfully.");
    } catch (err) {
      console.error("Failed to edit outfit:", err);
      setOutfitError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteOutfit = async (outfitId) => {
    console.log("Trying to delete outfit:", outfitId);

    setLoading(true);
    try {
      console.log("Delete requested")
      await axios.delete(`/outfit/${outfitId}`);
      setCustomOutfits((prevOutfits) => prevOutfits.filter((outfit) => outfit.outfit_id !== outfitId));
      setOutfitError(null);
      console.log("Outfit(s) have been deleted successfully.");
    } catch (err) {
      console.error("Failed to delete outfits:", err);
      setOutfitError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const openOutfitModal = (outfit) => {
    // Logic to open the outfit modal
  };

  return (
    <Router>
      <div className="app-container">
        <ErrorBoundary>
          <ToastContainer />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              {!isLoggedIn || !userInfo ? (
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

                          customOutfits={customOutfits}
                          createOutfit={handleCreateOutfit}
                          updateOutfit={handleUpdateOutfit}
                          deleteOutfit={handleDeleteOutfit}
                          openOutfitModal={openOutfitModal}
                        />
                      </Route>
                      <Route path="/outfits">
                        <OutfitSuggestions
                          outfits={outfitSuggestions}
                          setOutfitSuggestions={setOutfitSuggestions}
                          wardrobeItems={wardrobeItems}
                          error={outfitError}
                          loading={loading}
                          setLoading={setLoading}
                          userInfo={userInfo}
                        />
                      </Route>
                      <Route path="/previous-outfits">
                        <PreviousOutfitsList
                          outfits={outfitSuggestions} // Pass outfitSuggestions as outfits
                          setOutfitSuggestions={setOutfitSuggestions}
                          userId={userInfo.user_id} // Pass userId as a separate prop
                        />
                      </Route>
                      <Route path="/profile">
                        <div className="profile-section">
                          {userInfo ? (
                            <Profile
                              userInfo={userInfo}
                              onUpdate={handleUpdateUser}
                              onLogout={handleLogout}
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
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
