import express from 'express';
import Sensor from '../models/Sensor.js';
import SensorReading from '../models/SensorReading.js';
import { anomalyDetector } from '../services/machineLearning.js';
import { cacheGet, cacheSet } from '../config/redis.js';

const router = express.Router();

// Get all sensors
router.get('/', async (req, res) => {
  try {
    const { zone, type, status, page = 1, limit = 50 } = req.query;
    
    // Build filter
    const filter = { isActive: true };
    if (zone) filter['location.zone'] = zone;
    if (type) filter.type = type;
    if (status) filter.status = status;

    // Check cache
    const cacheKey = `sensors:list:${JSON.stringify(filter)}:${page}:${limit}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const skip = (page - 1) * limit;
    
    const [sensors, total] = await Promise.all([
      Sensor.find(filter)
        .populate('latestReading')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Sensor.countDocuments(filter)
    ]);

    const result = {
      sensors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };

    // Cache for 1 minute
    await cacheSet(cacheKey, result, 60);

    res.json(result);
  } catch (error) {
    console.error('❌ Error fetching sensors:', error);
    res.status(500).json({ error: 'Failed to fetch sensors' });
  }
});

// Get sensor by ID
router.get('/:sensorId', async (req, res) => {
  try {
    const { sensorId } = req.params;
    
    const sensor = await Sensor.findOne({ sensorId, isActive: true })
      .populate('latestReading');
    
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    res.json(sensor);
  } catch (error) {
    console.error('❌ Error fetching sensor:', error);
    res.status(500).json({ error: 'Failed to fetch sensor' });
  }
});

// Get sensor readings
router.get('/:sensorId/readings', async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { 
      startDate, 
      endDate, 
      status, 
      page = 1, 
      limit = 100,
      aggregation = 'raw' 
    } = req.query;

    // Build filter
    const filter = { sensorId };
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }
    
    if (status) filter.status = status;

    let result;

    if (aggregation === 'hourly') {
      // Hourly aggregation
      const start = startDate ? new Date(startDate) : new Date(Date.now() - 24 * 60 * 60 * 1000);
      const end = endDate ? new Date(endDate) : new Date();
      
      result = await SensorReading.getHourlyAggregates(sensorId, start, end);
    } else {
      // Raw readings
      const skip = (page - 1) * limit;
      
      const [readings, total] = await Promise.all([
        SensorReading.find(filter)
          .sort({ timestamp: -1 })
          .skip(skip)
          .limit(parseInt(limit)),
        SensorReading.countDocuments(filter)
      ]);

      result = {
        readings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    }

    res.json(result);
  } catch (error) {
    console.error('❌ Error fetching sensor readings:', error);
    res.status(500).json({ error: 'Failed to fetch sensor readings' });
  }
});

// Get sensor statistics
router.get('/:sensorId/stats', async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    const [stats, latestReading] = await Promise.all([
      SensorReading.getAverageByTimeRange(sensorId, start, end),
      SensorReading.getLatestBySensor(sensorId)
    ]);

    const result = {
      sensorId,
      timeRange: { start, end },
      statistics: stats[0] || null,
      latestReading,
      anomalyDetection: null
    };

    // Add anomaly detection if we have a latest reading
    if (latestReading) {
      try {
        const anomalyResult = await anomalyDetector.detectAnomaly(latestReading);
        result.anomalyDetection = anomalyResult;
      } catch (error) {
        console.error('❌ Error detecting anomaly:', error);
      }
    }

    res.json(result);
  } catch (error) {
    console.error('❌ Error fetching sensor stats:', error);
    res.status(500).json({ error: 'Failed to fetch sensor statistics' });
  }
});

// Create new sensor reading (for external sensor data ingestion)
router.post('/:sensorId/readings', async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { value, unit, timestamp, quality = 100 } = req.body;

    // Validate sensor exists
    const sensor = await Sensor.findOne({ sensorId, isActive: true });
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    // Determine status based on thresholds
    let status = 'normal';
    if (sensor.isInCriticalRange(value)) {
      status = 'critical';
    } else if (sensor.isInWarningRange(value)) {
      status = 'warning';
    }

    // Create reading
    const reading = new SensorReading({
      sensorId,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      value,
      unit: unit || sensor.specifications.unit,
      status,
      location: sensor.location.name,
      type: sensor.type,
      quality
    });

    // Detect anomaly
    try {
      const anomalyResult = await anomalyDetector.detectAnomaly(reading);
      reading.anomalyScore = anomalyResult.score;
    } catch (error) {
      console.error('❌ Error detecting anomaly:', error);
    }

    await reading.save();

    res.status(201).json({
      message: 'Reading created successfully',
      reading,
      sensor: {
        id: sensor.sensorId,
        name: sensor.name,
        location: sensor.location.name
      }
    });
  } catch (error) {
    console.error('❌ Error creating sensor reading:', error);
    res.status(500).json({ error: 'Failed to create sensor reading' });
  }
});

// Update sensor configuration
router.put('/:sensorId', async (req, res) => {
  try {
    const { sensorId } = req.params;
    const updates = req.body;

    // Remove fields that shouldn't be updated via API
    delete updates.sensorId;
    delete updates.createdAt;
    delete updates.updatedAt;

    const sensor = await Sensor.findOneAndUpdate(
      { sensorId, isActive: true },
      updates,
      { new: true, runValidators: true }
    );

    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    res.json({
      message: 'Sensor updated successfully',
      sensor
    });
  } catch (error) {
    console.error('❌ Error updating sensor:', error);
    res.status(500).json({ error: 'Failed to update sensor' });
  }
});

// Get sensors by location/zone
router.get('/location/:zone', async (req, res) => {
  try {
    const { zone } = req.params;
    
    const sensors = await Sensor.findByZone(zone)
      .populate('latestReading');

    res.json({
      zone,
      sensors,
      count: sensors.length
    });
  } catch (error) {
    console.error('❌ Error fetching sensors by zone:', error);
    res.status(500).json({ error: 'Failed to fetch sensors by zone' });
  }
});

// Get nearby sensors
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { maxDistance = 1000 } = req.query;

    const sensors = await Sensor.findNearby(
      parseFloat(lat), 
      parseFloat(lng), 
      parseInt(maxDistance)
    ).populate('latestReading');

    res.json({
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      maxDistance: parseInt(maxDistance),
      sensors,
      count: sensors.length
    });
  } catch (error) {
    console.error('❌ Error fetching nearby sensors:', error);
    res.status(500).json({ error: 'Failed to fetch nearby sensors' });
  }
});

// Get sensor health summary
router.get('/health/summary', async (req, res) => {
  try {
    const cacheKey = 'sensors:health:summary';
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const [
      totalSensors,
      onlineSensors,
      criticalReadings,
      warningReadings,
      recentReadings
    ] = await Promise.all([
      Sensor.countDocuments({ isActive: true }),
      Sensor.countDocuments({ status: 'online', isActive: true }),
      SensorReading.countDocuments({ 
        status: 'critical', 
        timestamp: { $gte: oneHourAgo } 
      }),
      SensorReading.countDocuments({ 
        status: 'warning', 
        timestamp: { $gte: oneHourAgo } 
      }),
      SensorReading.countDocuments({ 
        timestamp: { $gte: oneHourAgo } 
      })
    ]);

    const summary = {
      total: totalSensors,
      online: onlineSensors,
      offline: totalSensors - onlineSensors,
      healthPercentage: totalSensors > 0 ? (onlineSensors / totalSensors) * 100 : 0,
      recentActivity: {
        totalReadings: recentReadings,
        criticalReadings,
        warningReadings,
        timeWindow: '1 hour'
      },
      lastUpdated: new Date()
    };

    // Cache for 2 minutes
    await cacheSet(cacheKey, summary, 120);

    res.json(summary);
  } catch (error) {
    console.error('❌ Error fetching sensor health summary:', error);
    res.status(500).json({ error: 'Failed to fetch sensor health summary' });
  }
});

export default router;
