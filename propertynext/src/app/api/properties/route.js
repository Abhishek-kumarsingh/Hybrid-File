import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validatePropertyCreation } from "@/lib/validators/property";

// Get all properties with pagination and filtering
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Filtering
        const filters = {};
        const searchQuery = searchParams.get('search');

        // General search filter (searches across title, description, address, city)
        if (searchQuery) {
            filters.OR = [
                {
                    title: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    address: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    city: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    state: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            ];
        }

        // Property type filter
        if (searchParams.get('type')) {
            filters.propertyType = searchParams.get('type');
        }

        // Price range filter
        if (searchParams.get('minPrice') || searchParams.get('maxPrice')) {
            filters.price = {};

            if (searchParams.get('minPrice')) {
                filters.price.gte = parseFloat(searchParams.get('minPrice'));
            }

            if (searchParams.get('maxPrice')) {
                filters.price.lte = parseFloat(searchParams.get('maxPrice'));
            }
        }

        // Location filter (specific city filter, works alongside general search)
        if (searchParams.get('city') && !searchQuery) {
            filters.city = {
                contains: searchParams.get('city'),
                mode: 'insensitive'
            };
        }

        // Bedrooms filter (greater than or equal to specified number)
        if (searchParams.get('bedrooms')) {
            filters.bedrooms = {
                gte: parseInt(searchParams.get('bedrooms'))
            };
        }

        // Bathrooms filter
        if (searchParams.get('bathrooms')) {
            filters.bathrooms = {
                gte: parseInt(searchParams.get('bathrooms'))
            };
        }

        // Status filter (default to active properties for public listings)
        filters.status = searchParams.get('status') || 'ACTIVE';

        // Only show approved properties for public access
        filters.approvalStatus = 'APPROVED';

        // Featured filter
        if (searchParams.get('featured') === 'true') {
            filters.featured = true;
        }

        // Sorting
        let orderBy = { createdAt: 'desc' }; // Default sort
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        if (sortBy) {
            switch (sortBy) {
                case 'price':
                    orderBy = { price: sortOrder };
                    break;
                case 'createdAt':
                    orderBy = { createdAt: sortOrder };
                    break;
                case 'title':
                    orderBy = { title: sortOrder };
                    break;
                case 'area':
                    orderBy = { area: sortOrder };
                    break;
                default:
                    orderBy = { createdAt: 'desc' };
            }
        }

        // Get total count of matching properties
        const total = await prisma.property.count({
            where: filters
        });

        // Get properties
        const properties = await prisma.property.findMany({
            where: filters,
            include: {
                images: {
                    orderBy: {
                        isPrimary: 'desc'
                    }
                },
                reviews: {
                    select: {
                        rating: true
                    }
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            },
            orderBy,
            skip,
            take: limit
        });

        // Calculate average rating for each property
        const propertiesWithRating = properties.map(property => {
            const totalRatings = property.reviews.length;
            const avgRating = totalRatings > 0
                ? property.reviews.reduce((acc, review) => acc + review.rating, 0) / totalRatings
                : null;

            const { reviews, ...propertyWithoutReviews } = property;

            return {
                ...propertyWithoutReviews,
                totalRatings,
                avgRating
            };
        });

        // Return properties with pagination metadata
        return NextResponse.json({
            properties: propertiesWithRating,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching properties:", error);

        return NextResponse.json(
            { error: "Failed to fetch properties" },
            { status: 500 }
        );
    }
}

// Create a new property (requires authentication)
export const POST = withAuth(async (req) => {
    try {
        const body = await req.json();
        const session = req.session;

        // Validate input
        const validation = validatePropertyCreation(body);

        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.format() },
                { status: 400 }
            );
        }

        const propertyData = validation.data;

        // Extract images from the request
        const { images, ...propertyDetails } = propertyData;

        // Create the property with approval workflow
        const property = await prisma.$transaction(async (prisma) => {
            // Create the property
            const newProperty = await prisma.property.create({
                data: {
                    ...propertyDetails,
                    ownerId: session.user.id,
                    status: 'PENDING',
                    approvalStatus: 'PENDING',
                    images: {
                        create: images.map((url, index) => ({
                            url,
                            isPrimary: index === 0 // First image is primary
                        }))
                    }
                },
                include: {
                    images: true,
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });

            // Create property submission record
            await prisma.propertySubmission.create({
                data: {
                    propertyId: newProperty.id,
                    status: 'PENDING',
                    submittedAt: new Date()
                }
            });

            // Create notification for the user
            await prisma.notification.create({
                data: {
                    userId: session.user.id,
                    title: 'Property Submitted Successfully',
                    message: `Your property "${newProperty.title}" has been submitted for review. You will be notified once it's reviewed by our team.`,
                    type: 'PROPERTY_SUBMITTED'
                }
            });

            return newProperty;
        });

        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        console.error("Error creating property:", error);

        return NextResponse.json(
            { error: "Failed to create property" },
            { status: 500 }
        );
    }
});
