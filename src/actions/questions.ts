
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { getQuestionsSchema, submitAnswerSchema } from '@/lib/validations/questions';
import { z } from 'zod';
import { checkAndAwardBadges } from '@/actions/badges';

export async function getQuestions(input: z.infer<typeof getQuestionsSchema>) {
    const session = await auth();
    const userId = session?.user?.id;

    const { page, limit, subject, topic, examType, notExamType, difficulty, status, search, sortBy } = input;
    const skip = (page - 1) * limit;

    // Build Raw SQL Where Clause
    const whereConditions: string[] = [];
    if (subject) whereConditions.push(`subject = '${subject}'`);
    if (topic) whereConditions.push(`topic = '${topic}'`);
    if (examType) whereConditions.push(`examType = '${examType}'`);
    if (notExamType) whereConditions.push(`examType != '${notExamType}'`);
    if (difficulty) whereConditions.push(`difficulty = '${difficulty}'`);
    if (search) whereConditions.push(`text LIKE '%${search}%'`);

    if (userId && status) {
        if (status === 'SOLVED') {
            whereConditions.push(`id IN (SELECT questionId FROM UserProgress WHERE userId = '${userId}' AND isSolved = 1)`);
        } else if (status === 'UNSOLVED') {
            whereConditions.push(`id NOT IN (SELECT questionId FROM UserProgress WHERE userId = '${userId}' AND isSolved = 1)`);
        } else if (status === 'BOOKMARKED') {
            whereConditions.push(`id IN (SELECT questionId FROM UserProgress WHERE userId = '${userId}' AND isBookmarked = 1)`);
        } else if (status === 'WRONG') {
            whereConditions.push(`id IN (SELECT questionId FROM UserProgress WHERE userId = '${userId}' AND status = 'WRONG')`);
        }
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    const orderClause = sortBy === 'difficulty' ? 'ORDER BY difficulty ASC' : 'ORDER BY createdAt DESC';
    const limitClause = `LIMIT ${limit} OFFSET ${skip}`;

    // Execute Raw Queries
    const [questions, totalCountResults] = await Promise.all([
        prisma.$queryRawUnsafe(`SELECT * FROM Question ${whereClause} ${orderClause} ${limitClause}`),
        prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM Question ${whereClause}`)
    ]) as [any[], any[]];

    const totalCount = Number(totalCountResults[0]?.count || 0);

    // Fetch user progress for these questions manually
    let userProgress: any[] = [];
    if (userId && questions.length > 0) {
        userProgress = await prisma.$queryRawUnsafe(
            `SELECT * FROM UserProgress WHERE userId = '${userId}' AND questionId IN (${questions.map(q => `'${q.id}'`).join(',')})`
        );
    }

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
        const progress = userProgress.find(p => p.questionId === q.id);
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

    const questions = await prisma.$queryRawUnsafe(
        `SELECT * FROM Question WHERE id = '${questionId}'`
    ) as any[];
    const question = questions[0];

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

    await (prisma as any).$executeRawUnsafe(
        `UPDATE Question SET 
            solveAttemptCount = ${newSolveCount}, 
            wrongAttemptCount = ${newWrongCount}, 
            difficulty = '${newDifficulty}' 
         WHERE id = '${questionId}'`
    );

    revalidatePath('/questions'); // Revalidate list to update icons and badges
    revalidatePath(`/questions/${questionId}`);
    revalidatePath('/dashboard');

    const newBadges = await checkAndAwardBadges(session.user.id);

    return {
        isCorrect,
        correctOptionIndex: question.correctOptionIndex,
        explanation: question.explanation,
        explanationHi: question.explanationHi,
        newBadges
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
export async function getQuestion(id: string) {
    const session = await auth();
    const userId = session?.user?.id;

    const questions = await prisma.$queryRawUnsafe(
        `SELECT * FROM Question WHERE id = '${id}'`
    ) as any[];
    const q = questions[0];

    if (!q) return null;

    // Fetch progress, occurrences and media
    const [progressResult, occurrences, media] = await Promise.all([
        userId ? prisma.$queryRawUnsafe(`SELECT * FROM UserProgress WHERE userId = '${userId}' AND questionId = '${id}'`) : Promise.resolve([]),
        prisma.$queryRawUnsafe(`SELECT * FROM QuestionOccurrence WHERE questionId = '${id}'`),
        prisma.$queryRawUnsafe(`SELECT * FROM Media WHERE questionId = '${id}'`)
    ]) as [any[], any[], any[]];

    const progress = progressResult[0];

    return {
        ...q,
        occurrences,
        media,
        options: q.options ? JSON.parse(q.options as string) : [],
        userStatus: progress
            ? {
                isSolved: progress.isSolved,
                isCorrect: progress.isCorrect,
                isBookmarked: progress.isBookmarked,
                status: progress.status
            }
            : null,
    };
}
