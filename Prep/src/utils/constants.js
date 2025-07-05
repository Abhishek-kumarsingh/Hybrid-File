// App constants
export const APP_NAME = 'InterviewPro';
export const APP_VERSION = '1.0.0';

// Authentication
export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';
export const SESSION_TIMEOUT = 3600000; // 1 hour in milliseconds

// Interview types
export const INTERVIEW_MODES = {
  TEXT: 'text',
  VOICE: 'voice',
  VIDEO: 'video'
};

// Interview difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Common job roles
export const JOB_ROLES = [
  { id: 'software-engineer', title: 'Software Engineer' },
  { id: 'frontend-developer', title: 'Frontend Developer' },
  { id: 'backend-developer', title: 'Backend Developer' },
  { id: 'fullstack-developer', title: 'Full Stack Developer' },
  { id: 'data-scientist', title: 'Data Scientist' },
  { id: 'data-engineer', title: 'Data Engineer' },
  { id: 'devops-engineer', title: 'DevOps Engineer' },
  { id: 'product-manager', title: 'Product Manager' },
  { id: 'project-manager', title: 'Project Manager' },
  { id: 'ux-designer', title: 'UX Designer' },
  { id: 'ui-designer', title: 'UI Designer' },
  { id: 'qa-engineer', title: 'QA Engineer' },
  { id: 'security-engineer', title: 'Security Engineer' },
  { id: 'mobile-developer', title: 'Mobile Developer' },
  { id: 'cloud-architect', title: 'Cloud Architect' }
];

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx']
};

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  PROFILE: '/user/profile',
  INTERVIEWS: '/interviews',
  FEEDBACK: '/feedback'
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme_mode',
  RECENT_JOBS: 'recent_job_roles',
  INTERVIEW_HISTORY: 'interview_history',
  USER_PREFERENCES: 'user_preferences'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your internet connection.',
  SERVER: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  DEFAULT: 'Something went wrong. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  INTERVIEW_CREATED: 'Interview created successfully!',
  FEEDBACK_SAVED: 'Feedback saved successfully!'
};