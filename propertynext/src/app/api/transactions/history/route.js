import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

// Get transaction history for the authenticated user (customer/agent) or all (admin)
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());
        const skip = (page - 1) * limit;

        const whereClause = {};
        let userProfileId;

        if (session.user.role === 'CUSTOMER') {
            const customerProfile = await prisma.customerProfile.findUnique({
                where: { userId: session.user.id },
                select: { id: true }
            });
            if (!customerProfile) return NextResponse.json({ transactions: [], pagination: { page, limit, total: 0, pages: 0 } });
            userProfileId = customerProfile.id;
            whereClause.customerId = userProfileId;
        } else if (session.user.role === 'AGENT') {
            const agentProfile = await prisma.agentProfile.findUnique({
                where: { userId: session.user.id },
                select: { id: true }
            });
            if (!agentProfile) return NextResponse.json({ transactions: [], pagination: { page, limit, total: 0, pages: 0 } });
            userProfileId = agentProfile.id;
            whereClause.agentId = userProfileId;
        } else if (session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        // For ADMIN, whereClause remains empty to fetch all, unless specific filters are added

        const transactions = await prisma.transaction.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { date: 'desc' },
            include: {
                property: { select: { id: true, title: true, address: true } },
                customer: { select: { user: { select: { id: true, name: true } } } },
                agent: { select: { user: { select: { id: true, name: true } } } },
            }
        });

        const totalTransactions = await prisma.transaction.count({ where: whereClause });

        return NextResponse.json({
            transactions,
            pagination: {
                page,
                limit,
                total: totalTransactions,
                pages: Math.ceil(totalTransactions / limit),
            },
        });

    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return NextResponse.json({ error: "Failed to fetch transaction history" }, { status: 500 });
    }
});