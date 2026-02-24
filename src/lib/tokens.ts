
import { randomUUID } from 'crypto';
import prisma from './prisma';

// ─────────────────────────────────────────
//  PASSWORD RESET TOKEN
// ─────────────────────────────────────────

export const generatePasswordResetToken = async (email: string) => {
    const token = randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    try {
        await (prisma as any).$executeRawUnsafe(
            `DELETE FROM PasswordResetToken WHERE email = ?`,
            email
        );

        const id = randomUUID();
        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO PasswordResetToken (id, email, token, expires) VALUES (?, ?, ?, ?)`,
            id, email, token, expires.toISOString()
        );

        return { email, token, expires };
    } catch (error) {
        console.error("Password reset token generation error:", error);
        return null;
    }
}

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const tokens = await (prisma as any).$queryRawUnsafe(
            `SELECT * FROM PasswordResetToken WHERE token = ? LIMIT 1`,
            token
        ) as any[];

        return tokens[0] || null;
    } catch {
        return null;
    }
}

export const deletePasswordResetToken = async (id: string) => {
    try {
        await (prisma as any).$executeRawUnsafe(
            `DELETE FROM PasswordResetToken WHERE id = ?`,
            id
        );
    } catch {
        // silently fail
    }
}

// ─────────────────────────────────────────
//  EMAIL VERIFICATION TOKEN (6-digit OTP)
// ─────────────────────────────────────────

export const generateVerificationToken = async (email: string) => {
    // Use cryptographically random 6-digit OTP
    const array = new Uint32Array(1);
    if (typeof globalThis.crypto !== 'undefined') {
        globalThis.crypto.getRandomValues(array);
    } else {
        const { randomFillSync } = await import('crypto');
        randomFillSync(array);
    }
    const token = (100000 + (array[0] % 900000)).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    try {
        await (prisma as any).$executeRawUnsafe(
            `DELETE FROM VerificationToken WHERE email = ?`,
            email
        );

        const id = randomUUID();
        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO VerificationToken (id, email, token, expires) VALUES (?, ?, ?, ?)`,
            id, email, token, expires.toISOString()
        );

        return { email, token, expires };
    } catch (error) {
        console.error("Verification token generation error:", error);
        return null;
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const tokens = await (prisma as any).$queryRawUnsafe(
            `SELECT * FROM VerificationToken WHERE email = ? LIMIT 1`,
            email
        ) as any[];

        return tokens[0] || null;
    } catch {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const tokens = await (prisma as any).$queryRawUnsafe(
            `SELECT * FROM VerificationToken WHERE token = ? LIMIT 1`,
            token
        ) as any[];

        return tokens[0] || null;
    } catch {
        return null;
    }
}

export const deleteVerificationToken = async (id: string) => {
    try {
        await (prisma as any).$executeRawUnsafe(
            `DELETE FROM VerificationToken WHERE id = ?`,
            id
        );
    } catch {
        // silently fail
    }
}
