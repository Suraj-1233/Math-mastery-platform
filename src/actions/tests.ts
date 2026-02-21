'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { mockTests } from '@/data/mockTests';

export async function getMockTestEngineData(testId: string) {
    const session = await auth();
    const userId = session?.user?.id;

    const testMeta = mockTests.find(t => t.id === testId);
    if (!testMeta) throw new Error('Mock test not found');

    // To link the hardcoded mock test metadata with the actual OCR DB questions,
    // we use a mapping based on the mock test title/topic.
    let dbTopicFilter = '';
    if (testMeta.id.includes('PERC')) dbTopicFilter = 'Percentage';
    else if (testMeta.id.includes('ALG')) dbTopicFilter = 'Algebra';
    else if (testMeta.id.includes('SPEED') || testMeta.id.includes('CALC')) dbTopicFilter = 'General Mathematics';
    else if (testMeta.id.includes('GEO')) dbTopicFilter = 'Geometry';

    let questionsQuery = {};
    if (dbTopicFilter) {
        questionsQuery = { subject: { contains: dbTopicFilter } };
    }

    const questions = await prisma.question.findMany({
        where: questionsQuery,
        take: testMeta.questionCount,
        orderBy: { id: 'desc' },
        include: {
            userProgress: userId ? {
                where: { userId }
            } : false as any
        }
    });

    if (questions.length < testMeta.questionCount) {
        const backfill = await prisma.question.findMany({
            take: testMeta.questionCount - questions.length,
            include: {
                userProgress: userId ? {
                    where: { userId }
                } : false as any
            }
        });
        questions.push(...backfill);
    }

    // Fetch media separately using Raw SQL to avoid Prisma Client validation errors
    const questionIds = questions.map(q => q.id);
    let allMedia: any[] = [];
    if (questionIds.length > 0) {
        allMedia = await prisma.$queryRawUnsafe(`
            SELECT * FROM Media WHERE questionId IN (${questionIds.map(id => `'${id}'`).join(',')})
        `) as any[];
    }

    const formattedQuestions = questions.map(q => ({
        ...q,
        options: q.options ? JSON.parse(q.options as string) : [],
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
    const testMeta = mockTests.find(t => t.id === testId);
    if (!testMeta) throw new Error('Test missing');

    const questionIds = Object.keys(answersMap);

    // Fetch all questions answered to compare correct answers
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
    // Score = (correct * marksPerQuestion) - (wrong * negativeMarking)
    const score = (correctCount * marksPerQuestion) - (wrongCount * testMeta.negativeMarking);
    const accuracy = Object.keys(answersMap).length > 0 ? (correctCount / Object.keys(answersMap).length) * 100 : 0;

    // Record the attempt in DB
    const attempt = await prisma.userTestAttempt.create({
        data: {
            userId,
            testId,
            score: Math.max(score, 0), // Avoid negative totally if required, but standard marks can be negative
            accuracy,
            answersJson: JSON.stringify(answersMap),
            completedAt: new Date(),
        }
    });

    return attempt.id;
}
