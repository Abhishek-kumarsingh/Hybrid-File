import { z } from 'zod';

export const updateUserProfileSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(100, { message: 'Name cannot exceed 100 characters' })
        .optional(),
    image: z.string().url({ message: 'Invalid image URL' }).optional().nullable(),
    // Email updates typically require verification, so handle separately or with caution
});

export const updateAgentProfileSchema = z.object({
    bio: z.string().max(1000, { message: 'Bio cannot exceed 1000 characters' }).optional().nullable(),
    specialty: z.string().max(100, { message: 'Specialty cannot exceed 100 characters' }).optional().nullable(),
    yearsExperience: z.number().int().min(0).optional().nullable(),
    commissionRate: z.number().min(0).max(100).optional().nullable(),
    phoneNumber: z.string().max(20, { message: 'Phone number cannot exceed 20 characters' }).optional().nullable(),
    licenseNumber: z.string().max(50, { message: 'License number cannot exceed 50 characters' }).optional().nullable(),
    officeAddress: z.string().max(255, { message: 'Office address cannot exceed 255 characters' }).optional().nullable(),
});

export const updateCustomerProfileSchema = z.object({
    phoneNumber: z.string().max(20, { message: 'Phone number cannot exceed 20 characters' }).optional().nullable(),
    preferences: z.record(z.any()).optional().nullable(), // For JSON fields
    budget: z.number().positive({ message: 'Budget must be a positive number' }).optional().nullable(),
});

// Validator for full user update (potentially by admin)
export const adminUpdateUserSchema = updateUserProfileSchema.extend({
    email: z.string().email({ message: 'Invalid email address' }).toLowerCase().optional(),
    role: z.enum(['ADMIN', 'AGENT', 'CUSTOMER']).optional(),
    // emailVerified: z.date().optional().nullable(), // Careful with direct updates
    // lockedUntil: z.date().optional().nullable(),
    // failedAttempts: z.number().int().min(0).optional(),
});


export const validateUpdateUserProfile = (data) => updateUserProfileSchema.safeParse(data);
export const validateUpdateAgentProfile = (data) => updateAgentProfileSchema.safeParse(data);
export const validateUpdateCustomerProfile = (data) => updateCustomerProfileSchema.safeParse(data);
export const validateAdminUpdateUser = (data) => adminUpdateUserSchema.safeParse(data);

// Review Validation
export const reviewSchema = z.object({
    propertyId: z.string().cuid({ message: "Invalid Property ID" }),
    rating: z.number().int().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating cannot exceed 5" }),
    comment: z.string().min(10, { message: "Comment must be at least 10 characters" }).max(1000, { message: "Comment cannot exceed 1000 characters" }).optional().nullable(),
});

export const validateReview = (data) => reviewSchema.safeParse(data);

export const updateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().min(10).max(1000).optional().nullable(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field (rating or comment) must be provided for update." });

export const validateUpdateReview = (data) => updateReviewSchema.safeParse(data);


// Transaction Validation
export const transactionSchema = z.object({
    propertyId: z.string().cuid({ message: "Invalid Property ID" }),
    customerId: z.string().cuid({ message: "Invalid Customer ID" }), // This should be CustomerProfile ID
    agentId: z.string().cuid({ message: "Invalid Agent ID" }),       // This should be AgentProfile ID
    amount: z.number().positive({ message: "Amount must be a positive number" }),
    status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED']),
    type: z.enum(['PURCHASE', 'RENT', 'DEPOSIT', 'COMMISSION']),
});

export const validateTransaction = (data) => transactionSchema.safeParse(data);

export const updateTransactionSchema = z.object({
    status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED']).optional(),
    amount: z.number().positive({ message: "Amount must be a positive number" }).optional(),
    // Add other updatable fields if necessary
}).refine(data => Object.keys(data).length > 0, { message: "At least one field must be provided for update." });

export const validateUpdateTransaction = (data) => updateTransactionSchema.safeParse(data);