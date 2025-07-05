import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions ={
    providers: [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials: {
                email: { label: "email", type: "text"},
                password: {type: "password",label: "password"},
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();
                try {
                    const user =await UserModel.findOne({
                        $or:[
                            {email: credentials.identifier},// can also write email as well
                            {username: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("User not found");
                    }
                    if(!user.isVerified){
                        throw new Error("PLease Verify Your Account first");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                    if(isPasswordCorrect){
                        return user;
                    }
                    else{
                        throw new Error("Invalid Password");
                    }
                } catch (error:any) {
                    throw new Error(error);
                }
            },
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ],
      callbacks: {
        async jwt({ token, user, account }) {
          if (user) {
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.username = user.username;
          }
          if (account && account.provider === "google") {
            token.isVerified = true; // Assume Google accounts are verified
          }
          return token;
        },
        async session({ session, token }) {
          if (token) {
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.username = token.username;
          }
          return session;
        },
        async signIn({ user, account }) {
          if (account?.provider === "google") {
            await dbConnect();
            const existingUser = await UserModel.findOne({ email: user.email });
            if (!existingUser) {
              // Create a new user if they don't exist
              const newUser = new UserModel({
                email: user.email,
                username: user.name,
                isVerified: true,
                // You might want to generate a random password here
              });
              await newUser.save();
            }
          }
          return true;
        },
      },
      pages: {
        signIn: "/signin",
      },
      session: {
        strategy: "jwt",
        maxAge: 5 * 60, // 5 minutes in seconds
        updateAge: 4 * 60, // 4 minutes in seconds
      },
      jwt: {
        maxAge: 5 * 60, // 5 minutes in seconds
      },
    
      secret: process.env.NEXTAUTH_SECRET,
    };