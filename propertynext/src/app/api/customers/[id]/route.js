import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validateUpdateCustomerProfile } from "@/lib/validators/user";

// Get customer profile by User ID
export const GET = withAuth(async (req, { params }) => {
    try {
        const { id: userId } = params;
        const session = req.session;

        // Admin can fetch any customer. Customer can fetch their own profile.
        if (session.user.role !== 'ADMIN' && session.user.id !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const customer = await prisma.user.findUnique({
            where: { id: userId, role: 'CUSTOMER' },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                customerProfile: true,
            }
        });

        if (!customer || !customer.customerProfile) {
            return NextResponse.json({ error: "Customer not found or has no profile" }, { status: 404 });
        }

        return NextResponse.json(customer);
    } catch (error) {
        console.error(`Error fetching customer ${params.id}:`, error);
        return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
    }
});

// Update customer profile by User ID
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id: userId } = params;
        const session = req.session;
        const body = await req.json();

        // Allow admin or the customer themselves to update
        if (session.user.role !== 'ADMIN' && session.user.id !== userId) {
            return NextResponse.json({ error: "Forbidden: You can only update your own profile or an admin must perform this action." }, { status: 403 });
        }

        const customerUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!customerUser || customerUser.role !== 'CUSTOMER') {
            return NextResponse.json({ error: "User is not a customer or does not exist." }, { status: 404 });
        }
        // Ensure customer profile exists, create if not (though registration should handle this)
        if (!customerUser.customerProfileId && !(await prisma.customerProfile.findUnique({ where: { userId } }))) {
            await prisma.customerProfile.create({ data: { userId } });
        }

        const validation = validateUpdateCustomerProfile(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
        }

        const updatedCustomerProfile = await prisma.customerProfile.update({
            where: { userId: userId },
            data: validation.data,
        });

        const userWithUpdatedProfile = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, image: true, customerProfile: true }
        });

        return NextResponse.json(userWithUpdatedProfile);

    } catch (error) {
        console.error(`Error updating customer ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Customer profile not found for update." }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update customer profile." }, { status: 500 });
    }
});