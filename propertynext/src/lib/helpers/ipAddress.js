// ./src/lib/helpers/ipAddress.js

/**
 * @param {import('next/server').NextRequest} request
 * @returns {string}
 */
export function getClientIp(request) {
    if (!request || !request.headers) {
        return "Unknown IP";
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    const ip = forwardedFor?.split(",")[0]?.trim() ?? realIp ?? "Unknown IP";
    return ip;
}