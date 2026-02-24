const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // 1. Admin
    await prisma.user.upsert({
        where: { email: 'admin@demo.com' },
        update: { role: 'ADMIN', password },
        create: {
            email: 'admin@demo.com',
            name: 'Super Admin',
            role: 'ADMIN',
            password
        }
    });

    // 2. Org Owner
    const org = await prisma.organization.upsert({
        where: { contactEmail: 'contact@acme.edu' },
        update: {},
        create: {
            name: 'Acme University',
            contactEmail: 'contact@acme.edu',
            plan: 'PREMIUM',
            status: 'ACTIVE'
        }
    });

    await prisma.user.upsert({
        where: { email: 'owner@demo.com' },
        update: { role: 'ORG_OWNER', organizationId: org.id, password },
        create: {
            email: 'owner@demo.com',
            name: 'Acme Owner',
            role: 'ORG_OWNER',
            organizationId: org.id,
            password
        }
    });

    // 3. Teacher
    await prisma.user.upsert({
        where: { email: 'teacher@demo.com' },
        update: { role: 'TEACHER', organizationId: org.id, password },
        create: {
            email: 'teacher@demo.com',
            name: 'Acme Teacher',
            role: 'TEACHER',
            organizationId: org.id,
            password
        }
    });

    // 4. Student
    await prisma.user.upsert({
        where: { email: 'student@demo.com' },
        update: { role: 'USER', organizationId: org.id, password },
        create: {
            email: 'student@demo.com',
            name: 'Demo Student',
            role: 'USER',
            organizationId: org.id,
            password
        }
    });

    console.log('Demo users seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
