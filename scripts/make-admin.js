#!/usr/bin/env node
/**
 * ===========================
 * Admin Promotion Utility
 * ===========================
 * Usage:
 *   DATABASE_URL="file:./dev.db" node scripts/make-admin.js list
 *   DATABASE_URL="file:./dev.db" node scripts/make-admin.js promote your@email.com
 *   DATABASE_URL="file:./dev.db" node scripts/make-admin.js demote your@email.com
 */

const { PrismaClient } = require('../src/generated/client');
const prisma = new PrismaClient();

async function main() {
    const action = process.argv[2];
    const email = process.argv[3];

    if (action === 'list') {
        const users = await prisma.user.findMany({
            select: { email: true, name: true, role: true, subscriptionStatus: true },
            orderBy: { role: 'asc' }
        });
        console.log('\n📋 All Users:\n');
        users.forEach(u => {
            const roleBadge = u.role === 'ADMIN' ? '🟣 ADMIN' : '🔵 USER';
            console.log(`  ${roleBadge}  ${u.email}  (${u.name || 'No name'})`);
        });
        console.log('');
        return;
    }

    if (!email) {
        console.log('\nUsage:');
        console.log('  DATABASE_URL="file:./dev.db" node scripts/make-admin.js list');
        console.log('  DATABASE_URL="file:./dev.db" node scripts/make-admin.js promote email@example.com');
        console.log('  DATABASE_URL="file:./dev.db" node scripts/make-admin.js demote email@example.com\n');
        return;
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
        console.error(`\n❌ No user found with email: ${email}`);
        console.log('   Run "list" to see all registered emails.\n');
        return;
    }

    if (action === 'promote') {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });
        console.log(`\n✅ ${user.email} has been promoted to ADMIN!\n`);
    } else if (action === 'demote') {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'USER' }
        });
        console.log(`\n✅ ${user.email} has been demoted to USER.\n`);
    } else {
        console.log('\n❓ Unknown action. Use "list", "promote", or "demote"\n');
    }
}

main()
    .catch(e => console.error('Error:', e.message))
    .finally(() => prisma.$disconnect());
