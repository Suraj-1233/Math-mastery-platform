
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // 1. Allow API routes and static asset paths to pass through natively
            if (nextUrl.pathname.startsWith('/api/') || nextUrl.pathname.includes('.')) {
                return true;
            }

            // 2. Define Public Routes
            const publicRoutes = ['/', '/login', '/signup'];
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

            if (isPublicRoute) {
                // If the user tries to go to login or signup while ALREADY logged in, redirect them home
                if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                return true;
            }

            // 3. For ALL other routes (Dashboard, Premium Content), demand authentication
            if (!isLoggedIn) {
                const loginUrl = new URL('/login', nextUrl);
                // Dynamically inject our requirement message back to the client interface
                loginUrl.searchParams.set('message', 'Please login to access this feature.');
                return Response.redirect(loginUrl);
            }

            return true;
        },
        session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            // Add role to session if needed (requires extending types)
            return session;
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
