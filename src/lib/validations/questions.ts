
import { z } from 'zod';

export const getQuestionsSchema = z.object({
    page: z.number().default(1),
    limit: z.number().default(10),
    subject: z.string().optional(),
    topic: z.string().optional(),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
    status: z.enum(['SOLVED', 'UNSOLVED', 'BOOKMARKED', 'WRONG']).optional(),
    examType: z.string().optional(),
    notExamType: z.string().optional(),
    search: z.string().optional(),
    sortBy: z.enum(['newest', 'difficulty', 'most_solved']).default('newest'),
});

export const submitAnswerSchema = z.object({
    questionId: z.string(),
    selectedOptionIndex: z.number(),
});
