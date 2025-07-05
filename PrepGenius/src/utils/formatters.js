/**
 * Format date to a readable string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: options.includeTime ? '2-digit' : undefined,
    minute: options.includeTime ? '2-digit' : undefined,
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Intl.DateTimeFormat('en-US', mergedOptions).format(dateObj);
};

/**
 * Format duration in minutes to hours and minutes
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} min${mins !== 1 ? 's' : ''}`;
  }
  
  if (mins === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} min${mins !== 1 ? 's' : ''}`;
};

/**
 * Format a number as a percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return '';
  
  return `${parseFloat(value).toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format a date object to a time string (HH:MM AM/PM)
 * @param {Date} date - Date object
 * @returns {string} - Formatted time string
 */
export const formatTime = (date) => {
  if (!date) return '';
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

/**
 * Format file size in bytes to human-readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Format a name to title case
 * @param {string} name - Name to format
 * @returns {string} - Formatted name
 */
export const formatName = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};
