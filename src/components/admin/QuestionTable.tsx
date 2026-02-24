'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
    Pencil,
    Trash2,
    Search,
    ChevronLeft,
    ChevronRight,
    Filter
} from 'lucide-react';

interface Question {
    id: string;
    text: string;
    subject: string;
    topic: string;
    difficulty: string;
    organizationId: string | null;
    organization?: { name: string };
}

interface QuestionTableProps {
    questions: Question[];
    onEdit: (question: Question) => void;
    onDelete: (id: string) => void;
}

export default function QuestionTable({ questions, onEdit, onDelete }: QuestionTableProps) {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === 'ADMIN';
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredQuestions = questions.filter(q =>
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

    return (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search questions by text, subject or topic..."
                        className="w-full pl-10 pr-4 py-2 bg-muted-light/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted-light/30">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted-light/20 text-xs font-semibold uppercase tracking-wider text-muted">
                            <th className="px-6 py-4">Question</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Topic</th>
                            {isAdmin && <th className="px-6 py-4">Source</th>}
                            <th className="px-6 py-4">Difficulty</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {paginatedQuestions.map((q) => (
                            <tr key={q.id} className="hover:bg-muted-light/10 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="max-w-md truncate font-medium text-sm">{q.text}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">{q.subject}</td>
                                <td className="px-6 py-4 text-sm">{q.topic}</td>
                                {isAdmin && (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${q.organizationId ? 'bg-purple-500' : 'bg-green-500'}`} />
                                            <span className="text-xs font-bold uppercase truncate max-w-[100px]">
                                                {q.organization?.name || 'GLOBAL'}
                                            </span>
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${q.difficulty === 'HARD' ? 'bg-red-500/10 text-red-500' :
                                        q.difficulty === 'MEDIUM' ? 'bg-orange-500/10 text-orange-500' :
                                            'bg-green-500/10 text-green-500'
                                        }`}>
                                        {q.difficulty}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(q)}
                                            className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(q.id)}
                                            className="p-2 text-muted hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted">
                    Showing {paginatedQuestions.length} of {filteredQuestions.length} questions
                </p>
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 border border-border rounded-lg disabled:opacity-50 hover:bg-muted-light/30 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 border border-border rounded-lg disabled:opacity-50 hover:bg-muted-light/30 transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
