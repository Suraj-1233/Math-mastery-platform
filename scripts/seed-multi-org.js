const path = require('path');
const bcrypt = require(path.join(process.cwd(), 'node_modules', 'bcryptjs'));
const { PrismaClient } = require(path.join(process.cwd(), 'src', 'generated', 'client'));

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // 1. Create a second organization
    const org2 = await prisma.organization.upsert({
        where: { contactEmail: 'contact@omega.institute' },
        update: {},
        create: {
            name: 'Omega Institute',
            slug: 'omega-inst',
            contactEmail: 'contact@omega.institute',
            plan: 'FREE',
            status: 'ACTIVE'
        }
    });

    console.log('Second organization created: Omega Institute');

    // 2. Create a "Multi-Org" Student account
    const email = 'multi@demo.com';
    const user = await prisma.user.upsert({
        where: { email },
        update: { password },
        create: {
            email,
            name: 'Multi-Org Student',
            role: 'USER',
            password
        }
    });

    // 3. Find first org
    const org1 = await prisma.organization.findFirst({
        where: { contactEmail: 'contact@acme.edu' }
    });

    if (org1) {
        // Link to Org 1 (Acme)
        await prisma.orgMembership.upsert({
            where: { userId_organizationId: { userId: user.id, organizationId: org1.id } },
            update: { role: 'USER' },
            create: {
                userId: user.id,
                organizationId: org1.id,
                role: 'USER',
                status: 'ACTIVE'
            }
        });
        console.log(`Linked ${email} to ${org1.name}`);
    }

    // Link to Org 2 (Omega)
    await prisma.orgMembership.upsert({
        where: { userId_organizationId: { userId: user.id, organizationId: org2.id } },
        update: { role: 'USER' },
        create: {
            userId: user.id,
            organizationId: org2.id,
            role: 'USER',
            status: 'ACTIVE'
        }
    });
    console.log(`Linked ${email} to ${org2.name}`);

    console.log('\nSUCCESS: Multi-org user created.');
    console.log(`Email: ${email}`);
    console.log(`Pass: password123`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
