import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; testId: string }> }
) {
    const { slug, testId } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const assignments = await prisma.testAssignment.findMany({
            where: {
                testId: testId,
                organizationId: check.orgId
            },
            select: {
                studentId: true
            }
        });

        return NextResponse.json(assignments);
    } catch (e: any) {
        console.error('Fetch assigned users error:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
