'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface QuestionFormProps {
    initialData?: any;
    onSave: (data: any) => void;
    onCancel: () => void;
}

export default function QuestionForm({ initialData, onSave, onCancel }: QuestionFormProps) {
    const [formData, setFormData] = useState({
        text: initialData?.text || '',
        textHi: initialData?.textHi || '',
        subject: initialData?.subject || 'Mathematics',
        topic: initialData?.topic || '',
        difficulty: initialData?.difficulty || 'MEDIUM',
        examType: initialData?.examType || 'SSC_CGL',
        options: (() => {
            const raw = initialData?.options;
            if (!raw) return [{ text: '' }, { text: '' }, { text: '' }, { text: '' }];
            if (Array.isArray(raw)) return raw;
            if (typeof raw === 'string') { try { return JSON.parse(raw); } catch { return [{ text: '' }, { text: '' }, { text: '' }, { text: '' }]; } }
            if (typeof raw === 'object') return Object.values(raw);
            return [{ text: '' }, { text: '' }, { text: '' }, { text: '' }];
        })(),
        correctOptionIndex: initialData?.correctOptionIndex || 0,
        explanation: initialData?.explanation || '',
        explanationHi: initialData?.explanationHi || '',
        isPublic: initialData?.organizationId === null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...formData.options];
        newOptions[index].text = value;
        setFormData({ ...formData, options: newOptions });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-border">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
                    <h2 className="text-xl font-bold">{initialData ? 'Edit Question' : 'Add New Question'}</h2>
                    <button onClick={onCancel} className="p-2 hover:bg-muted-light/30 rounded-full transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Question Text (English)</label>
                                <textarea
                                    required
                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]"
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Question Text (Hindi - Optional)</label>
                                <textarea
                                    className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]"
                                    value={formData.textHi}
                                    onChange={(e) => setFormData({ ...formData, textHi: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Topic</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Difficulty</label>
                                    <select
                                        className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none"
                                        value={formData.difficulty}
                                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    >
                                        <option value="EASY">Easy</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HARD">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Visibility</label>
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
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold border-b border-border pb-2">Options</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.options.map((option: any, index: number) => (
                                <div key={index} className="flex gap-3 items-center">
                                    <input
                                        type="radio"
                                        name="correct-option"
                                        checked={formData.correctOptionIndex === index}
                                        onChange={() => setFormData({ ...formData, correctOptionIndex: index })}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <input
                                        required
                                        type="text"
                                        placeholder={`Option ${index + 1}`}
                                        className="flex-1 p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none"
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Explanation (English)</label>
                            <textarea
                                className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none min-h-[120px]"
                                value={formData.explanation}
                                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Explanation (Hindi)</label>
                            <textarea
                                className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none min-h-[120px]"
                                value={formData.explanationHi}
                                onChange={(e) => setFormData({ ...formData, explanationHi: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 sticky bottom-0 bg-surface pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 rounded-xl text-sm font-medium border border-border hover:bg-muted-light/50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            <Save className="w-4 h-4" />
                            {initialData ? 'Update Question' : 'Save Question'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
