'use client';

import React, { useState, useEffect } from 'react';
import { submitMockTest } from '@/actions/tests';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Clock, CheckSquare, Flag, ArrowRight, ArrowLeft, Bookmark } from 'lucide-react';
import { toggleBookmark } from '@/actions/questions';

interface Question {
    id: string;
    text: string;
    options: string[];
    isBookmarked?: boolean;
}

interface TestSimulatorProps {
    testMeta: any;
    questions: Question[];
}

export function TestSimulator({ testMeta, questions }: TestSimulatorProps) {
    const router = useRouter();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
    const [timeLeft, setTimeLeft] = useState(testMeta.duration * 60); // in seconds
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Track local override of bookmarks so the UI updates instantly
    const [localBookmarks, setLocalBookmarks] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        questions.forEach(q => {
            if (q.isBookmarked) initial.add(q.id);
        });
        return initial;
    });

    const answersRef = React.useRef(answers);
    const markedRef = React.useRef(markedForReview);

    useEffect(() => {
        answersRef.current = answers;
        markedRef.current = markedForReview;
    }, [answers, markedForReview]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            handleFinalSubmit();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]); // handleFinalSubmit is memoized and doesn't change

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentQIndex];

    const handleAnswerSelect = (index: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: index
        }));
    };

    const toggleMarkForReview = () => {
        setMarkedForReview((prev) => {
            const next = new Set(prev);
            if (next.has(currentQuestion.id)) {
                next.delete(currentQuestion.id);
            } else {
                next.add(currentQuestion.id);
            }
            return next;
        });
    };

    const handleGlobalBookmark = async () => {
        const qId = currentQuestion.id;
        const currentlyBookmarked = localBookmarks.has(qId);

        // Optimistic UI update
        setLocalBookmarks(prev => {
            const next = new Set(prev);
            currentlyBookmarked ? next.delete(qId) : next.add(qId);
            return next;
        });

        try {
            await toggleBookmark(qId);
        } catch {
            // Revert on failure
            setLocalBookmarks(prev => {
                const next = new Set(prev);
                currentlyBookmarked ? next.add(qId) : next.delete(qId);
                return next;
            });
        }
    };

    const handleClearResponse = () => {
        setAnswers((prev) => {
            const next = { ...prev };
            delete next[currentQuestion.id];
            return next;
        });
    };

    const handleFinalSubmit = React.useCallback(async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            // Store marked questions in localStorage so the results page can highlight them
            localStorage.setItem(`review_${testMeta.id}`, JSON.stringify(Array.from(markedRef.current)));

            const attemptId = await submitMockTest(testMeta.id, answersRef.current);
            router.push(`/tests/${testMeta.id}/result?attemptId=${attemptId}`);
        } catch (error) {
            console.error('Failed to submit test:', error);
            setIsSubmitting(false);
            alert('Failed to submit test. Are you logged in?');
        }
    }, [testMeta.id, isSubmitting, router]);

    const renderMarkdown = (text: string) => {
        return {
            __html: text
                .replace(/### \*\*(.*?)\*\*/g, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                .replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>')
                .replace(/<\/ul>\n<ul>/g, '')
        };
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
            {/* Main Test Area */}
            <div className="flex-1 flex flex-col p-6 lg:p-10 border-r border-border">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">{testMeta.title}</h1>
                            <p className="text-sm text-muted">Question {currentQIndex + 1} of {questions.length}</p>
                        </div>
                        <button
                            onClick={handleGlobalBookmark}
                            className="text-muted hover:text-warning transition-colors p-2"
                            title="Save to Question Bank Bookmarks"
                        >
                            <Bookmark
                                className={clsx('w-6 h-6', localBookmarks.has(currentQuestion.id) ? 'fill-current text-yellow-500' : '')}
                            />
                        </button>
                    </div>
                    <div className={clsx(
                        "flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg font-bold shadow-sm border",
                        timeLeft <= 300 ? "bg-error-light text-error border-error/50 animate-pulse" : "bg-surface border-border"
                    )}>
                        <Clock className="w-5 h-5" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 overflow-y-auto pr-4 prose-sm">
                    <style jsx>{`
                        .parsed-markdown b { color: var(--foreground); font-weight: 700; }
                        .parsed-markdown ul { list-style-type: disc; padding-left: 1.5rem; margin-top: 0.5rem; }
                        .parsed-markdown li { margin-bottom: 0.25rem; }
                        .parsed-markdown h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--primary); }
                    `}</style>
                    <div
                        className="text-base leading-relaxed parsed-markdown mb-8"
                        dangerouslySetInnerHTML={renderMarkdown(currentQuestion.text)}
                    />

                    {/* Options Area */}
                    <div className="space-y-4">
                        {currentQuestion.options.map((opt, i) => {
                            const isSelected = answers[currentQuestion.id] === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswerSelect(i)}
                                    className={clsx(
                                        "w-full text-left p-4 rounded-xl border transition-all flex items-center shadow-sm",
                                        isSelected
                                            ? "border-primary bg-primary-light ring-1 ring-primary"
                                            : "border-border bg-surface hover:bg-muted-light/30"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-6 h-6 rounded-full border flex items-center justify-center mr-4 text-xs font-bold shrink-0",
                                        isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted text-muted"
                                    )}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    <span className={clsx("text-sm font-medium", isSelected ? "text-primary-dark" : "text-foreground")}>
                                        {opt}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Question Actions */}
                <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex gap-4">
                        <button
                            onClick={toggleMarkForReview}
                            className="btn btn-outline flex items-center"
                        >
                            <Flag className={clsx("w-4 h-4 mr-2", markedForReview.has(currentQuestion.id) ? "fill-warning text-warning" : "")} />
                            {markedForReview.has(currentQuestion.id) ? 'Unmark Review' : 'Mark for Review'}
                        </button>
                        <button
                            onClick={handleClearResponse}
                            className="btn btn-outline text-muted"
                            disabled={answers[currentQuestion.id] === undefined}
                        >
                            Clear Response
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="btn btn-outline px-6"
                            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                            disabled={currentQIndex === 0}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                        </button>
                        <button
                            className="btn btn-primary px-8"
                            onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
                            disabled={currentQIndex === questions.length - 1}
                        >
                            Save & Next <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar / Palette */}
            <div className="w-full lg:w-80 bg-surface p-6 flex flex-col h-auto lg:h-screen sticky top-0">
                <h3 className="text-lg font-bold mb-6">Question Palette</h3>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-xs font-medium text-muted">
                    <div className="flex items-center"><div className="w-3 h-3 rounded bg-success mr-2"></div> Answered</div>
                    <div className="flex items-center"><div className="w-3 h-3 rounded bg-warning mr-2"></div> Marked</div>
                    <div className="flex items-center"><div className="w-3 h-3 rounded bg-muted-light border border-border mr-2"></div> Not Visited</div>
                    <div className="flex items-center"><div className="w-3 h-3 rounded bg-border mr-2"></div> Visited</div>
                </div>

                {/* Number Grid */}
                <div className="flex-1 overflow-y-auto mb-8 pr-2">
                    <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3">
                        {questions.map((q, i) => {
                            const isAnswered = answers[q.id] !== undefined;
                            const isMarked = markedForReview.has(q.id);
                            const isActive = i === currentQIndex;

                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQIndex(i)}
                                    className={clsx(
                                        "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-transform hover:scale-105",
                                        isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : "",
                                        isAnswered && !isMarked ? "bg-success text-success-foreground" :
                                            isMarked ? "bg-warning text-warning-foreground" :
                                                isActive ? "bg-border text-foreground" : "bg-muted-light border border-border text-foreground hover:bg-border"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-border mt-auto">
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to submit the test? You cannot change your answers later.')) {
                                handleFinalSubmit();
                            }
                        }}
                        disabled={isSubmitting}
                        className="btn btn-error w-full shadow-lg"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Final Test'}
                    </button>
                </div>
            </div>
        </div>
    );
}
