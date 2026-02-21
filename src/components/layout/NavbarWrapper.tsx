'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function NavbarWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Hide navbar on auth pages to maintain the full-screen premium UI
    if (pathname === '/login' || pathname === '/signup') {
        return <div className="hidden">{children}</div>;
    }

    return <>{children}</>;
}
