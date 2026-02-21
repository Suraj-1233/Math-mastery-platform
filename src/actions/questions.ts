
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { getQuestionsSchema, submitAnswerSchema } from '@/lib/validations/questions';
import { z } from 'zod';

export async function getQuestions(input: z.infer<typeof getQuestionsSchema>) {
    const session = await auth();
    const userId = session?.user?.id;

    const { page, limit, subject, topic, examType, notExamType, difficulty, status, search, sortBy } = input;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (subject) where.subject = subject;
    if (topic) where.topic = topic;
    if (examType) where.examType = examType;
    if (notExamType) where.examType = { not: notExamType };
    if (difficulty) where.difficulty = difficulty;
    if (search) {
        where.text = { contains: search };
    }

    // Handle Status Filter (Complex due to Relation)
    if (userId && status) {
        if (status === 'SOLVED') {
            where.userProgress = { some: { userId, isSolved: true } };
        } else if (status === 'UNSOLVED') {
            where.userProgress = { none: { userId, isSolved: true } };
        } else if (status === 'BOOKMARKED') {
            where.userProgress = { some: { userId, isBookmarked: true } };
        } else if (status === 'WRONG') {
            where.userProgress = { some: { userId, status: 'WRONG' } };
        }
    }

    // Build OrderBy
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'difficulty') orderBy = { difficulty: 'asc' };
    // 'most_solved' would require an aggregation field or separate query, skipping for MVP simplicity or add later

    const [questions, totalCount] = await Promise.all([
        (prisma.question as any).findMany({
            where: where as any,
            skip,
            take: limit,
            orderBy,
            include: {
                // optimistically fetch progress for the current user to show status badges
                userProgress: userId ? { where: { userId } } : false,
            } as any,
        }),
        (prisma.question as any).count({ where: where as any }),
    ]);

    // Manually fetch occurrences and media since Prisma client is out of sync
    const questionIds = questions.map((q: any) => q.id);
    let occurrences: any[] = [];
    let media: any[] = [];

    if (questionIds.length > 0) {
        // Wrap in try-catch in case tables don't exist yet or other issues
        try {
            occurrences = await prisma.$queryRawUnsafe(
                `SELECT * FROM QuestionOccurrence WHERE questionId IN (${questionIds.map((id: string) => `'${id}'`).join(',')})`
            );
            media = await prisma.$queryRawUnsafe(
                `SELECT * FROM Media WHERE questionId IN (${questionIds.map((id: string) => `'${id}'`).join(',')})`
            );
        } catch (e) {
            console.error("Failed to fetch relations via raw SQL:", e);
        }
    }

    // Transform data to include a simplified userStatus field for the client
    const questionsWithStatus = questions.map((q: any) => {
        const progress = q.userProgress?.[0];
        return {
            ...q,
            occurrences: occurrences.filter(o => o.questionId === q.id),
            media: media.filter(m => m.questionId === q.id),
            options: q.options ? JSON.parse(q.options as string) : [],
            userStatus: progress
                ? {
                    isSolved: progress.isSolved,
                    isCorrect: progress.isCorrect,
                    isBookmarked: progress.isBookmarked,
                    status: progress.status
                }
                : null,
            // Remove the raw array to clean up payload
            userProgress: undefined,
        };
    });

    return { questions: questionsWithStatus, totalCount, totalPages: Math.ceil(totalCount / limit) };
}

export async function submitAnswer(input: z.infer<typeof submitAnswerSchema>) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const { questionId, selectedOptionIndex } = input;

    const question = await (prisma.question as any).findUnique({
        where: { id: questionId },
    });

    if (!question) throw new Error('Question not found');

    const isCorrect = question.correctOptionIndex === selectedOptionIndex;
    const status = isCorrect ? 'CORRECT' : 'WRONG';

    // Upsert Progress
    await prisma.userProgress.upsert({
        where: {
            userId_questionId: {
                userId: session.user.id,
                questionId,
            },
        },
        update: {
            isSolved: true,
            isCorrect,
            status,
            attemptedAt: new Date(),
            // timeTaken: ... // Could track time from client in future
        },
        create: {
            userId: session.user.id,
            questionId,
            isSolved: true,
            isCorrect,
            status,
        },
    });

    // 4. Update Global Question Stats & Dynamic Difficulty
    const newSolveCount = (question.solveAttemptCount || 0) + 1;
    const newWrongCount = (question.wrongAttemptCount || 0) + (isCorrect ? 0 : 1);
    const failureRate = newWrongCount / newSolveCount;

    let newDifficulty = question.difficulty;
    // Only adjust after a minimum number of attempts (5+) to ensure statistical significance
    if (newSolveCount >= 5) {
        if (failureRate > 0.7) {
            newDifficulty = 'HARD';
        } else if (failureRate > 0.35) {
            newDifficulty = 'MEDIUM';
        } else if (failureRate < 0.15) {
            newDifficulty = 'EASY';
        }
    }

    await (prisma.question as any).update({
        where: { id: questionId },
        data: {
            solveAttemptCount: newSolveCount,
            wrongAttemptCount: newWrongCount,
            difficulty: newDifficulty,
        },
    });

    revalidatePath('/questions'); // Revalidate list to update icons and badges
    revalidatePath(`/questions/${questionId}`);

    return {
        isCorrect,
        correctOptionIndex: question.correctOptionIndex,
        explanation: question.explanation,
        explanationHi: question.explanationHi,
    };
}

export async function toggleBookmark(questionId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const existing = await prisma.userProgress.findUnique({
        where: {
            userId_questionId: {
                userId: session.user.id,
                questionId,
            },
        },
    });

    const isBookmarked = !existing?.isBookmarked;

    await prisma.userProgress.upsert({
        where: {
            userId_questionId: {
                userId: session.user.id,
                questionId,
            },
        },
        update: {
            isBookmarked,
        },
        create: {
            userId: session.user.id,
            questionId,
            status: 'BOOKMARKED', // Initial status if never attempted
            isBookmarked,
        },
    });

    revalidatePath('/questions');
    return { isBookmarked };
}
