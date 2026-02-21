
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function getUserStats(targetYear?: number) {
    const session = await auth();
    if (!session?.user?.id) return null;

    const userId = session.user.id;

    const [totalSolved, correctCount] = await Promise.all([
        prisma.userProgress.count({
            where: { userId, isSolved: true },
        }),
        prisma.userProgress.count({
            where: { userId, isCorrect: true },
        }),
    ]);

    // Aggregate Subject Stats (Prisma limitation: groupBy on relation not direct)
    // Workaround: Fetch solved progress with question relation
    // Aggregate Subject Stats using Raw SQL because Prisma client might be out of sync
    const solvedRecords: any[] = await prisma.$queryRawUnsafe(`
        SELECT up.isCorrect, q.subject 
        FROM UserProgress up
        JOIN Question q ON up.questionId = q.id
        WHERE up.userId = '${userId}' AND up.isSolved = 1
    `);

    const subjectMap = new Map<string, { total: number; correct: number }>();

    solvedRecords.forEach((record) => {
        const subject = record.subject;
        const current = subjectMap.get(subject) || { total: 0, correct: 0 };
        current.total += 1;
        if (record.isCorrect) current.correct += 1;
        subjectMap.set(subject, current);
    });

    const subjectWise = Array.from(subjectMap.entries()).map(([subject, stats]) => ({
        subject,
        total: stats.total,
        score: Math.round((stats.correct / stats.total) * 100),
    }));

    const accuracy = totalSolved > 0 ? Math.round((correctCount / totalSolved) * 100) : 0;

    // --- Dynamic Ranking Logic ---
    // Rank by correctCount (or totalSolved)
    const totalUsers = await prisma.user.count();
    // Simple rank calculation: Count how many users have more correct answers
    // Note: In a large system, this would be pre-calculated or cached
    const usersWithMoreCorrect = await prisma.userProgress.groupBy({
        by: ['userId'],
        where: { isCorrect: true },
        _count: { _all: true },
    }).then(groups => groups.filter(g => g._count._all > correctCount).length);

    const rank = usersWithMoreCorrect + 1;
    const percentile = totalUsers > 0 ? Math.max(1, Math.round((rank / totalUsers) * 100)) : 100;

    // --- Streak Logic ---
    const allSolvingDays = await prisma.userProgress.findMany({
        where: { userId, isSolved: true },
        select: { attemptedAt: true },
        orderBy: { attemptedAt: 'desc' },
    });

    const uniqueDays = Array.from(new Set(
        allSolvingDays.map(d => d.attemptedAt.toISOString().split('T')[0])
    ));

    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if the streak is still active (today or yesterday)
    if (uniqueDays.length > 0 && (uniqueDays[0] === today || uniqueDays[0] === yesterday)) {
        currentStreak = 1;
        for (let i = 0; i < uniqueDays.length - 1; i++) {
            const current = new Date(uniqueDays[i]);
            const next = new Date(uniqueDays[i + 1]);
            const diffInDays = (current.getTime() - next.getTime()) / (1000 * 3600 * 24);

            if (diffInDays === 1) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    const currentYear = targetYear || new Date().getFullYear();
    const activityDataRaw = await prisma.userProgress.findMany({
        where: {
            userId,
            attemptedAt: {
                gte: new Date(`${currentYear}-01-01`),
                lt: new Date(`${currentYear + 1}-01-01`),
            }
        },
        select: { attemptedAt: true }
    });

    const activityData = activityDataRaw.reduce((acc: Record<string, number>, curr: { attemptedAt: Date }) => {
        const dateString = curr.attemptedAt.toISOString().split('T')[0];
        acc[dateString] = (acc[dateString] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return {
        totalSolved,
        accuracy,
        currentStreak,
        rank,
        percentile,
        subjectWise,
        activityData,
    };
}
