const { ApiError } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const { NODE_ENV } = require('../../config/env');

/**
 * Global error handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error
  logger.error(`${req.method} ${req.originalUrl}`, { 
    error: err.message,
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    error = new ApiError('Validation Error', 422, errors);
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(`Duplicate field value: ${field}`, 409);
  }
  
  // Mongoose cast error
  if (err.name === 'CastError') {
    error = new ApiError(`Invalid ${err.path}: ${err.value}`, 400);
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError('Invalid token', 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    error = new ApiError('Token expired', 401);
  }

  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    errors: error.errors || [],
    stack: NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorMiddleware;