
'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/validations/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function googleSignIn() {
    await signIn('google', { redirectTo: '/dashboard' });
}

export async function logout() {
    await signOut({ redirectTo: '/login' });
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const data = Object.fromEntries(formData.entries());

    // Validate fields
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
        return 'Invalid fields';
    }

    const { email, password } = parsed.data;

    try {
        await signIn('credentials', { email, password, redirectTo: '/dashboard' });
    } catch (error) {
        if (error instanceof AuthError) {
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
    } catch {
        return 'Failed to create user.';
    }

    redirect('/login');
}
