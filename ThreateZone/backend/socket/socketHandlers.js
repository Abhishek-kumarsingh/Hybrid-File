import { anomalyDetector } from '../services/machineLearning.js';
import { getLatestSensorData } from '../services/sensorSimulation.js';
import SensorReading from '../models/SensorReading.js';
import Threat from '../models/Threat.js';
import Alert from '../models/Alert.js';
import { cacheGet, cacheSet } from '../config/redis.js';

let connectedClients = new Map();
let roomSubscriptions = new Map();

export const setupSocketHandlers = (io) => {
  console.log('🔌 Setting up Socket.io handlers...');

  io.on('connection', (socket) => {
    console.log(`👤 Client connected: ${socket.id}`);
    
    // Store client info
    connectedClients.set(socket.id, {
      id: socket.id,
      connectedAt: new Date(),
      rooms: new Set(),
      userId: null,
      userRole: null
    });

    // Send initial data
    sendInitialData(socket);

    // Authentication
    socket.on('authenticate', async (data) => {
      try {
        const { token, userId, userRole } = data;
        
        // In a real app, verify the JWT token here
        const client = connectedClients.get(socket.id);
        if (client) {
          client.userId = userId;
          client.userRole = userRole;
          connectedClients.set(socket.id, client);
        }

        socket.emit('authenticated', { success: true, userId });
        console.log(`🔐 Client ${socket.id} authenticated as ${userId} (${userRole})`);
        
      } catch (error) {
        console.error('❌ Authentication error:', error);
        socket.emit('authenticated', { success: false, error: error.message });
      }
    });

    // Join specific rooms for targeted updates
    socket.on('join-room', (roomName) => {
      socket.join(roomName);
      
      const client = connectedClients.get(socket.id);
      if (client) {
        client.rooms.add(roomName);
        connectedClients.set(socket.id, client);
      }

      // Track room subscriptions
      if (!roomSubscriptions.has(roomName)) {
        roomSubscriptions.set(roomName, new Set());
      }
      roomSubscriptions.get(roomName).add(socket.id);

      console.log(`📡 Client ${socket.id} joined room: ${roomName}`);
      socket.emit('room-joined', { room: roomName });
    });

    // Leave room
    socket.on('leave-room', (roomName) => {
      socket.leave(roomName);
      
      const client = connectedClients.get(socket.id);
      if (client) {
        client.rooms.delete(roomName);
        connectedClients.set(socket.id, client);
      }

      if (roomSubscriptions.has(roomName)) {
        roomSubscriptions.get(roomName).delete(socket.id);
      }

      console.log(`📡 Client ${socket.id} left room: ${roomName}`);
    });

    // Request latest sensor data
    socket.on('request-sensor-data', async () => {
      try {
        const sensorData = await getLatestSensorData();
        socket.emit('sensor-data', sensorData);
      } catch (error) {
        console.error('❌ Error sending sensor data:', error);
        socket.emit('error', { message: 'Failed to fetch sensor data' });
      }
    });

    // Request threat data
    socket.on('request-threat-data', async () => {
      try {
        const threats = await Threat.find({ isActive: true })
          .sort({ timestamp: -1 })
          .limit(50);
        socket.emit('threat-data', threats);
      } catch (error) {
        console.error('❌ Error sending threat data:', error);
        socket.emit('error', { message: 'Failed to fetch threat data' });
      }
    });

    // Request alert data
    socket.on('request-alert-data', async () => {
      try {
        const alerts = await Alert.find({ isActive: true })
          .sort({ timestamp: -1 })
          .limit(50);
        socket.emit('alert-data', alerts);
      } catch (error) {
        console.error('❌ Error sending alert data:', error);
        socket.emit('error', { message: 'Failed to fetch alert data' });
      }
    });

    // Handle sensor reading analysis request
    socket.on('analyze-sensor-reading', async (data) => {
      try {
        const { sensorId, value, timestamp } = data;
        
        const reading = {
          sensorId,
          value,
          timestamp: new Date(timestamp),
          unit: 'units', // This should come from sensor config
          status: 'normal',
          location: 'Unknown',
          type: 'unknown'
        };

        const analysis = await anomalyDetector.detectAnomaly(reading);
        
        socket.emit('analysis-result', {
          sensorId,
          analysis,
          timestamp: new Date()
        });

      } catch (error) {
        console.error('❌ Error analyzing sensor reading:', error);
        socket.emit('error', { message: 'Failed to analyze sensor reading' });
      }
    });

    // Handle threat acknowledgment
    socket.on('acknowledge-threat', async (data) => {
      try {
        const { threatId, userId } = data;
        
        const threat = await Threat.findOne({ threatId });
        if (threat) {
          await threat.acknowledge(userId);
          
          // Broadcast to all clients
          io.emit('threat-update', threat);
          
          socket.emit('threat-acknowledged', { threatId, success: true });
        } else {
          socket.emit('threat-acknowledged', { threatId, success: false, error: 'Threat not found' });
        }

      } catch (error) {
        console.error('❌ Error acknowledging threat:', error);
        socket.emit('error', { message: 'Failed to acknowledge threat' });
      }
    });

    // Handle threat resolution
    socket.on('resolve-threat', async (data) => {
      try {
        const { threatId, userId, notes } = data;
        
        const threat = await Threat.findOne({ threatId });
        if (threat) {
          await threat.resolve(userId, notes);
          
          // Broadcast to all clients
          io.emit('threat-update', threat);
          
          socket.emit('threat-resolved', { threatId, success: true });
        } else {
          socket.emit('threat-resolved', { threatId, success: false, error: 'Threat not found' });
        }

      } catch (error) {
        console.error('❌ Error resolving threat:', error);
        socket.emit('error', { message: 'Failed to resolve threat' });
      }
    });

    // Handle system status request
    socket.on('request-system-status', async () => {
      try {
        const status = await getSystemStatus();
        socket.emit('system-status', status);
      } catch (error) {
        console.error('❌ Error getting system status:', error);
        socket.emit('error', { message: 'Failed to get system status' });
      }
    });

    // Handle ping for connection health
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date() });
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`👤 Client disconnected: ${socket.id} (${reason})`);
      
      // Clean up client data
      const client = connectedClients.get(socket.id);
      if (client) {
        // Remove from room subscriptions
        client.rooms.forEach(room => {
          if (roomSubscriptions.has(room)) {
            roomSubscriptions.get(room).delete(socket.id);
          }
        });
      }
      
      connectedClients.delete(socket.id);
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`❌ Socket error for client ${socket.id}:`, error);
    });
  });

  // Periodic system status broadcast
  setInterval(async () => {
    try {
      const status = await getSystemStatus();
      io.emit('system-status-update', status);
    } catch (error) {
      console.error('❌ Error broadcasting system status:', error);
    }
  }, 30000); // Every 30 seconds

  console.log('✅ Socket.io handlers configured');
};

