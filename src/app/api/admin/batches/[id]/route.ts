import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

async function checkAccess(slug: string, batchId: string) {
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return check;

    const batch = await prisma.batch.findUnique({
        where: { id: batchId },
        include: { students: { select: { id: true, name: true, email: true } } }
    });

    if (!batch) return { authorized: false, status: 404, error: 'Not found' };

    // Platform Admins have bypass access
    if (check.role === ROLES.ADMIN) return { authorized: true, batch };

    // Check if batch belongs to this organization
    if (batch.organizationId !== check.orgId) {
        return { authorized: false, status: 403, error: 'Forbidden: Batch belongs to another organization' };
    }

    return { authorized: true, batch };
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; id: string }> }
) {
    const { slug, id } = await params;
    const check = await checkAccess(slug, id);
    if (!check.authorized) return NextResponse.json({ error: (check as any).error }, { status: (check as any).status });

    return NextResponse.json((check as any).batch);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; id: string }> }
) {
    const { slug, id } = await params;
    const check = await checkAccess(slug, id);
    if (!check.authorized) return NextResponse.json({ error: (check as any).error }, { status: (check as any).status });

    try {
        const { name, description, studentIds } = await req.json();

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;

        if (studentIds !== undefined) {
            updateData.students = {
                set: studentIds.map((sid: string) => ({ id: sid }))
            };
        }

        const batch = await prisma.batch.update({
            where: { id },
            data: updateData,
            include: {
                _count: { select: { students: true } }
            }
        });

        return NextResponse.json(batch);
    } catch (error) {
        console.error("Batch update error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; id: string }> }
) {
    const { slug, id } = await params;
    const check = await checkAccess(slug, id);
    if (!check.authorized) return NextResponse.json({ error: (check as any).error }, { status: (check as any).status });

    try {
        await prisma.batch.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
