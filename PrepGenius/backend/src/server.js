const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectToDatabase } = require('./config/database');
const { PORT } = require('./config/env');
const logger = require('./utils/logger');
const errorMiddleware = require('./api/middlewares/error.middleware');

// Import routes
const authRoutes = require('./api/routes/auth.routes');
const userRoutes = require('./api/routes/user.routes');
const interviewRoutes = require('./api/routes/interview.routes');
const feedbackRoutes = require('./api/routes/feedback.routes');

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app;