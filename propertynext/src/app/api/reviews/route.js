import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validateReview } from "@/lib/validators/user"; // Contains review validators
import { DEFAULT_PAGE_LIMIT } from "@/config/constants";

// Create a new review
export const POST = withAuth(async (req) => {
    try {
        const session = req.session;
        const body = await req.json();

        // Authorization: typically CUSTOMERs write reviews, but can be adapted.
        // Admins/Agents usually don't review properties they manage/list.
        if (session.user.role !== 'CUSTOMER' && session.user.role !== 'ADMIN') { // Admin might add a review for moderation or example
            return NextResponse.json({ error: "Forbidden: Only customers can write reviews." }, { status: 403 });
        }

        const validation = validateReview(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
        }
        const { propertyId, rating, comment } = validation.data;

        // Check if property exists
        const property = await prisma.property.findUnique({ where: { id: propertyId } });
        if (!property) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        // Prevent user from reviewing their own property (if applicable)
        if (property.ownerId === session.user.id) {
            return NextResponse.json({ error: "You cannot review your own property." }, { status: 403 });
        }

        // Check if user has already reviewed this property
        const existingReview = await prisma.review.findUnique({
            where: {
                propertyId_userId: {
                    propertyId: propertyId,
                    userId: session.user.id,
                },
            },
        });

        if (existingReview) {
            return NextResponse.json({ error: "You have already reviewed this property." }, { status: 409 }); // Conflict
        }

        // Optional: Check if user has purchased/rented the property via a transaction
        // This adds complexity but ensures reviews are from actual customers of that property.
        // const transactionExists = await prisma.transaction.findFirst({
        //     where: {
        //         propertyId: propertyId,
        //         customer: { userId: session.user.id }, // Assuming customerProfile.userId links to User.id
        //         status: 'COMPLETED'
        //     }
        // });
        // if (!transactionExists && session.user.role !== 'ADMIN') { // Admin might bypass this
        //     return NextResponse.json({ error: "You must have a completed transaction for this property to leave a review." }, { status: 403 });
        // }


        const newReview = await prisma.review.create({
            data: {
                propertyId,
                userId: session.user.id,
                rating,
                comment,
            },
            include: {
                user: { select: { id: true, name: true, image: true } },
            }
        });

        return NextResponse.json(newReview, { status: 201 });

    } catch (error) {
        console.error("Error creating review:", error);
        if (error.code === 'P2002') { // Unique constraint failed (propertyId_userId)
            return NextResponse.json({ error: "You have already reviewed this property (P2002)." }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
});

// GET all reviews (admin focused, or with filters)
export const GET = withAuth(async (req) => {
    const session = req.session;
    if (session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Forbidden: Admin access required to list all reviews." }, { status: 403 });
    }
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGE_LIMIT.toString());
        const skip = (page - 1) * limit;

        // Add filters like propertyId, userId, minRating etc. if needed
        const propertyId = searchParams.get('propertyId');
        const userId = searchParams.get('userId');

        const whereClause = {};
        if (propertyId) whereClause.propertyId = propertyId;
        if (userId) whereClause.userId = userId;


        const reviews = await prisma.review.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, image: true } },
                property: { select: { id: true, title: true } }
            }
        });

        const totalReviews = await prisma.review.count({ where: whereClause });

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
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
});