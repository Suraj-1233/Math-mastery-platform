import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { ROLES } from '@/lib/constants';

/**
 * Verifies if the current user has access to a specific organization.
 * Returns the membership and organization details if authorized.
 */
export async function verifyOrgAccess(slug: string, allowedRoles: string[] = [ROLES.ORG_OWNER, ROLES.TEACHER, ROLES.USER]) {
    const session = await auth();
    if (!session?.user) return { authorized: false, status: 401 };

    const user = session.user as any;

    // Platform Admins have bypass access
    if (user.role === ROLES.ADMIN) {
        const org = await prisma.organization.findUnique({ where: { slug } });
        if (!org) return { authorized: false, status: 404, error: 'Organization not found' };
        return { authorized: true, user, orgId: org.id, org, role: ROLES.ADMIN };
    }

    const membership = await prisma.orgMembership.findFirst({
        where: {
            userId: user.id,
            organization: { slug }
        },
        include: { organization: true }
    });

    if (!membership) return { authorized: false, status: 403, error: 'Not a member of this organization' };

    if (!allowedRoles.includes(membership.role)) {
        return { authorized: false, status: 403, error: 'Insufficient permissions within organization' };
    }

    return {
        authorized: true,
        user,
        orgId: membership.organizationId,
        org: membership.organization,
        role: membership.role
    };
}
