import { NextResponse } from "next/server";
import { verifyToken, generateToken } from "@/lib/auth/jwt";
import prisma from "@/lib/prisma";

const ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 mins

export async function POST(req) {
    try {
        const refreshToken = req.cookies.get("refresh_token")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = verifyToken(refreshToken);
        } catch {
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
        }

        // Optionally, verify device is still active
        const userDevice = await prisma.userDevice.findUnique({
            where: { userId_deviceId: { userId: decoded.id, deviceId: decoded.deviceId } }
        });
        if (!userDevice || !userDevice.isActive) {
            return NextResponse.json({ error: "Device not authorized" }, { status: 401 });
        }

        // Generate new access token
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        const accessToken = generateToken(
            { id: user.id, email: user.email, role: user.role, deviceId: decoded.deviceId },
            { expiresIn: ACCESS_TOKEN_EXPIRY }
        );

        const response = NextResponse.json({ message: "Token refreshed" });

        const isProd = process.env.NODE_ENV === "production";

        response.cookies.set({
            name: "access_token",
            value: accessToken,
            httpOnly: true,
            secure: isProd,
            maxAge: ACCESS_TOKEN_EXPIRY,
            sameSite: "strict",
            path: "/"
        });

        return response;
    } catch (error) {
        console.error("Refresh token error:", error);
        return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
    }
}
