import express from 'express';
import Threat from '../models/Threat.js';
import { requirePermission } from '../middleware/auth.js';
import { cacheGet, cacheSet } from '../config/redis.js';

const router = express.Router();

// Get all threats
router.get('/', async (req, res) => {
  try {
    const { 
      severity, 
      status, 
      type, 
      zone, 
      page = 1, 
      limit = 50,
      sortBy = 'timestamp',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = { isActive: true };
    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (zone) filter['location.zone'] = zone;

    // Check cache
    const cacheKey = `threats:list:${JSON.stringify(filter)}:${page}:${limit}:${sortBy}:${sortOrder}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [threats, total] = await Promise.all([
      Threat.find(filter)
        .populate('assignedTo', 'name email role')
        .populate('acknowledgedBy', 'name email')
        .populate('resolvedBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Threat.countDocuments(filter)
    ]);

    const result = {
      threats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: { severity, status, type, zone }
    };

    // Cache for 30 seconds
    await cacheSet(cacheKey, result, 30);

    res.json(result);
  } catch (error) {
    console.error('❌ Error fetching threats:', error);
    res.status(500).json({ error: 'Failed to fetch threats' });
  }
});

// Get threat by ID
router.get('/:threatId', async (req, res) => {
  try {
    const { threatId } = req.params;

    const threat = await Threat.findOne({ threatId, isActive: true })
      .populate('assignedTo', 'name email role')
      .populate('acknowledgedBy', 'name email')
      .populate('resolvedBy', 'name email')
      .populate('actions.executedBy', 'name email');

    if (!threat) {
      return res.status(404).json({ error: 'Threat not found' });
    }

    res.json(threat);
  } catch (error) {
    console.error('❌ Error fetching threat:', error);
    res.status(500).json({ error: 'Failed to fetch threat' });
  }
});

// Create new threat
router.post('/', requirePermission('write'), async (req, res) => {
  try {
    const threatData = {
      ...req.body,
      threatId: `THR-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    const threat = new Threat(threatData);
    await threat.save();

    res.status(201).json({
      message: 'Threat created successfully',
      threat
    });
  } catch (error) {
    console.error('❌ Error creating threat:', error);
    res.status(500).json({ error: 'Failed to create threat' });
  }
});

// Acknowledge threat
router.post('/:threatId/acknowledge', requirePermission('write'), async (req, res) => {
  try {
    const { threatId } = req.params;
    const userId = req.user._id;

    const threat = await Threat.findOne({ threatId, isActive: true });
    if (!threat) {
      return res.status(404).json({ error: 'Threat not found' });
    }

    await threat.acknowledge(userId);

    res.json({
      message: 'Threat acknowledged successfully',
      threat
    });
  } catch (error) {
    console.error('❌ Error acknowledging threat:', error);
    res.status(500).json({ error: 'Failed to acknowledge threat' });
  }
});

// Resolve threat
router.post('/:threatId/resolve', requirePermission('write'), async (req, res) => {
  try {
    const { threatId } = req.params;
    const { notes } = req.body;
    const userId = req.user._id;

    const threat = await Threat.findOne({ threatId, isActive: true });
    if (!threat) {
      return res.status(404).json({ error: 'Threat not found' });
    }

    await threat.resolve(userId, notes);

    res.json({
      message: 'Threat resolved successfully',
      threat
    });
  } catch (error) {
    console.error('❌ Error resolving threat:', error);
    res.status(500).json({ error: 'Failed to resolve threat' });
  }
});

// Escalate threat
router.post('/:threatId/escalate', requirePermission('write'), async (req, res) => {
  try {
    const { threatId } = req.params;

    const threat = await Threat.findOne({ threatId, isActive: true });
    if (!threat) {
      return res.status(404).json({ error: 'Threat not found' });
    }

    await threat.escalate();

    res.json({
      message: 'Threat escalated successfully',
      threat
    });
  } catch (error) {
    console.error('❌ Error escalating threat:', error);
    res.status(500).json({ error: 'Failed to escalate threat' });
  }
});

// Get threat statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const cacheKey = `threats:stats:${startDate || 'all'}:${endDate || 'all'}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    const [
      totalThreats,
      activeThreats,
      resolvedThreats,
      criticalThreats,
      statsByTimeRange
    ] = await Promise.all([
      Threat.countDocuments({ 
        timestamp: { $gte: start, $lte: end },
        isActive: true 
      }),
      Threat.countDocuments({ 
        status: 'active',
        timestamp: { $gte: start, $lte: end },
        isActive: true 
      }),
      Threat.countDocuments({ 
        status: 'resolved',
        timestamp: { $gte: start, $lte: end },
        isActive: true 
      }),
      Threat.countDocuments({ 
        severity: 'critical',
        timestamp: { $gte: start, $lte: end },
        isActive: true 
      }),
      Threat.getStatsByTimeRange(start, end)
    ]);

    const stats = {
      timeRange: { start, end },
      summary: {
        total: totalThreats,
        active: activeThreats,
        resolved: resolvedThreats,
        critical: criticalThreats,
        resolutionRate: totalThreats > 0 ? (resolvedThreats / totalThreats) * 100 : 0
      },
      bySeverity: statsByTimeRange,
      lastUpdated: new Date()
    };

    // Cache for 5 minutes
    await cacheSet(cacheKey, stats, 300);

    res.json(stats);
  } catch (error) {
    console.error('❌ Error fetching threat statistics:', error);
    res.status(500).json({ error: 'Failed to fetch threat statistics' });
  }
});

// Get threats by location
router.get('/location/:zone', async (req, res) => {
  try {
    const { zone } = req.params;
    const { status = 'active' } = req.query;

    const threats = await Threat.find({
      'location.zone': zone,
      status,
      isActive: true
    })
    .populate('assignedTo', 'name email')
    .sort({ timestamp: -1 });

    res.json({
      zone,
      status,
      threats,
      count: threats.length
    });
  } catch (error) {
    console.error('❌ Error fetching threats by location:', error);
    res.status(500).json({ error: 'Failed to fetch threats by location' });
  }
});

// Get nearby threats
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { maxDistance = 5000, status = 'active' } = req.query;

    const threats = await Threat.getNearby(
      parseFloat(lat),
      parseFloat(lng),
      parseInt(maxDistance)
    );

    const filteredThreats = threats.filter(threat => 
      threat.status === status && threat.isActive
    );

    res.json({
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      maxDistance: parseInt(maxDistance),
      status,
      threats: filteredThreats,
      count: filteredThreats.length
    });
  } catch (error) {
    console.error('❌ Error fetching nearby threats:', error);
    res.status(500).json({ error: 'Failed to fetch nearby threats' });
  }
});

export default router;
