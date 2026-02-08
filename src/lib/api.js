// Utility function for making authenticated API calls
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

// Example usage for your campaign API calls:
export const createCampaign = async (campaignData) => {
  const response = await authenticatedFetch(`${BASE_URL}/api/campaigns`, {
    method: 'POST',
    body: JSON.stringify(campaignData),
  });
  
  if (response?.ok) {
    return response.json();
  }
  throw new Error('Failed to create campaign');
};

// Get user profile
export const getUserProfile = async () => {
  const response = await authenticatedFetch(`${BASE_URL}/api/me`);
  
  if (response?.ok) {
    return response.json();
  }
  throw new Error('Failed to get user profile');
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await authenticatedFetch(`${BASE_URL}/api/user/profile`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  
  if (response?.ok) {
    return response.json();
  }
  throw new Error('Failed to update user profile');
};