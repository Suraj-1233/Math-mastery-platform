'use client';

import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Circle } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Question {
    id: string;
    text: string;
    topic: string;
}

interface QuestionSelectorProps {
    selectedIds: string[];
    onChange: (ids: string[]) => void;
}

export default function QuestionSelector({ selectedIds, onChange }: QuestionSelectorProps) {
    const params = useParams();
    const slug = params?.slug as string;
    const [questions, setQuestions] = useState<Question[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`/api/admin/questions`);
                const data = await res.json();
                setQuestions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to fetch questions:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const toggleQuestion = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter(i => i !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    const filtered = questions.filter(q =>
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                    type="text"
                    placeholder="Search questions to add..."
                    className="w-full pl-10 pr-4 py-2 bg-muted-light/30 border border-border rounded-xl text-sm outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="max-h-[300px] overflow-y-auto border border-border rounded-xl divide-y divide-border">
                {loading ? (
                    <div className="p-4 text-center text-sm text-muted">Loading questions...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted">No questions found</div>
                ) : (
                    filtered.map((q) => {
                        const isSelected = selectedIds.includes(q.id);
                        return (
                            <div
                                key={q.id}
                                onClick={() => toggleQuestion(q.id)}
                                className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-muted-light/20'
                                    }`}
                            >
                                {isSelected ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                ) : (
                                    <Circle className="w-5 h-5 text-muted" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{q.text}</p>
                                    <p className="text-[10px] text-muted uppercase font-bold">{q.topic}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="flex justify-between items-center text-xs text-muted px-1">
                <span>{selectedIds.length} questions selected</span>
                <button
                    type="button"
                    onClick={() => onChange([])}
                    className="hover:text-primary transition-colors"
                >
                    Clear Selection
                </button>
            </div>
        </div>
    );
}
