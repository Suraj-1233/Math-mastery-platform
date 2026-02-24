import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ['ADMIN', 'ORG_OWNER', 'TEACHER'];

    if (!session || !allowedRoles.includes(userRole)) {
        redirect('/dashboard');
    }

    return (
        /*
         * admin-shell: flex row, width 100%, min-height 100vh
         * overflow: hidden on shell clips the sidebar at viewport edge,
         * but the main area scrolls independently via admin-main class.
         * This prevents the "double scrollbar" and content clipping bugs.
         */
        <div className="admin-shell">
            <AdminSidebar />
            <div className="admin-main">
                <div className="p-6 md:p-8 max-w-screen-2xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
