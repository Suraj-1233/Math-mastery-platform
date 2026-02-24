import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { X, Search, UserCheck, Loader2, Layers } from 'lucide-react';

interface UserAssignModalProps {
    testId: string;
    onClose: () => void;
}

export default function UserAssignModal({ testId, onClose }: UserAssignModalProps) {
    const params = useParams();
    const slug = params?.slug as string;
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());
    const [assigning, setAssigning] = useState(false);
    const [batches, setBatches] = useState<any[]>([]);
    const [selectedBatchId, setSelectedBatchId] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<'all' | 'specific' | 'batch'>('specific');

    useEffect(() => {
        if (slug) fetchStudents();
    }, [slug]);

    const fetchStudents = async () => {
        try {
            // Fetch students in the organization
            const res = await fetch(`/api/admin/users?role=USER`);
            const data = await res.json();

            // Fetch batches
            const batchRes = await fetch(`/api/admin/batches`);
            const batchData = await batchRes.json();
            setBatches(Array.isArray(batchData) ? batchData : []);

            if (Array.isArray(data)) {
                setStudents(data);

                // Fetch already assigned students for this test
                const assignedRes = await fetch(`/api/admin/tests/${testId}/assigned`);
                if (assignedRes.ok) {
                    const assignedData = await assignedRes.json();
                    if (Array.isArray(assignedData)) {
                        const previouslyAssigned = new Set(assignedData.map((a: any) => a.studentId));
                        setSelectedStudentIds(previouslyAssigned as any);
                    }
                }
            } else {
                setStudents([]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async () => {
        setAssigning(true);
        try {
            let idsToAssign: string[] = [];

            if (selectedOption === 'all') {
                idsToAssign = students.map(s => s.id);
            } else if (selectedOption === 'batch') {
                const batch = batches.find(b => b.id === selectedBatchId);
                if (batch && batch.students) {
                    idsToAssign = batch.students.map((s: any) => s.id);
                }
            } else {
                idsToAssign = Array.from(selectedStudentIds);
            }

            const res = await fetch(`/api/admin/tests/${testId}/assign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testId, studentIds: idsToAssign })
            });

            if (res.ok) {
                onClose();
            } else {
                alert('Failed to assign test');
            }
        } catch (error) {
            console.error('Failed to assign test:', error);
            alert('An error occurred during assignment');
        } finally {
            setAssigning(false);
        }
    };

    const toggleStudent = (id: string) => {
        const newSet = new Set(selectedStudentIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedStudentIds(newSet);
    };

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-surface w-full max-w-2xl rounded-3xl shadow-2xl border border-border flex flex-col max-h-[85vh]">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-primary" />
                            Assign Test to Students
                        </h3>
                        <p className="text-sm text-muted mt-1">Select who can access this mock test.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            {/* Assignment Mode Selection */}
                            <div className="flex gap-2 p-1 bg-muted/10 rounded-xl relative overflow-x-auto whitespace-nowrap">
                                <button
                                    className={`flex-1 min-w-[140px] px-3 py-2 text-sm font-bold rounded-lg transition-all z-10 ${selectedOption === 'all' ? 'text-primary bg-white shadow-sm dark:bg-zinc-800' : 'text-muted hover:text-foreground'}`}
                                    onClick={() => setSelectedOption('all')}
                                >
                                    All Students ({students.length})
                                </button>
                                <button
                                    className={`flex-1 min-w-[140px] px-3 py-2 text-sm font-bold rounded-lg transition-all z-10 ${selectedOption === 'batch' ? 'text-primary bg-white shadow-sm dark:bg-zinc-800' : 'text-muted hover:text-foreground'}`}
                                    onClick={() => setSelectedOption('batch')}
                                >
                                    Assign by Batch
                                </button>
                                <button
                                    className={`flex-1 min-w-[140px] px-3 py-2 text-sm font-bold rounded-lg transition-all z-10 ${selectedOption === 'specific' ? 'text-primary bg-white shadow-sm dark:bg-zinc-800' : 'text-muted hover:text-foreground'}`}
                                    onClick={() => setSelectedOption('specific')}
                                >
                                    Specific Students
                                </button>
                            </div>

                            {/* Batch Selection */}
                            {selectedOption === 'batch' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-sm font-bold mb-1.5">Select a Batch</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                                        {batches.length === 0 ? (
                                            <div className="col-span-full p-6 text-center text-muted border border-dashed border-border rounded-xl">
                                                No batches found. Create one in the Batches tab.
                                            </div>
                                        ) : (
                                            batches.map(batch => (
                                                <div
                                                    key={batch.id}
                                                    onClick={() => setSelectedBatchId(batch.id)}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedBatchId === batch.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30 hover:bg-muted/5'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${selectedBatchId === batch.id ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'}`}>
                                                            <Layers className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm">{batch.name}</h4>
                                                            <p className="text-xs text-muted">{batch._count?.students || 0} Students</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {selectedBatchId && (
                                        <p className="text-xs text-primary font-medium text-right">
                                            Test will be assigned to all students in the selected batch.
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Specific Student Selection */}
                            {selectedOption === 'specific' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
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

                                    <div className="border border-border rounded-xl divide-y divide-border overflow-hidden max-h-80 overflow-y-auto bg-muted/5">
                                        {filteredStudents.length === 0 ? (
                                            <div className="p-8 text-center text-muted">
                                                No students found.
                                            </div>
                                        ) : (
                                            filteredStudents.map(student => (
                                                <label
                                                    key={student.id}
                                                    className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-outfit">
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
                                                            checked={selectedStudentIds.has(student.id)}
                                                            onChange={() => toggleStudent(student.id)}
                                                        />
                                                    </div>
                                                </label>
                                            ))
                                        )}
                                    </div>
                                    <p className="text-xs text-muted text-right">
                                        {selectedStudentIds.size} student(s) selected
                                    </p>
                                </div>
                            )}

                            {selectedOption === 'all' && (
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">Assign to Entire Organization</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        All {students.length} currently active students will be granted access to this mock test. They will see it on their dashboard instantly.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/5 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl font-medium border border-border hover:bg-muted/10 transition-colors"
                        disabled={assigning}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssign}
                        disabled={assigning || (selectedOption === 'specific' && selectedStudentIds.size === 0) || students.length === 0}
                        className="px-5 py-2.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {assigning && <Loader2 className="w-4 h-4 animate-spin" />}
                        {assigning ? 'Assigning...' : 'Confirm Assignment'}
                    </button>
                </div>
            </div>
        </div>
    );
}
