import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";  // Make sure to import the User type
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, token, newPassword } = await request.json();
        console.log(email, token, newPassword);
        const code = token.toString();
        const user = await UserModel.findOne({ email });
        console.log( typeof(user?.resetCode));
        console.log( typeof(code));
        console.log(user?.resetCodeExpiry);
        
        
        if (!user) {
            return Response.json({
                success: false,
                message: 'User not found',
            }, { status: 400 });
        } 

        // Check if resetCode and resetCodeExpiry exist
        if (!user.resetCode || !user.resetCodeExpiry) {
            return Response.json({
                success: false,
                message: 'Reset code not set',
            }, { status: 400 });
        }

        // Now TypeScript knows resetCode and resetCodeExpiry are defined
        if (user.resetCode !== code || new Date() > user.resetCodeExpiry) {
            return Response.json({
                success: false,
                message: 'Invalid or expired reset code',
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetCode = undefined;
        user.resetCodeExpiry = undefined;
        await user.save();

        return Response.json({
            success: true,
            message: 'Password reset successfully',
        }, { status: 200 });
    } catch (error) {
        console.error('Error resetting password', error);
        return Response.json({
            success: false,
            message: 'Error resetting password',
        }, { status: 500 });
    }
}