import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

// Get all customers (Admin only)
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

        const customers = await prisma.user.findMany({
            where: {
                role: 'CUSTOMER',
                customerProfile: { isNot: null } // Ensure customer profile exists
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                customerProfile: {
                    select: {
                        id: true, // CustomerProfile ID
                        phoneNumber: true,
                        preferences: true,
                        budget: true,
                    }
                }
            }
        });

        const totalCustomers = await prisma.user.count({
            where: {
                role: 'CUSTOMER',
                customerProfile: { isNot: null }
            }
        });

        return NextResponse.json({
            customers,
            pagination: {
                page,
                limit,
                total: totalCustomers,
                pages: Math.ceil(totalCustomers / limit),
            },
        });

    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
    }
}, { roles: ['ADMIN'] });