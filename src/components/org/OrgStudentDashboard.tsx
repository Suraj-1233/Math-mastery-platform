'use client';

import React from 'react';
import Link from 'next/link';
import {
    BookOpen, Target, Trophy, Clock, ChevronRight,
    CheckCircle2, AlertCircle, BarChart2, Zap, Lock, EyeOff, CalendarClock
} from 'lucide-react';

export default function OrgStudentDashboard({ orgData }: { orgData: any }) {
    const { stats, assignedTests, orgTests, upcomingTests = [], myAttempts } = orgData;

    const attemptedIds = new Set(myAttempts.map((a: any) => a.testId));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black tracking-tight">My Learning Hub</h1>
                <p className="text-muted mt-1 font-medium">Your personalized exam workspace. All tests from your institution.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Assigned Tests', value: stats.assignedCount, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Available Tests', value: stats.orgTestCount, icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Tests Attempted', value: stats.attemptedCount, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Avg Accuracy', value: `${stats.avgAccuracy}%`, icon: Target, color: 'text-orange-500', bg: 'bg-orange-500/10' },
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Assigned Tests */}
                <div className="bg-surface border border-border rounded-3xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-black text-lg flex items-center gap-2">
                            <div className="w-2 h-5 bg-blue-500 rounded-full" />
                            Assigned to Me
                        </h2>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">{assignedTests.length} TESTS</span>
                    </div>
                    {assignedTests.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl">
                            <BookOpen className="w-8 h-8 text-muted mx-auto mb-2" />
                            <p className="text-sm text-muted font-medium">No tests assigned yet.</p>
                            <p className="text-xs text-muted mt-1">Your teacher will assign tests soon.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {assignedTests.map((a: any) => {
                                const attempted = attemptedIds.has(a.test.id);
                                return (
                                    <div
                                        key={a.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl border border-border transition-all group ${attempted
                                            ? 'bg-green-50/50 border-green-200 cursor-default'
                                            : 'hover:border-primary hover:bg-primary/5 cursor-pointer'
                                            }`}
                                        onClick={() => {
                                            if (!attempted) {
                                                window.location.href = `/tests/${a.test.id}`;
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${attempted ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                                {attempted ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-blue-500" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black">{a.test.title}</p>
                                                <p className="text-[10px] text-muted font-bold">by {a.test.createdBy?.name || 'Teacher'} • {a.test.duration}min • {a.test.totalMarks} marks</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${attempted ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                                {attempted ? 'COMPLETED' : 'PENDING'}
                                            </span>
                                            {!attempted && <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Org Tests Available */}
                <div className="bg-surface border border-border rounded-3xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-black text-lg flex items-center gap-2">
                            <div className="w-2 h-5 bg-purple-500 rounded-full" />
                            Organization Tests
                        </h2>
                        <span className="text-[10px] font-black text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded-full">{orgTests.length} AVAILABLE</span>
                    </div>
                    {orgTests.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl">
                            <AlertCircle className="w-8 h-8 text-muted mx-auto mb-2" />
                            <p className="text-sm text-muted font-medium">No live tests available yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {orgTests.map((test: any) => {
                                const attempted = attemptedIds.has(test.id);
                                return (
                                    <div
                                        key={test.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl border border-border transition-all group ${attempted
                                            ? 'bg-green-50/50 border-green-200 cursor-default'
                                            : 'hover:border-purple-400 hover:bg-purple-500/5 cursor-pointer'
                                            }`}
                                        onClick={() => {
                                            if (!attempted) {
                                                window.location.href = `/tests/${test.id}`;
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${attempted ? 'bg-green-500/10' : 'bg-purple-500/10'}`}>
                                                {attempted ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <BookOpen className="w-4 h-4 text-purple-500" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black">{test.title}</p>
                                                <p className="text-[10px] text-muted font-bold">By {test.createdBy?.name} • {test.duration}min</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {attempted && (
                                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                                                    COMPLETED
                                                </span>
                                            )}
                                            {!attempted && <ChevronRight className="w-4 h-4 text-muted group-hover:text-purple-500 transition-colors" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Tests */}
            {upcomingTests.length > 0 && (
                <div className="bg-surface border border-border rounded-3xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-black text-lg flex items-center gap-2">
                            <div className="w-2 h-5 bg-amber-500 rounded-full" />
                            Upcoming Tests
                        </h2>
                        <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            {upcomingTests.length} SCHEDULED
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {upcomingTests.map((test: any) => {
                            const scheduledDate = new Date(test.scheduledAt);
                            const now = new Date();
                            const diffMs = scheduledDate.getTime() - now.getTime();
                            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                            const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                            let countdown = '';
                            if (diffDays > 0) countdown = `${diffDays}d ${diffHours}h`;
                            else if (diffHours > 0) countdown = `${diffHours}h`;
                            else countdown = 'Soon';

                            return (
                                <div
                                    key={test.id}
                                    className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                                <CalendarClock className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black">{test.title}</p>
                                                <p className="text-[10px] text-muted font-bold">
                                                    By {test.createdBy?.name || 'Teacher'} • {test.duration}min • {test.totalMarks} marks
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-amber-200/50">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-700">
                                            <Clock className="w-3 h-3" />
                                            {scheduledDate.toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </div>
                                        <span className="text-[10px] font-black text-amber-600 bg-amber-500/20 px-2 py-0.5 rounded-full">
                                            🕐 {countdown}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* My Results — respects resultsDisclosed */}
            {myAttempts.length > 0 && (
                <div className="bg-surface border border-border rounded-3xl p-6">
                    <h2 className="font-black text-lg flex items-center gap-2 mb-6">
                        <BarChart2 className="w-5 h-5 text-primary" />
                        My Results
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-muted border-b border-border">
                                    <th className="pb-3 pr-6">Test</th>
                                    <th className="pb-3 pr-6">Score</th>
                                    <th className="pb-3 pr-6">Accuracy</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {myAttempts.slice(0, 8).map((attempt: any) => {
                                    const disclosed = attempt.resultsDisclosed;
                                    return (
                                        <tr
                                            key={attempt.id}
                                            className={`transition-colors ${disclosed ? 'hover:bg-muted-light/10 cursor-pointer' : 'opacity-80'}`}
                                            onClick={() => {
                                                if (disclosed) {
                                                    window.location.href = `/tests/${attempt.testId}/result?attemptId=${attempt.id}`;
                                                }
                                            }}
                                        >
                                            <td className="py-3 pr-6">
                                                <span className="text-sm font-bold">{attempt.test?.title}</span>
                                            </td>
                                            <td className="py-3 pr-6">
                                                {disclosed ? (
                                                    <>
                                                        <span className="font-black text-sm">{attempt.score?.toFixed(1)}</span>
                                                        <span className="text-muted text-xs"> /{attempt.test?.totalMarks}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                                                        <EyeOff className="w-3 h-3" /> Hidden
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 pr-6">
                                                {disclosed ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-muted-light/30 rounded-full overflow-hidden">
                                                            <div className="h-full bg-primary" style={{ width: `${attempt.accuracy}%` }} />
                                                        </div>
                                                        <span className="text-xs font-bold">{attempt.accuracy?.toFixed(1)}%</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                                                        <EyeOff className="w-3 h-3" /> Hidden
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3">
                                                {disclosed ? (
                                                    <span className="text-[10px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                                                        PUBLISHED
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                                                        <Lock className="w-2.5 h-2.5" /> PENDING
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
