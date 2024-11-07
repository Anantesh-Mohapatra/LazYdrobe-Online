// src/components/Login.js

import React, { useState } from 'react';
import '../App.css';
import './styling/Login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const Login = ({ setIsLoggedIn, fetchUserData }) => {
  const [email, setEmail] = useState(''); // Renamed from username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // Initialize useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send POST request to /login with email and password
      const response = await axios.post('/login', { email, password });
      
      if (response.data) {
        setIsLoggedIn(true);
        fetchUserData(response.data.user_id);
        history.push('/profile'); // Redirect to profile page after successful login
      }
    } catch (err) {
      // Handle errors returned from the backend
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    history.push('/register'); // Use history to redirect to the register page
  };

  return (
    <div className="login-page">
      <div className="login">
        <h1>Welcome to LazYdrobe</h1>
        <form onSubmit={handleLogin}>
          <label>Email</label> {/* Changed from Username to Email */}
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required // Added required attribute
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required // Added required attribute
          />

          <button type="submit" className="button" disabled={loading}> 
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <button className="button" onClick={handleRegisterRedirect}>
          Create a New Account
        </button>
        <p>© 2024 LazYdrobe | All rights reserved.</p>
      </div>
    </div> 
  );
};

export default Login;
