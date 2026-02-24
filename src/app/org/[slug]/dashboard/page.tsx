import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';
import prisma from '@/lib/prisma';
import OrgStudentDashboard from '@/components/org/OrgStudentDashboard';
import TeacherDashboard from '@/components/org/TeacherDashboard';
import OrgOwnerDashboard from '@/components/org/OrgOwnerDashboard';

import { getOrgDashboardData } from '@/actions/org-dashboard';


export default async function OrgDashboardPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await auth();
    if (!session?.user) redirect('/login');

    const user = session.user as any;

    // Find membership for this specific organization slug
    const membership = await prisma.orgMembership.findFirst({
        where: {
            userId: user.id,
            organization: { slug }
        },
        include: { organization: true }
    });

    if (!membership) {
        // User is not a member of this organization
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-8 bg-surface border border-border rounded-3xl max-w-md">
                    <h2 className="text-2xl font-black mb-4">Access Denied</h2>
                    <p className="text-muted mb-6">You don't have permission to access this organization's dashboard.</p>
                    <Link href="/dashboard" className="btn btn-primary px-8">Back to My Dashboard</Link>
                </div>
            </div>
        );
    }

    const orgData = await getOrgDashboardData(user.id, membership.organizationId, membership.role);

    if (!orgData) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="font-bold text-lg mb-2">Failed to load organization data.</p>
                    <p className="text-muted text-sm">Please try refreshing the page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-2 text-sm text-muted">
                    <span className="font-bold text-foreground">{membership.organization.name}</span>
                    <span>/</span>
                    <span>Dashboard</span>
                </div>
                {membership.role === ROLES.ORG_OWNER && <OrgOwnerDashboard orgData={orgData} />}
                {membership.role === ROLES.TEACHER && <TeacherDashboard orgData={orgData} />}
                {membership.role === ROLES.USER && <OrgStudentDashboard orgData={orgData} />}
            </div>
        </div>
    );
}
