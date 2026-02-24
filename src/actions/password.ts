
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generatePasswordResetToken, getPasswordResetTokenByToken, deletePasswordResetToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/lib/mail';

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

const ResetPasswordSchema = z.object({
    password: z.string().min(6),
    token: z.string(),
});

export async function forgotPassword(values: z.infer<typeof ForgotPasswordSchema>) {
    const validatedFields = ForgotPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid email!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (!existingUser) {
        // Return success even if user doesn't exist (security: avoid email enumeration)
        return { success: "If an account exists with this email, a reset link has been sent." };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    if (!passwordResetToken) {
        return { error: "Failed to generate token." };
    }

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset email sent!" };
}

export async function resetPassword(values: z.infer<typeof ResetPasswordSchema>, token?: string | null) {
    if (!token) {
        return { error: "Missing token!" };
    }

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid password!" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
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

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use parameterized raw SQL (Prisma client not regenerated yet)
    await (prisma as any).$executeRawUnsafe(
        `UPDATE User SET password = ? WHERE id = ?`,
        hashedPassword,
        existingUser.id
    );

    // Invalidate the token after use
    await deletePasswordResetToken(existingToken.id);

    return { success: "Password updated!" };
}
