import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { withAuth } from "@/lib/middleware/auth";

// Handle single file upload
export const POST = withAuth(async (req) => {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const folder = formData.get('folder') || 'general';

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File size too large. Maximum 5MB allowed." },
                { status: 400 }
            );
        }

        // Generate unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        
        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
        await mkdir(uploadDir, { recursive: true });

        // Save file
        const filePath = join(uploadDir, fileName);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Return file URL
        const fileUrl = `/uploads/${folder}/${fileName}`;
        
        return NextResponse.json({
            url: fileUrl,
            filename: fileName,
            size: file.size,
            type: file.type
        });

    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
});

// Handle file deletion
export const DELETE = withAuth(async (req) => {
    try {
        const { fileUrl } = await req.json();

        if (!fileUrl) {
            return NextResponse.json(
                { error: "No file URL provided" },
                { status: 400 }
            );
        }

        // Extract file path from URL
        const filePath = join(process.cwd(), 'public', fileUrl);
        
        // Delete file
        const fs = require('fs').promises;
        await fs.unlink(filePath);

        return NextResponse.json({ message: "File deleted successfully" });

    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json(
            { error: "Failed to delete file" },
            { status: 500 }
        );
    }
});
