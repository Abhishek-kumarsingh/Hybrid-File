import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/jwt";
import { addUserDevice } from "@/lib/auth/devices";
import { validateLogin } from "@/lib/validators/auth";
import { cookies } from "next/headers";

const ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 mins in seconds
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days

export async function POST(req) {
    try {
        const body = await req.json();
        const validation = validateLogin(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    errors: validation.error.format()
                },
                {
                    status: 400
                }
            );
        }

        const { email, password, deviceName } = validation.data;

        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });

        if (!user || !user.password) {
            return NextResponse.json({
                error: "Invalid credentials"
            },
                {
                    status: 401
                });
        }

        if (user.lockedUntil && new Date() < user.lockedUntil) {
            const minutesLeft = Math.ceil(
                (new Date(user.lockedUntil).getTime() - new Date().getTime()) / (60 * 1000)
            );
            return NextResponse.json(
                {
                    error: `Account locked. Try again in ${minutesLeft} minute(s).`
                },
                {
                    status: 403
                }
            );
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    failedAttempts: { increment: 1 }
                }
            });

            if (updatedUser.failedAttempts >= 5) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        lockedUntil: new Date(Date.now() + 30 * 60 * 1000)
                    }
                });

                return NextResponse.json(
                    {
                        error: "Account temporarily locked due to multiple failed attempts."
                    },
                    {
                        status: 403
                    }
                );
            }

            return NextResponse.json(
                {
                    error: "Invalid credentials"
                },
                {
                    status: 401
                }
            );
        }

        // Reset failed attempts
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                failedAttempts: 0, lockedUntil: null
            }
        });

        // Generate deviceId from userAgent + deviceName (no IP)
        const userAgent = req.headers.get("user-agent") || "Unknown Device";
        const deviceLabel = deviceName || userAgent;
        const deviceId = Buffer.from(deviceLabel).toString("base64");

        const activeDevices = await prisma.userDevice.findMany({
            where: {
                userId: user.id,
                isActive: true
            }
        });

        if (!activeDevices.some(d => d.deviceId === deviceId) && activeDevices.length >= 2) {
            return NextResponse.json(
                {
                    error: "Maximum devices reached. Logout from another device first."
                },
                {
                    status: 403
                }
            );
        }

        await addUserDevice(user.id, deviceId, userAgent, null);

        // Generate access and refresh tokens
        const accessToken = generateToken(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                deviceId
            },
            {
                expiresIn: ACCESS_TOKEN_EXPIRY
            }
        );

        const refreshToken = generateToken(
            {
                id: user.id,
                deviceId
            },
            {
                expiresIn: REFRESH_TOKEN_EXPIRY
            }
        );

        // Response with cookies set
        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            deviceId
        });

        const isProd = process.env.NODE_ENV === "production";

        // Set access token cookie (short-lived)
        response.cookies.set({
            name: "access_token",
            value: accessToken,
            httpOnly: true,
            secure: isProd,
            maxAge: ACCESS_TOKEN_EXPIRY,
            sameSite: "strict",
            path: "/"
        });

        // Set refresh token cookie (long-lived)
        response.cookies.set({
            name: "refresh_token",
            value: refreshToken,
            httpOnly: true,
            secure: isProd,
            maxAge: REFRESH_TOKEN_EXPIRY,
            sameSite: "strict",
            path: "/api/auth/refresh" // restrict refresh token cookie to refresh API path
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
