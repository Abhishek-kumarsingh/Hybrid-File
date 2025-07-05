import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { validateResetPassword } from "@/lib/validators/auth"; // Assuming you have this validator

export async function POST(req) {
    try {
        const body = await req.json();

        // Validate input (token, newPassword, confirmPassword)
        const validation = validateResetPassword(body); // Ensure this validator exists and is imported
        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { token, password } = validation.data;

        // 1. Verify the JWT token
        const decodedToken = verifyToken(token);
        if (!decodedToken || decodedToken.purpose !== 'password-reset') {
            return NextResponse.json({ error: "Invalid or malformed token" }, { status: 400 });
        }

        // 2. Check token against the database
        const passwordResetEntry = await prisma.passwordReset.findUnique({
            where: { token: token },
        });

        if (!passwordResetEntry) {
            return NextResponse.json({ error: "Invalid reset token. It may have been used or doesn't exist." }, { status: 400 });
        }

        if (new Date() > new Date(passwordResetEntry.expires)) {
            await prisma.passwordReset.delete({ where: { id: passwordResetEntry.id } });
            return NextResponse.json({ error: "Reset token has expired. Please request a new one." }, { status: 400 });
        }

        if (passwordResetEntry.email.toLowerCase() !== decodedToken.email.toLowerCase()) {
            return NextResponse.json({ error: "Token-email mismatch." }, { status: 400 });
        }

        // 3. Find the user by email
        const user = await prisma.user.findUnique({
            where: { email: decodedToken.email.toLowerCase() },
        });

        if (!user) {
            // Should not happen if token was generated for a valid user, but good to check
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // 4. Hash the new password
        const hashedPassword = await hashPassword(password);

        // 5. Update the user's password
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                failedAttempts: 0,      // Reset failed attempts
                lockedUntil: null,      // Unlock account
                emailVerified: user.emailVerified || new Date(), // Mark email as verified if not already
            },
        });

        // 6. Delete the used password reset token
        await prisma.passwordReset.delete({
            where: { id: passwordResetEntry.id },
        });

        return NextResponse.json({ message: "Password has been reset successfully." });

    } catch (error) {
        console.error("Password reset error:", error);
        // Avoid leaking too much info in generic errors
        if (error.code === 'P2025') { // Prisma error for record not found during delete/update
            return NextResponse.json({ error: "Invalid token or user not found." }, { status: 400 });
        }
        return NextResponse.json(
            { error: "Failed to reset password. Please try again." },
            { status: 500 }
        );
    }
}