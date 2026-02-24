
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function getNotifications() {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        const notifications = await (prisma as any).$queryRawUnsafe(
            `SELECT id, userId, title, message, type, isRead, createdAt FROM Notification WHERE userId = ? ORDER BY createdAt DESC LIMIT 10`,
            session.user.id
        ) as any[];

        // Normalize fields — SQLite returns BigInt for integers which can't be serialized
        return (notifications || []).map(n => ({
            id: String(n.id),
            userId: String(n.userId),
            title: String(n.title || ''),
            message: String(n.message || ''),
            type: String(n.type || 'INFO'),
            isRead: Number(n.isRead) === 1,
            createdAt: n.createdAt ? new Date(String(n.createdAt)).toISOString() : new Date().toISOString()
        }));
    } catch (error) {
        // Table might not exist or other DB issue — return empty silently
        return [];
    }
}

export async function markAsRead(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { success: false };

    try {
        await (prisma as any).$executeRawUnsafe(
            `UPDATE Notification SET isRead = 1 WHERE id = ? AND userId = ?`,
            id,
            session.user.id
        );
        return { success: true };
    } catch (error) {
        console.error('markAsRead error:', error);
        return { success: false };
    }
}

export async function markAllAsRead() {
    const session = await auth();
    if (!session?.user?.id) return { success: false };

    try {
        await (prisma as any).$executeRawUnsafe(
            `UPDATE Notification SET isRead = 1 WHERE userId = ? AND isRead = 0`,
            session.user.id
        );
        return { success: true };
    } catch (error) {
        console.error('markAllAsRead error:', error);
        return { success: false };
    }
}
