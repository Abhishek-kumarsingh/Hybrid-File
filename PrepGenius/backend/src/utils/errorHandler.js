/**
 * Custom Error class for API errors
 */
class ApiError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create a 400 Bad Request error
 */
const badRequest = (message, errors) => {
  return new ApiError(message || 'Bad Request', 400, errors);
};

/**
 * Create a 401 Unauthorized error
 */
const unauthorized = (message) => {
  return new ApiError(message || 'Unauthorized', 401);
};

/**
 * Create a 403 Forbidden error
 */
const forbidden = (message) => {
  return new ApiError(message || 'Forbidden', 403);
};

/**
 * Create a 404 Not Found error
 */
const notFound = (message) => {
  return new ApiError(message || 'Resource not found', 404);
};

/**
 * Create a 409 Conflict error
 */
const conflict = (message) => {
  return new ApiError(message || 'Conflict', 409);
};

/**
 * Create a 422 Unprocessable Entity error
 */
const validationError = (errors) => {
  return new ApiError('Validation Error', 422, errors);
};

/**
 * Create a 500 Internal Server Error
 */
const internal = (message, error) => {
  console.error(error);
  return new ApiError(message || 'Internal Server Error', 500);
};

module.exports = {
  ApiError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  validationError,
  internal
};