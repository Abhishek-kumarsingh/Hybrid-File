import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendPasswordResetEmail } from "@/helpers/sendPasswordResetEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email } = await request.json();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return Response.json({
                success: false,
                message: 'No User Exists with this Email.',
            }, { status: 400 });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const resetCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        user.resetCode = resetCode;
        user.resetCodeExpiry = resetCodeExpiry;
        await user.save();

        const emailResponse = await sendPasswordResetEmail(email, user.username, resetCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: 'Error sending password reset email',
            }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: 'Email has Been Sent at registered Email id',
        }, { status: 200 });
    } catch (error) {
        console.error('Error in forgot password', error);
        return Response.json({
            success: false,
            message: 'Error processing forgot password request',
        }, { status: 500 });
    }
}