import { getClientIp } from '@/lib/helpers/ipAddress';
import { LRUCache } from 'lru-cache';

// In-memory LRU cache (auto-removes old IPs)
const rateLimiterCache = new LRUCache({
    max: 10000, // Max 10,000 unique IPs
    ttl: 1000 * 60 * 10 // Cache TTL: 10 minutes
});

/**
 * Rate limiter middleware
 * Limits requests by IP address
 */
export async function rateLimiter(req, { limit = 5, window = 60 } = {}) {
    const headers = new Headers(req.headers);
    const ip = getClientIp(headers) || 'anonymous';
    const now = Date.now();

    const record = rateLimiterCache.get(ip) || { timestamps: [] };
    const windowStart = now - window * 1000;

    // Filter out old timestamps
    record.timestamps = record.timestamps.filter(ts => ts > windowStart);
    record.timestamps.push(now);

    rateLimiterCache.set(ip, record); // Save updated

    const current = record.timestamps.length;

    if (current > limit) {
        const retryAfter = Math.ceil(
            window - (now - record.timestamps[0]) / 1000
        );

        return {
            success: false,
            retryAfter: String(Math.max(0, retryAfter))
        };
    }

    return {
        success: true,
        remaining: limit - current
    };
}
