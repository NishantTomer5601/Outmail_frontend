import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const authenticatedFetch = async (url, options = {}) => {
  const defaultOptions = {
    credentials: 'include', // Always send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    // If unauthorized, redirect to login
    if (response.status === 401) {
      window.location.href = '/';
      return null;
    }
    
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Add request interceptor for tokens
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor for authentication handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, redirect to home page
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// Helper for campaign API calls
export const createCampaign = async (campaignData) => {
  const response = await api.post('/api/campaigns', campaignData);
  return response.data;
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/api/user/me');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await api.put('/api/user', userData);
  return response.data;
};