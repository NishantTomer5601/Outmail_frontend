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
    }
  }
};

const captureTokenFromURL = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      console.log('🎯 Token captured from URL');
      setAuthToken(token);
      // Clean URL without reloading
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
  const [userRole, setUserRole] = useState(null);

  // *PRODUCTION MODE - BACKEND IS READY*
  // Backend HTTP-only cookie authentication is now working
  const DEV_MODE = false;

  // Check authentication status
  const checkAuth = async () => {
    if (DEV_MODE) {
      setLoading(false);
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
      return;
    }

    try {
      setLoading(true);
      
      // Check for token in URL first (OAuth redirect)
      const urlToken = captureTokenFromURL();
      if (urlToken) {
        console.log('🔑 Token captured from OAuth redirect');
      }
      
      // Get stored token
      const token = getAuthToken();
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      // Prepare headers - support both authentication methods
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('🔐 Using token-based authentication');
      } else {
        console.log('🍪 Attempting cookie-based authentication');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
        method: 'GET',
        credentials: 'include', // For cookie auth fallback
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const userData = await response.json();
        console.log('✅ User authenticated:', userData);
        setUser(userData);
        setUserRole(userData.role || 'STUDENT'); // Default to STUDENT role
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        console.log('🔒 Authentication failed - clearing stored token');
        setAuthToken(null); // Clear invalid token
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
      } else {
        console.log('❌ Auth check failed with status:', response.status);
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('🚨 Auth check failed:', error);
      if (error.name === 'AbortError') {
        console.error('🚨 Request timed out - backend might be down');
      }
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
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
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
      console.log('🔍 Attempting to update user profile:', userData);
      console.log('🌐 API URL:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/update`);
      
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
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/update`, {
        method: 'PUT',
        credentials: 'include', // For cookie auth fallback
        headers,
        body: JSON.stringify(userData),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      if (response.ok) {
        const updatedUser = await response.json();
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

  // Role-based navigation helper
  const navigateByRole = () => {
    if (!isAuthenticated || !userRole) return '/';
    
    switch (userRole) {
      case 'TPO_ADMIN':
        return '/admin/dashboard';
      case 'STUDENT':
      default:
        return '/student/dashboard';
    }
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    return userRole === requiredRole;
  };

  // Check if user is admin
  const isAdmin = () => hasRole('TPO_ADMIN');

  // Check if user is student  
  const isStudent = () => hasRole('STUDENT');

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
    navigateByRole,
    hasRole,
    isAdmin,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};