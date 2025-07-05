import { z } from 'zod';

// Registration validation schema
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(100, { message: 'Name cannot exceed 100 characters' }),
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
    confirmPassword: z.string(),
    role: z.enum(['ADMIN', 'AGENT', 'CUSTOMER']).optional().default('CUSTOMER'),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

// Login validation schema
export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
    password: z
        .string()
        .min(1, { message: 'Password is required' }),
    deviceName: z.string().optional(),
});

// Password reset request validation schema
export const resetRequestSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
});

// Password reset validation schema
export const resetPasswordSchema = z.object({
    token: z.string(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

// Helper functions to validate against schemas
export const validateRegistration = (data) => {
    return registerSchema.safeParse(data);
};

export const validateLogin = (data) => {
    return loginSchema.safeParse(data);
};

export const validateResetRequest = (data) => {
    return resetRequestSchema.safeParse(data);
};

export const validateResetPassword = (data) => {
    return resetPasswordSchema.safeParse(data);
};