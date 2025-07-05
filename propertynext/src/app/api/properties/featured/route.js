import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());

        const featuredProperties = await prisma.property.findMany({
            where: {
                featured: true,
                status: 'ACTIVE', // Only show active featured properties
            },
            take: limit,
            orderBy: {
                createdAt: 'desc', // Or perhaps a specific featured order
            },
            include: {
                images: {
                    where: { isPrimary: true }, // Fetch only primary image or all
                    take: 1,
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                reviews: { // To calculate average rating
                    select: {
                        rating: true,
                    },
                },
            },
        });

        const propertiesWithRating = featuredProperties.map(property => {
            const totalRatings = property.reviews.length;
            const avgRating = totalRatings > 0
                ? property.reviews.reduce((acc, review) => acc + review.rating, 0) / totalRatings
                : null;
            const { reviews, ...propertyWithoutReviews } = property;
            return {
                ...propertyWithoutReviews,
                avgRating: avgRating ? parseFloat(avgRating.toFixed(1)) : null,
                totalRatings,
            };
        });

        return NextResponse.json(propertiesWithRating);
    } catch (error) {
        console.error("Error fetching featured properties:", error);
        return NextResponse.json({ error: "Failed to fetch featured properties" }, { status: 500 });
    }
}