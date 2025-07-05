import NextAuth, {
  NextAuthOptions,
  User as NextAuthUser, // This is NextAuth's base User type
  Account,
  Profile,
  // DefaultUser, // Not explicitly needed if we redefine User fully
  // DefaultSession, // Not explicitly needed if we redefine Session fully
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt"; // Import the JWT type for NextAuth's token object

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:3001/api";

// This interface defines the user object structure we expect
// AFTER successful authentication (either from our backend or Google sync).
// This is what `authorize` should return and what `jwt` callback's `user` param will be.
interface AppUser extends NextAuthUser {
  // Extends NextAuthUser for base fields like name, email, image
  id: string; // CRUCIAL: This MUST be your MongoDB _id string
  role?: string | null;
  backendAccessToken?: string | null; // To store the JWT from YOUR Express backend
}

// This interface defines what we store IN THE NEXTAUTH JWT (the cookie)
// It extends NextAuth's default JWT type.
interface AppJWT extends JWT {
  id?: string | null;
  role?: string | null;
  backendAccessToken?: string | null;
  // Standard JWT claims like name, email, picture will also be here
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // IMPORTANT: When a user signs in with Google, you need to sync them with your backend
      // to get your system's `userId` (MongoDB _id) and `role`.
      // This can be done in the `signIn` callback or by customizing the `profile` function.
      // For this example, we'll assume `signIn` callback handles it.
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AppUser | null> {
        if (!credentials?.email || !credentials?.password) {
          console.warn("NextAuth Authorize: Email or password missing.");
          throw new Error("Please enter both email and password.");
        }

        console.log(
          "NextAuth Authorize: Attempting login via backend for:",
          credentials.email
        );

        try {
          const backendLoginResponse = await fetch(
            `${BACKEND_API_URL}/users/login`, // Your Express backend login
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const responseData = await backendLoginResponse.json();

          if (!backendLoginResponse.ok) {
            console.error(
              "NextAuth Authorize: Backend login failed:",
              responseData
            );
            throw new Error(
              responseData.message || "Invalid email or password."
            );
          }

          const backendUser = responseData.user; // { id, name, email, role, image? }
          const backendToken = responseData.token; // The JWT from your Express backend

          console.log(
            "NextAuth Authorize: Backend login successful for:",
            backendUser?.email
          );

          if (backendUser && backendUser.id && backendToken) {
            const userToReturn: AppUser = {
              id: backendUser.id, // Your MongoDB _id string
              name: backendUser.name,
              email: backendUser.email,
              image: backendUser.image || null,
              role: backendUser.role,
              backendAccessToken: backendToken, // Store the backend's token
            };
            return userToReturn;
          } else {
            console.error(
              "NextAuth Authorize: Backend response OK but missing user data or token."
            );
            throw new Error(
              "Authentication failed: Invalid user data or token from server."
            );
          }
        } catch (error: any) {
          console.error(
            "NextAuth Authorize: Error during backend communication:",
            error
          );
          if (error.message.includes("Invalid email or password")) {
            throw error;
          }
          throw new Error("Unable to connect to authentication service.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    // This callback is invoked when a user signs in or a session is checked.
    // The `user` parameter is only passed on initial sign-in.
    // The `account` parameter is only passed on initial OAuth sign-in.
    async jwt({ token, user, account, profile }): Promise<JWT> {
      // Return NextAuth's base JWT type
      const appUser = user as AppUser | undefined; // Cast user to our AppUser type

      // On initial sign-in (either credentials or OAuth)
      if (appUser && account) {
        // console.log(
        //   "JWT Callback (Initial Sign-In): User -",
        //   appUser.email,
        //   "Account Provider -",
        //   account.provider
        // );

        token.id = appUser.id; // This is your backend's MongoDB user _id string
        token.role = appUser.role;
        token.name = appUser.name;
        token.email = appUser.email;
        token.picture = appUser.image; // NextAuth JWT uses 'picture' for image

        // If credentials login, appUser.backendAccessToken will be set from authorize
        if (appUser.backendAccessToken) {
          token.backendAccessToken = appUser.backendAccessToken;
        }

        // If Google sign-in, and you want to store a backend token after syncing
        if (account.provider === "google" && profile) {
          // TODO: Implement backend sync for Google users here
          // This would involve calling your Express backend with Google profile data
          // to find/create a user in your MongoDB and get YOUR backend's JWT for that user.
          // Example:
          // const backendSyncResponse = await fetch(`${BACKEND_API_URL}/users/oauth/google`, {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     googleId: profile.sub,
          //     email: profile.email,
          //     name: profile.name,
          //     image: (profile as any).picture, // `picture` is common but check Google profile structure
          //   }),
          //   headers: { 'Content-Type': 'application/json' },
          // });
          // if (backendSyncResponse.ok) {
          //   const backendData = await backendSyncResponse.json();
          //   token.id = backendData.user.id; // CRITICAL: Use your backend's ID
          //   token.role = backendData.user.role;
          //   token.backendAccessToken = backendData.token; // Store your backend's JWT
          //   // Update name/email/picture if backend is source of truth
          //   token.name = backendData.user.name;
          //   token.email = backendData.user.email;
          //   token.picture = backendData.user.image;
          // } else {
          //   console.error("JWT Callback: Google user sync with backend failed.");
          //   // Decide if you want to block login or proceed with limited info
          //   // For now, we'll proceed with Google's info if backend sync fails,
          //   // but ID might not match your system's ID.
          //   if (!token.id) token.id = profile.sub; // Fallback to Google sub if no backend id
          // }
          // For simplicity, if Google profile function in provider already returns AppUser shape:
          if (
            !token.backendAccessToken &&
            appUser.id &&
            !appUser.id.startsWith("google-")
          ) {
            // This implies `appUser` from Google profile function was already shaped
            // with your backend data, including a backendAccessToken.
            // This scenario is less likely unless profile() makes the backend call.
          } else if (!token.backendAccessToken) {
            console.warn(
              "JWT Callback: Google user signed in, but no backendAccessToken obtained. API calls to backend might fail authorization."
            );
            // If you don't get a backendAccessToken for Google users, your `api-utils`
            // won't have a Bearer token to send for them.
            // You'd need a strategy: either all users get a backendAccessToken,
            // or your backend can also validate NextAuth's own JWTs (more complex).
          }
        }
        // console.log("JWT Callback (Initial Sign-In): Token populated ->", {
        //   id: token.id,
        //   role: token.role,
        //   hasBackendToken: !!token.backendAccessToken,
        // });
      }
      // On subsequent calls, `user` is undefined, token is passed through.
      return token as JWT; // Cast to ensure it matches the base JWT type for return
    },

    async session({ session, token, user }) {
      // `token` is the output from the `jwt` callback.
      // `user` here is also from `jwt` callback (deprecated in v5, but token is primary).
      // console.log("Session Callback: Input Token ->", token);

      if (session.user) {
        // Populate session.user with fields from the token
        session.user.id = token.id as string | undefined;
        session.user.role = token.role as string | undefined;
        session.user.name = token.name || session.user.name; // Prioritize token, fallback to default session
        session.user.email = token.email || session.user.email;
        session.user.image = token.picture || session.user.image; // `picture` from token maps to `image`
      }

      // IMPORTANT: Make the backend's JWT available on the session object
      // This is what `api-utils.ts` will use.
      if (token.backendAccessToken) {
        (session as any).accessToken = token.backendAccessToken as string;
      } else {
        console.warn(
          "Session Callback: No backendAccessToken found in token. API calls to backend needing this token will fail auth."
        );
      }

      // console.log("Session Callback: Final Session Object ->", session);
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`NEXTAUTH_ERROR: Code=${code}`, metadata);
    },
    warn(code) {
      console.warn(`NEXTAUTH_WARN: Code=${code}`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
