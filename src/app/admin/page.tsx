import React from 'react';
import {
    Users,
    FileQuestion,
    BookOpen,
    TrendingUp,
    Clock,
    FileText,
    Building2,
    GraduationCap
} from 'lucide-react';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { ROLES } from '@/lib/constants';

async function getStats(user: any) {
    const role = user.role;
    const orgId = user.organizationId;
    const userId = user.id;

    if (role === ROLES.ADMIN) {
        const [userCount, questionCount, testCount, orgCount] = await Promise.all([
            prisma.user.count(),
            prisma.question.count(),
            prisma.test.count(),
            prisma.organization.count()
        ]);
        return {
            cards: [
                { name: 'Total Students', value: userCount, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { name: 'Total Questions', value: questionCount, icon: FileQuestion, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { name: 'Mock Tests', value: testCount, icon: BookOpen, color: 'text-green-500', bg: 'bg-green-500/10' },
                { name: 'Organizations', value: orgCount, icon: Building2, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            ]
        };
    }

    if (role === ROLES.ORG_OWNER) {
        const [memberCount, questionCount, testCount] = await Promise.all([
            prisma.orgMembership.count({ where: { organizationId: orgId } }),
            prisma.question.count({ where: { organizationId: orgId } }),
            prisma.test.count({ where: { organizationId: orgId } })
        ]);
        return {
            cards: [
                { name: 'Org Members', value: memberCount, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { name: 'Org Questions', value: questionCount, icon: FileQuestion, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { name: 'Org Tests', value: testCount, icon: BookOpen, color: 'text-green-500', bg: 'bg-green-500/10' },
                { name: 'Usage', value: `${Math.round((memberCount / 50) * 100)}%`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            ]
        };
    }

    if (role === ROLES.TEACHER) {
        const [myQuestions, myTests, attempts] = await Promise.all([
            prisma.question.count({ where: { createdById: userId } }),
            prisma.test.count({ where: { createdById: userId } }),
            prisma.userTestAttempt.count({ where: { test: { createdById: userId } } })
        ]);
        return {
            cards: [
                { name: 'My Questions', value: myQuestions, icon: FileQuestion, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { name: 'My Tests', value: myTests, icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { name: 'Total Submissions', value: attempts, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
                { name: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            ]
        };
    }

    return { cards: [] };
}

import { getOrgDashboardData } from '@/actions/org-dashboard';
import OrgOwnerDashboard from '@/components/org/OrgOwnerDashboard';
import TeacherDashboard from '@/components/org/TeacherDashboard';

export default async function AdminDashboard() {
    const session = await auth();
    const userRole = (session?.user as any)?.role || ROLES.USER;

    // If Org Owner or Teacher, render the rich dashboard directly here inside /admin layout
    if (userRole === ROLES.ORG_OWNER || userRole === ROLES.TEACHER) {
        const user = session?.user as any;
        const memberships = user.memberships || [];
        const orgData = await getOrgDashboardData(user.id, user.organizationId, user.role);
        if (!orgData) return <div>Failed to load dashboard data.</div>;

        return (
            <div className="max-w-7xl mx-auto">
                {userRole === ROLES.ORG_OWNER && <OrgOwnerDashboard orgData={orgData} />}
                {userRole === ROLES.TEACHER && <TeacherDashboard orgData={orgData} />}
            </div>
        );
    }

    // Otherwise render the Super Admin generic dashboard
    const { cards } = await getStats(session?.user);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-outfit">
                        {userRole === ROLES.ADMIN && 'Super Admin Panel'}
                        {userRole === ROLES.ORG_OWNER && 'Organization Control'}
                        {userRole === ROLES.TEACHER && 'Teacher Workspace'}
                    </h1>
                    <p className="text-muted mt-1">
                        {userRole === ROLES.ADMIN && 'Global overview of all systems and users.'}
                        {userRole === ROLES.ORG_OWNER && 'Manage your students and institutional content.'}
                        {userRole === ROLES.TEACHER && 'Manage your questions and review student progress.'}
                    </p>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-muted-light border-2 border-surface flex items-center justify-center text-xs font-bold text-muted">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-surface flex items-center justify-center text-[10px] font-black text-primary">
                        +12
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.name} className="p-6 bg-surface border border-border rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-muted uppercase tracking-widest">{card.name}</p>
                                <p className="text-3xl font-black mt-1 group-hover:scale-110 transition-transform origin-left">{card.value}</p>
                            </div>
                            <div className={cn("p-4 rounded-2xl transition-all group-hover:rotate-12", card.bg)}>
                                <card.icon className={cn("w-6 h-6", card.color)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
                            <Clock className="w-6 h-6 text-primary" />
                            Recent Activity
                        </h2>
                        <button className="text-xs font-bold text-primary hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-muted-light/30 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-muted" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium"> New batch of <span className="text-primary font-bold">Percentage</span> questions uploaded</p>
                                    <p className="text-xs text-muted mt-1">Successfully processed via OCR • 2 hours ago</p>
                                </div>
                                <div className="text-[10px] font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                                    COMPLETED
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-primary p-8 rounded-3xl text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
                        <h2 className="text-lg font-black mb-2 uppercase tracking-tighter">Quick Actions</h2>
                        <p className="text-sm opacity-80 mb-6">Create content instantly.</p>
                        <div className="space-y-3">
                            <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center gap-3 transition-all text-sm font-bold backdrop-blur-md">
                                <FileQuestion className="w-5 h-5" />
                                Add Question
                            </button>
                            <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center gap-3 transition-all text-sm font-bold backdrop-blur-md">
                                <FileText className="w-5 h-5" />
                                Create Test
                            </button>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-3xl p-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-muted mb-4">Quick Stats</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1.5">
                                    <span>System Health</span>
                                    <span className="text-green-600">99.9%</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted-light/30 rounded-full overflow-hidden">
                                    <div className="w-[99.9%] h-full bg-green-500" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1.5">
                                    <span>OCR Accuracy</span>
                                    <span className="text-blue-600">94.5%</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted-light/30 rounded-full overflow-hidden">
                                    <div className="w-[94.5%] h-full bg-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
