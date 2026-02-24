const { PrismaClient } = require('../src/generated/client');
const prisma = new PrismaClient();

function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

async function main() {
    console.log('🚀 Starting recovery and migration to multi-tenant architecture...');

    // 1. Update Organizations with Slugs
    const orgs = await prisma.organization.findMany();
    for (const org of orgs) {
        const slug = generateSlug(org.name);
        await prisma.organization.update({
            where: { id: org.id },
            data: { slug }
        });
        console.log(`✅ Set slug "${slug}" for organization "${org.name}"`);
    }

    // 2. Reconstruct Memberships
    // Since organizationId was dropped from User table, we look at other tables
    console.log('🔍 Attempting to reconstruct memberships from related tables...');

    const membershipsToCreate = new Map(); // Key: userId-orgId, Value: {userId, orgId, role}

    // A. From Test Assignments (Students)
    const testAssignments = await prisma.testAssignment.findMany({
        select: { studentId: true, organizationId: true }
    });
    for (const ta of testAssignments) {
        if (!ta.studentId || !ta.organizationId) continue;
        const key = `${ta.studentId}-${ta.organizationId}`;
        if (!membershipsToCreate.has(key)) {
            membershipsToCreate.set(key, { userId: ta.studentId, organizationId: ta.organizationId, role: 'USER' });
        }
    }

    // B. From Batch Students (Students)
    try {
        const batchStudents = await prisma.$queryRaw`
            SELECT B as userId, organizationId FROM _BatchStudents 
            JOIN Batch ON _BatchStudents.A = Batch.id
        `;
        for (const bs of batchStudents) {
            const key = `${bs.userId}-${bs.organizationId}`;
            if (!membershipsToCreate.has(key)) {
                membershipsToCreate.set(key, { userId: bs.userId, organizationId: bs.organizationId, role: 'USER' });
            }
        }
    } catch (e) {
        console.log('⚠️ Could not fetch from _BatchStudents:', e.message);
    }

    // C. From Tests (Staff/Owners)
    const tests = await prisma.test.findMany({
        select: { createdById: true, organizationId: true }
    });
    for (const test of tests) {
        if (!test.createdById || !test.organizationId) continue;
        const key = `${test.createdById}-${test.organizationId}`;
        if (!membershipsToCreate.has(key)) {
            // We'll need to fetch the user's global role to decide if they are OWNER or TEACHER
            const user = await prisma.user.findUnique({ where: { id: test.createdById }, select: { role: true } });
            const role = user?.role === 'ADMIN' ? 'ORG_OWNER' : (user?.role || 'TEACHER');
            membershipsToCreate.set(key, { userId: test.createdById, organizationId: test.organizationId, role });
        }
    }

    // D. From Batches (Staff/Owners)
    const batches = await prisma.batch.findMany({
        select: { createdById: true, organizationId: true }
    });
    for (const batch of batches) {
        if (!batch.createdById || !batch.organizationId) continue;
        const key = `${batch.createdById}-${batch.organizationId}`;
        if (!membershipsToCreate.has(key)) {
            const user = await prisma.user.findUnique({ where: { id: batch.createdById }, select: { role: true } });
            const role = user?.role === 'ADMIN' ? 'ORG_OWNER' : (user?.role || 'TEACHER');
            membershipsToCreate.set(key, { userId: batch.createdById, organizationId: batch.organizationId, role });
        }
    }

    console.log(`📦 Found ${membershipsToCreate.size} potential memberships to restore.`);

    for (const m of membershipsToCreate.values()) {
        try {
            await prisma.orgMembership.create({
                data: {
                    userId: m.userId,
                    organizationId: m.organizationId,
                    role: m.role,
                    status: 'ACTIVE'
                }
            });
            console.log(`✅ Restored membership: User ${m.userId} is ${m.role} in Org ${m.organizationId}`);
        } catch (e) {
            // Already exists is fine
        }
    }

    console.log('✨ Recovery and Migration completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Migration failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
