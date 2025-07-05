import express from 'express';
import SensorReading from '../models/SensorReading.js';
import Threat from '../models/Threat.js';
import { RiskAssessment } from '../services/machineLearning.js';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalSensors,
      activeSensors,
      activeThreats,
      resolvedThreats,
      criticalReadings,
      recentReadings
    ] = await Promise.all([
      SensorReading.distinct('sensorId').then(ids => ids.length),
      SensorReading.distinct('sensorId', { timestamp: { $gte: oneDayAgo } }).then(ids => ids.length),
      Threat.countDocuments({ status: 'active', isActive: true }),
      Threat.countDocuments({ 
        status: 'resolved', 
        resolvedAt: { $gte: oneWeekAgo },
        isActive: true 
      }),
      SensorReading.countDocuments({ 
        status: 'critical', 
        timestamp: { $gte: oneDayAgo } 
      }),
      SensorReading.countDocuments({ 
        timestamp: { $gte: oneDayAgo } 
      })
    ]);

    const analytics = {
      sensors: {
        total: totalSensors,
        active: activeSensors,
        offline: totalSensors - activeSensors,
        healthPercentage: totalSensors > 0 ? (activeSensors / totalSensors) * 100 : 0
      },
      threats: {
        active: activeThreats,
        resolved: resolvedThreats
      },
      readings: {
        total: recentReadings,
        critical: criticalReadings,
        timeWindow: '24 hours'
      },
      systemUptime: process.uptime(),
      lastUpdated: now
    };

    res.json(analytics);
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
