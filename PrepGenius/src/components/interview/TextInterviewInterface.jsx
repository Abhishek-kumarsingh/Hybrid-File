import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Avatar,
  Divider,
  CircularProgress,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import Button from '../common/Button';

// Mock interview data
const mockInterviewData = {
  jobRole: 'Frontend Developer',
  company: 'Tech Solutions Inc.',
  difficulty: 'medium'
};

// Mock messages for demonstration
const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    content: "Hello! I'm your AI interviewer today. I'll be asking you some questions about frontend development. Let's get started!",
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: 2,
    sender: 'bot',
    content: "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
    timestamp: new Date(Date.now() - 30000)
  }
];

const TextInterviewInterface = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        content: "That's a good explanation. Next question: What is the virtual DOM in React and why is it important?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 3000);
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
              AI Interviewer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockInterviewData.jobRole} • {mockInterviewData.difficulty.charAt(0).toUpperCase() + mockInterviewData.difficulty.slice(1)} Difficulty
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Paper>
      
      {/* Messages */}
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
        {messages.map((message) => (
          <Box 
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              gap: 1.5
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                width: 36,
                height: 36
              }}
            >
              {message.sender === 'user' ? <PersonIcon /> : <BotIcon />}
            </Avatar>
            <Box
              sx={{
                maxWidth: '70%',
                p: 2,
                borderRadius: 2,
                bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
                color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                boxShadow: theme.shadows[1]
              }}
            >
              <Typography variant="body1">
                {message.content}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mt: 1, 
                  textAlign: 'right',
                  color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary',
                  opacity: 0.8
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            </Box>
          </Box>
        ))}
        
        {isTyping && (
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: 'secondary.main',
                width: 36,
                height: 36
              }}
            >
              <BotIcon />
            </Avatar>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[1],
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: 'text.secondary',
                    animation: 'pulse 1s infinite',
                    animationDelay: '0s',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        opacity: 0.5,
                        transform: 'scale(0.8)'
                      },
                      '50%': {
                        opacity: 1,
                        transform: 'scale(1)'
                      }
                    }
                  }} 
                />
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: 'text.secondary',
                    animation: 'pulse 1s infinite',
                    animationDelay: '0.2s'
                  }} 
                />
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: 'text.secondary',
                    animation: 'pulse 1s infinite',
                    animationDelay: '0.4s'
                  }} 
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                AI is typing...
              </Typography>
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Input area */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderTop: '1px solid',
          borderColor: 'divider',
          borderRadius: '0 0 12px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your answer here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          multiline
          maxRows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f7fb',
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={isTyping || newMessage.trim() === ''}
          sx={{ 
            borderRadius: '50%', 
            minWidth: 'auto', 
            width: 48, 
            height: 48,
            p: 0
          }}
        >
          <SendIcon />
        </Button>
      </Paper>
    </Box>
  );
};

export default TextInterviewInterface;
