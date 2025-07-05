import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";

// Get user property statistics
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;
        const userId = session.user.id;

        // Get all statistics in parallel
        const [
            totalProperties,
            pendingProperties,
            approvedProperties,
            rejectedProperties,
            underReviewProperties,
            activeProperties,
            soldProperties,
            rentedProperties,
            recentProperties,
            monthlySubmissions
        ] = await Promise.all([
            // Property counts by approval status
            prisma.property.count({ where: { ownerId: userId } }),
            prisma.property.count({ where: { ownerId: userId, approvalStatus: 'PENDING' } }),
            prisma.property.count({ where: { ownerId: userId, approvalStatus: 'APPROVED' } }),
            prisma.property.count({ where: { ownerId: userId, approvalStatus: 'REJECTED' } }),
            prisma.property.count({ where: { ownerId: userId, approvalStatus: 'UNDER_REVIEW' } }),
            
            // Property counts by status
            prisma.property.count({ where: { ownerId: userId, status: 'ACTIVE' } }),
            prisma.property.count({ where: { ownerId: userId, status: 'SOLD' } }),
            prisma.property.count({ where: { ownerId: userId, status: 'RENTED' } }),
            
            // Recent properties
            prisma.property.findMany({
                where: { ownerId: userId },
                include: {
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
                orderBy: { createdAt: 'desc' },
                take: 5
            }),
            
            // Monthly submissions for chart (last 6 months)
            prisma.$queryRaw`
                SELECT 
                    DATE_TRUNC('month', "createdAt") as month,
                    COUNT(*) as count
                FROM "Property" 
                WHERE "ownerId" = ${userId}
                AND "createdAt" >= NOW() - INTERVAL '6 months'
                GROUP BY DATE_TRUNC('month', "createdAt")
                ORDER BY month ASC
            `
        ]);

        // Calculate approval rate
        const totalReviewed = approvedProperties + rejectedProperties;
        const approvalRate = totalReviewed > 0 ? ((approvedProperties / totalReviewed) * 100).toFixed(1) : 0;

        // Get property status breakdown
        const statusBreakdown = {
            ACTIVE: activeProperties,
            SOLD: soldProperties,
            RENTED: rentedProperties,
            PENDING: pendingProperties
        };

        // Get approval status breakdown
        const approvalBreakdown = {
            PENDING: pendingProperties,
            APPROVED: approvedProperties,
            REJECTED: rejectedProperties,
            UNDER_REVIEW: underReviewProperties
        };

        // Format monthly submissions
        const formattedMonthlySubmissions = monthlySubmissions.map(item => ({
            month: item.month,
            count: parseInt(item.count)
        }));

        const stats = {
            overview: {
                totalProperties,
                pendingProperties,
                approvedProperties,
                rejectedProperties,
                underReviewProperties,
                activeProperties,
                soldProperties,
                rentedProperties,
                approvalRate
            },
            recentProperties,
            statusBreakdown,
            approvalBreakdown,
            monthlySubmissions: formattedMonthlySubmissions,
            performance: {
                totalSubmissions: totalProperties,
                successfulApprovals: approvedProperties,
                pendingReview: pendingProperties + underReviewProperties,
                rejectionRate: totalReviewed > 0 ? ((rejectedProperties / totalReviewed) * 100).toFixed(1) : 0
            }
        };

        return NextResponse.json(stats);

    } catch (error) {
        console.error('Get user property stats error:', error);
        return NextResponse.json(
            { error: "Failed to fetch property statistics" },
            { status: 500 }
        );
    }
});
