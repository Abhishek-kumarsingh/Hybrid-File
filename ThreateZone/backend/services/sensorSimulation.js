// We'll create our own data generation functions instead of importing
import Sensor from '../models/Sensor.js';
import SensorReading from '../models/SensorReading.js';
import Threat from '../models/Threat.js';
import { cacheSet, cacheGet } from '../config/redis.js';

let simulationInterval = null;
let isRunning = false;

// Sensor configurations for realistic simulation
const sensorConfigs = [
  {
    sensorId: 'PRESS-001',
    type: 'pressure',
    location: { name: 'Pipeline Section B-12', lat: 29.7604, lng: -95.3698, zone: 'Zone-A' },
    baseValue: 120,
    variance: 15,
    unit: 'PSI',
    thresholds: { warning: { min: 100, max: 150 }, critical: { min: 80, max: 180 } }
  },
  {
    sensorId: 'TEMP-045',
    type: 'temperature',
    location: { name: 'Refinery Unit C', lat: 29.7704, lng: -95.3598, zone: 'Zone-B' },
    baseValue: 350,
    variance: 25,
    unit: '°F',
    thresholds: { warning: { min: 300, max: 400 }, critical: { min: 250, max: 450 } }
  },
  {
    sensorId: 'FLOW-023',
    type: 'flow',
    location: { name: 'Processing Unit D', lat: 29.7504, lng: -95.3798, zone: 'Zone-C' },
    baseValue: 85,
    variance: 10,
    unit: 'gal/min',
    thresholds: { warning: { min: 70, max: 100 }, critical: { min: 50, max: 120 } }
  },
  {
    sensorId: 'LEVEL-012',
    type: 'level',
    location: { name: 'Storage Tank 7', lat: 29.7804, lng: -95.3498, zone: 'Zone-D' },
    baseValue: 75,
    variance: 8,
    unit: '%',
    thresholds: { warning: { min: 20, max: 95 }, critical: { min: 10, max: 98 } }
  },
  {
    sensorId: 'VIBR-034',
    type: 'vibration',
    location: { name: 'Pump Station 3', lat: 29.7654, lng: -95.3648, zone: 'Zone-A' },
    baseValue: 8,
    variance: 3,
    unit: 'mm/s',
    thresholds: { warning: { min: 0, max: 12 }, critical: { min: 0, max: 18 } }
  },
  {
    sensorId: 'GAS-067',
    type: 'gas',
    location: { name: 'Chemical Storage', lat: 29.7554, lng: -95.3748, zone: 'Zone-B' },
    baseValue: 2,
    variance: 1,
    unit: 'ppm',
    thresholds: { warning: { min: 0, max: 5 }, critical: { min: 0, max: 10 } }
  }
];

// Initialize sensors in database
export const initializeSensors = async () => {
  try {
    console.log('🔧 Initializing sensors in database...');

    for (const config of sensorConfigs) {
      const existingSensor = await Sensor.findOne({ sensorId: config.sensorId });

      if (!existingSensor) {
        const sensor = new Sensor({
          sensorId: config.sensorId,
          name: `${config.type.charAt(0).toUpperCase() + config.type.slice(1)} Sensor`,
          type: config.type,
          location: {
            name: config.location.name,
            coordinates: {
              lat: config.location.lat,
              lng: config.location.lng
            },
            zone: config.location.zone
          },
          specifications: {
            minValue: config.thresholds.critical.min,
            maxValue: config.thresholds.critical.max,
            unit: config.unit,
            accuracy: 0.1,
            resolution: 0.01
          },
          thresholds: config.thresholds,
          status: 'online',
          installationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          nextMaintenance: new Date(Date.now() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000),
          batteryLevel: 85 + Math.random() * 15,
          signalStrength: 80 + Math.random() * 20
        });

        await sensor.save();
        console.log(`✅ Created sensor: ${config.sensorId}`);
      }
    }

    console.log('🎯 Sensor initialization complete');
  } catch (error) {
    console.error('❌ Error initializing sensors:', error);
  }
};

// Generate realistic sensor reading
const generateRealisticReading = (config) => {
  // Add some time-based patterns (daily cycles, etc.)
  const hour = new Date().getHours();
  const timeMultiplier = 1 + 0.1 * Math.sin((hour / 24) * 2 * Math.PI);

  // Base value with variance and time pattern
  let value = config.baseValue * timeMultiplier + (Math.random() - 0.5) * config.variance;

  // Occasionally introduce anomalies (5% chance)
  if (Math.random() < 0.05) {
    value += (Math.random() - 0.5) * config.variance * 3;
  }

  // Determine status based on thresholds
  let status = 'normal';
  if (value < config.thresholds.critical.min || value > config.thresholds.critical.max) {
    status = 'critical';
  } else if (value < config.thresholds.warning.min || value > config.thresholds.warning.max) {
    status = 'warning';
  }

  return {
    sensorId: config.sensorId,
    timestamp: new Date(),
    value: Math.round(value * 100) / 100,
    unit: config.unit,
    status,
    location: config.location.name,
    type: config.type,
    quality: 95 + Math.random() * 5,
    anomalyScore: status === 'critical' ? 0.8 + Math.random() * 0.2 : Math.random() * 0.3
  };
};

