import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { validatePropertyApproval } from "@/lib/validators/property";

export const POST = withAuth(async (req, { params }) => {
    try {
        console.log("=== Start property approval ===");

        // Validate and log params.id
        const { id } = await params;
        console.log("Property ID param:", id);

        if (!id || typeof id !== "string") {
            console.error("Invalid or missing property ID");
            return NextResponse.json(
                { error: "Invalid or missing property ID" },
                { status: 400 }
            );
        }

        // Parse and log request body
        const body = await req.json();
        console.log("Request body:", body);

        // Log session info
        const session = req.session;
        console.log("User session:", session);

        if (!session?.user) {
            console.error("No user session found");
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Check user role
        if (session.user.role !== "ADMIN") {
            console.warn("Unauthorized user role:", session.user.role);
            return NextResponse.json(
                { error: "Only admins can approve/reject properties" },
                { status: 403 }
            );
        }

        // Validate input using Zod schema, with debug logs for validation failure
        const validation = validatePropertyApproval(body);
        if (!validation.success) {
            console.error("Validation errors:", validation.error.format());
            return NextResponse.json(
                { errors: validation.error.format() },
                { status: 400 }
            );
        }
        console.log("Validation success. Parsed data:", validation.data);

        const { approvalStatus, rejectionReason, notes } = validation.data;

        // Fetch property with owner info
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!property) {
            console.error("Property not found:", id);
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }
        console.log("Fetched property:", property);

        // Check if property is already approved
        if (
            property.approvalStatus === "APPROVED" &&
            approvalStatus === "APPROVED"
        ) {
            console.warn("Property is already approved");
            return NextResponse.json(
                { error: "Property is already approved" },
                { status: 400 }
            );
        }

        // Update property and related records atomically
        const updatedProperty = await prisma.$transaction(async (tx) => {
            console.log("Starting transaction to update property");

            const updated = await tx.property.update({
                where: { id },
                data: {
                    approvalStatus,
                    rejectionReason:
                        approvalStatus === "REJECTED" ? rejectionReason : null,
                    approvedBy: session.user.id,
                    approvedAt: new Date(),
                    status:
                        approvalStatus === "APPROVED" ? "ACTIVE" : property.status,
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    images: true,
                },
            });
            console.log("Property updated:", updated);

            // Create a submission record
            const submission = await tx.propertySubmission.create({
                data: {
                    propertyId: id,
                    status: approvalStatus,
                    reviewedAt: new Date(),
                    reviewedBy: session.user.id,
                    notes,
                },
            });
            console.log("Property submission record created:", submission);

            // Create notification for owner
            const notificationTitle =
                approvalStatus === "APPROVED"
                    ? "Property Approved!"
                    : approvalStatus === "REJECTED"
                        ? "Property Rejected"
                        : "Property Under Review";

            const notificationMessage =
                approvalStatus === "APPROVED"
                    ? `Your property "${updated.title}" has been approved and is now live on the platform.`
                    : approvalStatus === "REJECTED"
                        ? `Your property "${updated.title}" has been rejected. Reason: ${rejectionReason}`
                        : `Your property "${updated.title}" is currently under review.`;

            const notification = await tx.notification.create({
                data: {
                    userId: updated.ownerId,
                    title: notificationTitle,
                    message: notificationMessage,
                    type:
                        approvalStatus === "APPROVED"
                            ? "PROPERTY_APPROVED"
                            : approvalStatus === "REJECTED"
                                ? "PROPERTY_REJECTED"
                                : "INFO",
                },
            });
            console.log("Notification created:", notification);

            return updated;
        });

        console.log("Transaction complete, sending response");

        return NextResponse.json({
            message: `Property ${approvalStatus.toLowerCase()} successfully`,
            property: updatedProperty,
        });
    } catch (error) {
        console.error("Property approval error:", error?.stack || error);
        return NextResponse.json(
            { error: "Failed to process property approval" },
            { status: 500 }
        );
    }
});
