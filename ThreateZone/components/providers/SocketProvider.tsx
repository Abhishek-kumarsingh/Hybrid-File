'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectionError: string | null;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectionError: null,
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setIsConnected(true);
      setConnectionError(null);
      toast.success('Connected to real-time updates');
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);

      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try to reconnect
        newSocket.connect();
      }

      toast.warning('Disconnected from real-time updates');
    });

    newSocket.on('connect_error', (error) => {
      console.error('🔥 Socket connection error:', error);
      setConnectionError(error.message);
      setIsConnected(false);
      toast.error('Failed to connect to real-time updates');
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
      setIsConnected(true);
      setConnectionError(null);
      toast.success('Reconnected to real-time updates');
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('🔥 Socket reconnection error:', error);
      setConnectionError(error.message);
    });

    newSocket.on('reconnect_failed', () => {
      console.error('💀 Socket reconnection failed');
      setConnectionError('Failed to reconnect after maximum attempts');
      toast.error('Unable to reconnect to real-time updates');
    });

    // Custom event handlers for the application
    newSocket.on('sensor_data_update', (data) => {
      console.log('📊 Received sensor data update:', data);
    });

    newSocket.on('threat_alert', (alert) => {
      console.log('🚨 Received threat alert:', alert);
      toast.error(`Threat Alert: ${alert.type}`, {
        description: alert.description,
        duration: 10000,
      });
    });

    newSocket.on('system_status_update', (status) => {
      console.log('⚡ System status update:', status);
    });

    newSocket.on('emergency_alert', (alert) => {
      console.log('🚨 EMERGENCY ALERT:', alert);
      toast.error(`EMERGENCY: ${alert.title}`, {
        description: alert.message,
        duration: 0, // Don't auto-dismiss emergency alerts
      });
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up socket connection');
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    isConnected,
    connectionError,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
