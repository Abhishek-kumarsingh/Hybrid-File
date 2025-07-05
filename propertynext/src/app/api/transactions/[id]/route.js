import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validateUpdateTransaction } from "@/lib/validators/user"; // Contains transaction validators

// Get a specific transaction by ID
export const GET = withAuth(async (req, { params }) => {
    try {
        const { id: transactionId } = params;
        const session = req.session;

        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            include: {
                property: { select: { id: true, title: true, address: true, city: true } },
                customer: { include: { user: { select: { id: true, name: true, email: true } } } }, // CustomerProfile.user
                agent: { include: { user: { select: { id: true, name: true, email: true } } } },    // AgentProfile.user
            }
        });

        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        // Authorization: Admin, or customer/agent involved in the transaction
        const isCustomerInvolved = transaction.customer.userId === session.user.id;
        const isAgentInvolved = transaction.agent.userId === session.user.id;

        if (session.user.role !== 'ADMIN' && !isCustomerInvolved && !isAgentInvolved) {
            return NextResponse.json({ error: "Forbidden: You are not authorized to view this transaction." }, { status: 403 });
        }

        return NextResponse.json(transaction);

    } catch (error) {
        console.error(`Error fetching transaction ${params.id}:`, error);
        return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 });
    }
});

// Update a transaction (e.g., status by admin or agent)
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id: transactionId } = params;
        const session = req.session;
        const body = await req.json();

        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { agent: { select: { userId: true } } }
        });

        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        // Authorization: Admin or the agent involved in the transaction
        const isAgentInvolved = transaction.agent.userId === session.user.id;
        if (session.user.role !== 'ADMIN' && !isAgentInvolved) {
            return NextResponse.json({ error: "Forbidden: Only admins or the involved agent can update this transaction." }, { status: 403 });
        }

        const validation = validateUpdateTransaction(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: validation.data,
            include: { // Return the updated transaction with details
                property: { select: { id: true, title: true } },
                customer: { include: { user: { select: { id: true, name: true } } } },
                agent: { include: { user: { select: { id: true, name: true } } } },
            }
        });

        return NextResponse.json(updatedTransaction);

    } catch (error) {
        console.error(`Error updating transaction ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Transaction not found for update" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
});