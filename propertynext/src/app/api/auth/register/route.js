import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/password";
import prisma from "@/lib/prisma";
import { validateRegistration } from "@/lib/validators/auth";
import { generateEmailVerificationToken } from "@/lib/auth/jwt";
import { sendVerificationEmail } from "@/lib/helpers/email";

export async function POST(req) {
    try {
        const body = await req.json();

        // Validate user input
        const validation = validateRegistration(body);

        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password, role = 'CUSTOMER' } = validation.data;

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role,
            }
        });

        // If user is a customer, create customer profile
        if (role === 'CUSTOMER') {
            await prisma.customerProfile.create({
                data: {
                    userId: user.id,
                }
            });
        }

        // If user is an agent, create agent profile
        if (role === 'AGENT') {
            await prisma.agentProfile.create({
                data: {
                    userId: user.id,
                }
            });
        }

        // Generate verification token
        const verificationToken = generateEmailVerificationToken(email);

        // Send verification email
        await sendVerificationEmail(email, name, verificationToken);

        // Return success response (exclude password)
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            message: "Registration successful. Please verify your email.",
            user: userWithoutPassword
        }, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);

        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}