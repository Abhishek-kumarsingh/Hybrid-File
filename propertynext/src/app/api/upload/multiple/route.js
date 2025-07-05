import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { withAuth } from "@/lib/middleware/auth";

// Handle multiple file upload
export const POST = withAuth(async (req) => {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files');
        const folder = formData.get('folder') || 'general';

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: "No files provided" },
                { status: 400 }
            );
        }

        // Validate file count (max 10 files)
        if (files.length > 10) {
            return NextResponse.json(
                { error: "Too many files. Maximum 10 files allowed." },
                { status: 400 }
            );
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const uploadedFiles = [];
        const errors = [];

        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
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

                // Add to uploaded files
                uploadedFiles.push({
                    url: `/uploads/${folder}/${fileName}`,
                    filename: fileName,
                    originalName: file.name,
                    size: file.size,
                    type: file.type
                });

            } catch (error) {
                errors.push({
                    file: file.name,
                    error: "Failed to upload file"
                });
            }
        }

        return NextResponse.json({
            uploadedFiles,
            errors,
            totalUploaded: uploadedFiles.length,
            totalErrors: errors.length
        });

    } catch (error) {
        console.error("Error uploading files:", error);
        return NextResponse.json(
            { error: "Failed to upload files" },
            { status: 500 }
        );
    }
});
