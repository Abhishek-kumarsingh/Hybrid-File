import nodemailer from 'nodemailer';
import { verificationEmailTemplate } from '@/emails/templates/verification';
import { resetPasswordEmailTemplate } from '@/emails/templates/resetPassword';
import { welcomeEmailTemplate } from '@/emails/templates/welcome';

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

/**
 * Send email verification link to user
 */
export const sendVerificationEmail = async (email, name, token) => {
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

    const htmlContent = verificationEmailTemplate({
        name,
        verificationLink,
    });

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Verify your email address',
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};

/**
 * Send password reset link to user
 */
export const sendPasswordResetEmail = async (email, name, token) => {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    const htmlContent = resetPasswordEmailTemplate({
        name,
        resetLink,
    });

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Reset your password',
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (email, name) => {
    const loginLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in`;

    const htmlContent = welcomeEmailTemplate({
        name,
        loginLink,
    });

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Welcome to Property Management System',
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};