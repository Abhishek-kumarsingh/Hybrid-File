import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

// Get all users (Admin only)
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;

        if (session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());
        const skip = (page - 1) * limit;
        const role = searchParams.get('role'); // Optional role filter

        const whereClause = {};
        if (role) {
            whereClause.role = role.toUpperCase();
        }

        const users = await prisma.user.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: { // Select specific fields to avoid exposing sensitive data like password
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
                image: true,
                lockedUntil: true,
                failedAttempts: true,
                // Include profiles if needed, but be mindful of data size
                // agentProfile: true,
                // customerProfile: true,
            }
        });

        const totalUsers = await prisma.user.count({ where: whereClause });

        return NextResponse.json({
            users,
            pagination: {
                page,
                limit,
                total: totalUsers,
                pages: Math.ceil(totalUsers / limit),
            },
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}, { roles: ['ADMIN'] }); // Alternative way to specify roles with `withAuth`

// POST to create user is typically handled by /register or admin-specific endpoint if different logic applies
// For now, keeping it simple with just GET for admins.