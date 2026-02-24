import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const batches = await prisma.batch.findMany({
            where: { organizationId: check.orgId },
            include: {
                _count: { select: { students: true } },
                createdBy: { select: { name: true } },
                organization: { select: { name: true } },
                students: { select: { id: true } }
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(batches);
    } catch (error) {
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
        const { name, description, studentIds } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const batch = await prisma.batch.create({
            data: {
                name,
                description,
                organizationId: check.orgId,
                createdById: check.user.id,
                students: studentIds ? {
                    connect: studentIds.map((id: string) => ({ id }))
                } : undefined
            },
            include: {
                _count: { select: { students: true } }
            }
        });

        return NextResponse.json(batch);
    } catch (error: any) {
        console.error('Failed to create batch:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
