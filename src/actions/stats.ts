
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
    const solvedWithSubjects = await prisma.userProgress.findMany({
        where: { userId, isSolved: true },
        include: { question: { select: { subject: true } } },
    });

    const subjectMap = new Map<string, { total: number; correct: number }>();

    solvedWithSubjects.forEach((record) => {
        const subject = record.question.subject;
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

    const activityData = activityDataRaw.reduce((acc, curr) => {
        const dateString = curr.attemptedAt.toISOString().split('T')[0];
        acc[dateString] = (acc[dateString] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return {
        totalSolved,
        accuracy,
        currentStreak: 0, // Placeholder for streak logic (requires daily tracking)
        subjectWise,
        activityData,
    };
}
