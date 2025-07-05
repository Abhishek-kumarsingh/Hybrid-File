import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  useTheme,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress
} from '@mui/material';
import {
  SmartToy as BotIcon,
  Person as PersonIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  MoreVert as MoreIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as MuteIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import Button from '../common/Button';
import { useInterview } from '../../context/InterviewContext';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import useSpeechSynthesis from '../../hooks/useSpeechSynthesis';
import { formatTime } from '../../utils/formatters';

const VoiceInterviewInterface = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentInterview, loading, error, startInterview, submitResponse, completeInterview, getNextQuestion } = useInterview();
  
  // Speech recognition and synthesis hooks
  const { transcript, isListening, startListening, stopListening, resetTranscript, browserSupported, error: speechError } = useSpeechRecognition();
  const { speak, speaking, cancel, supported: synthSupported, error: synthError } = useSpeechSynthesis();
  
  // State
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Refs
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);
  
  // Mock interview data (replace with real data from API)
  const [interviewData, setInterviewData] = useState({
    jobRole: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    difficulty: 'medium'
  });

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to handle transcript changes
  useEffect(() => {
    if (transcript && isListening) {
      // Update the current user message as they speak
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.sender === 'user' && lastMessage.isPartial) {
          // Update the last message
          const updatedMessages = [...prev];
          updatedMessages[prev.length - 1] = {
            ...lastMessage,
            content: transcript
          };
          return updatedMessages;
        } else {
          // Add a new user message
          return [...prev, {
            id: Date.now(),
            sender: 'user',
            content: transcript,
            timestamp: new Date(),
            isPartial: true
          }];
        }
      });
    }
  }, [transcript, isListening]);

  // Effect to start timer when interview starts
  useEffect(() => {
    if (interviewStarted && !interviewComplete) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [interviewStarted, interviewComplete]);

  // Effect to load interview data
  useEffect(() => {
    const loadInterview = async () => {
      if (id) {
        // In a real app, you would fetch the interview data here
        // For now, we'll use mock data
        setInterviewData({
          jobRole: 'Frontend Developer',
          company: 'Tech Solutions Inc.',
          difficulty: 'medium'
        });
        
        // Add initial greeting message
        setMessages([
          {
            id: 1,
            sender: 'bot',
            content: "Hello! I'll be conducting your interview for the Frontend Developer position today. When you're ready to begin, click the 'Start Interview' button.",
            timestamp: new Date()
          }
        ]);
      }
    };
    
    loadInterview();
  }, [id]);

  // Format time elapsed
  const formatTimeElapsed = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle starting the interview
  const handleStartInterview = async () => {
    setInterviewStarted(true);
    
    // Add a message indicating the interview has started
    const startMessage = {
      id: Date.now(),
      sender: 'bot',
      content: `Great! Let's begin the interview for the ${interviewData.jobRole} position. I'll ask you a series of questions. Please speak clearly into your microphone when answering.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, startMessage]);
    
    // Speak the message if not muted
    if (!isMuted) {
      speak(startMessage.content);
    }
    
    // Wait for the bot to finish speaking
    setTimeout(() => {
      // Ask the first question
      handleNextQuestion();
    }, 2000);
  };

  // Handle getting the next question
  const handleNextQuestion = async () => {
    setIsTyping(true);
    
    try {
      // In a real app, you would fetch the next question from the API
      // For now, we'll use mock questions
      const mockQuestions = [
        "Can you explain the difference between let, const, and var in JavaScript?",
        "What is the virtual DOM in React and why is it important?",
        "How do you handle state management in a large React application?",
        "Explain the concept of closures in JavaScript.",
        "What are the key features of ES6 that you use frequently?"
      ];
      
      // Get a random question that hasn't been asked yet
      const askedQuestions = messages
        .filter(m => m.sender === 'bot' && m.isQuestion)
        .map(m => m.content);
      
      const availableQuestions = mockQuestions.filter(q => !askedQuestions.includes(q));
      
      let nextQuestion;
      if (availableQuestions.length > 0) {
        nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        setProgress(Math.min(100, (askedQuestions.length + 1) * (100 / mockQuestions.length)));
      } else {
        // All questions have been asked
        handleCompleteInterview();
        return;
      }
      
      // Add the question to messages
      const questionMessage = {
        id: Date.now(),
        sender: 'bot',
        content: nextQuestion,
        timestamp: new Date(),
        isQuestion: true
      };
      
      setMessages(prev => [...prev, questionMessage]);
      setCurrentQuestion(questionMessage);
      
      // Speak the question if not muted
      if (!isMuted) {
        speak(nextQuestion);
      }
    } catch (err) {
      console.error('Error getting next question:', err);
      setShowErrorDialog(true);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle user response
  const handleUserResponse = () => {
    if (!transcript.trim()) return;
    
    // Finalize the user's response
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.sender === 'user' && lastMessage.isPartial) {
        // Update the last message to remove the partial flag
        const updatedMessages = [...prev];
        updatedMessages[prev.length - 1] = {
          ...lastMessage,
          content: transcript,
          isPartial: false
        };
        return updatedMessages;
      }
      return prev;
    });
    
    // Reset the transcript
    resetTranscript();
    
    // Add a thinking message
    setIsTyping(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Add a feedback message
      const feedbackMessage = {
        id: Date.now(),
        sender: 'bot',
        content: "Thank you! I'm processing your response...",
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, feedbackMessage]);
      
      // Simulate AI thinking time
      setTimeout(() => {
        // Remove the thinking message
        setMessages(prev => prev.slice(0, -1));
        
        // Add a response message
        const responseMessage = {
          id: Date.now(),
          sender: 'bot',
          content: "Your response has been recorded! Moving on to the next question...",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        
        // Ask the next question
        handleNextQuestion();
      }, 2000);
    }, 1000);
  };

  // Handle toggling listening
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Handle exiting the interview
  const handleExitInterview = () => {
    setShowExitDialog(true);
  };

  // Handle closing the exit dialog
  const handleCloseExitDialog = () => {
    setShowExitDialog(false);
  };

  // Handle confirming exit
  const handleConfirmExit = () => {
    setShowExitDialog(false);
    navigate('/interviews');
  };

  // Handle closing the error dialog
  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
  };

  // Handle muting/unmuting
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle pausing/resuming
  const togglePause = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Handle submitting the interview
  const handleSubmitInterview = async () => {
    // In a real app, you would submit the interview data here
    // For now, we'll just complete the interview
    handleCompleteInterview();
  };

  // Handle completing the interview
  const handleCompleteInterview = () => {
    setInterviewComplete(true);
    clearInterval(timerRef.current);
    // In a real app, you would submit the interview data here
    // For now, we'll just add a completion message
    const completionMessage = {
      id: Date.now(),
      sender: 'bot',
      content: "Thank you! Your interview has been submitted. You can view your results in the 'My Interviews' section.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, completionMessage]);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <BotIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              AI Interviewer (Voice Mode)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {interviewData.jobRole} • {interviewData.difficulty.charAt(0).toUpperCase() + interviewData.difficulty.slice(1)} Difficulty
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={isMuted ? "Unmute" : "Mute"}>
            <IconButton onClick={toggleMute}>
              {isMuted ? <MuteIcon /> : <VolumeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isListening ? "Pause" : "Resume"}>
            <IconButton onClick={togglePause}>
              {isListening ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleExitInterview}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>
      
      {/* Transcript */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          p: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f7fb',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="overline" color="text.secondary" sx={{ textAlign: 'center' }}>
          Interview Transcript
        </Typography>
        
        {messages.map((entry) => (
          <Box 
            key={entry.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar 
                sx={{ 
                  bgcolor: entry.sender === 'user' ? 'primary.main' : 'secondary.main',
                  width: 32,
                  height: 32
                }}
              >
                {entry.sender === 'user' ? <PersonIcon fontSize="small" /> : <BotIcon fontSize="small" />}
              </Avatar>
              <Typography variant="subtitle2" fontWeight="medium">
                {entry.sender === 'user' ? 'You' : 'AI Interviewer'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(entry.timestamp)}
              </Typography>
            </Box>
            <Paper
              elevation={0}
              sx={{
                ml: 5,
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[1]
              }}
            >
              <Typography variant="body1">
                {entry.content}
              </Typography>
            </Paper>
          </Box>
        ))}
        
        {isListening && (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main',
                  width: 32,
                  height: 32
                }}
              >
                <PersonIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="medium">
                You
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(new Date())}
              </Typography>
            </Box>
            <Paper
              elevation={0}
              sx={{
                ml: 5,
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[1],
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box sx={{ 
                width: 24, 
                height: 24, 
                borderRadius: '50%', 
                bgcolor: 'error.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(0.95)',
                    boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.7)',
                  },
                  '70%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)',
                  },
                  '100%': {
                    transform: 'scale(0.95)',
                    boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)',
                  },
                }
              }}>
                <MicIcon sx={{ fontSize: 16, color: 'white' }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Listening to your response...
              </Typography>
            </Paper>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Controls */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderTop: '1px solid',
          borderColor: 'divider',
          borderRadius: '0 0 12px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {interviewStarted && !interviewComplete ? (
          <Button
            variant={isListening ? "outlined" : "contained"}
            color={isListening ? "error" : "primary"}
            onClick={toggleListening}
            startIcon={isListening ? <MicOffIcon /> : <MicIcon />}
            sx={{ 
              borderRadius: 8,
              px: 4,
              py: isListening ? 1.5 : 2,
              minWidth: 200
            }}
          >
            {isListening ? "Stop Recording" : "Start Speaking"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartInterview}
            disabled={interviewStarted}
            sx={{ 
              borderRadius: 8,
              px: 4,
              py: 2,
              minWidth: 200
            }}
          >
            {interviewStarted ? "Interview Started" : "Start Interview"}
          </Button>
        )}
      </Paper>

      {/* Exit Interview Dialog */}
      <Dialog
        open={showExitDialog}
        onClose={handleCloseExitDialog}
        aria-labelledby="exit-dialog-title"
        aria-describedby="exit-dialog-description"
      >
        <DialogTitle id="exit-dialog-title">Exit Interview</DialogTitle>
        <DialogContent>
          <DialogContentText id="exit-dialog-description">
            Are you sure you want to exit the interview? Your progress will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExitDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmExit} color="error">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={showErrorDialog}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            An error occurred while trying to get the next question. Please try again later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoiceInterviewInterface;


