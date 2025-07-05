import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';

// Authentication middleware
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.substring(7);
    
    try {
      // For demo purposes, we'll decode the base64 token
      // In production, use proper JWT verification
      const decoded = JSON.parse(atob(token));
      
      // Check if token is expired
      if (decoded.exp < Date.now()) {
        return res.status(401).json({ 
          error: 'Token expired' 
        });
      }

      // Find user
      const user = await User.findById(decoded.userId).select('-password');
      if (!user || !user.isActive) {
        return res.status(401).json({ 
          error: 'Invalid token or user not found' 
        });
      }

      // Add user to request
      req.user = user;
      next();
      
    } catch (error) {
      return res.status(401).json({ 
        error: 'Invalid token' 
      });
    }
    
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

// Role-based authorization middleware
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const userRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!userRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions' 
      });
    }

    next();
  };
};

// Permission-based authorization middleware
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    if (!req.user.hasPermission(permission)) {
      return res.status(403).json({ 
        error: `Permission '${permission}' required` 
      });
    }

    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = JSON.parse(atob(token));
        
        if (decoded.exp >= Date.now()) {
          const user = await User.findById(decoded.userId).select('-password');
          if (user && user.isActive) {
            req.user = user;
          }
        }
      } catch (error) {
        // Ignore token errors for optional auth
      }
    }
    
    next();
  } catch (error) {
    console.error('❌ Optional auth middleware error:', error);
    next(); // Continue without authentication
  }
};

export default {
  authMiddleware,
  requireRole,
  requirePermission,
  optionalAuth
};