// Send initial data to newly connected client
const sendInitialData = async (socket) => {
  try {
    // Send latest sensor data
    const sensorData = await getLatestSensorData();
    socket.emit('sensor-data', sensorData);

    // Send recent threats
    const threats = await Threat.find({ isActive: true })
      .sort({ timestamp: -1 })
      .limit(20);
    socket.emit('threat-data', threats);

    // Send system status
    const status = await getSystemStatus();
    socket.emit('system-status', status);

    console.log(`📊 Initial data sent to client ${socket.id}`);
    
  } catch (error) {
    console.error('❌ Error sending initial data:', error);
  }
};

// Get system status
const getSystemStatus = async () => {
  try {
    // Check cache first
    const cached = await cacheGet('system:status');
    if (cached) {
      return cached;
    }

    // Calculate system status
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const [
      totalSensors,
      activeSensors,
      activeThreats,
      recentAlerts
    ] = await Promise.all([
      SensorReading.distinct('sensorId').then(ids => ids.length),
      SensorReading.distinct('sensorId', { timestamp: { $gte: oneHourAgo } }).then(ids => ids.length),
      Threat.countDocuments({ status: 'active', isActive: true }),
      Alert.countDocuments({ timestamp: { $gte: oneHourAgo }, isActive: true })
    ]);

    const status = {
      timestamp: now,
      sensors: {
        total: totalSensors,
        active: activeSensors,
        offline: totalSensors - activeSensors
      },
      threats: {
        active: activeThreats
      },
      alerts: {
        recent: recentAlerts
      },
      system: {
        uptime: process.uptime(),
        connectedClients: connectedClients.size,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version
      }
    };

    // Cache for 30 seconds
    await cacheSet('system:status', status, 30);

    return status;
    
  } catch (error) {
    console.error('❌ Error getting system status:', error);
    return {
      timestamp: new Date(),
      error: 'Failed to get system status'
    };
  }
};

// Get connected clients info
export const getConnectedClients = () => {
  return Array.from(connectedClients.values());
};

// Broadcast to specific room
export const broadcastToRoom = (io, room, event, data) => {
  io.to(room).emit(event, data);
};

// Broadcast to all clients
export const broadcastToAll = (io, event, data) => {
  io.emit(event, data);
};

export default {
  setupSocketHandlers,
  getConnectedClients,
  broadcastToRoom,
  broadcastToAll
};
