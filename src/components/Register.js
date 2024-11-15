// src/components/Register.js
import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useHistory } from 'react-router-dom';
import './styling/Register.css'; 

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: ''
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Updated validation to include 'location'
    if (!formData.username || !formData.email || !formData.password || !formData.location) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password is too short, needs to be at least 6 characters.');
      return;
    }
    try {
      await axios.post('/users/', formData);
      history.push('/login'); // Redirect to login after successful registration
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleLoginRedirect = () => {
    history.push('/login'); // Use history to redirect to the login page
  };

  return (
    <div className="register-page">
      <div className="register">
        <h1>Create a New Account</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          {/* Added Location Field */}
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location (e.g., New York, US)"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button">
            Register
          </button>
          <button type="button" className="button" onClick={handleLoginRedirect}>
            Already have an account?
          </button>
        </form>
        <p>© 2024 LazYdrobe | All rights reserved.</p>
      </div>
    </div>
  );
}

export default Register;
