import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validateTransaction } from "@/lib/validators/user"; // Contains transaction validators
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

// List transactions (Admin focused, or can be adapted for specific contexts)
export const GET = withAuth(async (req) => {
    const session = req.session;
    if (session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Forbidden: Admin access required." }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());
        const skip = (page - 1) * limit;

        // Add filters like status, type, userId etc. if needed
        const status = searchParams.get('status');
        const type = searchParams.get('type');

        const whereClause = {};
        if (status) whereClause.status = status.toUpperCase();
        if (type) whereClause.type = type.toUpperCase();


        const transactions = await prisma.transaction.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { date: 'desc' },
            include: {
                property: { select: { id: true, title: true } },
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
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
});


// Create a new transaction
export const POST = withAuth(async (req) => {
    try {
        const session = req.session;
        const body = await req.json();

        // Basic authorization: ensure user is at least a customer or agent
        if (session.user.role !== 'CUSTOMER' && session.user.role !== 'AGENT' && session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Forbidden: Insufficient permissions to create a transaction." }, { status: 403 });
        }

        const validation = validateTransaction(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
        }
        const { propertyId, customerId: customerProfileId, agentId: agentProfileId, ...transactionData } = validation.data;

        // Verify property, customer profile, and agent profile exist
        const property = await prisma.property.findUnique({ where: { id: propertyId } });
        if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });

        const customerProfile = await prisma.customerProfile.findUnique({ where: { id: customerProfileId } });
        if (!customerProfile) return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });

        // If the logged-in user is a customer, ensure they are the customer in the transaction
        if (session.user.role === 'CUSTOMER' && customerProfile.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden: Customers can only create transactions for themselves." }, { status: 403 });
        }

        const agentProfile = await prisma.agentProfile.findUnique({ where: { id: agentProfileId } });
        if (!agentProfile) return NextResponse.json({ error: "Agent profile not found" }, { status: 404 });


        const newTransaction = await prisma.transaction.create({
            data: {
                ...transactionData,
                propertyId,
                customerId: customerProfile.id, // Use the actual CustomerProfile ID
                agentId: agentProfile.id,       // Use the actual AgentProfile ID
            },
            include: {
                property: { select: { id: true, title: true } },
                customer: { include: { user: { select: { id: true, name: true } } } },
                agent: { include: { user: { select: { id: true, name: true } } } },
            }
        });

        // Potential further actions:
        // - Update property status (e.g., to PENDING or SOLD/RENTED if transaction is COMPLETED)
        // - Send notifications

        return NextResponse.json(newTransaction, { status: 201 });

    } catch (error) {
        console.error("Error creating transaction:", error);
        if (error.code === 'P2003') { // Foreign key constraint failed
            return NextResponse.json({ error: "Invalid property, customer, or agent ID provided." }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
});