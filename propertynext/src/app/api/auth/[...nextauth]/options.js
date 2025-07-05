import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { addUserDevice, getUserDevices } from "@/lib/auth/devices";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user details to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;

        // Device info tracking if passed from authorize
        if (user.deviceInfo) {
          const { deviceId, deviceName, ipAddress } = user.deviceInfo;

          const activeDevices = await getUserDevices(user.id);
          if (activeDevices.length >= 2) {
            const oldestDevice = activeDevices.sort(
              (a, b) => new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
            )[0];

            await prisma.userDevice.update({
              where: { id: oldestDevice.id },
              data: { isActive: false },
            });
          }

          await addUserDevice(user.id, deviceId, deviceName, ipAddress);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        deviceInfo: { label: "Device Info", type: "text" }, // hidden, passed from frontend
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user || !user.password) return null;

        if (user.lockedUntil && new Date() < user.lockedUntil) {
          throw new Error("Your account is temporarily locked due to multiple failed login attempts");
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
              failedAttempts: { increment: 1 },
            },
          });

          if (updatedUser.failedAttempts >= 5) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                lockedUntil: new Date(Date.now() + 30 * 60 * 1000), // 30 mins lock
              },
            });
            throw new Error("Account locked due to multiple failed login attempts");
          }

          return null;
        }

        // Reset failed attempts
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedAttempts: 0,
            lockedUntil: null,
          },
        });

        // Parse deviceInfo from credentials
        let parsedDevice = null;
        try {
          parsedDevice = credentials.deviceInfo
            ? JSON.parse(credentials.deviceInfo)
            : null;
        } catch (err) {
          parsedDevice = null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          deviceInfo: parsedDevice,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
