import NextAuth from "next-auth/next";
import { authOptions } from "./options";
import { headers } from "next/headers";
import { getClientIp } from "@/lib/helpers/ipAddress";

const handler = async (req, context) => {
    const { params } = context;

    // Get request details for device tracking
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown Device';
    const ipAddress = getClientIp(headersList);

    // Generate device ID from user agent and other factors
    const deviceId = Buffer.from(`${userAgent}-${ipAddress}`).toString('base64');

    // Add device info to the session for tracking
    const authOptionsWithContext = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,
            async jwt(params) {
                params.session = {
                    ...params.session,
                    deviceInfo: {
                        deviceId,
                        deviceName: userAgent,
                        ipAddress
                    }
                };
                return authOptions.callbacks.jwt(params);
            }
        }
    };

    return NextAuth(req, context, authOptionsWithContext);
};

export { handler as GET, handler as POST };