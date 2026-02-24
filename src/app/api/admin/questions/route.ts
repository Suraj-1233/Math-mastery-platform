import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ROLES, CONTENT_CATEGORY } from '@/lib/constants';
import { verifyOrgAccess } from '@/lib/auth-utils';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const check = await verifyOrgAccess(slug, [ROLES.ADMIN, ROLES.ORG_OWNER, ROLES.TEACHER]);
    if (!check.authorized) return NextResponse.json({ error: check.error }, { status: check.status });

    try {
        const where: any = {};

        if (check.role === ROLES.TEACHER) {
            // Teachers only see what they created
            where.createdById = check.user.id;
        } else {
            // Owners/Admins see everything created within their organization
            where.organizationId = check.orgId;
        }

        const questions = await prisma.question.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return NextResponse.json(questions);
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
        const body = await req.json();
        const {
            text, textHi, subject, topic, difficulty,
            examType, options, correctOptionIndex,
            explanation, explanationHi, category
        } = body;

        const question = await prisma.question.create({
            data: {
                text,
                textHi,
                subject,
                topic,
                difficulty,
                examType,
                options: typeof options === 'string' ? options : JSON.stringify(options),
                correctOptionIndex,
                explanation,
                explanationHi,
                organizationId: check.orgId,
                createdById: check.user.id,
                isPublic: false, // Platform questions from org context stay private by default
                category: category || CONTENT_CATEGORY.BOTH,
            },
        });

        return NextResponse.json(question);
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
