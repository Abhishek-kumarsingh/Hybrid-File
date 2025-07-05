import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth, isResourceOwner } from "@/lib/middleware/auth";
import { unlink } from "fs/promises";
import { join } from "path";

// Update image (set as primary, etc.)
export const PUT = withAuth(async (req, { params }) => {
    try {
        const { id: propertyId, imageId } = await params;
        const { isPrimary } = await req.json();
        const session = req.session;

        // Check if user owns this property or is an admin
        const isOwner = await isResourceOwner(session.user.id, 'property', propertyId);
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You don't have permission to update this image" },
                { status: 403 }
            );
        }

        // Check if image exists and belongs to the property
        const image = await prisma.propertyImage.findFirst({
            where: {
                id: imageId,
                propertyId
            }
        });

        if (!image) {
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 }
            );
        }

        // If setting as primary, remove primary status from other images
        if (isPrimary) {
            await prisma.propertyImage.updateMany({
                where: {
                    propertyId,
                    id: { not: imageId }
                },
                data: { isPrimary: false }
            });
        }

        // Update the image
        const updatedImage = await prisma.propertyImage.update({
            where: { id: imageId },
            data: { isPrimary }
        });

        return NextResponse.json(updatedImage);

    } catch (error) {
        console.error("Error updating property image:", error);
        return NextResponse.json(
            { error: "Failed to update image" },
            { status: 500 }
        );
    }
});

// Delete a property image
export const DELETE = withAuth(async (req, { params }) => {
    try {
        const { id: propertyId, imageId } = await params;
        const session = req.session;

        // Check if user owns this property or is an admin
        const isOwner = await isResourceOwner(session.user.id, 'property', propertyId);
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You don't have permission to delete this image" },
                { status: 403 }
            );
        }

        // Check if image exists and belongs to the property
        const image = await prisma.propertyImage.findFirst({
            where: {
                id: imageId,
                propertyId
            }
        });

        if (!image) {
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 }
            );
        }

        // Delete the file from filesystem
        try {
            const filePath = join(process.cwd(), 'public', image.url);
            await unlink(filePath);
        } catch (fileError) {
            console.warn("Could not delete file from filesystem:", fileError);
            // Continue with database deletion even if file deletion fails
        }

        // Delete from database
        await prisma.propertyImage.delete({
            where: { id: imageId }
        });

        // If this was the primary image, set another image as primary
        if (image.isPrimary) {
            const nextImage = await prisma.propertyImage.findFirst({
                where: { propertyId },
                orderBy: { createdAt: 'asc' }
            });

            if (nextImage) {
                await prisma.propertyImage.update({
                    where: { id: nextImage.id },
                    data: { isPrimary: true }
                });
            }
        }

        return NextResponse.json({ message: "Image deleted successfully" });

    } catch (error) {
        console.error("Error deleting property image:", error);
        return NextResponse.json(
            { error: "Failed to delete image" },
            { status: 500 }
        );
    }
});
