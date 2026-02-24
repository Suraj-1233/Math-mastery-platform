import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

async function checkAdmin() {
    const session = await auth();
    return !!(session && (session.user as any)?.role === 'ADMIN');
}

// PUT update organization
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const body = await req.json();
        const org = await prisma.organization.update({ where: { id }, data: body });
        return NextResponse.json(org);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// DELETE organization
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        // Remove org from members first
        await prisma.user.updateMany({
            where: { organizationId: id },
            data: { organizationId: null },
        });
        await prisma.organization.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// PATCH assign/remove member
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const { userId, action } = await req.json(); // action: 'add' | 'remove'

        if (action === 'add') {
            await prisma.user.update({ where: { id: userId }, data: { organizationId: id } });
        } else {
            await prisma.user.update({ where: { id: userId }, data: { organizationId: null } });
        }
        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
