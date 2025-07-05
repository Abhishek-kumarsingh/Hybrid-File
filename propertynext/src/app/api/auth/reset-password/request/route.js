import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateResetToken } from "@/lib/auth/jwt";
import { sendPasswordResetEmail } from "@/lib/helpers/email";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        // Don't reveal if user exists or not for security
        if (!user) {
            return NextResponse.json({
                message: "If your email is registered, you will receive a password reset link."
            });
        }

        // Generate reset token
        const resetToken = generateResetToken(email);

        // Store reset token in database
        await prisma.passwordReset.create({
            data: {
                email: email.toLowerCase(),
                token: resetToken,
                expires: new Date(Date.now() + 3600000) // 1 hour
            }
        });

        // Send password reset email
        await sendPasswordResetEmail(email, user.name, resetToken);

        return NextResponse.json({
            message: "If your email is registered, you will receive a password reset link."
        });
    } catch (error) {
        console.error("Password reset request error:", error);

        return NextResponse.json(
            { error: "Failed to process password reset request" },
            { status: 500 }
        );
    }
}