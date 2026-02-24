'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
    LayoutDashboard, FileQuestion, FileText,
    Users, Settings, Building2, UserCircle, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoutButton } from '../layout/LogoutButton';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/lib/constants';

const roleColors: Record<string, string> = {
    ADMIN: 'bg-purple-500/10 text-purple-600 border-purple-200',
    ORG_OWNER: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    TEACHER: 'bg-green-500/10 text-green-700 border-green-200',
};

export default function AdminSidebar() {
    const pathname = usePathname();
    const params = useParams();
    const { data: session } = useSession();
    const user = session?.user as any;
    const userRole = user?.role || ROLES.USER;
    const slug = params?.slug as string;

    // Determine the base path based on whether we are in an org context or global admin
    const baseUrl = slug ? `/org/${slug}/admin` : '/admin';

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: slug ? `/org/${slug}/dashboard` : '/admin', roles: [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER, ROLES.USER] },
        { name: 'Questions', icon: FileQuestion, href: `${baseUrl}/questions`, roles: [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER] },
        { name: 'Mock Tests', icon: FileText, href: `${baseUrl}/tests`, roles: [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER] },
        { name: 'User Management', icon: Users, href: `${baseUrl}/users`, roles: [ROLES.ADMIN, ROLES.ORG_OWNER] },
        { name: 'Batches', icon: Layers, href: `${baseUrl}/batches`, roles: [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER] },
        { name: 'B2B Organizations', icon: Building2, href: '/admin/b2b', roles: [ROLES.ADMIN] },
        { name: 'Settings', icon: Settings, href: '/admin/settings', roles: [ROLES.ADMIN] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));
    const badgeCls = roleColors[userRole] || 'bg-gray-100 text-gray-600 border-gray-200';

    // Find current org name from memberships in session
    const currentOrg = user?.memberships?.find((m: any) => m.organization.slug === slug)?.organization;

    return (
        <aside className="admin-sidebar" aria-label="Admin navigation">
            <div className="p-5 border-b border-border flex-shrink-0">
                <Link href="/dashboard" className="flex items-center gap-2 mb-4 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors flex-shrink-0">
                        <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <span className="font-bold text-base tracking-tight truncate">
                        Math<span className="text-blue-600">Mastery</span>
                    </span>
                </Link>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
                            badgeCls
                        )}>
                            {userRole.replace('_', ' ')}
                        </span>
                    </div>

                    {currentOrg && (
                        <p className="text-[10px] text-muted font-black uppercase tracking-tight truncate" title={currentOrg.name}>
                            {currentOrg.name}
                        </p>
                    )}

                    {user?.name && (
                        <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                    )}
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 min-h-0 overflow-y-auto scrollbar-thin">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.href
                        || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                                isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-muted hover:text-foreground hover:bg-muted-light/60'
                            )}
                        >
                            <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-white' : 'text-muted')} />
                            <span className="truncate">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-border flex-shrink-0">
                <LogoutButton />
            </div>
        </aside>
    );
}
