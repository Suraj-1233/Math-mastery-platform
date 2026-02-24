'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Plus, Users, Trash2, Pencil, X, Save, Search, Layers } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/lib/constants';

export default function BatchesAdminPage() {
    const { data: session } = useSession();
    const params = React.use(useParams() as any) as any;
    const slug = params?.slug;

    const currentUserRole = (session?.user as any)?.role || ROLES.USER;
    const isAdmin = currentUserRole === ROLES.ADMIN;

    const [batches, setBatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBatch, setEditingBatch] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        studentIds: [] as string[]
    });

    // Students data for selection
    const [students, setStudents] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBatches();
        fetchStudents();
    }, []);

    useEffect(() => {
        if (editingBatch) {
            setFormData({
                name: editingBatch.name || '',
                description: editingBatch.description || '',
                studentIds: editingBatch.students?.map((s: any) => s.id) || []
            });
        } else {
            setFormData({
                name: '',
                description: '',
                studentIds: []
            });
        }
    }, [editingBatch, isFormOpen]);

    const fetchBatches = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/batches`);
            const data = await res.json();
            setBatches(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch batches:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch(`/api/admin/users?role=USER`);
            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch students:', err);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingBatch ? 'PUT' : 'POST';
            const url = editingBatch ? `/api/admin/batches/${editingBatch.id}` : `/api/admin/batches`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsFormOpen(false);
                setEditingBatch(null);
                fetchBatches();
            } else {
                alert('Failed to save batch');
            }
        } catch (err) {
            console.error('Failed to save batch:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this batch? (Students will NOT be deleted)')) return;
        try {
            const res = await fetch(`/api/admin/batches/${id}`, { method: 'DELETE' });
            if (res.ok) fetchBatches();
        } catch (err) {
            console.error('Failed to delete batch:', err);
        }
    };

    const toggleStudent = (id: string) => {
        const studentIds = new Set(formData.studentIds);
        if (studentIds.has(id)) {
            studentIds.delete(id);
        } else {
            studentIds.add(id);
        }
        setFormData({ ...formData, studentIds: Array.from(studentIds) });
    };

    const openEditModal = async (batchId: string) => {
        try {
            const res = await fetch(`/api/admin/batches/${batchId}`);
            if (res.ok) {
                const data = await res.json();
                setEditingBatch(data);
                setIsFormOpen(true);
            }
        } catch (error) {
            console.error('Failed to fetch batch details:', error);
        }
    };

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black font-outfit uppercase tracking-tight">
                        Student Batches
                    </h1>
                    <p className="text-muted mt-1 font-medium">
                        Group your students into batches for easier test assignment and management.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingBatch(null);
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-outfit uppercase tracking-wider"
                >
                    <Plus className="w-5 h-5" />
                    Create New Batch
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batches.map((batch: any) => (
                        <div key={batch.id} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                <button
                                    onClick={() => openEditModal(batch.id)}
                                    className="p-2 bg-white/80 dark:bg-black/50 hover:bg-primary/20 text-primary rounded-xl backdrop-blur-md shadow-sm"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(batch.id)}
                                    className="p-2 bg-white/80 dark:bg-black/50 hover:bg-destructive/20 text-destructive rounded-xl backdrop-blur-md shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold leading-snug">{batch.name}</h3>
                                    {isAdmin && batch.organization?.name && (
                                        <p className="text-[10px] font-black uppercase text-muted tracking-wider">
                                            {batch.organization.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-muted line-clamp-2 mb-6 flex-1">
                                {batch.description || 'No description provided.'}
                            </p>

                            <div className="pt-4 border-t border-border mt-auto flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1.5 font-bold text-muted-foreground">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>{batch._count?.students || 0} Students</span>
                                </div>
                                <div className="text-xs text-muted">
                                    Created by {batch.createdBy?.name || 'Unknown'}
                                </div>
                            </div>
                        </div>
                    ))}

                    {batches.length === 0 && (
                        <div className="col-span-full py-16 text-center border-2 border-dashed border-border rounded-3xl">
                            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Layers className="w-8 h-8 text-muted" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">No batches found</h3>
                            <p className="text-muted text-sm">Create your first batch to start grouping students.</p>
                        </div>
                    )}
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-surface w-full max-w-2xl rounded-3xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
                        <div className="px-8 py-6 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
                            <div>
                                <h2 className="text-2xl font-bold">{editingBatch ? 'Edit Batch' : 'Create New Batch'}</h2>
                                <p className="text-sm text-muted">Manage batch details and unassigned/assigned students.</p>
                            </div>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-muted-light/30 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">Batch Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Morning Batch"
                                        className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">Description (Optional)</label>
                                    <textarea
                                        placeholder="Add notes about this batch..."
                                        className="w-full p-3 bg-muted-light/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Student Selection */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    Assign Students
                                </h3>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-muted" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-border rounded-xl bg-muted/5 focus:ring-primary focus:border-primary sm:text-sm"
                                        placeholder="Search students by name or email..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="border border-border rounded-xl divide-y divide-border overflow-hidden max-h-60 overflow-y-auto bg-muted/5">
                                    {filteredStudents.length === 0 ? (
                                        <div className="p-8 text-center text-muted">
                                            No students found in your organization.
                                        </div>
                                    ) : (
                                        filteredStudents.map((student: any) => (
                                            <label
                                                key={student.id}
                                                className="flex items-center justify-between p-3 hover:bg-muted/10 transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm font-outfit">
                                                        {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-foreground">{student.name || 'Unnamed Student'}</p>
                                                        <p className="text-xs text-muted">{student.email}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 rounded border-border text-primary focus:ring-primary ml-4"
                                                        checked={formData.studentIds.includes(student.id)}
                                                        onChange={() => toggleStudent(student.id)}
                                                    />
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>
                                <p className="text-xs text-muted text-right font-medium">
                                    {formData.studentIds.length} student(s) selected
                                </p>
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
                                    {editingBatch ? 'Update Batch' : 'Create Batch'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
