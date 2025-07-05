import { z } from 'zod';

// Base property schema with common fields
const propertyBaseSchema = {
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 characters long' })
        .max(100, { message: 'Title cannot exceed 100 characters' }),
    description: z
        .string()
        .min(20, { message: 'Description must be at least 20 characters long' })
        .max(5000, { message: 'Description cannot exceed 5000 characters' }),
    price: z
        .number()
        .positive({ message: 'Price must be a positive number' }),
    address: z
        .string()
        .min(5, { message: 'Address must be at least 5 characters long' }),
    city: z
        .string()
        .min(2, { message: 'City must be at least 2 characters long' }),
    state: z
        .string()
        .optional(),
    zipCode: z
        .string()
        .min(3, { message: 'Zip code must be at least 3 characters long' }),
    country: z
        .string()
        .min(2, { message: 'Country must be at least 2 characters long' }),
    propertyType: z
        .string()
        .min(3, { message: 'Property type must be at least 3 characters long' }),
    bedrooms: z
        .number()
        .int({ message: 'Bedrooms must be a whole number' })
        .min(0, { message: 'Bedrooms cannot be negative' }),
    bathrooms: z
        .number()
        .min(0, { message: 'Bathrooms cannot be negative' }),
    area: z
        .number()
        .positive({ message: 'Area must be a positive number' }),
    featured: z
        .boolean()
        .default(false),
    status: z
        .enum(['ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'INACTIVE'])
        .default('PENDING'),
    approvalStatus: z
        .enum(['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW'])
        .default('PENDING'),
    rejectionReason: z
        .string()
        .optional(),
};

// Property creation schema with required images
export const propertyCreationSchema = z.object({
    ...propertyBaseSchema,
    images: z
        .array(z.string().url({ message: 'Image must be a valid URL' }))
        .min(1, { message: 'At least one image is required' }),
});

// Property update schema with optional fields for partial updates
export const propertyUpdateSchema = z.object({
    ...Object.entries(propertyBaseSchema).reduce((acc, [key, schema]) => {
        acc[key] = schema.optional();
        return acc;
    }, {}),
    // Images are optional during update
    images: z
        .array(z.string().url({ message: 'Image must be a valid URL' }))
        .optional(),
});

// Admin approval schema
export const propertyApprovalSchema = z
    .object({
        approvalStatus: z.enum(['APPROVED', 'REJECTED', 'UNDER_REVIEW']).refine(
            status => status !== 'PENDING',
            { message: 'Cannot set status back to PENDING' }
        ),
        rejectionReason: z.string().optional(),
        notes: z.string().max(1000).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.approvalStatus === 'REJECTED') {
            if (!data.rejectionReason || data.rejectionReason.trim().length < 10) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['rejectionReason'],
                    message: 'Rejection reason is required and must be at least 10 characters when rejecting',
                });
            }
        }
    });


// Helper functions to validate against schemas
export const validatePropertyCreation = (data) => {
    return propertyCreationSchema.safeParse(data);
};

export const validatePropertyUpdate = (data) => {
    return propertyUpdateSchema.safeParse(data);
};

export const validatePropertyApproval = (data) => {
    return propertyApprovalSchema.safeParse(data);
};
