import mongoose from 'mongoose';
import { config } from './config.js';

let isConnected = false;

export const initializeDatabase = async () => {
  if (isConnected) {
    console.log('📊 Database already connected');
    return;
  }

  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('📍 MongoDB URI:', config.mongodb.uri);

    const connection = await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
    console.log('🏢 Database:', connection.connection.name);
    console.log('🌐 Host:', connection.connection.host);
    console.log('🔢 Port:', connection.connection.port);

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
      isConnected = true;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔒 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

    return connection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    isConnected = false;
    throw error;
  }
};

export const getConnectionStatus = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  };
};

export const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('🔒 MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
    throw error;
  }
};

// Connection states
export const CONNECTION_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

export default mongoose;
