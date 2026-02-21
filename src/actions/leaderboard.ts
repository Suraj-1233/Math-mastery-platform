
'use server';

import prisma from '@/lib/prisma';

export async function getLeaderboard() {
    try {
        // Aggregate users stats using raw SQL for maximum performance
        const results: any[] = await prisma.$queryRawUnsafe(`
            SELECT 
                u.id, 
                u.name, 
                COUNT(CASE WHEN up.isSolved = 1 THEN 1 END) as totalSolved,
                COUNT(CASE WHEN up.isCorrect = 1 THEN 1 END) as correctCount
            FROM User u
            LEFT JOIN UserProgress up ON u.id = up.userId
            GROUP BY u.id
            ORDER BY correctCount DESC, totalSolved DESC
            LIMIT 20
        `);

        return results.map(user => ({
            id: user.id,
            name: user.name || 'Anonymous Warrior',
            totalSolved: Number(user.totalSolved),
            correctCount: Number(user.correctCount),
            accuracy: user.totalSolved > 0
                ? Math.round((Number(user.correctCount) / Number(user.totalSolved)) * 100)
                : 0
        }));
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        return [];
    }
}
