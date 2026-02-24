
'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { ROLES } from '@/lib/constants';
import { auth } from '@/auth';

export async function bulkCreateStudents(students: { name: string, email: string }[]) {
    const session = await auth();
    if (!session?.user) {
        return { success: false, error: 'Unauthorized' };
    }

    const user = session.user as any;
    const orgId = user.organizationId;
    const role = user.role;

    // Only Admin, Org Owner, or Teacher can bulk add students
    if (![ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER].includes(role)) {
        return { success: false, error: 'Insufficient permissions' };
    }

    if (!orgId && role !== ROLES.ADMIN) {
        return { success: false, error: 'You must belong to an organization to add students' };
    }

    const results = {
        successCount: 0,
        failCount: 0,
        errors: [] as string[]
    };

    for (const student of students) {
        try {
            // Generate unique password: First4LettersOfName + @ + Last4LettersOfEmailUID
            const namePrefix = (student.name || 'STUD').replace(/\s/g, '').substring(0, 4).toUpperCase();
            const emailPart = student.email.split('@')[0];
            const emailSuffix = emailPart.length > 4 ? emailPart.slice(-4) : emailPart;
            const rawPassword = `${namePrefix}@${emailSuffix}`;

            const hashedPassword = await bcrypt.hash(rawPassword, 10);

            // Basic validation
            if (!student.email || !student.email.includes('@')) {
                results.failCount++;
                results.errors.push(`Invalid email: ${student.email || 'Empty'}`);
                continue;
            }

            // Check if user already exists
            const existing = await prisma.user.findUnique({
                where: { email: student.email.toLowerCase() }
            });

            if (existing) {
                results.failCount++;
                results.errors.push(`Email already exists: ${student.email}`);
                continue;
            }

            // Create user
            const newUser = await prisma.user.create({
                data: {
                    name: student.name,
                    email: student.email.toLowerCase(),
                    password: hashedPassword,
                    role: ROLES.USER,
                    organizationId: orgId || null,
                    subscriptionStatus: 'FREE',
                    needsPasswordChange: true
                }
            });

            // Create Welcome Notification via raw SQL (Prisma client may not have Notification model)
            const { randomUUID } = require('crypto');
            await (prisma as any).$executeRawUnsafe(
                `INSERT INTO Notification (id, userId, title, message, type, isRead, createdAt) VALUES (?, ?, ?, ?, ?, 0, datetime('now'))`,
                randomUUID(),
                newUser.id,
                'Welcome to Math Mastery!',
                `Your account has been created. Your temporary password is ${rawPassword}. Please change it on your first login.`,
                'SUCCESS'
            );

            results.successCount++;
        } catch (error: any) {
            results.failCount++;
            results.errors.push(`Error creating ${student.email}: ${error.message}`);
        }
    }

    return { success: true, ...results };
}
