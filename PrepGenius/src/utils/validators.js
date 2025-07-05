/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid flag and error message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Form field validation
 * @param {Object} fields - Object containing field values
 * @param {Object} rules - Object containing validation rules
 * @returns {Object} - Object containing validation errors
 */
export const validateForm = (fields, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(fieldName => {
    const value = fields[fieldName];
    const fieldRules = rules[fieldName];
    
    // Required validation
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[fieldName] = `${fieldRules.label || fieldName} is required`;
      return;
    }
    
    // Minimum length validation
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[fieldName] = `${fieldRules.label || fieldName} must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    // Maximum length validation
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[fieldName] = `${fieldRules.label || fieldName} must be less than ${fieldRules.maxLength} characters`;
      return;
    }
    
    // Email validation
    if (fieldRules.isEmail && value && !isValidEmail(value)) {
      errors[fieldName] = `Please enter a valid email address`;
      return;
    }
    
    // Password validation
    if (fieldRules.isPassword && value) {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        errors[fieldName] = passwordValidation.message;
        return;
      }
    }
    
    // Match validation (for password confirmation)
    if (fieldRules.match && fields[fieldRules.match] !== value) {
      errors[fieldName] = `${fieldRules.label || fieldName} does not match ${fieldRules.matchLabel || fieldRules.match}`;
      return;
    }
    
    // Custom validation
    if (fieldRules.validate && typeof fieldRules.validate === 'function') {
      const customError = fieldRules.validate(value, fields);
      if (customError) {
        errors[fieldName] = customError;
        return;
      }
    }
  });
  
  return errors;
};