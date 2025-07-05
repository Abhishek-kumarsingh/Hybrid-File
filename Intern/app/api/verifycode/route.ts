import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) { 
    // Connect to the database
    await dbConnect()

    try {
        // Parse JSON request body
        const {username,code} = await request.json()

        // Decode the username
        const decodedusername = decodeURIComponent(username)

        // Find the user in the database
        const user = await UserModel.findOne({username:decodedusername})

        // If user not found, return an error response
        if(!user){
            return Response.json({
                success: false,
                message: 'User not found',
            },{
                status: 500
            })
        }

        // Check if the code is valid and not expired
        const iscodevalid = user.verifyCode === code;
        const iscodenotexpired = new Date(user.verifyCodeExpiry)> new Date()

        // If code is valid and not expired, verify the user
        if(iscodevalid && iscodenotexpired){
            user.isVerified = true;
            await user.save()

            // Return a success response
            return Response.json({
                success: true,
                message: 'User Verified Successfully',
            },{
                status: 200
            })
        }
        // If code is expired, return an error response
        else if(!iscodenotexpired){
            return Response.json({
                success: false,
                message: 'Code Expired',
            },{
                status: 400
            })
        }
        // If code is invalid, return an error response
        else{
            return Response.json({
                success: false,
                message: 'Invalid Code',
            },{
                status: 400
            })
        }
    } catch (error) {
        // Log the error and return an error response
        console.error("Error Verifying User",error);
        return Response.json({
            success: false,
            message: "Error verifying user",
        },
    {
        status: 500
    })
    }
}