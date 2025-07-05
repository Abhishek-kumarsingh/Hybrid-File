import { io } from 'socket.io-client';
import { mockSensorData, mockThreats, generateRandomSensorData, generateRandomThreat } from '../data/mockData';
import { SensorData, Threat } from '../types';

// This is a mock socket implementation that simulates real-time data
// In a real application, this would connect to a backend server
class MockSocket {
  private listeners: Record<string, Array<(data: any) => void>> = {};
  private sensorData: SensorData[] = [...mockSensorData];
  private threats: Threat[] = [...mockThreats];
  private interval: number | null = null;

  constructor() {
    // No actual connection is made
    console.log('Mock socket initialized');
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return this;
  }

  emit(event: string, data?: any) {
    console.log(`Mock socket emitting ${event}`, data);
    // In a real implementation, this would send data to the server
    return this;
  }

  connect() {
    // Start sending mock real-time data
    this.startMockDataStream();
    return this;
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    return this;
  }

  private startMockDataStream() {
    // Emit initial data
    setTimeout(() => {
      this.emitToListeners('sensor-data', this.sensorData);
      this.emitToListeners('threat-data', this.threats);
    }, 500);

    // Emit updates every few seconds
    this.interval = setInterval(() => {
      // 20% chance to add a new sensor reading
      if (Math.random() < 0.2) {
        const newSensorData = generateRandomSensorData();
        this.sensorData = [newSensorData, ...this.sensorData.slice(0, 19)]; // Keep last 20
        this.emitToListeners('new-sensor-reading', newSensorData);
      }

      // 5% chance to add a new threat
      if (Math.random() < 0.05) {
        const newThreat = generateRandomThreat();
        this.threats = [newThreat, ...this.threats.slice(0, 19)]; // Keep last 20
        this.emitToListeners('new-threat', newThreat);
      }

      // 10% chance to update a threat status
      if (Math.random() < 0.1 && this.threats.length > 0) {
        const index = Math.floor(Math.random() * this.threats.length);
        const statuses: Array<'active' | 'resolved' | 'investigating'> = ['active', 'resolved', 'investigating'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const updatedThreat = {
          ...this.threats[index],
          status: newStatus
        };
        
        this.threats = [
          ...this.threats.slice(0, index),
          updatedThreat,
          ...this.threats.slice(index + 1)
        ];
        
        this.emitToListeners('threat-update', updatedThreat);
      }
    }, 5000); // Every 5 seconds
  }

  private emitToListeners(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

// Create and export the mock socket instance
export const socket = new MockSocket();

// Helper function to initialize the socket connection
export const initializeSocket = () => {
  socket.connect();
  return socket;
};