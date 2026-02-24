import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string; id: string }> }
) {
    const { slug, id } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        // Prevent self-removal from org
        if (check.user.id === id) {
            return NextResponse.json({ error: 'Cannot remove yourself from the organization' }, { status: 400 });
        }

        // Find the membership
        const membership = await prisma.orgMembership.findUnique({
            where: {
                userId_organizationId: {
                    userId: id,
                    organizationId: check.orgId as string
                }
            }
        });

        if (!membership) {
            return NextResponse.json({ error: 'User is not a member of this organization' }, { status: 404 });
        }

        // Prevent removing the last owner? (Maybe later)
        if (membership.role === ROLES.ORG_OWNER && check.role !== ROLES.ADMIN) {
            // Only platform admins can remove other org owners
            return NextResponse.json({ error: 'Only platform admins can remove organization owners' }, { status: 403 });
        }

        // Delete the membership
        await prisma.orgMembership.delete({
            where: { id: membership.id }
        });

        return NextResponse.json({ success: true, message: 'User removed from organization' });
    } catch (error) {
        console.error('Remove member error:', error);
        return NextResponse.json({ error: 'Failed to remove user' }, { status: 500 });
    }
}
