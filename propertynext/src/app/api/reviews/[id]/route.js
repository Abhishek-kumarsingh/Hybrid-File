import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth, isResourceOwner } from "@/lib/middleware/auth";
import { validateUpdateReview } from "@/lib/validators/user"; // Contains review validators

// Get a specific review by ID
export async function GET(req, { params }) {
    try {
        const { id: reviewId } = params;
        const review = await prisma.review.findUnique({
            where: { id: reviewId },
            include: {
                user: { select: { id: true, name: true, image: true } },
                property: { select: { id: true, title: true } }
            }
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }
        return NextResponse.json(review);
    } catch (error) {
        console.error(`Error fetching review ${params.id}:`, error);
        return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
    }
}

// Update a review
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id: reviewId } = params;
        const session = req.session;
        const body = await req.json();

        const review = await prisma.review.findUnique({ where: { id: reviewId } });
        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const isOwner = review.userId === session.user.id;
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json({ error: "Forbidden: You can only update your own reviews or an admin must perform this action." }, { status: 403 });
        }

        const validation = validateUpdateReview(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
        }

        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: validation.data,
            include: {
                user: { select: { id: true, name: true, image: true } },
            }
        });

        return NextResponse.json(updatedReview);
    } catch (error) {
        console.error(`Error updating review ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Review not found for update" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
});

// Delete a review
export const DELETE = withAuth(async (req, { params }) => {
    try {
        const { id: reviewId } = params;
        const session = req.session;

        const review = await prisma.review.findUnique({ where: { id: reviewId } });
        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const isOwner = review.userId === session.user.id;
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json({ error: "Forbidden: You can only delete your own reviews or an admin must perform this action." }, { status: 403 });
        }

        await prisma.review.delete({
            where: { id: reviewId },
        });

        return NextResponse.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(`Error deleting review ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Review not found for deletion" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
});