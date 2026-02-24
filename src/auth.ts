
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // Ideally use bcryptjs or similar (need to install)

// Need to install bcryptjs
// npm install bcryptjs
// npm install -D @types/bcryptjs

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                memberships: {
                    include: { organization: { select: { id: true, name: true, slug: true } } }
                }
            }
        });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                if (!user.email) return false;

                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email },
                        include: {
                            memberships: {
                                include: { organization: { select: { id: true, name: true, slug: true } } }
                            }
                        }
                    });

                    if (!existingUser) {
                        // Create a new user for Google login
                        const newUser = await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name || 'Google User',
                                password: '',
                                role: 'USER',
                            },
                            include: { memberships: true }
                        });
                        user.id = newUser.id;
                        (user as any).role = newUser.role;
                        (user as any).memberships = newUser.memberships;
                    } else {
                        user.id = existingUser.id;
                        (user as any).role = existingUser.role;
                        (user as any).memberships = (existingUser as any).memberships;
                        (user as any).needsPasswordChange = (existingUser as any).needsPasswordChange ?? false;
                    }
                    return true;
                } catch (error) {
                    console.error('Error during Google sign-in mapping:', error);
                    return false;
                }
            }
            return true; // allow credentials sign-in
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.sub = user.id;
                token.role = (user as any).role;
                token.memberships = (user as any).memberships;
                token.needsPasswordChange = (user as any).needsPasswordChange;

                console.log("🛠️ [auth.ts - jwt] User Object Memberships:", (user as any).memberships);

                // We no longer set a default organizationId. 
                // The user starts in Personal mode or selects it at /workspace.
            }

            // Handle manual organization switch (if update() is called)
            if (trigger === 'update' && session?.organizationId !== undefined) {
                token.organizationId = session.organizationId;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub as string;
                (session.user as any).role = token.role;
                (session.user as any).memberships = token.memberships;
                (session.user as any).needsPasswordChange = token.needsPasswordChange;
                (session.user as any).organizationId = token.organizationId;
            }
            return session;
        }

    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password || '');
                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
});
