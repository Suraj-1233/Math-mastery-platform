import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { ROLES } from '@/lib/constants';

export default async function OrgLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const session = await auth();
    if (!session?.user) redirect('/login');

    const user = session.user as any;

    // Check if user has membership in THIS org
    const membership = await prisma.orgMembership.findFirst({
        where: {
            userId: user.id,
            organization: { slug }
        }
    });

    if (!membership && user.role !== ROLES.ADMIN) {
        redirect('/dashboard');
    }

    return (
        <div className="admin-shell">
            <AdminSidebar />
            <div className="admin-main">
                <div className="p-4 md:p-8 max-w-screen-2xl mx-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
