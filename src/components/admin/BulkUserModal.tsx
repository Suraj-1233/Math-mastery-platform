
'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { bulkCreateStudents } from '@/actions/bulk-users';

interface BulkUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function BulkUserModal({ isOpen, onClose, onSuccess }: BulkUserModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
                setError('Please upload a valid CSV file');
                return;
            }
            setFile(selectedFile);
            setError(null);
            setResult(null);
        }
    };

    const parseCSV = (text: string) => {
        const lines = text.split(/\r?\n/);
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

        const nameIdx = headers.indexOf('name');
        const emailIdx = headers.indexOf('email');

        if (nameIdx === -1 || emailIdx === -1) {
            throw new Error('CSV must have "name" and "email" columns in the first row.');
        }

        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',').map(c => c.trim());
            if (row.length >= 2 && row[emailIdx]) {
                data.push({
                    name: row[nameIdx] || 'Student',
                    email: row[emailIdx]
                });
            }
        }
        return data;
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const text = await file.text();
            const students = parseCSV(text);

            if (students.length === 0) {
                setError('No valid student data found in CSV');
                setLoading(false);
                return;
            }

            const res = await bulkCreateStudents(students);
            if (res.success && 'successCount' in res) {
                setResult(res);
                if (res.successCount > 0) {
                    onSuccess();
                }
            } else {
                setError(res.error || 'Failed to upload students');
            }
        } catch (err: any) {
            setError(err.message || 'Error processing CSV file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-surface w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden">
                <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-muted-light/10">
                    <div>
                        <h2 className="text-xl font-bold font-outfit">Bulk Student Import</h2>
                        <p className="text-xs text-muted mt-1">Upload a CSV file with "name" and "email" headers.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted-light rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    {!result ? (
                        <>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                />
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${file ? 'bg-primary text-white' : 'bg-muted-light/50 text-muted'
                                    }`}>
                                    <Upload className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-center">
                                    {file ? file.name : 'Click to select or drag CSV'}
                                </h3>
                                <p className="text-xs text-muted mt-2 text-center max-w-[240px]">
                                    Make sure your CSV has "name" and "email" as the first line.
                                </p>
                            </div>

                            {error && (
                                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-3 text-destructive">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <p className="text-sm font-bold">{error}</p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3.5 border border-border rounded-2xl text-sm font-bold hover:bg-muted-light transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={!file || loading}
                                    className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Start Import'
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-6 bg-green-500/5 border border-green-500/10 rounded-3xl">
                                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-700">Import Complete!</h4>
                                    <p className="text-xs text-green-600 font-medium">
                                        Processed {result.successCount + result.failCount} candidates.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-muted-light/20 rounded-2xl border border-border text-center">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted">Successful</p>
                                    <p className="text-2xl font-black text-primary">{result.successCount}</p>
                                </div>
                                <div className="p-4 bg-muted-light/20 rounded-2xl border border-border text-center">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted">Failed</p>
                                    <p className="text-2xl font-black text-destructive">{result.failCount}</p>
                                </div>
                            </div>

                            {result.errors.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-muted px-1">Issues Found</p>
                                    <div className="max-h-32 overflow-y-auto rounded-2xl border border-border p-3 space-y-1.5 bg-muted-light/10 scrollbar-thin">
                                        {result.errors.map((err: string, i: number) => (
                                            <p key={i} className="text-[10px] text-destructive font-bold flex items-center gap-2">
                                                <X className="w-3 h-3" /> {err}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-muted-light/50 border border-border rounded-2xl text-sm font-bold hover:bg-muted-light transition-all"
                            >
                                Close & Refresh
                            </button>
                        </div>
                    )}

                    <div className="pt-2">
                        <div className="flex items-center gap-2 p-3 bg-blue-500/5 rounded-2xl text-blue-600">
                            <FileText className="w-4 h-4 shrink-0" />
                            <p className="text-[10px] font-bold leading-relaxed">
                                Security Tip: The default password for each student is unique. It follows the pattern: <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">NAME@LAST4</code> (e.g., if John Doe's email is john@mail.com, password is <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">JOHN@john</code>).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
