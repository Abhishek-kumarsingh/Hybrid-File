import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import { initializeDatabase } from './config/database.js';
import { initializeRedis } from './config/redis.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';
import { setupSocketHandlers } from './socket/socketHandlers.js';
import { startSensorSimulation } from './services/sensorSimulation.js';
import { initializeMachineLearning } from './services/machineLearning.js';

// Import routes
import authRoutes from './routes/auth.js';
import sensorRoutes from './routes/sensors.js';
import threatRoutes from './routes/threats.js';
import alertRoutes from './routes/alerts.js';
import analyticsRoutes from './routes/analytics.js';
import userRoutes from './routes/users.js';
import heatmapRoutes from './routes/heatmap.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/sensors', authMiddleware, sensorRoutes);
app.use('/api/threats', authMiddleware, threatRoutes);
app.use('/api/alerts', authMiddleware, alertRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/heatmap', authMiddleware, heatmapRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist.`
  });
});

// Initialize services
async function initializeServices() {
  try {
    console.log('🚀 Initializing ThreatZone Prediction System...');
    
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database connected');
    
    // Initialize Redis
    await initializeRedis();
    console.log('✅ Redis connected');
    
    // Initialize machine learning models
    await initializeMachineLearning();
    console.log('✅ Machine learning models initialized');
    
    // Setup socket handlers
    setupSocketHandlers(io);
    console.log('✅ Socket.io handlers configured');
    
    // Start sensor simulation
    startSensorSimulation(io);
    console.log('✅ Sensor simulation started');
    
    console.log('🎉 All services initialized successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize services:', error);
    process.exit(1);
  }
}

// Start server
const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  console.log(`🌐 ThreatZone Prediction System running on port ${PORT}`);
  console.log(`📊 Dashboard available at: http://localhost:${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
  
  await initializeServices();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close();
    process.exit(0);
  });
});

export { app, server, io };
