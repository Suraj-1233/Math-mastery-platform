
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';

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
        condition: (stats: any) => {
            const hour = new Date().getHours();
            return hour < 7;
        }
    }
];

export async function checkAndAwardBadges(userId: string) {
    try {
        // Get latest user stats
        const [totalSolved, correctCount, userProgress] = await Promise.all([
            prisma.userProgress.count({ where: { userId, isSolved: true } }),
            prisma.userProgress.count({ where: { userId, isCorrect: true } }),
            prisma.userProgress.findMany({
                where: { userId, isSolved: true },
                orderBy: { attemptedAt: 'desc' },
                select: { attemptedAt: true }
            })
        ]);

        // Calculate streak (simplified version for badge logic)
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

        // Get existing badges using Raw SQL because Prisma client is out of sync
        const existingBadges: any[] = await prisma.$queryRawUnsafe(`
            SELECT name FROM Badge WHERE userId = '${userId}'
        `);
        const existingBadgeNames = new Set(existingBadges.map((b: any) => b.name));

        // Check each badge
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
            // Save new badges using Raw SQL
            for (const badge of newBadges) {
                await prisma.$executeRawUnsafe(`
                    INSERT INTO Badge (id, name, description, icon, type, userId, awardedAt)
                    VALUES (
                        '${Math.random().toString(36).substr(2, 9)}',
                        '${badge.name}',
                        '${badge.description}',
                        '${badge.icon}',
                        '${badge.type}',
                        '${userId}',
                        DATETIME('now')
                    )
                `);
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

    // Use Raw SQL because Badge model might not be in the generated Prisma Client yet
    return await prisma.$queryRawUnsafe(`
        SELECT * FROM Badge 
        WHERE userId = '${session.user.id}' 
        ORDER BY awardedAt DESC
    `) as any[];
}
