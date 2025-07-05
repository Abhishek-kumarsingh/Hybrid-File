import express from 'express';
import SensorReading from '../models/SensorReading.js';
import Threat from '../models/Threat.js';

const router = express.Router();

// Get heat map data
router.get('/data', async (req, res) => {
  try {
    const { type = 'all', timeRange = '1h' } = req.query;
    
    // Calculate time range
    const now = new Date();
    let startTime;
    
    switch (timeRange) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '6h':
        startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
    }

    // Get recent sensor readings with location data
    const readings = await SensorReading.aggregate([
      {
        $match: {
          timestamp: { $gte: startTime }
        }
      },
      {
        $lookup: {
          from: 'sensors',
          localField: 'sensorId',
          foreignField: 'sensorId',
          as: 'sensor'
        }
      },
      {
        $unwind: '$sensor'
      },
      {
        $group: {
          _id: '$sensorId',
          latestReading: { $last: '$$ROOT' },
          avgValue: { $avg: '$value' },
          maxValue: { $max: '$value' },
          criticalCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'critical'] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Transform to heat map format
    const heatMapData = readings.map(item => {
      const reading = item.latestReading;
      const sensor = reading.sensor;
      
      return {
        id: sensor.sensorId,
        lat: sensor.location.coordinates.lat,
        lng: sensor.location.coordinates.lng,
        intensity: item.criticalCount > 0 ? 0.8 : 
                  reading.status === 'warning' ? 0.5 : 0.2,
        value: reading.value,
        unit: reading.unit,
        status: reading.status,
        sensorType: sensor.type,
        location: sensor.location.name,
        timestamp: reading.timestamp
      };
    });

    res.json({
      data: heatMapData,
      timeRange,
      generatedAt: now,
      count: heatMapData.length
    });
  } catch (error) {
    console.error('❌ Error fetching heat map data:', error);
    res.status(500).json({ error: 'Failed to fetch heat map data' });
  }
});

export default router;
