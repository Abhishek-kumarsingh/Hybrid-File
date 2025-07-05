export interface Threat {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  location: string;
  description: string;
  status: 'active' | 'resolved' | 'investigating';
  assignedTo?: string;
}

export interface SensorData {
  id: string;
  sensorId: string;
  timestamp: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  location: string;
  type: string;
}

export interface Refinery {
  id: string;
  name: string;
  location: string;
  status: 'operational' | 'maintenance' | 'shutdown';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'operator' | 'analyst';
  email: string;
  avatar?: string;
}

export interface DashboardStats {
  activeThreatCount: number;
  criticalSensorAlerts: number;
  resolvedIncidents: number;
  systemStatus: 'operational' | 'degraded' | 'critical';
  uptime: number;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface ThreatsByType {
  type: string;
  count: number;
}

export interface ThreatsBySeverity {
  severity: 'critical' | 'high' | 'medium' | 'low';
  count: number;
}