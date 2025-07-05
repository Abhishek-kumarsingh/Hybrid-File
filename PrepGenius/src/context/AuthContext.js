import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import authService from '../services/auth';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on mount
  const checkAuthStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if there's a token in localStorage
      if (authService.isAuthenticated()) {
        // Get user data from localStorage
        const userData = authService.getCurrentUser();
        
        if (userData) {
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } else {
          // If we have a token but no user data, fetch the profile
          const profile = await authService.getProfile();
          setCurrentUser(profile);
          setIsAuthenticated(true);
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setError('Failed to authenticate user');
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      // Clear any invalid tokens
      authService.logout();
    } finally {
      setLoading(false);
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authService.login(credentials);
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to login');
      return { success: false, error: err.message || 'Failed to login' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authService.register(userData);
      return { success: true, data };
    } catch (err) {
      setError(err.message || 'Failed to register');
      return { success: false, error: err.message || 'Failed to register' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      await authService.logout();
      setCurrentUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to logout');
      return { success: false, error: err.message || 'Failed to logout' };
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedProfile = await authService.updateProfile(profileData);
      setCurrentUser(prev => ({ ...prev, ...updatedProfile }));
      return { success: true, data: updatedProfile };
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      return { success: false, error: err.message || 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


