import React, { createContext, useState, useContext, useEffect } from 'react';
import interviewService from '../services/interview';
import { useAuth } from './AuthContext';

// Create the interview context
const InterviewContext = createContext();

// Custom hook to use the interview context
export const useInterview = () => {
  return useContext(InterviewContext);
};

export const InterviewProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch interviews when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchInterviews();
    } else {
      setInterviews([]);
      setCurrentInterview(null);
    }
  }, [isAuthenticated]);

  // Fetch all interviews for the current user
  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.getInterviews();
      setInterviews(data.interviews || []);
      return { success: true, data: data.interviews };
    } catch (err) {
      setError('Failed to fetch interviews');
      return { success: false, error: 'Failed to fetch interviews' };
    } finally {
      setLoading(false);
    }
  };

  // Get a specific interview by ID
  const getInterviewById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.getInterviewById(id);
      return { success: true, data };
    } catch (err) {
      setError('Failed to fetch interview');
      return { success: false, error: 'Failed to fetch interview' };
    } finally {
      setLoading(false);
    }
  };

  // Create a new interview
  const createInterview = async (interviewData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.createInterview(interviewData);
      setInterviews(prev => [...prev, data]);
      setCurrentInterview(data);
      return { success: true, data };
    } catch (err) {
      setError('Failed to create interview');
      return { success: false, error: 'Failed to create interview' };
    } finally {
      setLoading(false);
    }
  };

  // Update an existing interview
  const updateInterview = async (id, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.updateInterview(id, updateData);
      
      // Update the interviews list
      setInterviews(prev => 
        prev.map(interview => 
          interview.id === id ? { ...interview, ...data } : interview
        )
      );
      
      // Update current interview if it's the one being updated
      if (currentInterview && currentInterview.id === id) {
        setCurrentInterview(prev => ({ ...prev, ...data }));
      }
      
      return { success: true, data };
    } catch (err) {
      setError('Failed to update interview');
      return { success: false, error: 'Failed to update interview' };
    } finally {
      setLoading(false);
    }
  };

  // Delete an interview
  const deleteInterview = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await interviewService.deleteInterview(id);
      
      // Remove from interviews list
      setInterviews(prev => prev.filter(interview => interview.id !== id));
      
      // Clear current interview if it's the one being deleted
      if (currentInterview && currentInterview.id === id) {
        setCurrentInterview(null);
      }
      
      return { success: true };
    } catch (err) {
      setError('Failed to delete interview');
      return { success: false, error: 'Failed to delete interview' };
    } finally {
      setLoading(false);
    }
  };

  // Start an interview
  const startInterview = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const interview = await interviewService.getInterviewById(id);
      
      // Update interview status to 'in_progress'
      const updatedInterview = await interviewService.updateInterview(id, {
        status: 'in_progress',
        startedAt: new Date().toISOString()
      });
      
      setCurrentInterview(updatedInterview);
      
      // Update in the interviews list
      setInterviews(prev => 
        prev.map(item => 
          item.id === id ? updatedInterview : item
        )
      );
      
      return { success: true, data: updatedInterview };
    } catch (err) {
      setError('Failed to start interview');
      return { success: false, error: 'Failed to start interview' };
    } finally {
      setLoading(false);
    }
  };

  // Submit a response to an interview question
  const submitResponse = async (interviewId, questionId, responseData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.submitResponse(interviewId, questionId, responseData);
      
      // Update current interview with the new response
      if (currentInterview && currentInterview.id === interviewId) {
        setCurrentInterview(prev => ({
          ...prev,
          questions: prev.questions.map(q => 
            q.id === questionId ? { ...q, response: responseData.response, answered: true } : q
          )
        }));
      }
      
      return { success: true, data };
    } catch (err) {
      setError('Failed to submit response');
      return { success: false, error: 'Failed to submit response' };
    } finally {
      setLoading(false);
    }
  };

  // Complete an interview and get feedback
  const completeInterview = (id, feedbackData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedInterviews = interviews.map(interview => 
        interview.id === id 
          ? { 
              ...interview, 
              status: 'completed', 
              completedAt: new Date().toISOString(),
              feedback: feedbackData
            } 
          : interview
      );
      
      setInterviews(updatedInterviews);
      
      // Clear current interview if it's the one being completed
      if (currentInterview && currentInterview.id === id) {
        setCurrentInterview(null);
      }
      
      return { success: true };
    } catch (err) {
      setError('Failed to complete interview');
      return { success: false, error: 'Failed to complete interview' };
    } finally {
      setLoading(false);
    }
  };

  // Get feedback for an interview
  const getFeedback = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.getFeedback(id);
      return { success: true, data };
    } catch (err) {
      setError('Failed to fetch feedback');
      return { success: false, error: 'Failed to fetch feedback' };
    } finally {
      setLoading(false);
    }
  };

  // Get the next question for an interview
  const getNextQuestion = async (interviewId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await interviewService.getNextQuestion(interviewId);
      
      // Update current interview with the new question
      if (currentInterview && currentInterview.id === interviewId) {
        setCurrentInterview(prev => ({
          ...prev,
          currentQuestion: data
        }));
      }
      
      return { success: true, data };
    } catch (err) {
      setError('Failed to fetch next question');
      return { success: false, error: 'Failed to fetch next question' };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    interviews,
    currentInterview,
    loading,
    error,
    fetchInterviews,
    getInterviewById,
    createInterview,
    updateInterview,
    deleteInterview,
    startInterview,
    submitResponse,
    completeInterview,
    getFeedback,
    getNextQuestion,
    setCurrentInterview
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

