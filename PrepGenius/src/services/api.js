import axios from 'axios';
import { AUTH_TOKEN_KEY, ERROR_MESSAGES } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.interviewpro.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = ERROR_MESSAGES.DEFAULT;
    
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      switch (error.response.status) {
        case 401:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
          // Redirect to login page or refresh token
          if (window.location.pathname !== '/login') {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.href = '/login';
          }
          break;
        case 404:
          errorMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 422:
          errorMessage = ERROR_MESSAGES.VALIDATION;
          break;
        case 500:
          errorMessage = ERROR_MESSAGES.SERVER;
          break;
        default:
          errorMessage = error.response.data?.message || ERROR_MESSAGES.DEFAULT;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = ERROR_MESSAGES.NETWORK;
    }
    
    // Return a rejected promise with the error
    return Promise.reject({
      ...error,
      message: errorMessage
    });
  }
);

// Helper methods for common HTTP requests
const apiService = {
  /**
   * Make a GET request
   * @param {string} url - API endpoint
   * @param {Object} params - URL parameters
   * @param {Object} config - Additional axios config
   * @returns {Promise} - Axios promise
   */
  get: (url, params = {}, config = {}) => {
    return api.get(url, { ...config, params });
  },

  /**
   * Make a POST request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} - Axios promise
   */
  post: (url, data = {}, config = {}) => {
    return api.post(url, data, config);
  },

  /**
   * Make a PUT request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} - Axios promise
   */
  put: (url, data = {}, config = {}) => {
    return api.put(url, data, config);
  },

  /**
   * Make a PATCH request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} - Axios promise
   */
  patch: (url, data = {}, config = {}) => {
    return api.patch(url, data, config);
  },

  /**
   * Make a DELETE request
   * @param {string} url - API endpoint
   * @param {Object} config - Additional axios config
   * @returns {Promise} - Axios promise
   */
  delete: (url, config = {}) => {
    return api.delete(url, config);
  },

  /**
   * Upload a file
   * @param {string} url - API endpoint
   * @param {FormData} formData - Form data with file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} - Axios promise
   */
  upload: (url, formData, onProgress) => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      }
    });
  }
};

export default apiService;
