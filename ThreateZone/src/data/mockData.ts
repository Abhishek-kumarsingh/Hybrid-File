import { Threat, SensorData, Refinery, User, DashboardStats, TimeSeriesData, ThreatsByType, ThreatsBySeverity } from '../types';
import { subDays, subHours, format, subMinutes } from 'date-fns';

// Generate timestamps for the last 7 days
const getTimestampDaysAgo = (daysAgo: number) => format(subDays(new Date(), daysAgo), "yyyy-MM-dd'T'HH:mm:ss");
const getTimestampHoursAgo = (hoursAgo: number) => format(subHours(new Date(), hoursAgo), "yyyy-MM-dd'T'HH:mm:ss");
const getTimestampMinutesAgo = (minutesAgo: number) => format(subMinutes(new Date(), minutesAgo), "yyyy-MM-dd'T'HH:mm:ss");

// Mock Threats
export const mockThreats: Threat[] = [
  {
    id: 't1',
    timestamp: getTimestampHoursAgo(2),
    severity: 'critical',
    type: 'Unauthorized Access',
    location: 'Control Room A',
    description: 'Multiple failed login attempts detected from unknown IP address',
    status: 'active',
    assignedTo: 'User',
  },
  {
    id: 't2',
    timestamp: getTimestampHoursAgo(5),
    severity: 'high',
    type: 'Pressure Anomaly',
    location: 'Pipeline Section B-12',
    description: 'Pressure exceeded safe threshold for over 15 minutes',
    status: 'investigating',
    assignedTo: ' Useron',
  },
  {
    id: 't3',
    timestamp: getTimestampDaysAgo(1),
    severity: 'medium',
    type: 'Temperature Fluctuation',
    location: 'Refinery Unit C',
    description: 'Unexpected temperature drops detected in processing unit',
    status: 'investigating',
  },
  {
    id: 't4',
    timestamp: getTimestampDaysAgo(2),
    severity: 'low',
    type: 'Communication Delay',
    location: 'Remote Sensor Network',
    description: 'Intermittent delays in sensor data transmission',
    status: 'resolved',
  },
  {
    id: 't5',
    timestamp: getTimestampMinutesAgo(30),
    severity: 'critical',
    type: 'Fire Hazard',
    location: 'Storage Tank 7',
    description: 'Smoke detected near flammable material storage',
    status: 'active',
    assignedTo: 'Michael Chen',
  },
  {
    id: 't6',
    timestamp: getTimestampHoursAgo(12),
    severity: 'high',
    type: 'Valve Malfunction',
    location: 'Processing Unit D',
    description: 'Primary safety valve not responding to commands',
    status: 'resolved',
  },
  {
    id: 't7',
    timestamp: getTimestampDaysAgo(3),
    severity: 'medium',
    type: 'Power Fluctuation',
    location: 'Electrical Substation',
    description: 'Voltage irregularities detected in main power supply',
    status: 'resolved',
  },
];

// Mock Sensor Data
export const mockSensorData: SensorData[] = [
  {
    id: 's1',
    sensorId: 'PRESS-001',
    timestamp: getTimestampMinutesAgo(5),
    value: 142.3,
    unit: 'PSI',
    status: 'critical',
    location: 'Pipeline Section B-12',
    type: 'Pressure',
  },
  {
    id: 's2',
    sensorId: 'TEMP-045',
    timestamp: getTimestampMinutesAgo(7),
    value: 372.1,
    unit: '°F',
    status: 'warning',
    location: 'Refinery Unit C',
    type: 'Temperature',
  },
  {
    id: 's3',
    sensorId: 'FLOW-023',
    timestamp: getTimestampMinutesAgo(2),
    value: 85.7,
    unit: 'gal/min',
    status: 'normal',
    location: 'Processing Unit D',
    type: 'Flow Rate',
  },
  {
    id: 's4',
    sensorId: 'LEVEL-012',
    timestamp: getTimestampMinutesAgo(10),
    value: 78.2,
    unit: '%',
    status: 'normal',
    location: 'Storage Tank 7',
    type: 'Level',
  },
  {
    id: 's5',
    sensorId: 'VIBR-034',
    timestamp: getTimestampMinutesAgo(3),
    value: 12.8,
    unit: 'mm/s',
    status: 'warning',
    location: 'Pump Station 3',
    type: 'Vibration',
  },
  {
    id: 's6',
    sensorId: 'COND-056',
    timestamp: getTimestampMinutesAgo(8),
    value: 4.2,
    unit: 'µS/cm',
    status: 'normal',
    location: 'Water Treatment',
    type: 'Conductivity',
  },
  {
    id: 's7',
    sensorId: 'PRESS-002',
    timestamp: getTimestampMinutesAgo(1),
    value: 138.9,
    unit: 'PSI',
    status: 'warning',
    location: 'Pipeline Section A-8',
    type: 'Pressure',
  },
];

