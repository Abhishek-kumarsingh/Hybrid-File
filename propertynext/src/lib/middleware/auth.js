import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

/**
 * Authentication middleware wrapper for API routes
 */
export function withAuth(handler, options = {}) {
    return async (req, context) => {
        // Get session
        const session = await getServerSession(authOptions);

        // Check if user is authenticated
        if (!session?.user) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Check roles if specified
        if (options.roles && !options.roles.includes(session.user.role)) {
            return NextResponse.json(
                { error: "You don't have permission to access this resource" },
                { status: 403 }
            );
        }

        // Add session to request for handler to use
        req.session = session;

        // Continue to handler
        return handler(req, context);
    };
}

/**
 * Role-based access control middleware
 */
export function withRoles(roles = []) {
    return (handler) => {
        return withAuth(handler, { roles });
    };
}

/**
 * Check if current user is owner of the resource
 * Useful for checking if user owns a property, review, etc.
 */
export async function isResourceOwner(userId, resourceType, resourceId) {
    try {
        switch (resourceType) {
            case 'property':
                const property = await prisma.property.findUnique({
                    where: { id: resourceId },
                    select: { ownerId: true }
                });
                return property?.ownerId === userId;

            case 'review':
                const review = await prisma.review.findUnique({
                    where: { id: resourceId },
                    select: { userId: true }
                });
                return review?.userId === userId;

            default:
                return false;
        }
    } catch (error) {
        console.error(`Error checking resource ownership: ${error}`);
        return false;
    }
}