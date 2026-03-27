"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

// Token management utilities for cross-domain authentication
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
      document.cookie = 'outmail_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
};

const captureTokenFromURL = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setAuthToken(token);
      document.cookie = `outmail_auth=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
      window.history.replaceState({}, document.title, window.location.pathname);
      return token;
    }
  }
  return null;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // kept only for compatibility with backend payload

  // Check authentication status
  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Check for token in URL first (OAuth redirect)
      captureTokenFromURL();
      
      // Get stored token
      const token = getAuthToken();
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
        credentials: 'include', // For cookie auth fallback
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const userData = response.data;
      const finalUser = userData.user || userData;
      setUser(finalUser);
      setUserRole(finalUser.role || null);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = getAuthToken();
      
      // Prepare headers for logout request
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        credentials: 'include', // For cookie auth
        headers,
      });
      
      console.log('📤 Logout request completed');
    } catch (error) {
      console.error('🚨 Logout error:', error);
    } finally {
      setAuthToken(null); // Clear stored token
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
      // Redirect to home page
      window.location.href = '/';
    }
  };

  // Login function (to be called after successful OAuth)
  const login = async () => {
    await checkAuth();
  };

  // Update user profile function
  const updateUser = async (userData) => {
    // TEMPORARY MOCK - REMOVE WHEN BACKEND IS READY
    const ENABLE_MOCK = false; // Set to false when backend is implemented
    
    if (ENABLE_MOCK) {
      console.log('🔧 Using mock update (backend not ready)');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local user state with new name
      const updatedUser = { 
        ...user, 
        display_name: userData.display_name,
        name: userData.name 
      };
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    }
    
    try {
      const token = getAuthToken();
      
      // Prepare headers - support both authentication methods
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('🔐 Using token for profile update');
      } else {
        console.log('🍪 Using cookie for profile update');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
        method: 'PUT',
        credentials: 'include', // For cookie auth fallback
        headers,
        body: JSON.stringify(userData),
      });


      if (response.ok) {
        const result = await response.json();
        const updatedUser = result.user || result;
        console.log('✅ Profile updated successfully:', updatedUser);
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      } else {
        console.log('❌ Response not OK, status:', response.status);
        
        if (response.status === 401) {
          console.log('🔒 Unauthorized - clearing token');
          setAuthToken(null);
          setUser(null);
          setUserRole(null);
          setIsAuthenticated(false);
        }
        
        try {
          const errorData = await response.json();
          console.log('❌ Error response:', errorData);
          return { success: false, error: errorData.message || `Server error (${response.status})` };
        } catch (parseError) {
          console.log('❌ Could not parse error response:', parseError);
          return { success: false, error: `Server error (${response.status}): ${response.statusText}` };
        }
      }
    } catch (error) {
      console.error('🚨 Update user failed:', error);
      console.error('🚨 Error type:', error.constructor.name);
      console.error('🚨 Error message:', error.message);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { success: false, error: 'Cannot connect to server. Check if backend is running.' };
      } else if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
        return { success: false, error: 'Network error. Check your internet connection.' };
      } else if (error.message.includes('CORS')) {
        return { success: false, error: 'CORS error. Check backend CORS configuration.' };
      } else {
        return { success: false, error: `Network error: ${error.message}` };
      }
    }
  };

  // Check auth on mount and when focus returns to window
  useEffect(() => {
    checkAuth();

    // Re-check auth when user returns to the tab
    const handleFocus = () => {
      if (!loading) {
        checkAuth();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    userRole,
    login,
    logout,
    checkAuth,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};