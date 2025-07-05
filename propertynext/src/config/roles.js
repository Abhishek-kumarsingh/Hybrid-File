/**
 * Permission definitions for role-based access control
 */
export const PERMISSIONS = {
    ADMIN: [
        // User management permissions
        'user:read',
        'user:create',
        'user:update',
        'user:delete',

        // Property permissions
        'property:read',
        'property:create',
        'property:update',
        'property:delete',

        // Agent permissions
        'agent:read',
        'agent:create',
        'agent:update',
        'agent:delete',

        // Customer permissions
        'customer:read',
        'customer:create',
        'customer:update',
        'customer:delete',

        // Transaction permissions
        'transaction:read',
        'transaction:create',
        'transaction:update',
        'transaction:delete',

        // Review permissions
        'review:read',
        'review:create',
        'review:update',
        'review:delete',

        // System permissions
        'system:settings',
        'system:reports',
        'system:logs',
    ],

    AGENT: [
        // Limited user permissions
        'user:read:own',
        'user:update:own',

        // Property permissions
        'property:read',
        'property:create',
        'property:update:own',
        'property:delete:own',

        // Limited agent permissions
        'agent:read:own',
        'agent:update:own',

        // Customer permissions
        'customer:read',

        // Limited transaction permissions
        'transaction:read:own',
        'transaction:create',

        // Limited review permissions
        'review:read',
    ],

    CUSTOMER: [
        // Limited user permissions
        'user:read:own',
        'user:update:own',

        // Limited property permissions
        'property:read',

        // Limited customer permissions
        'customer:read:own',
        'customer:update:own',

        // Limited transaction permissions
        'transaction:read:own',

        // Review permissions
        'review:read',
        'review:create',
        'review:update:own',
        'review:delete:own',
    ],
};

/**
 * Role definitions
 */
export const ROLES = {
    ADMIN: {
        name: 'Administrator',
        description: 'Full control over all aspects of the system',
    },
    AGENT: {
        name: 'Real Estate Agent',
        description: 'Can manage properties and interact with customers',
    },
    CUSTOMER: {
        name: 'Customer',
        description: 'Can browse properties and place orders',
    },
};