import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validateUpdateAgentProfile } from "@/lib/validators/user";

// Get agent profile by User ID
export async function GET(req, { params }) {
    try {
        const { id: userId } = params;

        const agent = await prisma.user.findUnique({
            where: { id: userId, role: 'AGENT' },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                agentProfile: true,
                // Add other user fields if necessary, excluding password
            }
        });

        if (!agent || !agent.agentProfile) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }

        return NextResponse.json(agent);
    } catch (error) {
        console.error(`Error fetching agent ${params.id}:`, error);
        return NextResponse.json({ error: "Failed to fetch agent" }, { status: 500 });
    }
}

// Update agent profile by User ID
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id: userId } = params;
        const session = req.session;
        const body = await req.json();

        // Allow admin or the agent themselves to update
        if (session.user.role !== 'ADMIN' && session.user.id !== userId) {
            return NextResponse.json({ error: "Forbidden: You can only update your own profile or an admin must perform this action." }, { status: 403 });
        }

        // Ensure the user being updated is an agent
        const agentUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!agentUser || agentUser.role !== 'AGENT') {
            return NextResponse.json({ error: "User is not an agent or does not exist." }, { status: 404 });
        }
        if (!agentUser.agentProfileId && !(await prisma.agentProfile.findUnique({ where: { userId } }))) {
            await prisma.agentProfile.create({ data: { userId } }); // Create profile if it doesn't exist for an agent
        }


        const validation = validateUpdateAgentProfile(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
        }

        const updatedAgentProfile = await prisma.agentProfile.update({
            where: { userId: userId },
            data: validation.data,
        });

        const userWithUpdatedProfile = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, image: true, agentProfile: true }
        });

        return NextResponse.json(userWithUpdatedProfile);

    } catch (error) {
        console.error(`Error updating agent ${params.id}:`, error);
        if (error.code === 'P2025') { // Record to update not found
            return NextResponse.json({ error: "Agent profile not found for update." }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update agent profile." }, { status: 500 });
    }
});