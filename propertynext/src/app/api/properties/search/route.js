import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Search properties with advanced filters
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Build search query
        const where = {
            status: 'ACTIVE', // Only active properties in search
        };

        // Search term (searches in title, description, address, city, state)
        const searchTerm = searchParams.get('q') || searchParams.get('search');
        if (searchTerm) {
            where.OR = [
                {
                    title: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    address: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    city: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    state: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    propertyType: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                }
            ];
        }

        // Property type filter
        if (searchParams.get('type')) {
            where.propertyType = searchParams.get('type');
        }

        // Price range filter
        if (searchParams.get('minPrice') || searchParams.get('maxPrice')) {
            where.price = {};

            if (searchParams.get('minPrice')) {
                where.price.gte = parseFloat(searchParams.get('minPrice'));
            }

            if (searchParams.get('maxPrice')) {
                where.price.lte = parseFloat(searchParams.get('maxPrice'));
            }
        }

        // Location filters
        if (searchParams.get('city')) {
            where.city = {
                contains: searchParams.get('city'),
                mode: 'insensitive',
            };
        }

        if (searchParams.get('state')) {
            where.state = {
                contains: searchParams.get('state'),
                mode: 'insensitive',
            };
        }

        if (searchParams.get('country')) {
            where.country = {
                contains: searchParams.get('country'),
                mode: 'insensitive',
            };
        }

        // Bedrooms filter
        if (searchParams.get('bedrooms')) {
            where.bedrooms = {
                gte: parseInt(searchParams.get('bedrooms')),
            };
        }

        // Bathrooms filter
        if (searchParams.get('bathrooms')) {
            where.bathrooms = {
                gte: parseInt(searchParams.get('bathrooms')),
            };
        }

        // Area filter
        if (searchParams.get('minArea')) {
            where.area = {
                ...where.area,
                gte: parseFloat(searchParams.get('minArea')),
            };
        }

        if (searchParams.get('maxArea')) {
            where.area = {
                ...where.area,
                lte: parseFloat(searchParams.get('maxArea')),
            };
        }

        // Order by
        let orderBy = { createdAt: 'desc' }; // Default sort
        const sortBy = searchParams.get('sortBy') || searchParams.get('sortField');
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        if (sortBy) {
            // Validate sort field to prevent injection
            const allowedSortFields = ['price', 'createdAt', 'bedrooms', 'bathrooms', 'area', 'title'];
            if (allowedSortFields.includes(sortBy)) {
                orderBy = { [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc' };
            }
        }

        // Get total count for pagination
        const total = await prisma.property.count({
            where,
        });

        // Fetch properties
        const properties = await prisma.property.findMany({
            where,
            include: {
                images: {
                    orderBy: {
                        isPrimary: 'desc',
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy,
            skip,
            take: limit,
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
                avgRating,
            };
        });

        // Return properties with pagination metadata
        return NextResponse.json({
            properties: propertiesWithRating,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error searching properties:", error);

        return NextResponse.json(
            { error: "Failed to search properties" },
            { status: 500 }
        );
    }
}