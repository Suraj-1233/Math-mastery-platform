'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Plus, BookOpen, Clock, BarChart, Trash2, Pencil, X, Save, Eye, EyeOff, UserCheck } from 'lucide-react';
import Link from 'next/link';
import QuestionSelector from '@/components/admin/QuestionSelector';
import UserAssignModal from '@/components/admin/UserAssignModal';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/lib/constants';

export default function TestsAdminPage() {
    const { data: session } = useSession();
    const params = React.use(useParams() as any) as any;
    const slug = params?.slug;

    const currentUserRole = (session?.user as any)?.role || ROLES.USER;
    const isAdmin = currentUserRole === ROLES.ADMIN;

    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTest, setEditingTest] = useState<any>(null);
    const [assigningTestId, setAssigningTestId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        titleHi: '',
        description: '',
        descriptionHi: '',
        type: 'Topic',
        duration: 60,
        questionCount: 0,
        difficulty: 'MEDIUM',
        totalMarks: 100,
        negativeMarking: 0.25,
        questionIds: [] as string[],
        status: 'DRAFT',
        scheduledAt: '',
        isPublic: false
    });

    useEffect(() => {
        fetchTests();
    }, []);

    useEffect(() => {
        if (editingTest) {
            setFormData({
                title: editingTest.title || '',
                titleHi: editingTest.titleHi || '',
                description: editingTest.description || '',
                descriptionHi: editingTest.descriptionHi || '',
                type: editingTest.type || 'Topic',
                duration: editingTest.duration || 60,
                questionCount: editingTest.questionCount || 0,
                difficulty: editingTest.difficulty || 'MEDIUM',
                totalMarks: editingTest.totalMarks || 100,
                negativeMarking: editingTest.negativeMarking || 0.25,
                questionIds: editingTest.questions?.map((q: any) => q.id) || [],
                status: editingTest.status || 'DRAFT',
                scheduledAt: editingTest.scheduledAt ? new Date(editingTest.scheduledAt).toISOString().slice(0, 16) : '',
                isPublic: editingTest.organizationId === null
            });
        } else {
            setFormData({
                title: '',
                titleHi: '',
                description: '',
                descriptionHi: '',
                type: 'Topic',
                duration: 60,
                questionCount: 0,
                difficulty: 'MEDIUM',
                totalMarks: 100,
                negativeMarking: 0.25,
                questionIds: [],
                status: 'DRAFT',
                scheduledAt: '',
                isPublic: true
            });
        }
    }, [editingTest, isFormOpen]);

    const fetchTests = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/tests`);
            const data = await res.json();
            setTests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch tests:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingTest ? 'PUT' : 'POST';
            const url = editingTest ? `/api/admin/tests/${editingTest.id}` : `/api/admin/tests`;

            const payload = {
                ...formData,
                questionCount: formData.questionIds.length,
                // Prisma connection logic
                questions: {
                    connect: formData.questionIds.map(id => ({ id }))
                }
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchTests();
            }
        } catch (err) {
            console.error('Failed to save test:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this test?')) return;
        try {
            const res = await fetch(`/api/admin/tests/${id}`, { method: 'DELETE' });
            if (res.ok) fetchTests();
        } catch (err) {
            console.error('Failed to delete test:', err);
        }
    };

    const toggleResultsDisclosed = async (testId: string, currentValue: boolean) => {
        try {
            const res = await fetch(`/api/admin/tests/${testId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resultsDisclosed: !currentValue }),
            });
            if (res.ok) fetchTests();
        } catch (err) {
            console.error('Failed to toggle results:', err);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black font-outfit uppercase tracking-tight">
                        {isAdmin ? 'Global Exam Hub' : 'Institutional Tests'}
                    </h1>
                    <p className="text-muted mt-1 font-medium">
                        {isAdmin ? 'Oversee all exam simulations across the platform.' : 'Manage your organization\'s assessments and student drills.'}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingTest(null);
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-outfit uppercase tracking-wider"
                >
                    <Plus className="w-5 h-5" />
                    Create New Test
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test: any) => (
                        <div key={test.id} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                <button
                                    onClick={() => {
                                        setEditingTest(test);
                                        setIsFormOpen(true);
                                    }}
                                    className="p-2 bg-white/80 dark:bg-black/50 hover:bg-primary/20 text-primary rounded-xl backdrop-blur-md shadow-sm"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(test.id)}
                                    className="p-2 bg-white/80 dark:bg-black/50 hover:bg-destructive/20 text-destructive rounded-xl backdrop-blur-md shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <Link
                                    href={`/org/${slug}/admin/tests/${test.id}/report`}
                                    className="p-2 bg-white/80 dark:bg-black/50 hover:bg-emerald-500/20 text-emerald-600 rounded-xl backdrop-blur-md shadow-sm"
                                    title="View Analytics"
                                >
                                    <BarChart className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${test.type === 'Full' ? 'bg-purple-500/10 text-purple-600' :
                                    test.type === 'Speed' ? 'bg-orange-500/10 text-orange-600' : 'bg-blue-500/10 text-blue-600'
                                    } border border-current/20`}>
                                    {test.type}
                                </span>
                                {isAdmin && (
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${test.organizationId ? 'bg-indigo-500/10 text-indigo-600' : 'bg-green-500/10 text-green-600'} border border-current/20`}>
                                        {test.organizationId ? 'Institutional' : 'Platform'}
                                    </span>
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted border border-border px-2 py-0.5 rounded">
                                    {test.difficulty}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-2 leading-snug">{test.title}</h3>
                            <p className="text-sm text-muted line-clamp-2 mb-6 flex-1">{test.description}</p>

                            <div className="grid grid-cols-3 gap-2 py-4 border-t border-border mt-auto">
                                <div className="text-center">
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">Questions</p>
                                    <div className="flex items-center justify-center gap-1 text-sm font-bold">
                                        <BookOpen className="w-3 h-3 text-primary" />
                                        {test.questionCount}
                                    </div>
                                </div>
                                <div className="text-center border-x border-border">
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">Time</p>
                                    <div className="flex items-center justify-center gap-1 text-sm font-bold">
                                        <Clock className="w-3 h-3 text-primary" />
                                        {test.duration}m
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">Marks</p>
                                    <div className="flex items-center justify-center gap-1 text-sm font-bold">
                                        <BarChart className="w-3 h-3 text-primary" />
                                        {test.totalMarks}
                                    </div>
                                </div>
                            </div>

                            {/* Results Disclosure Toggle — only for org tests */}
                            {test.organizationId && (
                                <div className="pt-3 border-t border-border mt-2 space-y-2">
                                    <button
                                        onClick={() => {
                                            setAssigningTestId(test.id);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border border-blue-200"
                                    >
                                        <UserCheck className="w-3.5 h-3.5" /> Assign to Students
                                    </button>
                                    <button
                                        onClick={() => toggleResultsDisclosed(test.id, test.resultsDisclosed)}
                                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${test.resultsDisclosed
                                            ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border border-green-200'
                                            : 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border border-amber-200'
                                            }`}
                                    >
                                        {test.resultsDisclosed ? (
                                            <><Eye className="w-3.5 h-3.5" /> Results Published</>
                                        ) : (
                                            <><EyeOff className="w-3.5 h-3.5" /> Disclose Results</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-surface w-full max-w-4xl rounded-3xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
                        <div className="px-8 py-6 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
                            <div>
                                <h2 className="text-2xl font-bold">{editingTest ? 'Edit Mock Test' : 'Create Mock Test'}</h2>
                                <p className="text-sm text-muted">Set up rules and select questions for the simulation.</p>
                            </div>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-muted-light/30 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Basic Info */}
                                <div className="space-y-6">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <div className="w-2 h-6 bg-primary rounded-full" />
                                        Basic Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold mb-1.5">Test Title (English)</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1.5">Description</label>
                                            <textarea
                                                required
                                                className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Type</label>
                                                <select
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                >
                                                    <option value="Topic">Topic Test</option>
                                                    <option value="Sectional">Sectional Test</option>
                                                    <option value="Full">Full Mock</option>
                                                    <option value="Speed">Speed Drill</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Difficulty</label>
                                                <select
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.difficulty}
                                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                                >
                                                    <option value="Easy">Easy</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Hard">Hard</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Time (min)</label>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.duration}
                                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Marks</label>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.totalMarks}
                                                    onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Negative</label>
                                                <input
                                                    type="number"
                                                    step="0.25"
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.negativeMarking}
                                                    onChange={(e) => setFormData({ ...formData, negativeMarking: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Status</label>
                                                <select
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.status}
                                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                >
                                                    <option value="DRAFT">Draft</option>
                                                    <option value="LIVE">Live</option>
                                                    <option value="ARCHIVED">Archived</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1.5">Live At</label>
                                                <input
                                                    type="datetime-local"
                                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none"
                                                    value={formData.scheduledAt}
                                                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-muted-light/30 border border-border rounded-xl">
                                            <input
                                                type="checkbox"
                                                id="isPublic"
                                                checked={formData.isPublic}
                                                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                                className="w-4 h-4 text-primary"
                                            />
                                            <label htmlFor="isPublic" className="text-sm">Make Global (available to all)</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Questions Selection */}
                                <div className="space-y-6">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <div className="w-2 h-6 bg-purple-500 rounded-full" />
                                        Select Questions
                                    </h3>
                                    <QuestionSelector
                                        selectedIds={formData.questionIds}
                                        onChange={(ids) => setFormData({ ...formData, questionIds: ids })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 sticky bottom-0 bg-surface pt-6 border-t border-border mt-auto pb-2">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-8 py-3 border border-border rounded-2xl font-bold hover:bg-muted-light/30 transition-all font-outfit"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-outfit"
                                >
                                    <Save className="w-5 h-5" />
                                    {editingTest ? 'Update Test' : 'Create & Publish'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {assigningTestId && (
                <UserAssignModal
                    testId={assigningTestId}
                    onClose={() => {
                        setAssigningTestId(null);
                        fetchTests();
                    }}
                />
            )}
        </div>
    );
}
