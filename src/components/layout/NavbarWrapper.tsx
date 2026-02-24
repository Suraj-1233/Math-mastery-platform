'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const HIDDEN_ROUTES = ['/login', '/signup'];
const SIDEBAR_ROUTES = ['/admin', '/org']; // Now /org uses the admin-shell sidebar layout as well

export function NavbarWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Completely unmount on auth pages
    const isAuthPage = HIDDEN_ROUTES.some(r => pathname === r);
    if (isAuthPage) return null;

    // Completely unmount on admin/org pages
    const isSidebarPage = SIDEBAR_ROUTES.some(r => pathname.startsWith(r));
    if (isSidebarPage) return null;

    return <>{children}</>;
}
