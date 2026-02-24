import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';

export async function getOrgDashboardData(userId: string, orgId: string, role: string) {
    try {
        if (role === ROLES.TEACHER) {
            const [myTests, myQuestions, totalSubmissions, recentAttempts] = await Promise.all([
                prisma.test.findMany({
                    where: { createdById: userId, organizationId: orgId },
                    include: { _count: { select: { testAttempts: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                }),
                prisma.question.count({ where: { createdById: userId, organizationId: orgId } }),
                prisma.userTestAttempt.count({ where: { test: { createdById: userId, organizationId: orgId } } }),
                prisma.userTestAttempt.findMany({
                    where: { test: { createdById: userId, organizationId: orgId } },
                    include: {
                        user: { select: { name: true, email: true } },
                        test: { select: { title: true } },
                    },
                    orderBy: { startedAt: 'desc' },
                    take: 15,
                }),
            ]);

            return {
                role,
                stats: {
                    myTests: myTests.length,
                    myQuestions,
                    totalSubmissions,
                    activeTests: myTests.filter((t: any) => t.status === 'LIVE').length,
                },
                myTests,
                recentAttempts,
            };
        }

        if (role === ROLES.ORG_OWNER) {
            const [membersCount, tests, questions, attempts, teachers, students] = await Promise.all([
                prisma.orgMembership.count({
                    where: {
                        organizationId: orgId,
                        userId: { not: userId }
                    }
                }),
                prisma.test.findMany({
                    where: { organizationId: orgId },
                    include: {
                        createdBy: { select: { name: true } },
                        _count: { select: { testAttempts: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                prisma.question.count({ where: { organizationId: orgId } }),
                prisma.userTestAttempt.findMany({
                    where: {
                        organizationId: orgId,
                        user: { memberships: { some: { organizationId: orgId, role: ROLES.USER } } }
                    },
                    include: {
                        user: { select: { name: true, email: true, role: true } },
                        test: { select: { title: true, createdBy: { select: { name: true } } } },
                    },
                    orderBy: { startedAt: 'desc' },
                    take: 25,
                }),
                prisma.orgMembership.findMany({
                    where: { organizationId: orgId, role: ROLES.TEACHER },
                    include: {
                        user: {
                            select: {
                                id: true, name: true, email: true, createdAt: true,
                                _count: { select: { createdTests: true } },
                            }
                        }
                    },
                }),
                prisma.orgMembership.findMany({
                    where: { organizationId: orgId, role: ROLES.USER },
                    include: {
                        user: {
                            select: {
                                id: true, name: true, email: true, createdAt: true,
                                _count: { select: { testAttempts: true } },
                            }
                        }
                    },
                }),
            ]);

            const avgScore = attempts.length > 0
                ? (attempts.reduce((s: number, a: any) => s + a.score, 0) / attempts.length).toFixed(1)
                : 0;

            return {
                role,
                stats: {
                    totalMembers: membersCount,
                    totalTests: tests.length,
                    totalQuestions: questions,
                    totalAttempts: attempts.length,
                    activeTests: tests.filter((t: any) => t.status === 'LIVE').length,
                    avgScore,
                    teacherCount: teachers.length,
                    studentCount: students.length,
                },
                tests,
                attempts,
                teachers: teachers.map(m => m.user),
                students: students.map(m => m.user),
            };
        }

        // Org Student
        const [assignedTests, orgTests, myAttempts] = await Promise.all([
            prisma.testAssignment.findMany({
                where: { studentId: userId, organizationId: orgId },
                include: { test: { include: { createdBy: { select: { name: true } } } } },
            }),
            prisma.test.findMany({
                where: { organizationId: orgId, status: 'LIVE' },
                include: { createdBy: { select: { name: true } } },
            }),
            prisma.userTestAttempt.findMany({
                where: { userId, organizationId: orgId },
                include: { test: { select: { title: true, totalMarks: true } } },
                orderBy: { startedAt: 'desc' },
            }),
        ]);

        const avgAccuracy = myAttempts.length > 0
            ? (myAttempts.reduce((s: number, a: any) => s + a.accuracy, 0) / myAttempts.length).toFixed(1)
            : 0;

        const testIdsFromAttempts = myAttempts.map((a: any) => a.testId);
        let disclosedMap: Record<string, boolean> = {};
        if (testIdsFromAttempts.length > 0) {
            const uniqueIds = Array.from(new Set(testIdsFromAttempts));
            const rawRows: any[] = await prisma.$queryRawUnsafe(
                `SELECT id, CAST(resultsDisclosed AS TEXT) as rd FROM Test WHERE id IN (${uniqueIds.map(id => `'${id}'`).join(',')})`
            );
            rawRows.forEach(r => { disclosedMap[r.id] = r.rd === '1'; });
        }

        const enrichedAttempts = myAttempts.map((a: any) => ({
            ...a,
            resultsDisclosed: disclosedMap[a.testId] ?? false
        }));

        return {
            role: 'ORG_STUDENT',
            stats: {
                assignedCount: assignedTests.length,
                orgTestCount: orgTests.length,
                attemptedCount: myAttempts.length,
                avgAccuracy,
            },
            assignedTests,
            orgTests,
            myAttempts: enrichedAttempts,
        };
    } catch (e: any) {
        console.error('getOrgDashboardData error:', e.message);
        return null;
    }
}
