
const path = require('path');
const bcrypt = require(path.join(process.cwd(), 'node_modules', 'bcryptjs'));
const { PrismaClient } = require(path.join(process.cwd(), 'src', 'generated', 'client'));

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || 'file:./prisma/dev.db'
        }
    }
});

async function main() {
    console.log('🚀 Starting database population...');

    const passwordHash = await bcrypt.hash('password123', 10);
    const subjects = ['Mathematics', 'Reasoning', 'General Awareness', 'English'];
    const topics = {
        'Mathematics': ['Percentage', 'Profit & Loss', 'Time & Work', 'Algebra', 'Trigonometry'],
        'Reasoning': ['Series', 'Coding-Decoding', 'Blood Relations', 'Syllogism', 'Analogy'],
        'General Awareness': ['History', 'Geography', 'Polity', 'Science', 'Current Affairs'],
        'English': ['Grammar', 'Vocabulary', 'Comprehension', 'Synonyms', 'Antonyms']
    };

    // Create 10 Organizations
    for (let i = 1; i <= 10; i++) {
        const orgName = `Organization ${i}`;
        const orgEmail = `contact@org${i}.demo.com`;

        console.log(`Creating ${orgName}...`);

        let org;
        try {
            org = await prisma.organization.create({
                data: {
                    name: orgName,
                    contactEmail: orgEmail,
                    plan: i % 3 === 0 ? 'ENTERPRISE' : i % 2 === 0 ? 'STANDARD' : 'FREE',
                    status: 'ACTIVE',
                }
            });
        } catch (e) {
            console.warn(`Org ${orgName} might already exist, skipping creation.`);
            org = await prisma.organization.findUnique({ where: { contactEmail: orgEmail } });
        }

        if (!org) continue;

        // 2 Org Owners
        for (let j = 1; j <= 2; j++) {
            const email = `owner${j}_org${i}@demo.com`;
            await prisma.user.upsert({
                where: { email },
                update: { organizationId: org.id },
                create: {
                    name: `Owner ${j} (Org ${i})`,
                    email,
                    password: passwordHash,
                    role: 'ORG_OWNER',
                    organizationId: org.id,
                }
            });
        }

        // 3 Teachers
        const teachers = [];
        for (let j = 1; j <= 3; j++) {
            const email = `teacher${j}_org${i}@demo.com`;
            const teacher = await prisma.user.upsert({
                where: { email },
                update: { organizationId: org.id },
                create: {
                    name: `Teacher ${j} (Org ${i})`,
                    email,
                    password: passwordHash,
                    role: 'TEACHER',
                    organizationId: org.id,
                }
            });
            teachers.push(teacher);
        }

        // 2 Students
        const students = [];
        for (let j = 1; j <= 2; j++) {
            const email = `student${j}_org${i}@demo.com`;
            const student = await prisma.user.upsert({
                where: { email },
                update: { organizationId: org.id },
                create: {
                    name: `Student ${j} (Org ${i})`,
                    email,
                    password: passwordHash,
                    role: 'USER',
                    organizationId: org.id,
                }
            });
            students.push(student);
        }

        // Create 20 Questions for this Org
        const questions = [];
        for (let k = 1; k <= 20; k++) {
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const topic = topics[subject][Math.floor(Math.random() * 5)];
            const teacher = teachers[k % teachers.length];

            const q = await prisma.question.create({
                data: {
                    text: `Question ${k} for ${orgName}: What is the result of ${k} + ${i}?`,
                    textHi: `प्रश्न ${k} (${orgName}): ${k} + ${i} का परिणाम क्या है?`,
                    options: JSON.stringify([
                        { text: `${k + i}` },
                        { text: `${k + i + 1}` },
                        { text: `${k + i - 1}` },
                        { text: `${k + i + 2}` }
                    ]),
                    correctOptionIndex: 0,
                    subject,
                    topic,
                    difficulty: k % 3 === 0 ? 'HARD' : k % 2 === 0 ? 'MEDIUM' : 'EASY',
                    examType: 'SSC_CGL',
                    organizationId: org.id,
                    createdById: teacher.id,
                    isPublic: false,
                    category: 'BOTH'
                }
            });
            questions.push(q);
        }

        // Create 2 Tests for this Org
        for (let t = 1; t <= 2; t++) {
            const testQuestions = questions.slice((t - 1) * 10, t * 10);
            const teacher = teachers[t % teachers.length];

            const test = await prisma.test.create({
                data: {
                    title: `Test ${t} - ${orgName}`,
                    description: `Practice test ${t} for the organization ${orgName}.`,
                    type: 'Full',
                    duration: 30,
                    questionCount: testQuestions.length,
                    difficulty: 'MEDIUM',
                    totalMarks: testQuestions.length * 2,
                    negativeMarking: 0.5,
                    organizationId: org.id,
                    createdById: teacher.id,
                    status: 'LIVE',
                    isPublic: false,
                    questions: {
                        connect: testQuestions.map(q => ({ id: q.id }))
                    }
                }
            });

            // Assign tests and create attempts
            for (const student of students) {
                await prisma.testAssignment.create({
                    data: {
                        testId: test.id,
                        studentId: student.id,
                        organizationId: org.id
                    }
                }).catch(() => { });

                if (Math.random() > 0.5) {
                    await prisma.userTestAttempt.create({
                        data: {
                            userId: student.id,
                            testId: test.id,
                            score: Math.floor(Math.random() * test.totalMarks),
                            accuracy: Math.floor(Math.random() * 100),
                            answersJson: JSON.stringify({}),
                            status: 'SUBMITTED',
                            organizationId: org.id,
                            completedAt: new Date()
                        }
                    });
                }
            }
        }
    }

    console.log('✅ Database population complete!');
}

main()
    .catch(e => {
        console.error('❌ Error populating database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
