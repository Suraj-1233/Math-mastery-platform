
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
                        where: { email: user.email }
                    });

                    if (!existingUser) {
                        // Create a new user for Google login
                        const newUser = await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name || 'Google User',
                                // Note: We leave password null or empty since they use OAuth
                                password: '',
                            }
                        });
                        user.id = newUser.id;
                    } else {
                        user.id = existingUser.id;
                    }
                    return true;
                } catch (error) {
                    console.error('Error during Google sign-in mapping:', error);
                    return false;
                }
            }
            return true; // allow credentials sign-in
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
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

                    const passwordsMatch = await bcrypt.compare(password, user.password || ''); // handle null password
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
