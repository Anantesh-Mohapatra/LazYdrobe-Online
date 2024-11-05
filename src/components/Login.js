// Login.js
import React from 'react';
import '../App.css';
import './Login.css';
import Footer from './Footer';

const Login = ({ setIsLoggedIn }) => {
  const handleLogin = () => {
    // Add authentication later
    setIsLoggedIn(true);
  };

  return (
    <div className="login-page">
      <div className="login">
        <h1>Welcome to LazYdrobe</h1>
        <form>
          <label>Username</label>
          <input placeholder="Enter your username" />

          <label>Password</label>
          <input placeholder="Enter your password" />

          <button onClick={handleLogin}>Login</button>
        </form>
        <p>© 2024 LazYdrobe | All rights reserved.</p>
      </div>
    </div> 
  );
};

export default Login;
