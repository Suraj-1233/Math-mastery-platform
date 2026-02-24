import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; testId: string }> }
) {
    const { slug, testId } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const { studentIds } = await req.json();

        // 1. Get current assignments for this test in this org
        const existingAssignments = await prisma.testAssignment.findMany({
            where: { testId, organizationId: check.orgId },
            select: { studentId: true }
        });
        const existingStudentIds = new Set(existingAssignments.map(a => a.studentId));
        const newStudentIds = new Set(studentIds as string[]);

        // 2. Identify students to add and students to remove
        const toAdd = Array.from(newStudentIds).filter(id => !existingStudentIds.has(id));
        const toRemove = Array.from(existingStudentIds).filter(id => !newStudentIds.has(id));

        // 3. Execute changes in transaction
        await prisma.$transaction(async (tx) => {
            // Remove unselected ones
            if (toRemove.length > 0) {
                await tx.testAssignment.deleteMany({
                    where: {
                        testId,
                        organizationId: check.orgId,
                        studentId: { in: toRemove }
                    }
                });
            }

            // Create new ones
            if (toAdd.length > 0) {
                await tx.testAssignment.createMany({
                    data: toAdd.map(studentId => ({
                        testId,
                        studentId,
                        organizationId: check.orgId
                    }))
                });
            }
        });

        return NextResponse.json({ added: toAdd.length, removed: toRemove.length });
    } catch (e: any) {
        console.error('Test assignment error:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
