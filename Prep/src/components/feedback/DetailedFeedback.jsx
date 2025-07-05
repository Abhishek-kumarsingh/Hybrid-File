import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  useTheme,
  Card,
  CardContent,
  Rating
} from '@mui/material';
import {
  CheckCircle as StrengthIcon,
  Cancel as WeaknessIcon,
  Lightbulb as TipIcon,
  QuestionAnswer as QuestionIcon,
  BarChart as AnalyticsIcon,
  Assignment as TranscriptIcon,
  Download as DownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import Button from '../common/Button';
import SkillsAnalysis from './SkillsAnalysis';
import ImprovementSuggestions from './ImprovementSuggestions';
import FeedbackExport from './FeedbackExport';

// Mock data for demonstration
const mockFeedback = {
  id: '123',
  date: '2023-06-15',
  jobRole: 'Frontend Developer',
  company: 'Tech Solutions Inc.',
  duration: '28 minutes',
  overallScore: 85,
  summary: "You demonstrated strong knowledge of React and JavaScript fundamentals. Your explanations were clear and concise. Areas for improvement include system design considerations and more in-depth knowledge of performance optimization techniques.",
  strengths: [
    "Strong understanding of React component lifecycle",
    "Clear explanation of JavaScript closures and scope",
    "Good problem-solving approach with clear communication",
    "Solid knowledge of modern ES6+ features"
  ],
  weaknesses: [
    "Limited experience with performance optimization",
    "Could improve knowledge of system design patterns",
    "Some hesitation when discussing complex state management"
  ],
  questions: [
    {
      question: "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
      answer: "Sure, in JavaScript, 'var' is function-scoped and can be redeclared and updated. 'let' is block-scoped, can be updated but not redeclared. 'const' is also block-scoped but can't be updated or redeclared after initialization.",
      feedback: "Excellent explanation that covers all the key differences. You clearly understand variable declarations in JavaScript.",
      score: 95
    },
    {
      question: "What is the virtual DOM in React and why is it important?",
      answer: "The virtual DOM is a lightweight copy of the actual DOM in memory. React uses it to improve performance by minimizing direct manipulation of the DOM. It compares the virtual DOM with the real DOM and only updates what has changed, reducing expensive DOM operations.",
      feedback: "Good explanation of the concept and its benefits. You could have mentioned reconciliation process in more detail.",
      score: 85
    },
    {
      question: "Explain the concept of React hooks and give examples of some commonly used hooks.",
      answer: "React hooks are functions that let you use state and other React features in functional components. Common hooks include useState for state management, useEffect for side effects, useContext for context API, useRef for references, and useCallback/useMemo for optimization.",
      feedback: "Comprehensive answer covering the main hooks. Good job explaining their purposes.",
      score: 90
    }
  ],
  skillsAnalysis: {
    technical: [
      { name: "React.js", score: 85 },
      { name: "JavaScript", score: 90 },
      { name: "CSS/SCSS", score: 75 },
      { name: "Performance Optimization", score: 65 },
      { name: "State Management", score: 80 }
    ],
    soft: [
      { name: "Communication", score: 85 },
      { name: "Problem Solving", score: 80 },
      { name: "Confidence", score: 75 },
      { name: "Articulation", score: 85 }
    ]
  },
  improvementSuggestions: [
    {
      area: "Performance Optimization",
      suggestion: "Study React performance optimization techniques like memoization, code splitting, and lazy loading.",
      resources: ["https://reactjs.org/docs/optimizing-performance.html", "Performance Optimization in React (Book)"]
    },
    {
      area: "System Design",
      suggestion: "Practice designing scalable frontend architectures and component hierarchies.",
      resources: ["Frontend System Design Course", "https://www.patterns.dev"]
    },
    {
      area: "State Management",
      suggestion: "Deepen your understanding of complex state management with Redux or Context API.",
      resources: ["Redux Documentation", "Advanced State Management in React (Course)"]
    }
  ]
};

const DetailedFeedback = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the feedback data from your API
    // For now, we'll use the mock data after a short delay to simulate loading
    const timer = setTimeout(() => {
      setFeedback(mockFeedback);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">Loading feedback...</Typography>
      </Box>
    );
  }

  if (!feedback) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>Feedback not found</Typography>
        <Button variant="contained" onClick={() => navigate('/history')}>
          Back to Interview History
        </Button>
      </Box>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'success.main';
    if (score >= 70) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Interview Feedback
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Detailed analysis and feedback from your {feedback.jobRole} interview.
        </Typography>
      </Box>

      {/* Summary Card */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Interview Summary
              </Typography>
              <Typography variant="body1">
                {feedback.summary}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Job Role
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {feedback.jobRole}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Company
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {feedback.company}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {feedback.date}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {feedback.duration}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Overall Score
              </Typography>
              <Box 
                sx={{ 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: `${getScoreColor(feedback.overallScore)}20`,
                  mb: 1
                }}
              >
                <Typography 
                  variant="h3" 
                  component="div" 
                  fontWeight="bold"
                  sx={{ color: getScoreColor(feedback.overallScore) }}
                >
                  {feedback.overallScore}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute',
                    bottom: 30,
                    color: getScoreColor(feedback.overallScore)
                  }}
                >
                  /100
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: getScoreColor(feedback.overallScore),
                  fontWeight: 'medium'
                }}
              >
                {feedback.overallScore >= 80 ? 'Excellent' : 
                 feedback.overallScore >= 70 ? 'Good' : 'Needs Improvement'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: 3,
            },
          }}
        >
          <Tab 
            icon={<QuestionIcon />} 
            label="Questions" 
            iconPosition="start" 
          />
          <Tab 
            icon={<AnalyticsIcon />} 
            label="Skills Analysis" 
            iconPosition="start" 
          />
          <Tab 
            icon={<TipIcon />} 
            label="Improvement Plan" 
            iconPosition="start" 
          />
          <Tab 
            icon={<TranscriptIcon />} 
            label="Full Transcript" 
            iconPosition="start" 
          />
          <Tab 
            icon={<DownloadIcon />} 
            label="Export" 
            iconPosition="start" 
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ mb: 4 }}>
        {/* Questions Tab */}
        {tabValue === 0 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%'
                  }}
                >
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Key Strengths
                  </Typography>
                  <List>
                    {feedback.strengths.map((strength, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <StrengthIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={strength} />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Areas for Improvement
                  </Typography>
                  <List>
                    {feedback.weaknesses.map((weakness, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <WeaknessIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary={weakness} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Question Analysis
                </Typography>
                
                {feedback.questions.map((q, index) => (
                  <Paper 
                    key={index}
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      mb: 3,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {q.question}
                      </Typography>
                      <Chip 
                        label={`${q.score}/100`} 
                        size="small"
                        sx={{ 
                          bgcolor: getScoreColor(q.score),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Your Answer:
                      </Typography>
                      <Typography variant="body1">
                        {q.answer}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <TipIcon color="primary" sx={{ mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Feedback:
                        </Typography>
                        <Typography variant="body1">
                          {q.feedback}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Skills Analysis Tab */}
        {tabValue === 1 && (
          <SkillsAnalysis skillsData={feedback.skillsAnalysis} />
        )}

        {/* Improvement Plan Tab */}
        {tabValue === 2 && (
          <ImprovementSuggestions suggestions={feedback.improvementSuggestions} />
        )}

        {/* Full Transcript Tab */}
        {tabValue === 3 && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Interview Transcript
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Complete record of your interview conversation.
            </Typography>
            
            <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Transcript feature coming soon...
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Export Tab */}
        {tabValue === 4 && (
          <FeedbackExport feedback={feedback} />
        )}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/history')}
        >
          Back to History
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ShareIcon />}
          >
            Share Feedback
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/interview/setup')}
          >
            New Interview
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailedFeedback;
