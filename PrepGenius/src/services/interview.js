import apiService from './api';
import { API_ENDPOINTS } from '../utils/constants';

const interviewService = {
  /**
   * Get all interviews for the current user
   * @returns {Promise} - API response
   */
  getInterviews: async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.INTERVIEWS);
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews:', error);
      throw error;
    }
  },

  /**
   * Get a specific interview by ID
   * @param {string} id - Interview ID
   * @returns {Promise} - API response
   */
  getInterviewById: async (id) => {
    try {
      const response = await apiService.get(`${API_ENDPOINTS.INTERVIEWS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching interview ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new interview
   * @param {Object} interviewData - Interview data
   * @returns {Promise} - API response
   */
  createInterview: async (interviewData) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.INTERVIEWS, interviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating interview:', error);
      throw error;
    }
  },

  /**
   * Update an existing interview
   * @param {string} id - Interview ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} - API response
   */
  updateInterview: async (id, updateData) => {
    try {
      const response = await apiService.put(`${API_ENDPOINTS.INTERVIEWS}/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating interview ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an interview
   * @param {string} id - Interview ID
   * @returns {Promise} - API response
   */
  deleteInterview: async (id) => {
    try {
      const response = await apiService.delete(`${API_ENDPOINTS.INTERVIEWS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting interview ${id}:`, error);
      throw error;
    }
  },

  /**
   * Submit a response to an interview question
   * @param {string} interviewId - Interview ID
   * @param {string} questionId - Question ID
   * @param {Object} responseData - Response data
   * @returns {Promise} - API response
   */
  submitResponse: async (interviewId, questionId, responseData) => {
    try {
      const response = await apiService.post(
        `${API_ENDPOINTS.INTERVIEWS}/${interviewId}/questions/${questionId}/response`,
        responseData
      );
      return response.data;
    } catch (error) {
      console.error(`Error submitting response for question ${questionId}:`, error);
      throw error;
    }
  },

  /**
   * Get the next question for an interview
   * @param {string} interviewId - Interview ID
   * @returns {Promise} - API response
   */
  getNextQuestion: async (interviewId) => {
    try {
      const response = await apiService.get(`${API_ENDPOINTS.INTERVIEWS}/${interviewId}/next-question`);
      return response.data;
    } catch (error) {
      console.error(`Error getting next question for interview ${interviewId}:`, error);
      throw error;
    }
  },

  /**
   * Get feedback for an interview
   * @param {string} interviewId - Interview ID
   * @returns {Promise} - API response
   */
  getFeedback: async (interviewId) => {
    try {
      const response = await apiService.get(`${API_ENDPOINTS.INTERVIEWS}/${interviewId}/feedback`);
      return response.data;
    } catch (error) {
      console.error(`Error getting feedback for interview ${interviewId}:`, error);
      throw error;
    }
  },

  /**
   * Upload a resume for an interview
   * @param {string} interviewId - Interview ID
   * @param {FormData} formData - Form data with resume file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} - API response
   */
  uploadResume: async (interviewId, formData, onProgress) => {
    try {
      const response = await apiService.upload(
        `${API_ENDPOINTS.INTERVIEWS}/${interviewId}/resume`,
        formData,
        onProgress
      );
      return response.data;
    } catch (error) {
      console.error(`Error uploading resume for interview ${interviewId}:`, error);
      throw error;
    }
  }
};

export default interviewService;
