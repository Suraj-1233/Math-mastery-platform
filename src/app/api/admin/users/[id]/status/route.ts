import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; id: string }> }
) {
    const { slug, id } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const { status } = await req.json();

        const membership = await prisma.orgMembership.update({
            where: {
                userId_organizationId: {
                    userId: id,
                    organizationId: check.orgId as string
                }
            },
            data: { status },
        });

        return NextResponse.json(membership);
    } catch (error) {
        console.error('Update member status error:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