// Generate and save sensor readings
const generateSensorReadings = async (io) => {
  try {
    const readings = [];

    for (const config of sensorConfigs) {
      const reading = generateRealisticReading(config);
      readings.push(reading);

      // Save to database
      const sensorReading = new SensorReading(reading);
      await sensorReading.save();

      // Cache latest reading
      await cacheSet(`sensor:${config.sensorId}:latest`, reading, 300); // 5 minutes TTL

      // Emit to connected clients
      io.emit('new-sensor-reading', reading);

      // Generate threat if critical
      if (reading.status === 'critical' && Math.random() < 0.3) {
        await generateThreatFromReading(reading, io);
      }
    }

    // Emit batch update
    io.emit('sensor-data', readings);

    // Update cache with all readings
    await cacheSet('sensors:latest', readings, 60); // 1 minute TTL

    console.log(`📊 Generated ${readings.length} sensor readings`);

  } catch (error) {
    console.error('❌ Error generating sensor readings:', error);
  }
};

// Generate threat from critical sensor reading
const generateThreatFromReading = async (reading, io) => {
  try {
    const threatTypes = {
      pressure: 'Pressure Anomaly',
      temperature: 'Temperature Fluctuation',
      flow: 'Flow Rate Anomaly',
      level: 'Level Critical',
      vibration: 'Vibration Anomaly',
      gas: 'Gas Leak Detected'
    };

    const threat = {
      threatId: `THR-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date(),
      severity: 'high',
      type: threatTypes[reading.type] || 'Sensor Anomaly',
      location: {
        name: reading.location,
        zone: sensorConfigs.find(c => c.sensorId === reading.sensorId)?.location.zone || 'Unknown'
      },
      description: `Critical ${reading.type} reading detected: ${reading.value} ${reading.unit}`,
      status: 'active',
      source: {
        type: 'sensor',
        id: reading.sensorId,
        name: reading.sensorId
      },
      relatedSensors: [reading.sensorId],
      riskScore: 75 + Math.random() * 25
    };

    // Save to database
    const threatDoc = new Threat(threat);
    await threatDoc.save();

    // Emit to clients
    io.emit('new-threat', threat);
    io.emit('threat-alert', {
      type: threat.type,
      description: threat.description,
      severity: threat.severity,
      location: threat.location.name
    });

    console.log(`🚨 Generated threat: ${threat.type} at ${threat.location.name}`);

  } catch (error) {
    console.error('❌ Error generating threat:', error);
  }
};

// Start sensor simulation
export const startSensorSimulation = async (io) => {
  if (isRunning) {
    console.log('⚠️ Sensor simulation already running');
    return;
  }

  try {
    console.log('🚀 Starting sensor simulation...');

    // Initialize sensors first
    await initializeSensors();

    // Generate initial readings
    await generateSensorReadings(io);

    // Start periodic generation
    simulationInterval = setInterval(async () => {
      await generateSensorReadings(io);
    }, 5000); // Every 5 seconds

    isRunning = true;
    console.log('✅ Sensor simulation started (5-second intervals)');

  } catch (error) {
    console.error('❌ Error starting sensor simulation:', error);
  }
};

// Stop sensor simulation
export const stopSensorSimulation = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    isRunning = false;
    console.log('🛑 Sensor simulation stopped');
  }
};

// Get simulation status
export const getSimulationStatus = () => {
  return {
    isRunning,
    sensorCount: sensorConfigs.length,
    interval: 5000
  };
};

// Get latest sensor data
export const getLatestSensorData = async () => {
  try {
    // Try cache first
    const cached = await cacheGet('sensors:latest');
    if (cached) {
      return cached;
    }

    // Fallback to database
    const readings = await SensorReading.find()
      .sort({ timestamp: -1 })
      .limit(sensorConfigs.length);

    return readings;
  } catch (error) {
    console.error('❌ Error getting latest sensor data:', error);
    return [];
  }
};

export default {
  startSensorSimulation,
  stopSensorSimulation,
  getSimulationStatus,
  getLatestSensorData,
  initializeSensors
};
