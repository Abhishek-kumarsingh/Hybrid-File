import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  Card,
  CardContent,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Divider,
  Chip
} from '@mui/material';
import {
  Work as WorkIcon,
  Description as DescriptionIcon,
  Speed as SpeedIcon,
  Chat as ChatIcon,
  Mic as MicIcon
} from '@mui/icons-material';
import Button from '../common/Button';
import JobRoleSelection from './JobRoleSelection';
import ResumeUpload from './ResumeUpload';
import DifficultySelection from './DifficultySelection';
import InterviewMode from './InterviewMode';

const steps = [
  {
    label: 'Select Job Role',
    description: 'Choose the position you are interviewing for',
    icon: <WorkIcon />
  },
  {
    label: 'Upload Resume/Job Description',
    description: 'Provide your resume and the job description',
    icon: <DescriptionIcon />
  },
  {
    label: 'Select Difficulty',
    description: 'Choose how challenging you want the interview to be',
    icon: <SpeedIcon />
  },
  {
    label: 'Choose Interview Mode',
    description: 'Select between text or voice interview',
    icon: <ChatIcon />
  }
];

const InterviewSetup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [interviewData, setInterviewData] = useState({
    jobRole: '',
    resume: null,
    jobDescription: '',
    difficulty: 'medium',
    mode: 'text'
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    // Here you would typically send the data to your backend
    console.log('Interview setup data:', interviewData);
    
    // Navigate to the appropriate interview interface
    if (interviewData.mode === 'text') {
      navigate('/interview/text/new');
    } else {
      navigate('/interview/voice/new');
    }
  };

  const handleJobRoleChange = (role) => {
    setInterviewData({
      ...interviewData,
      jobRole: role
    });
  };

  const handleResumeUpload = (file) => {
    setInterviewData({
      ...interviewData,
      resume: file
    });
  };

  const handleJobDescriptionChange = (e) => {
    setInterviewData({
      ...interviewData,
      jobDescription: e.target.value
    });
  };

  const handleDifficultyChange = (difficulty) => {
    setInterviewData({
      ...interviewData,
      difficulty
    });
  };

  const handleModeChange = (mode) => {
    setInterviewData({
      ...interviewData,
      mode
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <JobRoleSelection 
                 selectedRole={interviewData.jobRole} 
                 onSelectRole={handleJobRoleChange} 
               />;
      case 1:
        return (
          <Box>
            <ResumeUpload onFileUpload={handleResumeUpload} />
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Job Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Paste the job description here..."
                value={interviewData.jobDescription}
                onChange={handleJobDescriptionChange}
                variant="outlined"
              />
            </Box>
          </Box>
        );
      case 2:
        return <DifficultySelection 
                 selectedDifficulty={interviewData.difficulty} 
                 onSelectDifficulty={handleDifficultyChange} 
               />;
      case 3:
        return <InterviewMode 
                 selectedMode={interviewData.mode} 
                 onSelectMode={handleModeChange} 
               />;
      default:
        return null;
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return !!interviewData.jobRole;
      case 1:
        return !!interviewData.jobDescription;
      case 2:
        return !!interviewData.difficulty;
      case 3:
        return !!interviewData.mode;
      default:
        return false;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Set Up Your Interview
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configure your AI interview session by following these steps.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label} completed={activeStep > index || (activeStep === steps.length - 1 && index === steps.length - 1 && isStepComplete(index))}>
                  <StepLabel 
                    StepIconProps={{ 
                      icon: step.icon,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="medium">
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    
                    {renderStepContent(index)}
                    
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                      >
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={handleComplete}
                          disabled={!isStepComplete(activeStep)}
                        >
                          Start Interview
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={!isStepComplete(activeStep)}
                        >
                          Continue
                        </Button>
                      )}
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              position: 'sticky',
              top: 24
            }}
          >
            <Typography variant="h6" gutterBottom>
              Interview Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Job Role
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {interviewData.jobRole ? 
                  jobRoles.find(role => role.id === interviewData.jobRole)?.title : 
                  'Not selected'}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Resume
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {interviewData.resume ? interviewData.resume.name : 'Not uploaded'}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Job Description
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {interviewData.jobDescription ? 'Provided' : 'Not provided'}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Difficulty
              </Typography>
              <Chip 
                label={interviewData.difficulty.charAt(0).toUpperCase() + interviewData.difficulty.slice(1)} 
                color={
                  interviewData.difficulty === 'easy' ? 'success' : 
                  interviewData.difficulty === 'medium' ? 'warning' : 
                  'error'
                }
                size="small"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Interview Mode
              </Typography>
              <Chip 
                icon={interviewData.mode === 'text' ? <ChatIcon /> : <MicIcon />}
                label={interviewData.mode === 'text' ? 'Text Chat' : 'Voice Conversation'} 
                color="primary"
                size="small"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Define jobRoles here to use in the summary section
const jobRoles = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
  },
  {
    id: 'backend',
    title: 'Backend Developer',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
  },
  {
    id: 'security',
    title: 'Security Engineer',
  },
  {
    id: 'data',
    title: 'Data Scientist',
  },
  {
    id: 'ai',
    title: 'AI/ML Engineer',
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
  }
];

export default InterviewSetup;

