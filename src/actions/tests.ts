'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { mockTests, MockTest, TestType } from '@/data/mockTests';

export async function getTests() {
    const session = await auth();
    const user = session?.user as any;
    const userRole = user?.role;
    const userOrgId = user?.organizationId;
    const userId = user?.id;

    let where: any = {};

    if (userRole === 'ADMIN') {
        // Admin sees everything
        where = {};
    } else if (userRole === 'TEACHER') {
        // Teacher sees only their own tests in admin portal
        // On the public /tests page, we show org tests
        where = {
            OR: [
                { createdById: userId },
                { organizationId: userOrgId, status: 'LIVE' },
            ],
        };
    } else if (userRole === 'ORG_OWNER') {
        where = { organizationId: userOrgId };
    } else if (userOrgId) {
        // Org Student: assigned tests OR org LIVE tests
        const assignedTestIds = userId
            ? await prisma.testAssignment.findMany({
                where: { studentId: userId },
                select: { testId: true },
            })
            : [];

        where = {
            status: 'LIVE',
            OR: [
                { id: { in: assignedTestIds.map((a: any) => a.testId) } },
                { organizationId: userOrgId },
            ],
        };
    } else {
        // Normal individual user: only public LIVE tests
        where = { isPublic: true, status: 'LIVE' };
    }

    const dbTests = await prisma.test.findMany({
        where,
        include: { organization: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
    });

    const mappedDbTests: MockTest[] = dbTests.map((t: any) => ({
        id: t.id,
        title: t.title,
        titleHi: t.titleHi,
        description: t.description || '',
        descriptionHi: t.descriptionHi || '',
        type: (t.type as TestType) || 'Full',
        duration: t.duration,
        questionCount: t.questionCount,
        difficulty: (t.difficulty as any) || 'Medium',
        totalMarks: t.totalMarks,
        negativeMarking: t.negativeMarking,
        questions: [],
        organizationName: t.organization?.name,
    }));

    // Only mix in hardcoded mock tests for normal individual users
    if (!userOrgId && userRole !== 'ORG_OWNER' && userRole !== 'TEACHER' && userRole !== 'ADMIN') {
        return [...mockTests, ...mappedDbTests];
    }

    return mappedDbTests;
}


async function getTestMeta(testId: string) {
    let testMeta = mockTests.find(t => t.id === testId);
    if (!testMeta) {
        const dbTest = await prisma.test.findUnique({
            where: { id: testId },
            include: { questions: { select: { id: true } } }
        });
        if (dbTest) {
            testMeta = {
                id: dbTest.id,
                title: dbTest.title,
                titleHi: dbTest.titleHi || '',
                description: dbTest.description,
                descriptionHi: dbTest.descriptionHi || '',
                type: (dbTest.type as TestType) || 'Full',
                duration: dbTest.duration,
                questionCount: dbTest.questionCount,
                difficulty: (dbTest.difficulty as any) || 'Medium',
                totalMarks: dbTest.totalMarks,
                negativeMarking: dbTest.negativeMarking,
                questions: dbTest.questions.map(q => q.id),
                organizationId: dbTest.organizationId,
                status: dbTest.status,
                isPublic: dbTest.isPublic
            };
        }
    }
    return testMeta;
}

export async function getMockTestEngineData(testId: string) {
    const session = await auth();
    const user = session?.user as any;
    const userId = user?.id;
    const userRole = user?.role;
    const userOrgId = user?.organizationId;

    const testMeta = await getTestMeta(testId);
    if (!testMeta) throw new Error('Mock test not found');

    // --- B2B Strict Access Validation ---
    if (userRole !== 'ADMIN') {
        const isDbTest = 'organizationId' in testMeta;

        if (isDbTest) {
            // It's a database-backed test
            const dbTest = testMeta as any;

            if (dbTest.organizationId) {
                // 1. Organization Test: Only accessible by that org's members
                if (userOrgId !== dbTest.organizationId && userRole !== 'ORG_OWNER' && userRole !== 'TEACHER') {
                    throw new Error('Unauthorized: You do not have access to this organization\'s test.');
                }

                // If it's a student (USER with orgId), they can only access LIVE tests, and it must be either public to the org or explicitly assigned
                if (userRole === 'USER' && userOrgId === dbTest.organizationId) {
                    if (dbTest.status !== 'LIVE') {
                        throw new Error('Unauthorized: This test is not currently live.');
                    }

                    // Allow if it's an org-public test
                    // Or if it's explicitly assigned to them
                    const assignment = await prisma.testAssignment.findFirst({
                        where: { testId: dbTest.id, studentId: userId }
                    });

                    if (!dbTest.isPublic && !assignment) {
                        throw new Error('Unauthorized: This test has not been assigned to you.');
                    }
                }
            } else {
                // 2. Public Platform Test (Normal Users)
                // Org members should not access public platform tests
                if (userRole === 'ORG_OWNER' || userRole === 'TEACHER' || (userRole === 'USER' && userOrgId)) {
                    throw new Error('Unauthorized: Organization members cannot access public platform tests.');
                }

                if (dbTest.status !== 'LIVE') {
                    throw new Error('Unauthorized: This test is not currently live.');
                }
                if (!dbTest.isPublic) {
                    throw new Error('Unauthorized: This test is not public.');
                }
            }
        } else {
            // It's a hardcoded mock test (from data/mockTests.ts)
            // Treat these as Public Platform Tests
            if (userRole === 'ORG_OWNER' || userRole === 'TEACHER' || (userRole === 'USER' && userOrgId)) {
                throw new Error('Unauthorized: Organization members cannot access public platform tests.');
            }
        }
    }
    // --- End Validation ---

    // --- Prevent Duplicate Attempts for Org Tests ---
    if (userId && testMeta && 'organizationId' in testMeta && (testMeta as any).organizationId) {
        const existingAttempt = await prisma.userTestAttempt.findFirst({
            where: { userId, testId, status: 'SUBMITTED' }
        });
        if (existingAttempt) {
            throw new Error('You have already attempted this test. Only one attempt is allowed per exam.');
        }
    }

    let questions: any[] = [];

    if (testMeta.questions && testMeta.questions.length > 0) {
        // Database backed test with specific questions
        questions = await prisma.question.findMany({
            where: { id: { in: testMeta.questions } },
            include: {
                userProgress: userId ? {
                    where: { userId }
                } : false as any
            }
        });
    } else {
        // Fallback for hardcoded tests without explicit IDs
        let dbTopicFilter = '';
        if (testMeta.id.includes('PERC')) dbTopicFilter = 'Percentage';
        else if (testMeta.id.includes('ALG')) dbTopicFilter = 'Algebra';
        else if (testMeta.id.includes('SPEED') || testMeta.id.includes('CALC')) dbTopicFilter = 'General Mathematics';
        else if (testMeta.id.includes('GEO')) dbTopicFilter = 'Geometry';

        let questionsQuery = {};
        if (dbTopicFilter) {
            questionsQuery = { subject: { contains: dbTopicFilter } };
        }

        questions = await prisma.question.findMany({
            where: questionsQuery,
            take: testMeta.questionCount,
            orderBy: { id: 'desc' },
            include: {
                userProgress: userId ? {
                    where: { userId }
                } : false as any
            }
        });
    }

    const questionIds = questions.map(q => q.id);
    let allMedia: any[] = [];
    if (questionIds.length > 0) {
        allMedia = await prisma.$queryRawUnsafe(`
            SELECT * FROM Media WHERE questionId IN (${questionIds.map(id => `'${id}'`).join(',')})
        `) as any[];
    }

    const formattedQuestions = questions.map(q => ({
        ...q,
        options: (() => {
            const raw = (q as any).options;
            if (!raw) return [];
            if (Array.isArray(raw)) return raw;
            if (typeof raw === 'string') { try { return JSON.parse(raw); } catch { return []; } }
            if (typeof raw === 'object') return Object.values(raw);
            return [];
        })(),
        isBookmarked: (q as any).userProgress?.[0]?.isBookmarked || false,
        media: allMedia.filter(m => m.questionId === q.id)
    }));

    return {
        testMeta,
        questions: formattedQuestions
    };
}

export async function submitMockTest(testId: string, answersMap: Record<string, number>) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const userId = session.user.id;
    const userRole = (session.user as any).role;
    const userOrgId = (session.user as any).organizationId;

    const testMeta = await getTestMeta(testId);
    if (!testMeta) throw new Error('Test missing');

    // --- B2B Strict Access Validation ---
    if (userRole !== 'ADMIN') {
        const isDbTest = 'organizationId' in testMeta;

        if (isDbTest) {
            const dbTest = testMeta as any;

            if (dbTest.organizationId) {
                if (userOrgId !== dbTest.organizationId && userRole !== 'ORG_OWNER' && userRole !== 'TEACHER') {
                    throw new Error('Unauthorized: You do not have access to submit this organization\'s test.');
                }

                if (userRole === 'USER' && userOrgId === dbTest.organizationId) {
                    if (dbTest.status !== 'LIVE') {
                        throw new Error('Unauthorized: This test is not currently live.');
                    }

                    const assignment = await prisma.testAssignment.findFirst({
                        where: { testId: dbTest.id, studentId: userId }
                    });

                    if (!dbTest.isPublic && !assignment) {
                        throw new Error('Unauthorized: This test has not been assigned to you.');
                    }
                }
            } else {
                if (userRole === 'ORG_OWNER' || userRole === 'TEACHER' || (userRole === 'USER' && userOrgId)) {
                    throw new Error('Unauthorized: Organization members cannot submit public platform tests.');
                }

                if (dbTest.status !== 'LIVE') {
                    throw new Error('Unauthorized: This test is not currently live.');
                }
                if (!dbTest.isPublic) {
                    throw new Error('Unauthorized: This test is not public.');
                }
            }
        } else {
            if (userRole === 'ORG_OWNER' || userRole === 'TEACHER' || (userRole === 'USER' && userOrgId)) {
                throw new Error('Unauthorized: Organization members cannot submit public platform tests.');
            }
        }
    }
    // --- End Validation ---

    // --- Prevent Duplicate Submissions for Org Tests ---
    if (testMeta && 'organizationId' in testMeta && (testMeta as any).organizationId) {
        const existingAttempt = await prisma.userTestAttempt.findFirst({
            where: { userId, testId, status: 'SUBMITTED' }
        });
        if (existingAttempt) {
            throw new Error('You have already submitted this test. Duplicate submissions are not allowed.');
        }
    }

    const questionIds = Object.keys(answersMap);
    const questions = await prisma.question.findMany({
        where: { id: { in: questionIds } },
        select: { id: true, correctOptionIndex: true }
    });

    let correctCount = 0;
    questions.forEach(q => {
        if (answersMap[q.id] === q.correctOptionIndex) {
            correctCount++;
        }
    });

    const marksPerQuestion = testMeta.totalMarks / testMeta.questionCount;
    const wrongCount = Object.keys(answersMap).length - correctCount;
    const score = (correctCount * marksPerQuestion) - (wrongCount * testMeta.negativeMarking);
    const accuracy = Object.keys(answersMap).length > 0 ? (correctCount / Object.keys(answersMap).length) * 100 : 0;

    const attempt = await prisma.userTestAttempt.create({
        data: {
            userId,
            testId,
            score: Math.max(score, 0),
            accuracy,
            answersJson: JSON.stringify(answersMap),
            completedAt: new Date(),
            organizationId: userOrgId || null,
            status: 'SUBMITTED'
        }
    });

    return attempt.id;
}
