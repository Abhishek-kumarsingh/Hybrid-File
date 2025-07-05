import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";

// Get user's own properties (including pending ones)
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;
        const userId = session.user.id;
        const { searchParams } = new URL(req.url);

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Filtering
        const filters = { ownerId: userId };
        const searchQuery = searchParams.get('search');
        const status = searchParams.get('status');
        const approvalStatus = searchParams.get('approvalStatus');

        // Search filter
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
                }
            ];
        }

        // Status filters
        if (status) {
            filters.status = status;
        }

        if (approvalStatus) {
            filters.approvalStatus = approvalStatus;
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
                case 'approvalStatus':
                    orderBy = { approvalStatus: sortOrder };
                    break;
                default:
                    orderBy = { createdAt: 'desc' };
            }
        }

        // Get properties with pagination
        const [properties, total] = await Promise.all([
            prisma.property.findMany({
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
                    _count: {
                        select: {
                            reviews: true
                        }
                    }
                },
                orderBy,
                skip,
                take: limit
            }),
            prisma.property.count({ where: filters })
        ]);

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

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        return NextResponse.json({
            properties: propertiesWithRating,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext,
                hasPrev
            }
        });

    } catch (error) {
        console.error('Get user properties error:', error);
        return NextResponse.json(
            { error: "Failed to fetch properties" },
            { status: 500 }
        );
    }
});
