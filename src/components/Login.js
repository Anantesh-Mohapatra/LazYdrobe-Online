// Login.js
import React from 'react';
import '../App.css';
import './Login.css';

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
      </div>
    </div> 
  );
};

export default Login;
