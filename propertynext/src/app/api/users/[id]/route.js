import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validateAdminUpdateUser, validateUpdateUserProfile, validateUpdateAgentProfile, validateUpdateCustomerProfile } from "@/lib/validators/user";
import { hashPassword } from "@/lib/auth/password";

// Get a single user by ID
export const GET = withAuth(async (req, { params }) => {
    try {
        const { id: userId } = params;
        const session = req.session;

        // Admin can fetch any user. User can fetch their own profile.
        if (session.user.role !== 'ADMIN' && session.user.id !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                agentProfile: true,
                customerProfile: true,
                // devices: true, // Be cautious about exposing device info
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);

    } catch (error) {
        console.error(`Error fetching user ${params.id}:`, error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
});

// Update a user by ID
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id: userId } = params;
        const session = req.session;
        const body = await req.json();

        const isAdmin = session.user.role === 'ADMIN';
        const isOwner = session.user.id === userId;

        if (!isAdmin && !isOwner) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        let validatedData;
        let userUpdateData = {};
        let agentProfileUpdateData = {};
        let customerProfileUpdateData = {};

        if (isAdmin) {
            const validation = validateAdminUpdateUser(body);
            if (!validation.success) {
                return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
            }
            validatedData = validation.data;
            const { agentProfile, customerProfile, password, ...adminUserFields } = validatedData;
            userUpdateData = adminUserFields;
            if (password) {
                userUpdateData.password = await hashPassword(password);
            }
            if (agentProfile) agentProfileUpdateData = agentProfile;
            if (customerProfile) customerProfileUpdateData = customerProfile;
        } else { // isOwner but not Admin
            const userProfileValidation = validateUpdateUserProfile(body.userProfile || body);
            if (!userProfileValidation.success) {
                return NextResponse.json({ errors: userProfileValidation.error.format() }, { status: 400 });
            }
            userUpdateData = userProfileValidation.data;

            const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
            if (!currentUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

            if (currentUser.role === 'AGENT' && body.agentProfile) {
                const agentValidation = validateUpdateAgentProfile(body.agentProfile);
                if (!agentValidation.success) {
                    return NextResponse.json({ errors: agentValidation.error.format() }, { status: 400 });
                }
                agentProfileUpdateData = agentValidation.data;
            } else if (currentUser.role === 'CUSTOMER' && body.customerProfile) {
                const customerValidation = validateUpdateCustomerProfile(body.customerProfile);
                if (!customerValidation.success) {
                    return NextResponse.json({ errors: customerValidation.error.format() }, { status: 400 });
                }
                customerProfileUpdateData = customerValidation.data;
            }
        }

        const updatedUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.update({
                where: { id: userId },
                data: userUpdateData,
            });

            if (Object.keys(agentProfileUpdateData).length > 0 && user.role === 'AGENT') {
                await tx.agentProfile.update({
                    where: { userId: userId },
                    data: agentProfileUpdateData,
                });
            }

            if (Object.keys(customerProfileUpdateData).length > 0 && user.role === 'CUSTOMER') {
                await tx.customerProfile.update({
                    where: { userId: userId },
                    data: customerProfileUpdateData,
                });
            }
            return tx.user.findUnique({
                where: { id: userId },
                include: { agentProfile: true, customerProfile: true }
            });
        });

        const { password, ...userWithoutPassword } = updatedUser;
        return NextResponse.json(userWithoutPassword);

    } catch (error) {
        console.error(`Error updating user ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "User or profile not found for update" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
});

// Delete a user by ID (Admin only)
export const DELETE = withAuth(async (req, { params }) => {
    try {
        const { id: userId } = params;
        const session = req.session;

        if (session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (session.user.id === userId) {
            return NextResponse.json({ error: "Admin cannot delete their own account this way." }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "User deleted successfully" });

    } catch (error) {
        console.error(`Error deleting user ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "User not found for deletion" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
});