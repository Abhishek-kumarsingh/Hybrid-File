import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { isResourceOwner } from "@/lib/middleware/auth";
import { validatePropertyUpdate } from "@/lib/validators/property";

// Get a single property by ID
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        // Get property with related data
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                images: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        agentProfile: true
                    }
                }
            }
        });

        if (!property) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        // Calculate average rating
        const totalRatings = property.reviews.length;
        const avgRating = totalRatings > 0
            ? property.reviews.reduce((acc, review) => acc + review.rating, 0) / totalRatings
            : null;

        return NextResponse.json({
            ...property,
            totalRatings,
            avgRating
        });
    } catch (error) {
        console.error(`Error fetching property ${params.id}:`, error);

        return NextResponse.json(
            { error: "Failed to fetch property" },
            { status: 500 }
        );
    }
}

// Update a property (requires authentication and ownership)
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id } = params;
        const body = await req.json();
        const session = req.session;

        // Check if user owns this property or is an admin
        const isOwner = await isResourceOwner(session.user.id, 'property', id);
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You don't have permission to update this property" },
                { status: 403 }
            );
        }

        // Validate input
        const validation = validatePropertyUpdate(body);

        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.format() },
                { status: 400 }
            );
        }

        const propertyData = validation.data;

        // Extract images from the request if present
        const { images, ...propertyDetails } = propertyData;

        // Update the property
        const updatedProperty = await prisma.$transaction(async (prisma) => {
            // Update main property details
            const property = await prisma.property.update({
                where: { id },
                data: propertyDetails,
                include: {
                    images: true
                }
            });

            // Update images if provided
            if (images && images.length > 0) {
                // Delete existing images
                await prisma.propertyImage.deleteMany({
                    where: { propertyId: id }
                });

                // Add new images
                await prisma.propertyImage.createMany({
                    data: images.map((url, index) => ({
                        url,
                        propertyId: id,
                        isPrimary: index === 0 // First image is primary
                    }))
                });

                // Refetch the property with updated images
                return prisma.property.findUnique({
                    where: { id },
                    include: {
                        images: true
                    }
                });
            }

            return property;
        });

        return NextResponse.json(updatedProperty);
    } catch (error) {
        console.error(`Error updating property ${params.id}:`, error);

        return NextResponse.json(
            { error: "Failed to update property" },
            { status: 500 }
        );
    }
});

// Delete a property (requires authentication and ownership)
export const DELETE = withAuth(async (req, { params }) => {
    try {
        const { id } = params;
        const session = req.session;

        // Check if user owns this property or is an admin
        const isOwner = await isResourceOwner(session.user.id, 'property', id);
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You don't have permission to delete this property" },
                { status: 403 }
            );
        }

        // Delete property (cascade will delete related images and reviews)
        await prisma.property.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error(`Error deleting property ${params.id}:`, error);

        return NextResponse.json(
            { error: "Failed to delete property" },
            { status: 500 }
        );
    }
});