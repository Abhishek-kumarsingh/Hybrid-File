import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';

// Layout
import Layout from './components/layout/Layout';

// Auth pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProfileSetup from './components/auth/ProfileSetup';

// Dashboard pages
import Dashboard from './components/dashboard/Dashboard';
import InterviewHistory from './components/dashboard/InterviewHistory';
import Progress from './components/dashboard/Progress';

// Interview pages
import InterviewSetup from './components/interview/InterviewSetup';
import TextInterviewInterface from './components/interview/TextInterviewInterface';
import VoiceInterviewInterface from './components/interview/VoiceInterviewInterface';

// Feedback pages
import DetailedFeedback from './components/feedback/DetailedFeedback';

// Guards
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <InterviewProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/history" element={<InterviewHistory />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/interview/setup" element={<InterviewSetup />} />
                <Route path="/interview/text/:id" element={<TextInterviewInterface />} />
                <Route path="/interview/voice/:id" element={<VoiceInterviewInterface />} />
                <Route path="/feedback/:id" element={<DetailedFeedback />} />
              </Route>
            </Routes>
          </Router>
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;