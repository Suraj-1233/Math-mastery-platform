import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userRole = (auth?.user as any)?.role;
            const orgId = (auth?.user as any)?.organizationId;
            const memberships = (auth?.user as any)?.memberships || [];
            const path = nextUrl.pathname;

            // ── 1. Always allow API and static files ──────────────────────
            if (path.startsWith('/api/') || path.includes('.')) {
                return true;
            }

            // ── 2. Public pages (login / signup / home) ───────────────────
            const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

            if (path === '/') {
                if (isLoggedIn) {
                    return Response.redirect(new URL(getHomeForRole(userRole, memberships, orgId), nextUrl));
                }
                return Response.redirect(new URL('/login', nextUrl));
            }

            if (publicRoutes.includes(path)) {
                // Already logged in → smart role redirect
                if (isLoggedIn && (path === '/login' || path === '/signup')) {
                    return Response.redirect(new URL(getHomeForRole(userRole, memberships, orgId), nextUrl));
                }
                return true;
            }

            // ── 3. Must be logged in for everything below ─────────────────
            if (!isLoggedIn) {
                const url = new URL('/login', nextUrl);
                url.searchParams.set('callbackUrl', nextUrl.toString());
                return Response.redirect(url);
            }

            // ── 4. ADMIN-only routes ──────────────────────────────────────
            if (path.startsWith('/admin')) {
                if (!['ADMIN', 'ORG_OWNER', 'TEACHER'].includes(userRole)) {
                    return Response.redirect(new URL(getHomeForRole(userRole, memberships, orgId), nextUrl));
                }

                // Super Admin Only areas within /admin
                if (path.startsWith('/admin/settings') || path.startsWith('/admin/b2b')) {
                    if (userRole !== 'ADMIN') {
                        return Response.redirect(new URL(getHomeForRole(userRole, memberships, orgId), nextUrl));
                    }
                }

                return true;
            }

            // ── 5. ORG-only routes ────────────────────────────────────────
            if (path.startsWith('/org')) {
                const hasOrgAccess = (orgId && orgId !== 'personal') || ['ORG_OWNER', 'TEACHER'].includes(userRole);
                if (!hasOrgAccess) {
                    return Response.redirect(new URL('/questions', nextUrl));
                }

                // If owner or teacher, unified dashboard is in /admin
                if (['ORG_OWNER', 'TEACHER'].includes(userRole)) {
                    return Response.redirect(new URL('/admin', nextUrl));
                }

                return true;
            }

            // ── 6. ORG CONTEXT STRICT LOCK ────────────────────────────────
            // If user has selected an org, strictly block all personal routes
            if (orgId && orgId !== 'personal') {
                const activeOrgSlug = memberships.find((m: any) => m.organization?.id === orgId || m.organizationId === orgId)?.organization?.slug;
                const orgDashboardUrl = activeOrgSlug ? `/org/${activeOrgSlug}/dashboard` : '/dashboard';

                const isPersonalRoute =
                    ['/questions', '/pyqs', '/leaderboard'].some(r => path.startsWith(r)) ||
                    path === '/dashboard' ||
                    path === '/workspace' ||
                    path === '/tests'; // exact match block for test listing

                if (isPersonalRoute) {
                    return Response.redirect(new URL(orgDashboardUrl, nextUrl));
                }
            } else {
                // If NO orgId, user is in normal/personal mode or Super Admin

                // Block normal-user-only routes for Admins
                const publicOnlyRoutes = ['/questions', '/pyqs', '/leaderboard'];
                const isPublicOnlyRoute = publicOnlyRoutes.some(r => path.startsWith(r));

                if (isPublicOnlyRoute && userRole === 'ADMIN') {
                    return Response.redirect(new URL('/admin', nextUrl));
                }

                // ── 6b. /tests — org students can access individual test pages only
                if (path.startsWith('/tests')) {
                    const isOrgMember = (orgId && orgId !== 'personal') && userRole === 'USER';
                    // Block org students from the /tests listing page (they use org dashboard)
                    // But allow /tests/[id] and /tests/[id]/result
                    if (isOrgMember && path === '/tests') {
                        return Response.redirect(new URL('/org/dashboard', nextUrl));
                    }
                }

                // If user has multiple orgs but no orgId selected yet, force to workspace
                if (path === '/dashboard' && memberships.length > 0 && orgId !== 'personal') {
                    // Note: Here if they have memberships, they MUST pick an org context 
                    // via workspace, which means "Personal mode" is effectively blocked for org users
                    // if they land on /dashboard directly without a role assignment that lets them through.
                    return Response.redirect(new URL('/workspace', nextUrl));
                }
            }

            return true;
        },

        jwt({ token, user, trigger, session }) {
            if (user) {
                token.sub = user.id;
                token.role = (user as any).role;
                token.memberships = (user as any).memberships || [];
                // No default orgId on login
            }
            if (trigger === 'update' && session?.organizationId !== undefined) {
                token.organizationId = session.organizationId;
            }
            return token;
        },

        session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                (session.user as any).role = token.role;
                (session.user as any).memberships = token.memberships || [];
                (session.user as any).organizationId = token.organizationId ?? null;
            }
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;

export function getHomeForRole(role: string, memberships: any[] = [], orgId?: string | null): string {
    if (role === 'ADMIN') {
        return '/admin';
    }
    if (memberships && memberships.length > 0) {
        if (orgId === 'personal') {
            return '/dashboard'; // Let them go to personal dashboard
        }
        if (orgId && orgId !== 'personal') {
            // Find slug
            const activeOrg = memberships.find((m: any) => m.organization?.id === orgId || m.organizationId === orgId);
            if (activeOrg) {
                return `/org/${activeOrg.organization.slug}/dashboard`;
            }
        }
        return '/workspace'; // Force workspace selector
    }
    return '/dashboard'; // normal individual user
}
