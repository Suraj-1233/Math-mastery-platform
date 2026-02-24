import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES, TEST_STATUS } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

async function verifyOwnership(slug: string, testId: string) {
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return check;

    const test = await prisma.test.findUnique({
        where: { id: testId },
        select: { createdById: true, organizationId: true }
    });

    if (!test) return { authorized: false, status: 404, error: 'Not found' };

    // Platform Admins have bypass access
    if (check.role === ROLES.ADMIN) return { authorized: true, user: check.user, test, orgId: check.orgId };

    // Check if test belongs to this organization
    if (test.organizationId !== check.orgId) return { authorized: false, status: 403, error: 'Forbidden: Test belongs to another organization' };

    // Org Owner can manage all tests in their org
    if (check.role === ROLES.ORG_OWNER) return { authorized: true, user: check.user, test, orgId: check.orgId };

    // Teacher can only manage their own tests
    if (check.role === ROLES.TEACHER && test.createdById === check.user.id) return { authorized: true, user: check.user, test, orgId: check.orgId };

    return { authorized: false, status: 403, error: 'Forbidden: Insufficient permissions for this test' };
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; testId: string }> }
) {
    const { slug, testId } = await params;
    const check = await verifyOwnership(slug, testId);
    if (!check.authorized) return NextResponse.json({ error: (check as any).error }, { status: (check as any).status });

    try {
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: {
                testAttempts: {
                    include: { user: { select: { name: true, email: true } } },
                    orderBy: { score: 'desc' }
                }
            }
        });
        return NextResponse.json(test);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; testId: string }> }
) {
    const { slug, testId } = await params;
    const check = await verifyOwnership(slug, testId);
    if (!check.authorized) return NextResponse.json({ error: (check as any).error }, { status: (check as any).status });

    try {
        const body = await req.json();
        const { isPublic, scheduledAt, status, questions, questionIds, resultsDisclosed, ...rest } = body;

        // Current test data from ownership check
        const currentTest = (check as any).test;

        // Handle resultsDisclosed toggle via raw SQL (field may not be in Prisma client)
        if (resultsDisclosed !== undefined) {
            await prisma.$executeRawUnsafe(
                `UPDATE Test SET resultsDisclosed = ? WHERE id = ?`,
                resultsDisclosed ? 1 : 0,
                testId
            );
        }

        // If this is ONLY a resultsDisclosed toggle, return early
        if (Object.keys(rest).length === 0 && isPublic === undefined && status === undefined && !questions) {
            const updated = await prisma.test.findUnique({ where: { id: testId } });
            return NextResponse.json(updated);
        }

        // Only admins can change isPublic status
        const effectiveIsPublic = check.user.role === ROLES.ADMIN ? (isPublic ?? false) : (currentTest?.isPublic ?? false);

        const test = await prisma.test.update({
            where: { id: testId },
            data: {
                ...rest,
                isPublic: effectiveIsPublic,
                // Preserve orgId if not becoming public. If admin edits, don't overwrite with null.
                organizationId: effectiveIsPublic ? null : (currentTest?.organizationId || (check as any).orgId),
                status: status || TEST_STATUS.DRAFT,
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                questions: questions || undefined,
            },
        });

        return NextResponse.json(test);
    } catch (error) {
        console.error("Test update failed:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; testId: string }> }
) {
    const { slug, testId } = await params;
    const check = await verifyOwnership(slug, testId);
    if (!check.authorized) return NextResponse.json({ error: (check as any).error }, { status: (check as any).status });

    try {
        await prisma.test.delete({
            where: { id: testId },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
