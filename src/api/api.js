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
  (response) => response,
  (error) => {
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

// Weather API
export const fetchWeather = async (weatherRequest) => {
  const response = await api.post('/weather/', weatherRequest);
  toast.success('Weather data fetched successfully!');
  return response.data;
};

// Wardrobe API
export const fetchWardrobeItems = async () => {
  const response = await api.get('/wardrobe');
  return response.data;
};

// Outfit Suggestion API
export const getOutfitSuggestions = async (weather, occasion) => {
  try {
    const response = await api.post('/outfits/', { weather, occasion });
    toast.success('Outfit suggestions fetched successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch outfit suggestions.');
    throw error;
  }
};

// Local Outfit Suggestion Algorithm
export const suggestOutfit = (weather, occasion, wardrobe) => {
  const outfit = [];

  wardrobe.forEach((item) => {
    if (item.style.includes(occasion)) {
      if (weather === 'cold' && ['top', 'outerwear', 'footwear'].includes(item.type)) {
        outfit.push(item);
      } else if (weather === 'hot' && item.type !== 'outerwear') {
        outfit.push(item);
      } else if (['sunny', 'rainy'].includes(weather)) {
        outfit.push(item);
      }
    }
  });

  const uniqueOutfit = {};
  outfit.forEach((item) => {
    if (!uniqueOutfit[item.type]) uniqueOutfit[item.type] = item;
  });

  return Object.values(uniqueOutfit);
};

// Fallback API
export const fetchWardrobeAndSuggestOutfit = async (weather, occasion) => {
  try {
    const wardrobe = await fetchWardrobeItems();
    return suggestOutfit(weather, occasion, wardrobe);
  } catch (error) {
    console.error('Fallback to local processing due to API failure.');
    return []; // Return empty or fallback logic
  }
};
