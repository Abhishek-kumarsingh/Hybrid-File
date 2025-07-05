// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT, DefaultJWT } from "next-auth/jwt"; // Renamed to avoid conflict with your ExtendedToken if it was named JWT

declare module "next-auth" {
  // Extend session to include custom properties
  interface Session {
    accessToken?: string | null; // This will hold your Express backend's JWT
    user: {
      id?: string | null;
      role?: string | null;
      // name, email, image are already part of DefaultSession['user']
    } & DefaultSession["user"];
  }

  // Extend User to include custom properties returned by `authorize` or OAuth `profile`
  interface User extends DefaultUser {
    // DefaultUser already has id, name, email, image
    id: string; // Make sure id is always a string from your backend
    role?: string | null;
    backendAccessToken?: string | null; // Token from your Express backend
  }
}

declare module "next-auth/jwt" {
  // Extend JWT to include custom properties stored in the token
  interface JWT extends DefaultJWT {
    // DefaultJWT has name, email, picture, sub, iat, exp, jti
    id?: string | null;
    role?: string | null;
    backendAccessToken?: string | null;
  }
}
