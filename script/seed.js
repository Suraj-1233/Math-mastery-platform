const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const dataPath = path.join(__dirname, '../../extracted_questions.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const questions = JSON.parse(rawData);

    console.log(`Starting seed of ${questions.length} questions...`);

    // Clean up existing to prevent duplicates
    await prisma.question.deleteMany({});

    const formattedQuestions = questions.map((q) => {
        const opsLength = q.options?.length || 4;
        let correctOptionIndex = Math.floor(Math.random() * opsLength) || 0;

        // Basic mapping
        return {
            id: q.id,
            text: q.question_text || "No question text",
            options: JSON.stringify(q.options || []),
            correctOptionIndex: correctOptionIndex,
            explanation: q.answer || null,
            subject: q.topic || "General",
            difficulty: (q.difficulty || "MEDIUM").toUpperCase(),
            examType: q.exam || "SSC",
        };
    });

    // Bulk insert in chunks to avoid SQLite limits
    const chunkSize = 100;
    for (let i = 0; i < formattedQuestions.length; i += chunkSize) {
        const chunk = formattedQuestions.slice(i, i + chunkSize);
        await prisma.question.createMany({
            data: chunk
        });
        console.log(`Inserted chunk ${i / chunkSize + 1} / ${Math.ceil(formattedQuestions.length / chunkSize)}`);
    }

    console.log('Seeding complete! 🚀');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
