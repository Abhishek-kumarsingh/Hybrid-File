import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Database Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/threatzone',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    }
  },

  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: process.env.REDIS_DB || 0,
    keyPrefix: 'threatzone:',
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // Email Configuration (Nodemailer)
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password',
    },
    from: process.env.EMAIL_FROM || 'ThreatZone System <noreply@threatzone.com>',
  },

  // SMS Configuration (Twilio)
  sms: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'your-twilio-account-sid',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'your-twilio-auth-token',
    fromNumber: process.env.TWILIO_FROM_NUMBER || '+1234567890',
  },

  // Firebase Configuration (Push Notifications)
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'threatzone-project',
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk@threatzone-project.iam.gserviceaccount.com',
  },

  // Sensor Configuration
  sensors: {
    simulationInterval: parseInt(process.env.SENSOR_SIMULATION_INTERVAL) || 5000, // 5 seconds
    dataRetentionDays: parseInt(process.env.SENSOR_DATA_RETENTION_DAYS) || 30,
    batchSize: parseInt(process.env.SENSOR_BATCH_SIZE) || 100,
    anomalyThreshold: parseFloat(process.env.ANOMALY_THRESHOLD) || 0.8,
  },

  // Alert Configuration
  alerts: {
    escalationTimeMinutes: parseInt(process.env.ALERT_ESCALATION_TIME) || 15,
    maxRetries: parseInt(process.env.ALERT_MAX_RETRIES) || 3,
    retryDelayMinutes: parseInt(process.env.ALERT_RETRY_DELAY) || 5,
  },

  // Machine Learning Configuration
  ml: {
    modelUpdateInterval: parseInt(process.env.ML_MODEL_UPDATE_INTERVAL) || 3600000, // 1 hour
    trainingDataSize: parseInt(process.env.ML_TRAINING_DATA_SIZE) || 10000,
    anomalyDetectionThreshold: parseFloat(process.env.ML_ANOMALY_THRESHOLD) || 0.7,
    predictionHorizonHours: parseInt(process.env.ML_PREDICTION_HORIZON) || 24,
  },

  // Heat Map Configuration
  heatmap: {
    gridSize: parseInt(process.env.HEATMAP_GRID_SIZE) || 50,
    updateInterval: parseInt(process.env.HEATMAP_UPDATE_INTERVAL) || 30000, // 30 seconds
    maxDataPoints: parseInt(process.env.HEATMAP_MAX_DATA_POINTS) || 1000,
  },

  // Security Configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000, // 15 minutes
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT) || 3600000, // 1 hour
  },

  // Geospatial Configuration
  geospatial: {
    defaultLatitude: parseFloat(process.env.DEFAULT_LATITUDE) || 29.7604,
    defaultLongitude: parseFloat(process.env.DEFAULT_LONGITUDE) || -95.3698,
    defaultZoom: parseInt(process.env.DEFAULT_ZOOM) || 10,
    maxSearchRadius: parseInt(process.env.MAX_SEARCH_RADIUS) || 50000, // 50km in meters
  },

  // Risk Assessment Configuration
  risk: {
    zones: {
      green: { min: 0, max: 30, color: '#22c55e' },
      yellow: { min: 31, max: 60, color: '#eab308' },
      orange: { min: 61, max: 80, color: '#f97316' },
      red: { min: 81, max: 100, color: '#ef4444' }
    },
    updateInterval: parseInt(process.env.RISK_UPDATE_INTERVAL) || 60000, // 1 minute
    historyRetentionDays: parseInt(process.env.RISK_HISTORY_RETENTION) || 90,
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined',
    maxFiles: parseInt(process.env.LOG_MAX_FILES) || 5,
    maxSize: process.env.LOG_MAX_SIZE || '10m',
  }
};

// Validation function
export function validateConfig() {
  const requiredEnvVars = [
    'JWT_SECRET',
    'MONGODB_URI'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn('⚠️  Missing environment variables:', missingVars.join(', '));
    console.warn('⚠️  Using default values. Please set these in production.');
  }

  return {
    isValid: missingVars.length === 0,
    missingVars
  };
}

export default config;
