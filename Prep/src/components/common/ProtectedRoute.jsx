import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuthStatus, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      checkAuthStatus();
    }
  }, [isAuthenticated, loading, checkAuthStatus]);

  if (loading) {
    return <Loader message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but hasn't completed their profile, redirect to profile setup
  // Skip this check for the profile setup page itself to avoid redirect loops
  if (user && !user.profileCompleted && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
};

export default ProtectedRoute;
