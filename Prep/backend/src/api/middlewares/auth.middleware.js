const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env');
const User = require('../../models/user.model');
const { unauthorized, forbidden } = require('../../utils/errorHandler');

/**
 * Middleware to protect routes - verifies JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return next(unauthorized('Not authorized to access this route'));
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(unauthorized('User not found'));
      }
      
      // Check if user is active
      if (!user.isActive) {
        return next(unauthorized('User account is deactivated'));
      }
      
      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      return next(unauthorized('Not authorized to access this route'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict access to specific roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(unauthorized('User not authenticated'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(forbidden(`Role ${req.user.role} is not authorized to access this route`));
    }
    
    next();
  };
};

module.exports = {
  protect,
  authorize
};