import express from 'express';
import Alert from '../models/Alert.js';

const router = express.Router();

// Get all alerts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, status, severity } = req.query;
    
    const filter = { isActive: true };
    if (status) filter.status = status;
    if (severity) filter.severity = severity;

    const skip = (page - 1) * limit;
    
    const [alerts, total] = await Promise.all([
      Alert.find(filter)
        .populate('assignedTo', 'name email')
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Alert.countDocuments(filter)
    ]);

    res.json({
      alerts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Get alert by ID
router.get('/:alertId', async (req, res) => {
  try {
    const { alertId } = req.params;
    
    const alert = await Alert.findOne({ alertId, isActive: true })
      .populate('assignedTo', 'name email')
      .populate('acknowledgedBy', 'name email')
      .populate('resolvedBy', 'name email');

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.json(alert);
  } catch (error) {
    console.error('❌ Error fetching alert:', error);
    res.status(500).json({ error: 'Failed to fetch alert' });
  }
});

export default router;
