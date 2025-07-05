import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  useTheme,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle as StrengthIcon,
  Cancel as WeaknessIcon,
  Lightbulb as TipIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import Button from '../common/Button';

const FeedbackDisplay = ({ interviewId, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Simulate API call to get feedback
    const timer = setTimeout(() => {
      // Mock feedback data
      const mockFeedback = {
        id: interviewId || '123',
        overallScore: 78,
        summary: "You demonstrated good knowledge of frontend development concepts and React. Your explanations were clear, but could benefit from more specific examples. Consider expanding your knowledge of performance optimization and state management patterns.",
        strengths: [
          "Strong understanding of React fundamentals",
          "Clear communication of technical concepts",
          "Good problem-solving approach"
        ],
        weaknesses: [
          "Limited knowledge of performance optimization",
          "Could provide more specific examples",
          "Some gaps in advanced state management patterns"
        ],
        tips: [
          "Practice explaining complex concepts with concrete examples",
          "Review React performance optimization techniques",
          "Explore advanced state management libraries like Redux or Recoil"
        ]
      };
      
      setFeedback(mockFeedback);
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [interviewId]);

  const handleViewDetailedFeedback = () => {
    navigate(`/feedback/${feedback.id}`);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success.main';
    if (score >= 70) return 'warning.main';
    return 'error.main';
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Analyzing your interview...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We're generating personalized feedback based on your responses
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Interview Feedback
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  mr: 2
                }}
              >
                <Typography 
                  variant="h4" 
                  component="div" 
                  fontWeight="bold"
                  sx={{ color: getScoreColor(feedback.overallScore) }}
                >
                  {feedback.overallScore}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Overall Performance
                </Typography>
                <Chip 
                  label={
                    feedback.overallScore >= 80 ? 'Excellent' : 
                    feedback.overallScore >= 70 ? 'Good' : 'Needs Improvement'
                  }
                  sx={{ 
                    bgcolor: getScoreColor(feedback.overallScore),
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body1" paragraph>
              {feedback.summary}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Strengths
                </Typography>
                <Box>
                  {feedback.strengths.map((strength, index) => (
                    <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                      <StrengthIcon color="success" sx={{ mr: 1, mt: 0.3 }} />
                      <Typography variant="body1">
                        {strength}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Areas for Improvement
                </Typography>
                <Box>
                  {feedback.weaknesses.map((weakness, index) => (
                    <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                      <WeaknessIcon color="error" sx={{ mr: 1, mt: 0.3 }} />
                      <Typography variant="body1">
                        {weakness}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Tips for Improvement
            </Typography>
            <Box>
              {feedback.tips.map((tip, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                  <TipIcon color="primary" sx={{ mr: 1, mt: 0.3 }} />
                  <Typography variant="body1">
                    {tip}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                endIcon={<ArrowIcon />}
                onClick={handleViewDetailedFeedback}
              >
                View Detailed Feedback
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedbackDisplay;