import apiService from './api';
import { API_ENDPOINTS, AUTH_TOKEN_KEY, USER_DATA_KEY } from '../utils/constants';

/**
 * Authentication service
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - API response
   */
  register: async (userData) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login a user
   * @param {Object} credentials - User login credentials
   * @returns {Promise} - API response with user data and token
   */
  login: async (credentials) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout the current user
   * @returns {Promise} - API response
   */
  logout: async () => {
    try {
      // Call logout endpoint if needed
      await apiService.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }
  },

  /**
   * Get the current user's profile
   * @returns {Promise} - API response with user profile
   */
  getProfile: async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update the current user's profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} - API response
   */
  updateProfile: async (profileData) => {
    try {
      const response = await apiService.put(API_ENDPOINTS.PROFILE, profileData);
      
      // Update stored user data
      const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}');
      localStorage.setItem(USER_DATA_KEY, JSON.stringify({
        ...userData,
        ...response.data
      }));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if the user is authenticated
   * @returns {boolean} - Whether the user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get the current user data from local storage
   * @returns {Object|null} - User data or null if not logged in
   */
  getCurrentUser: () => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Request a password reset
   * @param {string} email - User email
   * @returns {Promise} - API response
   */
  requestPasswordReset: async (email) => {
    try {
      const response = await apiService.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param {Object} resetData - Password reset data
   * @returns {Promise} - API response
   */
  resetPassword: async (resetData) => {
    try {
      const response = await apiService.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;