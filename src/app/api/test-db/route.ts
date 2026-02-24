import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get('email') || 'user@demo.com';
    const password = url.searchParams.get('password') || 'password123';

    try {
        // Test 1: Raw DB connection
        const userCount = await prisma.user.count();

        // Test 2: Find specific user
        const user = await prisma.user.findUnique({ where: { email } });

        // Test 3: Password compare
        let passwordMatch = false;
        if (user?.password) {
            passwordMatch = await bcrypt.compare(password, user.password);
        }

        return NextResponse.json({
            success: true,
            dbConnection: 'OK',
            userCount,
            userFound: !!user,
            userEmail: user?.email,
            userRole: user?.role,
            emailVerified: user?.emailVerified,
            needsPasswordChange: (user as any)?.needsPasswordChange,
            passwordMatch,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack?.split('\n').slice(0, 5),
        }, { status: 500 });
    }
}
