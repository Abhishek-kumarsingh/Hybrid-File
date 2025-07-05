import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, username: string, resetCode: string) {
    try {
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?email=${encodeURIComponent(email)}&token=${resetCode}`;

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Reset Your Password',
            html: `
                <h1>Hello ${username},</h1>
                <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
                <p>To reset your password, click on the link below:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>Or enter this code on the password reset page: ${resetCode}</p>
                <p>This link and code will expire in 1 hour.</p>
                <p>If you have any issues, please contact our support team.</p>
                <p>Best regards,<br>Your App Team</p>
            `
        });

        if (error) {
            console.error('Error sending password reset email:', error);
            return { success: false, message: 'Failed to send password reset email' };
        }

        console.log('Password reset email sent successfully:', data);
        return { success: true, message: 'Password reset email sent successfully' };
    } catch (error) {
        console.error('Error in sendPasswordResetEmail:', error);
        return { success: false, message: 'An error occurred while sending the password reset email' };
    }
}