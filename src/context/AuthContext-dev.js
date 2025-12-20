"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

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

  // **DEVELOPMENT MODE - BYPASS AUTH CHECK**
  // Remove this when your backend is ready
  const DEV_MODE = true; // Set to false when backend is ready

  // Check authentication status
  const checkAuth = async () => {
    if (DEV_MODE) {
      console.log('🚧 Development mode - skipping auth check');
      setLoading(false);
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    try {
      setLoading(true);
      console.log('🔍 Checking authentication...');
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://outmail-backend-using-upstash-redis.onrender.com/api/auth/me', {
        method: 'GET',
        credentials: 'include', // Important: Send HTTP-only cookies
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log('📡 Auth response status:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('✅ User authenticated:', userData);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.log('❌ Not authenticated, response:', response.status);
        const errorText = await response.text();
        console.log('❌ Error response body:', errorText);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('🚨 Auth check failed:', error);
      if (error.name === 'AbortError') {
        console.error('🚨 Request timed out - backend might be down');
      }
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      console.log('✅ Auth check completed');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (!DEV_MODE) {
        await fetch('https://outmail-backend-using-upstash-redis.onrender.com/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Redirect to home page
      window.location.href = '/';
    }
  };

  // Login function (to be called after successful OAuth)
  const login = async () => {
    await checkAuth();
  };

  // Check auth on mount and when focus returns to window
  useEffect(() => {
    checkAuth();

    // Re-check auth when user returns to the tab
    const handleFocus = () => {
      if (!loading && !DEV_MODE) {
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
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};