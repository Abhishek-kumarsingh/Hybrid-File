import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";

export async function POST(req) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        // Verify the JWT token itself (signed by us)
        const decodedToken = verifyToken(token);
        if (!decodedToken || decodedToken.purpose !== 'password-reset') {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Check if the token exists in the database and hasn't expired
        const passwordResetEntry = await prisma.passwordReset.findUnique({
            where: { token: token },
        });

        if (!passwordResetEntry) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        if (new Date() > new Date(passwordResetEntry.expires)) {
            // Optionally, delete the expired token
            await prisma.passwordReset.delete({ where: { token: token } });
            return NextResponse.json({ error: "Token has expired" }, { status: 400 });
        }

        // Token is valid
        return NextResponse.json({ message: "Token is valid", email: decodedToken.email });

    } catch (error) {
        console.error("Password reset token verification error:", error);
        return NextResponse.json(
            { error: "Failed to verify token" },
            { status: 500 }
        );
    }
}