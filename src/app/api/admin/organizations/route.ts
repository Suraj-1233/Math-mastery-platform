import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { generateSlug } from '@/lib/utils/slug';

async function checkAdmin() {
    const session = await auth();
    return !!(session && (session.user as any)?.role === 'ADMIN');
}

// GET all organizations
export async function GET() {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const orgs = await prisma.organization.findMany({
            include: { memberships: { select: { id: true } } },
            orderBy: { createdAt: 'desc' },
        });
        const enriched = orgs.map((o: any) => ({ ...o, memberCount: o.memberships.length }));
        return NextResponse.json(enriched);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// POST create organization
export async function POST(req: NextRequest) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { name, contactEmail, contactName, contactPhone, plan, maxSeats, status, notes, logoUrl } = body;

        if (!name || !contactEmail) {
            return NextResponse.json({ error: 'Name and contact email are required' }, { status: 400 });
        }

        const slug = generateSlug(name);

        const org = await prisma.organization.create({
            data: {
                name,
                slug,
                contactEmail,
                contactName,
                contactPhone,
                plan: plan || 'FREE',
                maxSeats: maxSeats || 50,
                status: status || 'ACTIVE',
                notes,
                logoUrl
            },
        });
        return NextResponse.json(org, { status: 201 });
    } catch (e: any) {
        if (e.code === 'P2002') return NextResponse.json({ error: 'An organization with this email or slug already exists' }, { status: 409 });
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
