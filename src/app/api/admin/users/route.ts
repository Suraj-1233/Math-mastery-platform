import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { ROLES } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    const url = new URL(req.url);
    const searchRole = url.searchParams.get('role');

    try {
        const memberships = await prisma.orgMembership.findMany({
            where: {
                organizationId: check.orgId,
                role: searchRole || undefined,
                user: {
                    role: { not: ROLES.ADMIN } // Hide platform admins
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        subscriptionStatus: true,
                        createdAt: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        // Flatten the response
        const users = memberships.map(m => ({
            ...m.user,
            role: m.role,
            membershipId: m.id
        }));

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const { name, email, password, role } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Find or create the user first
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: name || null,
                    email,
                    password: hashedPassword,
                    role: ROLES.USER,
                }
            });
        }

        // Create the membership
        const membership = await prisma.orgMembership.upsert({
            where: {
                userId_organizationId: {
                    userId: user.id,
                    organizationId: check.orgId
                }
            },
            update: {
                role: role || ROLES.USER,
                status: 'ACTIVE'
            },
            create: {
                userId: user.id,
                organizationId: check.orgId,
                role: role || ROLES.USER,
                status: 'ACTIVE'
            }
        });

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: membership.role,
            membershipId: membership.id
        }, { status: 201 });
    } catch (error) {
        console.error('Create member error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
