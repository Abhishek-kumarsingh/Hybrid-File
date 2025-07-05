import express from 'express';
import User from '../models/User.js';
import { requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', requireRole('admin'), async (req, res) => {
  try {
    const users = await User.getActiveUsers();
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
