import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { LogoutButton } from './LogoutButton';
import {
    BookOpen, LayoutDashboard, FileQuestion, Building2,
    GraduationCap, Users, Crown, Shield, PenTool, Trophy, Menu
} from 'lucide-react';

import { NotificationCenter } from './NotificationCenter';

export async function Navbar() {
    const session = await auth();
    const user = session?.user as any;
    const role = user?.role;
    const memberships = user?.memberships || [];

    const isAdmin = role === 'ADMIN';
    const isOrgOwner = memberships.some((m: any) => m.role === 'ORG_OWNER');
    const isTeacher = memberships.some((m: any) => m.role === 'TEACHER');
    const isOrgStudent = memberships.some((m: any) => m.role === 'USER');
    const isNormalUser = role === 'USER';

    // Best home URL:
    // 1. If Admin -> /admin
    // 2. If belongs to an org and is staff -> /org/[slug]/dashboard
    // 3. If student in org -> /org/[slug]/dashboard
    // 4. Default -> /dashboard
    let homeUrl = '/dashboard';
    if (isAdmin) homeUrl = '/admin';
    else if (memberships.length === 1) {
        homeUrl = `/org/${memberships[0].organization.slug}/dashboard`;
    } else if (memberships.length > 1) {
        // Multi-org users go to dashboard to pick
        homeUrl = '/dashboard';
    } else if (isNormalUser) {
        homeUrl = '/questions';
    } else if (!user) {
        homeUrl = '/';
    }

    return (
        <header className="navbar-stable" role="banner">
            <div className="h-full container-page flex items-center justify-between gap-4">

                {/* ── Logo ── */}
                <Link
                    href={homeUrl}
                    className="flex items-center gap-2 font-bold text-blue-600 text-lg shrink-0"
                    aria-label="ExamPrep Home"
                >
                    <PenTool className="h-5 w-5" aria-hidden="true" />
                    <span className="hidden sm:inline">ExamPrep</span>
                </Link>

                {/* ── Nav links (role-based) ── */}
                <nav className="hidden md:flex items-center gap-1 flex-1 px-4" aria-label="Main navigation">

                    {/* Nav actions driven by role variables above */}
                    {!user && (
                        <>
                            <NavLink href="/questions" label="Practice" />
                            <NavLink href="/tests" label="Mock Tests" />
                            <NavLink href="/pyqs" label="PYQs" />
                        </>
                    )}

                    {user && !isAdmin && (
                        <>
                            {/* Organization links (hidden, user only picks at login) */}
                            {/* Standard practice links for everyone except super admins */}
                            <NavLink href="/questions" icon={<FileQuestion className="w-3.5 h-3.5" />} label="Practice" />
                            <NavLink href="/tests" icon={<BookOpen className="w-3.5 h-3.5" />} label="Mock Tests" />
                            <NavLink href="/pyqs" label="PYQs" />
                            <NavLink href="/leaderboard" icon={<Trophy className="w-3.5 h-3.5" />} label="Leaderboard" />
                        </>
                    )}
                </nav>

                {/* ── Right side ── */}
                <div className="flex items-center gap-3 shrink-0">
                    {user ? (
                        <>
                            <NotificationCenter />
                            <div className="hidden sm:flex flex-col items-end leading-none gap-0.5">
                                <span className="text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                                    {user.name || 'User'}
                                </span>
                                <RoleBadge role={role} memberships={memberships} />
                            </div>
                            <LogoutButton />
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header >
    );
}

/* ── Subcomponents ─────────────────────────────────────── */

function NavLink({
    href, label, icon, accent
}: {
    href: string;
    label: string;
    icon?: React.ReactNode;
    accent?: boolean;
}) {
    return (
        <Link
            href={href}
            className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                accent
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
            ].join(' ')}
        >
            {icon && <span aria-hidden="true">{icon}</span>}
            {label}
        </Link>
    );
}

function RoleBadge({ role, memberships }: { role: string; memberships: any[] }) {
    const map: Record<string, { label: string; cls: string }> = {
        ADMIN: { label: 'Super Admin', cls: 'text-purple-700 bg-purple-50 border-purple-200' },
        ORG_OWNER: { label: 'Org Owner', cls: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
        TEACHER: { label: 'Teacher', cls: 'text-green-700 bg-green-50 border-green-200' },
    };

    if (role === 'USER' && memberships.length > 0) {
        return <RolePill label="Org Student" cls="text-blue-700 bg-blue-50 border-blue-200" />;
    }
    const cfg = map[role];
    if (!cfg) return <RolePill label="Individual" cls="text-gray-600 bg-gray-50 border-gray-200" />;
    return <RolePill label={cfg.label} cls={cfg.cls} />;
}

function RolePill({ label, cls }: { label: string; cls: string }) {
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>
            {label}
        </span>
    );
}
