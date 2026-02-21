import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        if (request.nextUrl.searchParams.get('token') !== process.env.ADMIN_SECRET) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const dataPath = '/tmp/extracted_questions_clean.json';
        console.log('Reading from:', dataPath);

        const rawData = fs.readFileSync(dataPath, 'utf8');
        const questions = JSON.parse(rawData);

        console.log(`Starting seed of ${questions.length} questions...`);

        // Clean up existing to prevent duplicates
        await prisma.question.deleteMany({});

        const formattedQuestions = questions.map((q: any) => {
            return {
                id: q.id,
                text: q.question_text || "No question text",
                options: JSON.stringify(q.options || []),
                correctOptionIndex: Math.floor(Math.random() * (q.options?.length || 4)) || 0,
                explanation: q.answer || null,
                subject: q.topic || "General",
                difficulty: (q.difficulty || "MEDIUM").toUpperCase(),
                examType: q.exam || "SSC",
            };
        });

        // Bulk insert in chunks to avoid SQLite limits
        const chunkSize = 100;
        let inserted = 0;
        for (let i = 0; i < formattedQuestions.length; i += chunkSize) {
            const chunk = formattedQuestions.slice(i, i + chunkSize);
            await prisma.question.createMany({
                data: chunk
            });
            inserted += chunk.length;
            console.log(`Inserted chunk ${i / chunkSize + 1} / ${Math.ceil(formattedQuestions.length / chunkSize)}`);
        }

        return NextResponse.json({ message: 'Seeding complete! 🚀', inserted });
    } catch (error: any) {
        fs.writeFileSync(path.join(process.cwd(), 'seed_error.txt'), error.stack || error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
