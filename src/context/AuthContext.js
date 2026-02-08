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
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
        method: 'GET',
        credentials: 'include', // Important: Send HTTP-only cookies
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setUserRole(userData.role || 'STUDENT'); // Default to STUDENT role
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
      } else {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Logout request completed
    } catch (error) {
      console.error('🚨 Logout error:', error);
    } finally {
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