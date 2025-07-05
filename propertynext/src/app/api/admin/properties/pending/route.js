import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";

// Get all pending properties for admin review
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;

        // Check if user is admin
        if (session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: "Only admins can access pending properties" },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(req.url);
        
        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Filtering
        const status = searchParams.get('status') || 'PENDING';
        const search = searchParams.get('search');

        // Build where clause
        const where = {
            approvalStatus: status
        };

        // Add search functionality
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { owner: { name: { contains: search, mode: 'insensitive' } } },
                { owner: { email: { contains: search, mode: 'insensitive' } } }
            ];
        }

        // Get properties with pagination
        const [properties, total] = await Promise.all([
            prisma.property.findMany({
                where,
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                            role: true
                        }
                    },
                    images: {
                        where: { isPrimary: true },
                        take: 1
                    },
                    _count: {
                        select: {
                            reviews: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit
            }),
            prisma.property.count({ where })
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        return NextResponse.json({
            properties,
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
        console.error('Get pending properties error:', error);
        return NextResponse.json(
            { error: "Failed to fetch pending properties" },
            { status: 500 }
        );
    }
});
