import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

// Get all agents
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());
        const skip = (page - 1) * limit;
        const sortBy = searchParams.get('sortBy') || 'createdAt'; // e.g., rating, name
        const sortOrder = searchParams.get('sortOrder') || 'desc'; // asc or desc

        const orderBy = {};
        if (sortBy === 'rating' && sortOrder) {
            orderBy.agentProfile = { rating: sortOrder };
        } else if (sortBy === 'name' && sortOrder) {
            orderBy.name = sortOrder;
        } else {
            orderBy.createdAt = sortOrder;
        }


        const agents = await prisma.user.findMany({
            where: {
                role: 'AGENT',
                agentProfile: { // Ensure agent profile exists
                    isNot: null
                }
            },
            skip,
            take: limit,
            orderBy,
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                agentProfile: {
                    select: {
                        id: true, // AgentProfile ID
                        bio: true,
                        specialty: true,
                        yearsExperience: true,
                        rating: true,
                        phoneNumber: true,
                        licenseNumber: true
                    }
                }
            }
        });

        const totalAgents = await prisma.user.count({
            where: {
                role: 'AGENT',
                agentProfile: { isNot: null }
            }
        });

        return NextResponse.json({
            agents,
            pagination: {
                page,
                limit,
                total: totalAgents,
                pages: Math.ceil(totalAgents / limit),
            },
        });

    } catch (error) {
        console.error("Error fetching agents:", error);
        return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
    }
}