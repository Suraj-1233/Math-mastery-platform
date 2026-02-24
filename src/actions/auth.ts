
'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/validations/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { generateVerificationToken, getVerificationTokenByToken, deleteVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function googleSignIn() {
    await signIn('google', { redirectTo: '/' });
}

export async function logout() {
    await signOut({ redirectTo: '/login' });
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const data = Object.fromEntries(formData.entries());

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
        return 'Invalid fields';
    }

    const { email, password } = parsed.data;

    try {
        await signIn('credentials', { email, password, redirectTo: '/' });
    } catch (error) {
        if (error instanceof AuthError) {
            // Detailed logging for debugging
            console.error('🔴 AuthError type:', error.type);
            console.error('🔴 AuthError cause:', (error as any).cause);
            console.error('🔴 AuthError message:', error.message);
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    const data = Object.fromEntries(formData.entries());
    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
        return 'Invalid input.';
    }

    const { name, email, password } = parsed.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return 'User already exists.';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        // Send OTP verification email
        const verificationToken = await generateVerificationToken(email);
        if (verificationToken) {
            await sendVerificationEmail(verificationToken.email, verificationToken.token);
        }

    } catch (error) {
        console.error("Signup error:", error);
        return 'Failed to create user.';
    }

    redirect('/login?message=verify-email');
}

export async function updatePassword(newPassword: string) {
    const { auth } = await import('@/auth');
    const session = await auth();

    if (!session?.user?.email) {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Use raw SQL because Prisma client is not regenerated yet
        await (prisma as any).$executeRawUnsafe(
            `UPDATE User SET password = ?, needsPasswordChange = 0 WHERE email = ?`,
            hashedPassword,
            session.user.email
        );

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update password' };
    }
}

export async function verifyEmail(token: string) {
    if (!token || token.length !== 6) {
        return { error: "Invalid verification code!" };
    }

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: existingToken.email }
    });

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    // Mark email as verified using parameterized query
    await (prisma as any).$executeRawUnsafe(
        `UPDATE User SET emailVerified = ? WHERE id = ?`,
        new Date().toISOString(),
        existingUser.id
    );

    // Clean up the used token
    await deleteVerificationToken(existingToken.id);

    return { success: "Email verified!" };
}
