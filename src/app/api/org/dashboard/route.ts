import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { ROLES } from '@/lib/constants';

// GET /api/org/dashboard - role-aware stats for org members
export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = session.user as any;
    const role = user.role;
    const orgId = user.organizationId;
    const userId = user.id;

    try {
        if (role === ROLES.TEACHER) {
            const [myTests, myQuestions, totalSubmissions, recentAttempts] = await Promise.all([
                prisma.test.findMany({
                    where: { createdById: userId },
                    include: { _count: { select: { testAttempts: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                }),
                prisma.question.count({ where: { createdById: userId } }),
                prisma.userTestAttempt.count({ where: { test: { createdById: userId } } }),
                prisma.userTestAttempt.findMany({
                    where: { test: { createdById: userId } },
                    include: { user: { select: { name: true, email: true } }, test: { select: { title: true } } },
                    orderBy: { startedAt: 'desc' },
                    take: 10,
                }),
            ]);

            const stats = {
                myTests: myTests.length,
                myQuestions,
                totalSubmissions,
                activeTests: myTests.filter((t: any) => t.status === 'LIVE').length,
            };

            return NextResponse.json({ role, stats, myTests, recentAttempts });
        }

        if (role === ROLES.ORG_OWNER) {
            const [members, tests, questions, attempts, teachers, students] = await Promise.all([
                prisma.user.count({ where: { organizationId: orgId } }),
                prisma.test.findMany({
                    where: { organizationId: orgId },
                    include: { createdBy: { select: { name: true } }, _count: { select: { testAttempts: true } } },
                    orderBy: { createdAt: 'desc' },
                }),
                prisma.question.count({ where: { organizationId: orgId } }),
                prisma.userTestAttempt.findMany({
                    where: { organizationId: orgId },
                    include: {
                        user: { select: { name: true, email: true, role: true } },
                        test: { select: { title: true, createdBy: { select: { name: true } } } },
                    },
                    orderBy: { startedAt: 'desc' },
                    take: 20,
                }),
                prisma.user.findMany({
                    where: { organizationId: orgId, role: ROLES.TEACHER },
                    select: { id: true, name: true, email: true, createdAt: true, _count: { select: { createdTests: true } } },
                }),
                prisma.user.findMany({
                    where: { organizationId: orgId, role: 'USER' },
                    select: { id: true, name: true, email: true, createdAt: true, _count: { select: { testAttempts: true } } },
                }),
            ]);

            const avgScore = attempts.length > 0
                ? (attempts.reduce((s: number, a: any) => s + a.score, 0) / attempts.length).toFixed(1)
                : 0;

            return NextResponse.json({
                role,
                stats: {
                    totalMembers: members,
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
                teachers,
                students,
            });
        }

        // Default USER / Student in org
        if (orgId) {
            const [assignedTests, orgTests, myAttempts, upcomingTests] = await Promise.all([
                prisma.testAssignment.findMany({
                    where: { studentId: userId },
                    include: { test: { include: { createdBy: { select: { name: true } } } } },
                }),
                prisma.test.findMany({
                    where: { organizationId: orgId, status: 'LIVE' },
                    include: { createdBy: { select: { name: true } } },
                }),
                prisma.userTestAttempt.findMany({
                    where: { userId },
                    include: { test: { select: { title: true, totalMarks: true } } },
                    orderBy: { startedAt: 'desc' },
                }),
                prisma.test.findMany({
                    where: {
                        organizationId: orgId,
                        status: 'DRAFT',
                        scheduledAt: { not: null },
                    },
                    include: { createdBy: { select: { name: true } } },
                    orderBy: { scheduledAt: 'asc' },
                }),
            ]);

            // Fetch resultsDisclosed for all attempted tests
            const attemptedTestIds = [...new Set(myAttempts.map((a: any) => a.testId))];
            let disclosedMap: Record<string, boolean> = {};
            if (attemptedTestIds.length > 0) {
                try {
                    const rawRows: any[] = await prisma.$queryRawUnsafe(
                        `SELECT id, CAST(resultsDisclosed AS TEXT) as rd FROM Test WHERE id IN (${attemptedTestIds.map(id => `'${id}'`).join(',')})`
                    );
                    rawRows.forEach(r => { disclosedMap[r.id] = r.rd === '1'; });
                } catch (e) {
                    console.error('Failed to fetch resultsDisclosed:', e);
                }
            }

            // Enrich attempts with disclosure status — hide scores if not disclosed
            const enrichedAttempts = myAttempts.map((a: any) => {
                const disclosed = disclosedMap[a.testId] ?? false;
                return {
                    ...a,
                    resultsDisclosed: disclosed,
                    // If not disclosed, mask score and accuracy
                    score: disclosed ? a.score : null,
                    accuracy: disclosed ? a.accuracy : null,
                };
            });

            // Only count disclosed results for avg accuracy
            const disclosedAttempts = myAttempts.filter((a: any) => disclosedMap[a.testId]);
            const avgAccuracy = disclosedAttempts.length > 0
                ? (disclosedAttempts.reduce((s: number, a: any) => s + a.accuracy, 0) / disclosedAttempts.length).toFixed(1)
                : 0;

            return NextResponse.json({
                role: 'ORG_STUDENT',
                stats: {
                    assignedCount: assignedTests.length,
                    orgTestCount: orgTests.length,
                    attemptedCount: myAttempts.length,
                    avgAccuracy,
                },
                assignedTests,
                orgTests,
                upcomingTests,
                myAttempts: enrichedAttempts,
            });
        }

        return NextResponse.json({ role: 'USER', message: 'Normal user' });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
