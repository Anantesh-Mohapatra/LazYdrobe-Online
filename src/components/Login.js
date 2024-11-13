// src/components/Login.js

import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import './styling/Login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setIsLoggedIn, fetchUserData, fetchWardrobeItems }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Ref to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send POST request to /login with email and password
      const response = await axios.post('/login', { email, password });
      if (response.data) {
        if (isMounted.current) { // Check if component is still mounted
          setIsLoggedIn(true);
          fetchUserData(response.data.user_id);
          fetchWardrobeItems(response.data.user_id);
          history.push('/'); // Redirect to Home page after successful login
        }
      }
    } catch (err) {
      if (isMounted.current) { // Check if component is still mounted
        // Handle errors returned from the backend
        if (err.response && err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError('Login failed. Please check your credentials.');
        }
      }
    } finally {
      if (isMounted.current) { // Check if component is still mounted
        setLoading(false);
      }
    }
  };

  const handleRegisterRedirect = (e) => {
    e.preventDefault(); // Prevent form submission
    history.push('/register'); // Use history to redirect to the register page
  };

  return (
    <div className="login-page">
      <div className="login">
        <h1>Welcome to LazYdrobe</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />

          <button type="submit" className="button" disabled={loading}> 
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" className="button" onClick={handleRegisterRedirect}>
            Create a New Account
          </button>
        </form>
        <p>© 2024 LazYdrobe | All rights reserved.</p>
      </div>
    </div> 
  );
};

export default Login;
