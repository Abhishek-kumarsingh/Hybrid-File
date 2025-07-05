import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";
import { getUserDevices, removeUserDevice, removeAllOtherDevices } from "@/lib/auth/devices";

// Get all active devices for the authenticated user
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;
        const devices = await getUserDevices(session.user.id);
        return NextResponse.json(devices);
    } catch (error) {
        console.error("Error fetching user devices:", error);
        return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 });
    }
});

// Deactivate a specific device for the authenticated user
export const DELETE = withAuth(async (req) => {
    try {
        const session = req.session;
        const { searchParams } = new URL(req.url);
        const deviceId = searchParams.get('deviceId'); // Expect deviceId as a query parameter

        if (!deviceId) {
            return NextResponse.json({ error: "deviceId query parameter is required" }, { status: 400 });
        }

        const result = await removeUserDevice(session.user.id, deviceId);

        if (result.count === 0) {
            return NextResponse.json({ message: "Device not found or already inactive" }, { status: 404 });
        }

        return NextResponse.json({ message: "Device deactivated successfully" });
    } catch (error) {
        console.error("Error deactivating user device:", error);
        return NextResponse.json({ error: "Failed to deactivate device" }, { status: 500 });
    }
});

// Deactivate all other devices for the authenticated user
export async function POST(req) { // Using POST for a "remove all others" action
    return withAuth(async (request) => {
        try {
            const session = request.session;
            const { currentDeviceId } = await request.json(); // Expect currentDeviceId in body to preserve it

            if (!currentDeviceId) {
                return NextResponse.json({ error: "currentDeviceId is required in the body" }, { status: 400 });
            }

            await removeAllOtherDevices(session.user.id, currentDeviceId);
            return NextResponse.json({ message: "All other devices deactivated successfully" });

        } catch (error) {
            console.error("Error deactivating other user devices:", error);
            return NextResponse.json({ error: "Failed to deactivate other devices" }, { status: 500 });
        }
    })(req);
}