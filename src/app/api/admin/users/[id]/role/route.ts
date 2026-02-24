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
        const { role } = await req.json();

        // Prevent self-role change (to avoid losing ownership accidentally)
        if (check.user.id === id) {
            return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 });
        }

        const membership = await prisma.orgMembership.update({
            where: {
                userId_organizationId: {
                    userId: id,
                    organizationId: check.orgId as string
                }
            },
            data: { role },
        });

        return NextResponse.json(membership);
    } catch (error) {
        console.error('Update member role error:', error);
        return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
    }
}
