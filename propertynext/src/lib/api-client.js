import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = '/api';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        const status = error.response?.status || 500;
        const data = error.response?.data || null;

        throw new ApiError(message, status, data);
    }
);

export class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

// Generic API client
export const apiClient = {
    get: (endpoint, params = {}) => axiosInstance.get(endpoint, { params }),
    post: (endpoint, data = {}) => axiosInstance.post(endpoint, data),
    put: (endpoint, data = {}) => axiosInstance.put(endpoint, data),
    patch: (endpoint, data = {}) => axiosInstance.patch(endpoint, data),
    delete: (endpoint) => axiosInstance.delete(endpoint),
};

// Property API
export const propertyApi = {
    // Get all properties with filters
    getAll: (params = {}) => apiClient.get('/properties', params),

    // Get property by ID
    getById: (id) => apiClient.get(`/properties/${id}`),

    // Create new property
    create: (data) => apiClient.post('/properties', data),

    // Update property
    update: (id, data) => apiClient.put(`/properties/${id}`, data),

    // Delete property
    delete: (id) => apiClient.delete(`/properties/${id}`),

    // Get featured properties
    getFeatured: () => apiClient.get('/properties/featured'),

    // Search properties
    search: (params) => apiClient.get('/properties/search', params),

    // Upload property images
    uploadImages: (propertyId, formData) => {
        return axiosInstance.post(`/properties/${propertyId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // Delete property image
    deleteImage: (propertyId, imageId) =>
        apiClient.delete(`/properties/${propertyId}/images/${imageId}`),
};

// User API
export const userApi = {
    // Get all users
    getAll: (params = {}) => apiClient.get('/users', params),

    // Get user by ID
    getById: (id) => apiClient.get(`/users/${id}`),

    // Update user
    update: (id, data) => apiClient.put(`/users/${id}`, data),

    // Delete user
    delete: (id) => apiClient.delete(`/users/${id}`),

    // Get user devices
    getDevices: (userId) => apiClient.get(`/users/${userId}/devices`),

    // Remove user device
    removeDevice: (userId, deviceId) =>
        apiClient.delete(`/users/${userId}/devices/${deviceId}`),
};

// Agent API
export const agentApi = {
    // Get all agents
    getAll: (params = {}) => apiClient.get('/agents', params),

    // Get agent by ID
    getById: (id) => apiClient.get(`/agents/${id}`),

    // Update agent profile
    update: (id, data) => apiClient.put(`/agents/${id}`, data),

    // Delete agent
    delete: (id) => apiClient.delete(`/agents/${id}`),

    // Get agent performance
    getPerformance: (id) => apiClient.get(`/agents/${id}/performance`),

    // Get agent properties
    getProperties: (id, params = {}) => apiClient.get(`/agents/${id}/properties`, params),
};

// Customer API
export const customerApi = {
    // Get all customers
    getAll: (params = {}) => apiClient.get('/customers', params),

    // Get customer by ID
    getById: (id) => apiClient.get(`/customers/${id}`),

    // Update customer profile
    update: (id, data) => apiClient.put(`/customers/${id}`, data),

    // Delete customer
    delete: (id) => apiClient.delete(`/customers/${id}`),

    // Get customer transactions
    getTransactions: (id, params = {}) => apiClient.get(`/customers/${id}/transactions`, params),
};

// Transaction API
export const transactionApi = {
    // Get all transactions
    getAll: (params = {}) => apiClient.get('/transactions', params),

    // Get transaction by ID
    getById: (id) => apiClient.get(`/transactions/${id}`),

    // Create new transaction
    create: (data) => apiClient.post('/transactions', data),

    // Update transaction
    update: (id, data) => apiClient.put(`/transactions/${id}`, data),

    // Delete transaction
    delete: (id) => apiClient.delete(`/transactions/${id}`),

    // Get transaction history
    getHistory: (params = {}) => apiClient.get('/transactions/history', params),
};

// Review API
export const reviewApi = {
    // Get all reviews
    getAll: (params = {}) => apiClient.get('/reviews', params),

    // Get review by ID
    getById: (id) => apiClient.get(`/reviews/${id}`),

    // Create new review
    create: (data) => apiClient.post('/reviews', data),

    // Update review
    update: (id, data) => apiClient.put(`/reviews/${id}`, data),

    // Delete review
    delete: (id) => apiClient.delete(`/reviews/${id}`),

    // Get reviews for property
    getByProperty: (propertyId, params = {}) =>
        apiClient.get(`/reviews/property/${propertyId}`, params),
};

// Auth API
export const authApi = {
    // Login
    login: (credentials) => apiClient.post('/auth/login', credentials),

    // Register
    register: (userData) => apiClient.post('/auth/register', userData),

    // Logout
    logout: () => apiClient.post('/auth/logout'),

    // Refresh token
    refresh: () => apiClient.post('/auth/refresh'),

    // Request password reset
    requestPasswordReset: (email) =>
        apiClient.post('/auth/reset-password/request', { email }),

    // Verify password reset
    verifyPasswordReset: (token, newPassword) =>
        apiClient.post('/auth/reset-password/verify', { token, newPassword }),
};

// File Upload API
export const uploadApi = {
    // Upload single file
    uploadFile: (file, folder = 'general') => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        return axiosInstance.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // Upload multiple files
    uploadFiles: (files, folder = 'general') => {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        formData.append('folder', folder);

        return axiosInstance.post('/upload/multiple', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // Delete file
    deleteFile: (fileUrl) => apiClient.delete('/upload', { data: { fileUrl } }),
};