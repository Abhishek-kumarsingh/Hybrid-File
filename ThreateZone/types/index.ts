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
  permissions?: string[];
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

// Enhanced types for the comprehensive system

export interface Sensor {
  id: string;
  sensorId: string;
  name: string;
  type: 'pressure' | 'temperature' | 'vibration' | 'gas' | 'flow' | 'level' | 'ph' | 'conductivity';
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    zone: string;
  };
  specifications: {
    minValue: number;
    maxValue: number;
    unit: string;
    accuracy: number;
    resolution: number;
  };
  thresholds: {
    warning: {
      min: number;
      max: number;
    };
    critical: {
      min: number;
      max: number;
    };
  };
  status: 'online' | 'offline' | 'maintenance' | 'error';
  lastReading: SensorData | null;
  installationDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  batteryLevel?: number;
  signalStrength?: number;
}

export interface Alert {
  id: string;
  type: 'sensor' | 'threat' | 'system' | 'security' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: {
    type: 'sensor' | 'system' | 'user' | 'ml_model';
    id: string;
    name: string;
  };
  location: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'false_positive';
  assignedTo?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  escalationLevel: number;
  escalatedAt?: string;
  relatedAlerts: string[];
  actions: AlertAction[];
  metadata: Record<string, any>;
}

export interface AlertAction {
  id: string;
  type: 'notification' | 'automation' | 'escalation' | 'shutdown' | 'maintenance';
  description: string;
  executedAt: string;
  executedBy: string;
  status: 'pending' | 'executed' | 'failed' | 'cancelled';
  result?: string;
}

export interface ThreatZone {
  id: string;
  name: string;
  description: string;
  center: {
    lat: number;
    lng: number;
  };
  radius: number; // in meters
  riskLevel: 'green' | 'yellow' | 'orange' | 'red';
  riskScore: number; // 0-100
  threatTypes: string[];
  affectedSensors: string[];
  activeThreatCount: number;
  lastUpdated: string;
  isActive: boolean;
  evacuationRequired: boolean;
  emergencyContacts: string[];
  responseProtocols: string[];
}

export interface HeatMapData {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  value: number;
  intensity: number; // 0-1
  type: 'temperature' | 'pressure' | 'risk' | 'threat_density';
  timestamp: string;
  metadata: Record<string, any>;
}

export interface MachineLearningModel {
  id: string;
  name: string;
  type: 'anomaly_detection' | 'prediction' | 'classification' | 'clustering';
  version: string;
  status: 'training' | 'active' | 'inactive' | 'error';
  accuracy: number;
  lastTrained: string;
  trainingDataSize: number;
  features: string[];
  parameters: Record<string, any>;
  predictions: ModelPrediction[];
}

export interface ModelPrediction {
  id: string;
  modelId: string;
  timestamp: string;
  input: Record<string, any>;
  output: Record<string, any>;
  confidence: number;
  actualOutcome?: Record<string, any>;
  feedback?: 'correct' | 'incorrect' | 'partially_correct';
}

export interface NotificationChannel {
  id: string;
  type: 'email' | 'sms' | 'push' | 'webhook' | 'slack' | 'teams';
  name: string;
  configuration: Record<string, any>;
  isActive: boolean;
  recipients: string[];
  filters: {
    severity: string[];
    types: string[];
    locations: string[];
  };
  rateLimiting: {
    maxPerHour: number;
    maxPerDay: number;
  };
}

export interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  components: {
    database: ComponentHealth;
    sensors: ComponentHealth;
    api: ComponentHealth;
    ml_models: ComponentHealth;
    notifications: ComponentHealth;
  };
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
  lastCheck: string;
}

export interface ComponentHealth {
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  message: string;
  lastCheck: string;
  metrics?: Record<string, number>;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  errorMessage?: string;
}
