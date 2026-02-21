
'use client';

import { useState } from 'react';
import { Bookmark, Share2, CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { toggleBookmark } from '@/actions/questions';
import { useToast } from '@/contexts/ToastContext';

interface QuestionReviewListProps {
    questions: any[];
    answersMap: Record<string, number>;
    language: 'EN' | 'HI';
}

export function QuestionReviewList({ questions, answersMap, language: initialLanguage }: QuestionReviewListProps) {
    const { showToast } = useToast();
    const [language, setLanguage] = useState(initialLanguage);
    const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set());
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(questions.filter(q => q.isBookmarked).map(q => q.id)));

    const toggleExplanation = (id: string) => {
        const next = new Set(expandedExplanations);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setExpandedExplanations(next);
    };

    const handleBookmark = async (questionId: string) => {
        try {
            const isBookmarked = await toggleBookmark(questionId);
            const next = new Set(bookmarks);
            if (isBookmarked) next.add(questionId);
            else next.delete(questionId);
            setBookmarks(next);
        } catch (e) {
            console.error('Failed to update bookmark');
        }
    };

    const handleShare = (question: any) => {
        const url = `${window.location.origin}/questions/${question.id}`;

        if (navigator.share) {
            navigator.share({ title: 'Math Mastery Question', url }).catch(() => { });
        } else {
            navigator.clipboard.writeText(url);
            showToast('Question link copied to clipboard!', 'success');
        }
    };

    return (
        <div className="space-y-8 mt-12">
            <div className="flex justify-between items-center border-b border-border pb-4">
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Question Review</h2>
                <button
                    onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                    className="btn btn-outline btn-sm font-bold"
                >
                    {language === 'EN' ? 'HINDI' : 'ENGLISH'}
                </button>
            </div>

            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const selected = answersMap[q.id];
                    const isCorrect = selected === q.correctOptionIndex;
                    const isSkipped = selected === undefined || selected === null;
                    const options = JSON.parse(q.options);

                    return (
                        <div key={q.id} className="card-premium overflow-hidden">
                            {/* Header Status Bar */}
                            <div className={clsx(
                                "px-6 py-2 flex justify-between items-center",
                                isCorrect ? "bg-success-light" : isSkipped ? "bg-muted-light" : "bg-error-light"
                            )}>
                                <div className="flex items-center gap-2">
                                    {isCorrect ? (
                                        <CheckCircle2 className="w-4 h-4 text-success" />
                                    ) : isSkipped ? (
                                        <HelpCircle className="w-4 h-4 text-muted" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-error" />
                                    )}
                                    <span className={clsx(
                                        "text-[10px] font-bold uppercase tracking-widest",
                                        isCorrect ? "text-success" : isSkipped ? "text-muted" : "text-error"
                                    )}>
                                        Question {idx + 1} • {isCorrect ? 'Correct' : isSkipped ? 'Skipped' : 'Wrong'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleBookmark(q.id)}
                                        className={clsx("p-1 transition-colors", bookmarks.has(q.id) ? "text-primary" : "text-muted hover:text-primary")}
                                    >
                                        <Bookmark className={clsx("w-4 h-4", bookmarks.has(q.id) && "fill-current")} />
                                    </button>
                                    <button
                                        onClick={() => handleShare(q)}
                                        className="p-1 text-muted hover:text-primary transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-base font-medium leading-relaxed mb-6">
                                    {language === 'HI' && q.textHi ? q.textHi : q.text}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                    {options.map((opt: any, oIdx: number) => {
                                        const isSelected = selected === oIdx;
                                        const isAnswer = q.correctOptionIndex === oIdx;

                                        return (
                                            <div
                                                key={oIdx}
                                                className={clsx(
                                                    "p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                                                    isAnswer ? "border-success bg-success-light shadow-sm" :
                                                        isSelected ? "border-error bg-error-light" :
                                                            "border-border bg-white"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border",
                                                    isAnswer ? "bg-success text-white border-success" :
                                                        isSelected ? "bg-error text-white border-error" :
                                                            "bg-muted-light text-muted border-border"
                                                )}>
                                                    {String.fromCharCode(65 + oIdx)}
                                                </div>
                                                <div className="text-sm font-medium flex flex-col gap-2">
                                                    <span>
                                                        {typeof opt === 'string' ? opt : (language === 'HI' && opt.textHi ? opt.textHi : opt.text)}
                                                    </span>
                                                    {typeof opt === 'object' && opt.imageUrl && (
                                                        <img
                                                            src={opt.imageUrl}
                                                            className="max-h-32 object-contain rounded border border-border/50 bg-white p-1"
                                                            alt={`Option ${String.fromCharCode(65 + oIdx)}`}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => toggleExplanation(q.id)}
                                    className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider hover:opacity-80 transition-opacity"
                                >
                                    {expandedExplanations.has(q.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    {expandedExplanations.has(q.id) ? 'Hide Explanation' : 'View Explanation'}
                                </button>

                                {expandedExplanations.has(q.id) && (
                                    <div className="mt-4 p-4 rounded-xl bg-muted-light/50 border border-border/50 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                                        <p className="font-bold text-muted text-[10px] uppercase mb-2 tracking-widest">Logic & Solution</p>
                                        {language === 'HI' && q.explanationHi ? q.explanationHi : q.explanation}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
