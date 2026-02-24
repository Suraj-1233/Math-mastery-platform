import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES, TEST_STATUS } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const where: any = {
            organizationId: check.orgId
        };

        // Teachers only see tests they created
        if (check.role === ROLES.TEACHER) {
            where.createdById = check.user.id;
        }

        const tests = await prisma.test.findMany({
            where,
            include: { organization: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });

        // Augment with resultsDisclosed (field may not be in Prisma client)
        const testIds = tests.map(t => t.id);
        let disclosedMap: Record<string, boolean> = {};
        if (testIds.length > 0) {
            const rawRows: any[] = await prisma.$queryRawUnsafe(
                `SELECT id, CAST(resultsDisclosed AS TEXT) as rd FROM Test WHERE id IN (${testIds.map(id => `'${id}'`).join(',')})`
            );
            rawRows.forEach(r => { disclosedMap[r.id] = r.rd === '1'; });
        }

        const enriched = tests.map(t => ({
            ...t,
            resultsDisclosed: disclosedMap[t.id] ?? false
        }));

        return NextResponse.json(enriched);
    } catch (error) {
        console.error("Test fetch failed:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const body = await req.json();
        const { isPublic, scheduledAt, status, questions, ...rest } = body;

        // Org context tests are never public to help isolate data
        // Only SuperAdmins can create global public tests (via different route usually)
        const effectiveIsPublic = false;

        const test = await prisma.test.create({
            data: {
                ...rest,
                isPublic: effectiveIsPublic,
                organizationId: check.orgId,
                createdById: check.user.id,
                status: status || TEST_STATUS.DRAFT,
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                questions: questions || undefined,
            },
        });

        return NextResponse.json(test);
    } catch (error) {
        console.error("Test creation failed:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
