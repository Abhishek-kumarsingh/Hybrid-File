import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

export async function GET(req, { params }) {
    try {
        const { id: propertyId } = params;
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());
        const skip = (page - 1) * limit;

        const propertyExists = await prisma.property.findUnique({ where: { id: propertyId } });
        if (!propertyExists) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        const reviews = await prisma.review.findMany({
            where: { propertyId: propertyId },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        const totalReviews = await prisma.review.count({
            where: { propertyId: propertyId },
        });

        return NextResponse.json({
            reviews,
            pagination: {
                page,
                limit,
                total: totalReviews,
                pages: Math.ceil(totalReviews / limit),
            },
        });
    } catch (error) {
        console.error(`Error fetching reviews for property ${params.id}:`, error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}