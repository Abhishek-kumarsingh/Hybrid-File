import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PERMISSIONS } from "@/config/roles";

/**
 * Role-based access control with fine-grained permissions
 */
export function withPermission(permission) {
    return async (handler) => {
        return async (req, context) => {
            // Get session
            const session = await getServerSession(authOptions);

            if (!session?.user) {
                return NextResponse.json(
                    { error: "Authentication required" },
                    { status: 401 }
                );
            }

            // Get user's role
            const role = session.user.role;

            // Check if role has required permission
            const hasPermission = PERMISSIONS[role]?.includes(permission);

            if (!hasPermission) {
                return NextResponse.json(
                    { error: "You don't have permission to perform this action" },
                    { status: 403 }
                );
            }

            // Add session to request for handler to use
            req.session = session;

            // Continue to handler
            return handler(req, context);
        };
    };
}