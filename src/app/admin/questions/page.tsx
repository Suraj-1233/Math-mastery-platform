'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Plus, Download, Upload } from 'lucide-react';
import QuestionTable from '@/components/admin/QuestionTable';
import QuestionForm from '@/components/admin/QuestionForm';

export default function QuestionsAdminPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [questions, setQuestions] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/questions`);
            const data = await res.json();
            setQuestions(data);
        } catch (err) {
            console.error('Failed to fetch questions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData: any) => {
        try {
            const url = editingQuestion
                ? `/api/admin/questions/${editingQuestion.id}`
                : `/api/admin/questions`;

            const res = await fetch(url, {
                method: editingQuestion ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsFormOpen(false);
                setEditingQuestion(null);
                fetchQuestions();
            }
        } catch (err) {
            console.error('Failed to save question:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this question?')) return;

        try {
            const res = await fetch(`/api/admin/questions/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchQuestions();
            }
        } catch (err) {
            console.error('Failed to delete question:', err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Questions Management</h1>
                    <p className="text-muted mt-1">Add, edit, or remove questions from the database.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted-light/30 transition-all">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted-light/30 transition-all">
                        <Upload className="w-4 h-4" />
                        Import
                    </button>
                    <button
                        onClick={() => {
                            setEditingQuestion(null);
                            setIsFormOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Question
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <QuestionTable
                    questions={questions}
                    onEdit={(q) => {
                        setEditingQuestion(q);
                        setIsFormOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            {isFormOpen && (
                <QuestionForm
                    initialData={editingQuestion}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingQuestion(null);
                    }}
                />
            )}
        </div>
    );
}
