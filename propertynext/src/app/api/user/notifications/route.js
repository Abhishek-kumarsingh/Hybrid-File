import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware/auth";

// Get user notifications
export const GET = withAuth(async (req) => {
    try {
        const session = req.session;
        const userId = session.user.id;
        const { searchParams } = new URL(req.url);
        
        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;
        
        // Filter by read status
        const unreadOnly = searchParams.get('unread') === 'true';
        
        const where = { userId };
        if (unreadOnly) {
            where.read = false;
        }

        // Get notifications with pagination
        const [notifications, total, unreadCount] = await Promise.all([
            prisma.notification.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.notification.count({ where }),
            prisma.notification.count({ where: { userId, read: false } })
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        return NextResponse.json({
            notifications,
            unreadCount,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext,
                hasPrev
            }
        });

    } catch (error) {
        console.error('Get user notifications error:', error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
});

// Mark notification as read
export const PUT = withAuth(async (req) => {
    try {
        const session = req.session;
        const userId = session.user.id;
        const { notificationId, markAllAsRead } = await req.json();

        if (markAllAsRead) {
            // Mark all notifications as read
            await prisma.notification.updateMany({
                where: { userId, read: false },
                data: { read: true }
            });
            
            return NextResponse.json({ message: "All notifications marked as read" });
        } else if (notificationId) {
            // Mark specific notification as read
            const notification = await prisma.notification.findFirst({
                where: { id: notificationId, userId }
            });

            if (!notification) {
                return NextResponse.json(
                    { error: "Notification not found" },
                    { status: 404 }
                );
            }

            await prisma.notification.update({
                where: { id: notificationId },
                data: { read: true }
            });

            return NextResponse.json({ message: "Notification marked as read" });
        } else {
            return NextResponse.json(
                { error: "Invalid request" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Update notification error:', error);
        return NextResponse.json(
            { error: "Failed to update notification" },
            { status: 500 }
        );
    }
});
