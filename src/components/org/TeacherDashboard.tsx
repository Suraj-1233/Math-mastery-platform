'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BookOpen, FileQuestion, Users, BarChart2, Plus, TrendingUp,
    Clock, CheckCircle2, Eye, ChevronRight, Zap, PenLine
} from 'lucide-react';

export default function TeacherDashboard({ orgData }: { orgData: any }) {
    const { stats, myTests, recentAttempts } = orgData;
    const [activeTab, setActiveTab] = useState<'tests' | 'results'>('tests');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Teacher Workspace</h1>
                    <p className="text-muted mt-1 font-medium">Manage your tests and monitor student performance in real-time.</p>
                </div>
                <Link
                    href="/admin/tests"
                    className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-wide"
                >
                    <Plus className="w-4 h-4" />
                    Create Test
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'My Tests', value: stats.myTests, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Active Tests', value: stats.activeTests, icon: Zap, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'My Questions', value: stats.myQuestions, icon: FileQuestion, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Total Submissions', value: stats.totalSubmissions, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                ].map(card => (
                    <div key={card.label} className="bg-surface border border-border rounded-2xl p-5 group hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted">{card.label}</p>
                                <p className="text-2xl font-black mt-1">{card.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${card.bg} group-hover:rotate-12 transition-transform`}>
                                <card.icon className={`w-5 h-5 ${card.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted-light/20 border border-border rounded-2xl p-1 w-fit">
                {(['tests', 'results'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide transition-all ${activeTab === tab ? 'bg-surface shadow text-foreground' : 'text-muted hover:text-foreground'}`}
                    >
                        {tab === 'tests' ? 'My Tests' : 'Submissions'}
                    </button>
                ))}
            </div>

            {activeTab === 'tests' && (
                <div className="space-y-4">
                    {myTests.length === 0 ? (
                        <div className="bg-surface border-2 border-dashed border-border rounded-3xl p-16 text-center">
                            <BookOpen className="w-12 h-12 text-muted mx-auto mb-4" />
                            <p className="font-bold text-lg">No tests created yet</p>
                            <p className="text-muted text-sm mt-1 mb-6">Start by creating your first test for students.</p>
                            <Link href="/admin/tests" className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-black hover:bg-primary/90 transition-all inline-flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Create First Test
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {myTests.map((test: any) => (
                                <div key={test.id} className="bg-surface border border-border rounded-2xl p-5 hover:shadow-lg transition-all group relative overflow-hidden">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${test.status === 'LIVE' ? 'bg-green-500/10 text-green-600 border-green-200' : test.status === 'ARCHIVED' ? 'bg-muted-light/50 text-muted border-border' : 'bg-yellow-500/10 text-yellow-600 border-yellow-200'}`}>
                                            {test.status}
                                        </span>
                                        <span className="text-[10px] text-muted font-bold">{test.type}</span>
                                    </div>
                                    <h3 className="font-black text-base mb-1 line-clamp-2 leading-snug">{test.title}</h3>
                                    <p className="text-xs text-muted mb-4 line-clamp-2">{test.description}</p>
                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center">
                                        <div>
                                            <p className="text-[10px] text-muted font-black uppercase">Questions</p>
                                            <p className="font-black text-sm mt-0.5">{test.questionCount}</p>
                                        </div>
                                        <div className="border-x border-border">
                                            <p className="text-[10px] text-muted font-black uppercase">Duration</p>
                                            <p className="font-black text-sm mt-0.5">{test.duration}m</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted font-black uppercase">Submissions</p>
                                            <p className="font-black text-sm mt-0.5">{test._count.testAttempts}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Link href={`/admin/tests`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-muted-light/30 hover:bg-primary/10 text-foreground hover:text-primary rounded-xl text-xs font-black transition-all">
                                            <PenLine className="w-3 h-3" /> Edit
                                        </Link>
                                        <Link href={`/admin/tests/${test.id}/report`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-black transition-all">
                                            <BarChart2 className="w-3 h-3" /> Report
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'results' && (
                <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="font-black text-lg">Recent Student Submissions</h2>
                        <p className="text-sm text-muted mt-1">All attempts across your tests.</p>
                    </div>
                    {recentAttempts.length === 0 ? (
                        <div className="p-16 text-center">
                            <BarChart2 className="w-10 h-10 text-muted mx-auto mb-3" />
                            <p className="text-muted font-medium">No submissions yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted-light/10">
                                    <tr className="text-[10px] font-black uppercase tracking-widest text-muted">
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Test</th>
                                        <th className="px-6 py-4">Score</th>
                                        <th className="px-6 py-4">Accuracy</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentAttempts.map((attempt: any) => (
                                        <tr key={attempt.id} className="hover:bg-muted-light/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-black">{attempt.user?.name || 'Anonymous'}</p>
                                                <p className="text-[10px] text-muted">{attempt.user?.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium truncate max-w-[150px]">{attempt.test?.title}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-black text-sm">{attempt.score.toFixed(1)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-14 h-1.5 bg-muted-light/30 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${attempt.accuracy}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold">{attempt.accuracy.toFixed(0)}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-muted font-bold">
                                                    {new Date(attempt.startedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
