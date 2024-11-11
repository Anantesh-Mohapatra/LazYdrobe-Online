// src/api/api.js

import axios from 'axios';
import { toast } from 'react-toastify';

// Set up Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000', // Adjust based on your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle API responses and errors globally
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// User APIs
export const registerUser = async (userData) => {
  const response = await api.post('/users/', userData);
  toast.success('Registration successful!');
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  toast.success('Login successful!');
  return response.data;
};

export const getUserData = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, updatedData) => {
  const response = await api.put(`/users/${userId}`, updatedData);
  toast.success('Profile updated successfully!');
  return response.data;
};

export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
  toast.success('Your account has been successfully deleted.');
};

export const fetchWeather = async (weatherRequest) => {
  const response = await api.post('/weather/', weatherRequest);
  toast.success('Weather data fetched successfully!');
  return response.data;
};

// Implement other API functions as needed

export const fetchWardrobeItems = async () => {
  const response = await api.get('/wardrobe'); // Ensure this endpoint exists in your FastAPI backend
  return response.data;
};

export const fetchOutfitSuggestions = async () => {
  const response = await api.get('/outfits'); // Ensure this endpoint exists in your FastAPI backend
  return response.data;
};
