
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { randomUUID } from 'crypto';

const BADGE_DEFINITIONS = [
    {
        name: 'Math Warrior',
        description: 'Solved 10 questions correctly.',
        icon: 'Sword',
        type: 'ACHIEVEMENT',
        condition: (stats: any) => stats.correctCount >= 10
    },
    {
        name: 'Consistency King',
        description: 'Maintained a 3-day study streak.',
        icon: 'Flame',
        type: 'STREAK',
        condition: (stats: any) => stats.currentStreak >= 3
    },
    {
        name: 'Perfectionist',
        description: 'Achieved 100% accuracy over 5+ questions.',
        icon: 'Target',
        type: 'ACHIEVEMENT',
        condition: (stats: any) => stats.totalSolved >= 5 && stats.accuracy >= 100
    },
    {
        name: 'Early Bird',
        description: 'Solved a question before 7 AM.',
        icon: 'Sun',
        type: 'SPECIAL',
        condition: (_stats: any) => {
            const hour = new Date().getHours();
            return hour < 7;
        }
    }
];

export async function checkAndAwardBadges(userId: string) {
    try {
        const [totalSolved, correctCount, userProgress] = await Promise.all([
            prisma.userProgress.count({ where: { userId, isSolved: true } }),
            prisma.userProgress.count({ where: { userId, isCorrect: true } }),
            prisma.userProgress.findMany({
                where: { userId, isSolved: true },
                orderBy: { attemptedAt: 'desc' },
                select: { attemptedAt: true }
            })
        ]);

        const uniqueDays = Array.from(new Set(userProgress.map(p => p.attemptedAt.toISOString().split('T')[0])));
        let currentStreak = 0;
        if (uniqueDays.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
                currentStreak = 1;
                for (let i = 0; i < uniqueDays.length - 1; i++) {
                    const d1 = new Date(uniqueDays[i]);
                    const d2 = new Date(uniqueDays[i + 1]);
                    if ((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24) === 1) currentStreak++;
                    else break;
                }
            }
        }

        const stats = {
            totalSolved,
            correctCount,
            accuracy: totalSolved > 0 ? (correctCount / totalSolved) * 100 : 0,
            currentStreak
        };

        // Use parameterized query to avoid SQL injection
        const existingBadges: any[] = await (prisma as any).$queryRawUnsafe(
            `SELECT name FROM Badge WHERE userId = ?`,
            userId
        );
        const existingBadgeNames = new Set(existingBadges.map((b: any) => b.name));

        const newBadges = [];
        for (const definition of BADGE_DEFINITIONS) {
            if (!existingBadgeNames.has(definition.name) && definition.condition(stats)) {
                newBadges.push({
                    userId,
                    name: definition.name,
                    description: definition.description,
                    icon: definition.icon,
                    type: definition.type
                });
            }
        }

        if (newBadges.length > 0) {
            // Save new badges using parameterized raw SQL
            for (const badge of newBadges) {
                await (prisma as any).$executeRawUnsafe(
                    `INSERT INTO Badge (id, name, description, icon, type, userId, awardedAt) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
                    randomUUID(),
                    badge.name,
                    badge.description,
                    badge.icon,
                    badge.type,
                    userId
                );
            }
            return newBadges;
        }

        return [];
    } catch (error) {
        console.error("Error awarding badges:", error);
        return [];
    }
}

export async function getUserBadges() {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        return await (prisma as any).$queryRawUnsafe(
            `SELECT * FROM Badge WHERE userId = ? ORDER BY awardedAt DESC`,
            session.user.id
        ) as any[];
    } catch {
        return [];
    }
}
