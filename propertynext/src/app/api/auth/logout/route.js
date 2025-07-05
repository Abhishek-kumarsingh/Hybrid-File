import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        // Clear tokens
        const response = NextResponse.json({ message: "Logged out successfully" });

        const isProd = process.env.NODE_ENV === "production";

        response.cookies.set({
            name: "access_token",
            value: "",
            httpOnly: true,
            secure: isProd,
            maxAge: 0,
            sameSite: "strict",
            path: "/"
        });

        response.cookies.set({
            name: "refresh_token",
            value: "",
            httpOnly: true,
            secure: isProd,
            maxAge: 0,
            sameSite: "strict",
            path: "/api/auth/refresh"
        });

        // Optionally deactivate device here by extracting deviceId from token or request
        // For demo: assume client sends deviceId in body to deactivate

        const body = await req.json();
        console.log(body);

        if (body.userId && body.deviceId) {
            await prisma.userDevice.updateMany({
                where: {
                    userId: body.userId,
                    deviceId: body.deviceId,
                    isActive: true
                },
                data: { isActive: false }
            });
        }

        return response;

    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
    }
}
