import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth, isResourceOwner } from "@/lib/middleware/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

// Upload images for a property
export const POST = withAuth(async (req, { params }) => {
    try {
        const { id: propertyId } = await params;
        const session = req.session;

        // Check if property exists
        const property = await prisma.property.findUnique({
            where: { id: propertyId }
        });

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        // Check if user owns this property or is an admin
        const isOwner = await isResourceOwner(session.user.id, 'property', propertyId);
        const isAdmin = session.user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You don't have permission to upload images for this property" },
                { status: 403 }
            );
        }

        const formData = await req.formData();
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: "No files provided" },
                { status: 400 }
            );
        }

        // Validate file count (max 20 images per property)
        const existingImages = await prisma.propertyImage.count({
            where: { propertyId }
        });

        if (existingImages + files.length > 20) {
            return NextResponse.json(
                { error: "Maximum 20 images allowed per property" },
                { status: 400 }
            );
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const uploadedImages = [];
        const errors = [];

        // Create upload directory
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'properties', propertyId);
        await mkdir(uploadDir, { recursive: true });

        // Process each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            try {
                // Validate file type
                if (!allowedTypes.includes(file.type)) {
                    errors.push({
                        file: file.name,
                        error: "Invalid file type. Only JPEG, PNG, and WebP are allowed."
                    });
                    continue;
                }

                // Validate file size
                if (file.size > maxSize) {
                    errors.push({
                        file: file.name,
                        error: "File size too large. Maximum 5MB allowed."
                    });
                    continue;
                }

                // Generate unique filename
                const fileExtension = file.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExtension}`;
                
                // Save file
                const filePath = join(uploadDir, fileName);
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                await writeFile(filePath, buffer);

                // Create database record
                const imageUrl = `/uploads/properties/${propertyId}/${fileName}`;
                const propertyImage = await prisma.propertyImage.create({
                    data: {
                        url: imageUrl,
                        propertyId,
                        isPrimary: existingImages === 0 && uploadedImages.length === 0 // First image is primary
                    }
                });

                uploadedImages.push({
                    id: propertyImage.id,
                    url: imageUrl,
                    filename: fileName,
                    originalName: file.name,
                    size: file.size,
                    type: file.type,
                    isPrimary: propertyImage.isPrimary
                });

            } catch (error) {
                console.error("Error uploading file:", error);
                errors.push({
                    file: file.name,
                    error: "Failed to upload file"
                });
            }
        }

        return NextResponse.json({
            uploadedImages,
            errors,
            totalUploaded: uploadedImages.length,
            totalErrors: errors.length
        });

    } catch (error) {
        console.error("Error uploading property images:", error);
        return NextResponse.json(
            { error: "Failed to upload images" },
            { status: 500 }
        );
    }
});

// Get all images for a property
export async function GET(req, { params }) {
    try {
        const { id: propertyId } = await params;

        const images = await prisma.propertyImage.findMany({
            where: { propertyId },
            orderBy: [
                { isPrimary: 'desc' },
                { createdAt: 'asc' }
            ]
        });

        return NextResponse.json({ images });

    } catch (error) {
        console.error("Error fetching property images:", error);
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}
