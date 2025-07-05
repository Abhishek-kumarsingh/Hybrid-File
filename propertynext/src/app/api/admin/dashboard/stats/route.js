import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";

// Get admin dashboard statistics
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;

        // Check if user is admin
        if (session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: "Only admins can access dashboard statistics" },
                { status: 403 }
            );
        }

        // Get current date for time-based queries
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

        // Get all statistics in parallel
        const [
            totalProperties,
            pendingProperties,
            approvedProperties,
            rejectedProperties,
            totalUsers,
            totalAgents,
            totalCustomers,
            propertiesThisMonth,
            propertiesThisWeek,
            recentSubmissions,
            propertyStatusBreakdown,
            monthlySubmissions
        ] = await Promise.all([
            // Property counts
            prisma.property.count(),
            prisma.property.count({ where: { approvalStatus: 'PENDING' } }),
            prisma.property.count({ where: { approvalStatus: 'APPROVED' } }),
            prisma.property.count({ where: { approvalStatus: 'REJECTED' } }),
            
            // User counts
            prisma.user.count(),
            prisma.user.count({ where: { role: 'AGENT' } }),
            prisma.user.count({ where: { role: 'CUSTOMER' } }),
            
            // Time-based property counts
            prisma.property.count({
                where: { createdAt: { gte: startOfMonth } }
            }),
            prisma.property.count({
                where: { createdAt: { gte: startOfWeek } }
            }),
            
            // Recent submissions for quick review
            prisma.property.findMany({
                where: { approvalStatus: 'PENDING' },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    images: {
                        where: { isPrimary: true },
                        take: 1
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 5
            }),
            
            // Property status breakdown
            prisma.property.groupBy({
                by: ['status'],
                _count: { status: true }
            }),
            
            // Monthly submissions for chart
            prisma.$queryRaw`
                SELECT 
                    DATE_TRUNC('month', "createdAt") as month,
                    COUNT(*) as count
                FROM "Property" 
                WHERE "createdAt" >= NOW() - INTERVAL '12 months'
                GROUP BY DATE_TRUNC('month', "createdAt")
                ORDER BY month ASC
            `
        ]);

        // Format the statistics
        const stats = {
            overview: {
                totalProperties,
                pendingProperties,
                approvedProperties,
                rejectedProperties,
                totalUsers,
                totalAgents,
                totalCustomers,
                propertiesThisMonth,
                propertiesThisWeek
            },
            recentSubmissions,
            propertyStatusBreakdown: propertyStatusBreakdown.reduce((acc, item) => {
                acc[item.status] = item._count.status;
                return acc;
            }, {}),
            monthlySubmissions: monthlySubmissions.map(item => ({
                month: item.month,
                count: parseInt(item.count)
            })),
            approvalStats: {
                pending: pendingProperties,
                approved: approvedProperties,
                rejected: rejectedProperties,
                approvalRate: totalProperties > 0 
                    ? ((approvedProperties / (approvedProperties + rejectedProperties)) * 100).toFixed(1)
                    : 0
            }
        };

        return NextResponse.json(stats);

    } catch (error) {
        console.error('Get dashboard stats error:', error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard statistics" },
            { status: 500 }
        );
    }
});
