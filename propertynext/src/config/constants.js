export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 100;

export const SITE_NAME = "Property Management System";

export const ROLES = {
    ADMIN: 'ADMIN',
    AGENT: 'AGENT',
    CUSTOMER: 'CUSTOMER',
};

// Maximum number of active devices per user
export const MAX_ACTIVE_DEVICES = 2;

// Password reset token expiry (in milliseconds)
export const PASSWORD_RESET_TOKEN_EXPIRY = 1 * 60 * 60 * 1000; // 1 hour

// Email verification token expiry (in milliseconds)
export const EMAIL_VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Account lock duration after failed attempts (in milliseconds)
export const ACCOUNT_LOCK_DURATION = 30 * 60 * 1000; // 30 minutes
export const MAX_FAILED_LOGIN_ATTEMPTS = 5;

// Add other constants as needed
// e.g., default property image, API rate limit settings if not environment specific