// Mock Refineries
export const mockRefineries: Refinery[] = [
  {
    id: 'r1',
    name: 'Gulf Coast Refinery',
    location: 'Houston, TX',
    status: 'operational',
    threatLevel: 'medium',
  },
  {
    id: 'r2',
    name: 'Pacific Northwest Processing',
    location: 'Seattle, WA',
    status: 'maintenance',
    threatLevel: 'low',
  },
  {
    id: 'r3',
    name: 'Midwest Refining Complex',
    location: 'Chicago, IL',
    status: 'operational',
    threatLevel: 'high',
  },
  {
    id: 'r4',
    name: 'Atlantic Coastal Operations',
    location: 'Philadelphia, PA',
    status: 'shutdown',
    threatLevel: 'critical',
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'User',
    role: 'admin',
    email: 'Useradmin.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'u2',
    name: 'Users',
    role: 'analyst',
    email: 'User.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'u3',
    name: 'Userson',
    role: 'operator',
    email: 'michael.chen@refinery.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  activeThreatCount: 12,
  criticalSensorAlerts: 3,
  resolvedIncidents: 27,
  systemStatus: 'operational',
  uptime: 99.98,
};

// Mock Time Series Data for Charts
export const mockTimeSeriesData: TimeSeriesData[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: format(subHours(new Date(), 23 - i), 'HH:mm'),
  value: Math.floor(Math.random() * 50) + 50,
}));

// Mock Threats by Type
export const mockThreatsByType: ThreatsByType[] = [
  { type: 'Unauthorized Access', count: 8 },
  { type: 'Pressure Anomaly', count: 12 },
  { type: 'Temperature Fluctuation', count: 7 },
  { type: 'Communication Delay', count: 5 },
  { type: 'Fire Hazard', count: 3 },
  { type: 'Valve Malfunction', count: 9 },
  { type: 'Power Fluctuation', count: 6 },
];

// Mock Threats by Severity
export const mockThreatsBySeverity: ThreatsBySeverity[] = [
  { severity: 'critical', count: 7 },
  { severity: 'high', count: 15 },
  { severity: 'medium', count: 23 },
  { severity: 'low', count: 18 },
];

// Generate random sensor data for real-time updates
export const generateRandomSensorData = (): SensorData => {
  const sensorTypes = ['Pressure', 'Temperature', 'Flow Rate', 'Level', 'Vibration', 'Conductivity'];
  const locations = [
    'Pipeline Section B-12',
    'Refinery Unit C',
    'Processing Unit D',
    'Storage Tank 7',
    'Pump Station 3',
    'Water Treatment',
    'Pipeline Section A-8'
  ];
  const units = ['PSI', '°F', 'gal/min', '%', 'mm/s', 'µS/cm'];

  const type = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const unit = units[Math.floor(Math.random() * units.length)];
  const value = parseFloat((Math.random() * 200 + 50).toFixed(1));

  let status: 'normal' | 'warning' | 'critical' = 'normal';
  if (value > 200) status = 'critical';
  else if (value > 150) status = 'warning';

  return {
    id: `s${Math.floor(Math.random() * 1000)}`,
    sensorId: `${type.substring(0, 4).toUpperCase()}-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
    timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    value,
    unit,
    status,
    location,
    type,
  };
};

// Generate a random threat for real-time updates
export const generateRandomThreat = (): Threat => {
  const threatTypes = [
    'Unauthorized Access',
    'Pressure Anomaly',
    'Temperature Fluctuation',
    'Communication Delay',
    'Fire Hazard',
    'Valve Malfunction',
    'Power Fluctuation'
  ];
  const locations = [
    'Control Room A',
    'Pipeline Section B-12',
    'Refinery Unit C',
    'Remote Sensor Network',
    'Storage Tank 7',
    'Processing Unit D',
    'Electrical Substation'
  ];
  const descriptions = [
    'Multiple failed login attempts detected from unknown IP address',
    'Pressure exceeded safe threshold for over 15 minutes',
    'Unexpected temperature drops detected in processing unit',
    'Intermittent delays in sensor data transmission',
    'Smoke detected near flammable material storage',
    'Primary safety valve not responding to commands',
    'Voltage irregularities detected in main power supply'
  ];
  const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];

  const typeIndex = Math.floor(Math.random() * threatTypes.length);
  const type = threatTypes[typeIndex];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];

  return {
    id: `t${Math.floor(Math.random() * 1000)}`,
    timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    severity,
    type,
    location,
    description,
    status: 'active',
  };
};