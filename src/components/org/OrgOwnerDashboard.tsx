'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Users, BookOpen, FileQuestion, BarChart2, TrendingUp,
    GraduationCap, Building2, Award, ChevronRight, Zap,
    Crown, UserCheck
} from 'lucide-react';

type OrgTab = 'overview' | 'teachers' | 'students' | 'tests' | 'analytics';

export default function OrgOwnerDashboard({ orgData }: { orgData: any }) {
    const { stats, tests, attempts, teachers, students } = orgData;
    const [tab, setTab] = useState<OrgTab>('overview');

    const tabs: { id: OrgTab; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: 'Overview', icon: BarChart2 },
        { id: 'teachers', label: 'Teachers', icon: GraduationCap },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'tests', label: 'Tests', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded-full">Organization Owner</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Organization Control Center</h1>
                    <p className="text-muted mt-1 font-medium">Full visibility over your institution's activity, teachers, and students.</p>
                </div>
                <Link href="/admin/users" className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-wide">
                    <Users className="w-4 h-4" /> Manage Members
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', sub: `${stats.teacherCount} teachers, ${stats.studentCount} students` },
                    { label: 'Total Tests', value: stats.totalTests, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10', sub: `${stats.activeTests} live now` },
                    { label: 'Total Questions', value: stats.totalQuestions, icon: FileQuestion, color: 'text-green-500', bg: 'bg-green-500/10', sub: 'Across all teachers' },
                    { label: 'Avg Score', value: stats.avgScore, icon: Award, color: 'text-orange-500', bg: 'bg-orange-500/10', sub: `${stats.totalAttempts} submissions` },
                ].map(card => (
                    <div key={card.label} className="bg-surface border border-border rounded-2xl p-5 group hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-3 rounded-xl ${card.bg} group-hover:rotate-12 transition-transform`}>
                                <card.icon className={`w-5 h-5 ${card.color}`} />
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted">{card.label}</p>
                        <p className="text-2xl font-black mt-1">{card.value}</p>
                        <p className="text-[10px] text-muted mt-1">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted-light/20 border border-border rounded-2xl p-1 overflow-x-auto">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wide whitespace-nowrap transition-all ${tab === t.id ? 'bg-surface shadow text-foreground' : 'text-muted hover:text-foreground'}`}
                    >
                        <t.icon className="w-3.5 h-3.5" />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* OVERVIEW */}
            {tab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-surface border border-border rounded-3xl p-6">
                        <h3 className="font-black text-base mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" /> Live Tests
                        </h3>
                        <div className="space-y-3">
                            {tests.filter((t: any) => t.status === 'LIVE').slice(0, 5).map((test: any) => (
                                <div key={test.id} className="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                                    <div>
                                        <p className="text-sm font-black">{test.title}</p>
                                        <p className="text-[10px] text-muted font-bold">by {test.createdBy?.name} • {test._count.testAttempts} attempts</p>
                                    </div>
                                    <Link href={`/admin/tests/${test.id}/report`} className="text-[10px] font-black text-green-600 hover:underline">VIEW REPORT →</Link>
                                </div>
                            ))}
                            {tests.filter((t: any) => t.status === 'LIVE').length === 0 && (
                                <p className="text-sm text-muted text-center py-6">No live tests right now.</p>
                            )}
                        </div>
                    </div>
                    <div className="bg-surface border border-border rounded-3xl p-6">
                        <h3 className="font-black text-base mb-4 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-primary" /> Recent Attempts
                        </h3>
                        <div className="space-y-3">
                            {attempts.slice(0, 6).map((attempt: any) => (
                                <div key={attempt.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-black text-primary">
                                            {(attempt.user?.name || 'U').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">{attempt.user?.name}</p>
                                            <p className="text-[10px] text-muted">{attempt.test?.title}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black">{attempt.score.toFixed(1)}</p>
                                        <p className="text-[10px] text-muted">{attempt.accuracy.toFixed(0)}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TEACHERS */}
            {tab === 'teachers' && (
                <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h2 className="font-black text-lg">Teaching Staff ({teachers.length})</h2>
                        <Link href="/admin/users" className="text-xs font-black text-primary hover:underline">+ Add Teacher</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted-light/10">
                                <tr className="text-[10px] font-black uppercase tracking-widest text-muted">
                                    <th className="px-6 py-4">Teacher</th>
                                    <th className="px-6 py-4">Tests Created</th>
                                    <th className="px-6 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {teachers.map((teacher: any) => (
                                    <tr key={teacher.id} className="hover:bg-muted-light/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-sm font-black text-green-600">
                                                    {(teacher.name || 'T').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black">{teacher.name}</p>
                                                    <p className="text-[10px] text-muted">{teacher.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-3.5 h-3.5 text-muted" />
                                                <span className="text-sm font-black">{teacher._count.createdTests}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-muted font-bold">{new Date(teacher.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                                        </td>
                                    </tr>
                                ))}
                                {teachers.length === 0 && (
                                    <tr><td colSpan={3} className="px-6 py-12 text-center text-muted text-sm">No teachers in your organization yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* STUDENTS */}
            {tab === 'students' && (
                <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h2 className="font-black text-lg">Student Roster ({students.length})</h2>
                        <Link href="/admin/users" className="text-xs font-black text-primary hover:underline">+ Enroll Student</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted-light/10">
                                <tr className="text-[10px] font-black uppercase tracking-widest text-muted">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Tests Attempted</th>
                                    <th className="px-6 py-4">Enrolled</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {students.map((student: any) => (
                                    <tr key={student.id} className="hover:bg-muted-light/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-sm font-black text-blue-600">
                                                    {(student.name || 'S').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black">{student.name}</p>
                                                    <p className="text-[10px] text-muted">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <UserCheck className="w-3.5 h-3.5 text-muted" />
                                                <span className="text-sm font-black">{student._count.testAttempts}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-muted font-bold">{new Date(student.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr><td colSpan={3} className="px-6 py-12 text-center text-muted text-sm">No students enrolled yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TESTS */}
            {tab === 'tests' && (
                <div className="space-y-4">
                    {tests.map((test: any) => (
                        <div key={test.id} className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${test.status === 'LIVE' ? 'bg-green-500/10 text-green-600 border-green-200' : test.status === 'ARCHIVED' ? 'bg-muted text-muted border-border' : 'bg-yellow-500/10 text-yellow-600 border-yellow-200'}`}>
                                    {test.status}
                                </div>
                                <div>
                                    <p className="font-black">{test.title}</p>
                                    <p className="text-xs text-muted">by {test.createdBy?.name} • {test.questionCount} questions • {test.duration}min</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-black">{test._count.testAttempts}</p>
                                    <p className="text-[10px] text-muted uppercase">Submissions</p>
                                </div>
                                <Link href={`/admin/tests/${test.id}/report`} className="p-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all">
                                    <BarChart2 className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {tests.length === 0 && <div className="text-center py-16 text-muted">No tests created in your organization.</div>}
                </div>
            )}

            {/* ANALYTICS */}
            {tab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-surface border border-border rounded-3xl p-6">
                        <h3 className="font-black text-base mb-6">Teacher Performance</h3>
                        <div className="space-y-4">
                            {teachers.map((teacher: any) => {
                                const teacherAttempts = attempts.filter((a: any) => a.test?.createdBy?.name === teacher.name);
                                const avgAcc = teacherAttempts.length > 0
                                    ? (teacherAttempts.reduce((s: number, a: any) => s + a.accuracy, 0) / teacherAttempts.length).toFixed(0)
                                    : 0;
                                return (
                                    <div key={teacher.id} className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-xs font-black text-green-600 flex-shrink-0">
                                            {(teacher.name || 'T').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-black">{teacher.name}</span>
                                                <span className="text-xs text-muted">{avgAcc}% avg</span>
                                            </div>
                                            <div className="w-full h-2 bg-muted-light/30 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${Number(avgAcc)}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-3xl p-6">
                        <h3 className="font-black text-base mb-6">Top Students by Accuracy</h3>
                        <div className="space-y-4">
                            {(() => {
                                const studentMap: Record<string, { name: string; total: number; count: number }> = {};
                                attempts.forEach((a: any) => {
                                    const id = a.user?.email;
                                    if (!id) return;
                                    if (!studentMap[id]) studentMap[id] = { name: a.user.name || a.user.email, total: 0, count: 0 };
                                    studentMap[id].total += a.accuracy;
                                    studentMap[id].count += 1;
                                });
                                return Object.entries(studentMap)
                                    .map(([id, s]) => ({ ...s, avg: (s.total / s.count) }))
                                    .sort((a, b) => b.avg - a.avg)
                                    .slice(0, 6)
                                    .map((student, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <span className="text-[10px] font-black text-muted w-4">{i + 1}</span>
                                            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-xs font-black text-blue-600">
                                                {student.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs font-black">{student.name}</span>
                                                    <span className="text-xs text-muted">{student.avg.toFixed(0)}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-muted-light/30 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${student.avg}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    ));
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
