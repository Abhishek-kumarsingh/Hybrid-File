import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Demo users for testing
const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@threatzone.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Operator User',
    email: 'operator@threatzone.com',
    password: 'operator123',
    role: 'operator'
  },
  {
    name: 'Analyst User',
    email: 'analyst@threatzone.com',
    password: 'analyst123',
    role: 'analyst'
  }
];

// Initialize demo users
const initializeDemoUsers = async () => {
  try {
    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created demo user: ${userData.email}`);
      }
    }
  } catch (error) {
    console.error('❌ Error initializing demo users:', error);
  }
};

// Initialize demo users on startup
initializeDemoUsers();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      await user.incrementLoginAttempts();
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token (simplified for demo)
    const token = btoa(JSON.stringify({
      userId: user._id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }));

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'viewer' } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    // Generate token
    const token = btoa(JSON.stringify({
      userId: user._id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }));

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      permissions: req.user.permissions,
      avatar: req.user.avatar,
      lastLogin: req.user.lastLogin
    });
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, avatar, preferences } = req.body;
    const userId = req.user._id;

    const updates = {};
    if (name) updates.name = name;
    if (avatar) updates.avatar = avatar;
    if (preferences) updates.preferences = { ...req.user.preferences, ...preferences };

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Change password
router.put('/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current password and new password are required'
      });
    }

    // Get user with password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Verify current password
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('❌ Error changing password:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Logout route
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    // In a real application, you would invalidate the token here
    // For this demo, we'll just return a success message
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

export default router;
