import prisma from '@/lib/prisma';
import { pyqDatabase } from '@/data/pyq';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Simple security check using search param
        if (request.nextUrl.searchParams.get('token') !== 'production_seed_2024') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        console.log("🚀 Starting Production Data Migration (PYQs Only)...");

        // 1. Migrate PYQs
        const formattedPYQs = pyqDatabase.map(q => ({
            id: q.id,
            text: q.question,
            textHi: q.questionHi || null,
            options: JSON.stringify(q.options),
            correctOptionIndex: q.options.indexOf(q.correctAnswer),
            explanation: q.idealMethod || null,
            explanationHi: null,
            subject: "Math",
            topic: q.topic,
            examType: q.exam,
            year: q.year,
            difficulty: q.difficulty.toUpperCase() as any,
            isPremium: false
        }));

        const allQuestions = formattedPYQs;

        console.log(`Mapping ${allQuestions.length} production questions...`);

        // Batch upsert to prevent timeout
        for (const q of allQuestions) {
            await (prisma.question as any).upsert({
                where: { id: q.id },
                update: q as any,
                create: q as any
            });

            // Create primary occurrence from question data
            const primaryExam = (q as any).examType;
            const primaryYear = (q as any).year;

            if (primaryExam && primaryYear) {
                // Clear old ones and add current using raw SQL
                try {
                    await (prisma as any).$executeRawUnsafe(
                        `DELETE FROM QuestionOccurrence WHERE questionId = '${q.id}'`
                    );

                    await (prisma as any).$executeRawUnsafe(
                        `INSERT INTO QuestionOccurrence (id, examName, year, questionId, createdAt) 
                         VALUES ('${q.id}_primary', '${primaryExam}', ${primaryYear}, '${q.id}', CURRENT_TIMESTAMP)`
                    );
                } catch (e) {
                    console.error("Failed to seed occurrence via raw SQL:", e);
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Production data seeded successfully (PYQs Only)!",
            counts: {
                pyqs: formattedPYQs.length,
                total: allQuestions.length
            }
        });

    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
