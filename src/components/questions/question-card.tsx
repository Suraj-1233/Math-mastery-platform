
'use client';

import { useState } from 'react';
import { submitAnswer, toggleBookmark } from '@/actions/questions';
import { clsx } from 'clsx';
import { Bookmark, CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
    question: any; // Type strictly with Prisma generated types later
}

export function QuestionCard({ question }: QuestionCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(
        question.userStatus?.isSolved || false
    );
    const [isCorrect, setIsCorrect] = useState(
        question.userStatus?.isCorrect || false
    );
    const [isBookmarked, setIsBookmarked] = useState(
        question.userStatus?.isBookmarked || false
    );
    const [explanation, setExplanation] = useState(
        question.userStatus?.isSolved ? question.explanation : null
    );

    const handleSubmit = async () => {
        if (selectedOption === null || isSubmitted) return;

        try {
            const result = await submitAnswer({
                questionId: question.id,
                selectedOptionIndex: selectedOption,
            });

            setIsSubmitted(true);
            setIsCorrect(result.isCorrect);
            setExplanation(result.explanation);
        } catch (error) {
            console.error('Failed to submit answer:', error);
        }
    };

    const handleBookmark = async () => {
        // Optimistic Update
        setIsBookmarked(!isBookmarked);
        try {
            await toggleBookmark(question.id);
        } catch (error) {
            setIsBookmarked(!isBookmarked); // Revert on failure
        }
    };

    return (
        <div className="card-premium p-6">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-2">
                    <span className={clsx(
                        "badge",
                        question.difficulty === 'EASY' ? "badge-success" :
                            question.difficulty === 'MEDIUM' ? "badge-warning" :
                                "badge-error"
                    )}>
                        {question.difficulty}
                    </span>
                    <span className="text-xs text-muted badge badge-outline">{question.subject}</span>
                    {isSubmitted && (
                        isCorrect ? <CheckCircle className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-error" />
                    )}
                </div>
                <button
                    onClick={handleBookmark}
                    className="text-muted hover:text-warning transition-colors"
                >
                    <Bookmark
                        className={clsx('h-5 w-5', isBookmarked && 'fill-current text-yellow-500')}
                    />
                </button>
            </div>

            <div className="mb-6 prose-sm">
                <style jsx>{`
                    .parsed-markdown b { color: var(--foreground); font-weight: 700; }
                    .parsed-markdown ul { list-style-type: disc; padding-left: 1.5rem; margin-top: 0.5rem; }
                    .parsed-markdown li { margin-bottom: 0.25rem; }
                    .parsed-markdown h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--primary); }
                `}</style>
                <div
                    className="text-sm font-medium text-foreground whitespace-pre-wrap leading-relaxed parsed-markdown"
                    dangerouslySetInnerHTML={{
                        __html: question.text
                            .replace(/### \*\*(.*?)\*\*/g, '<h3>$1</h3>')
                            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                            .replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>')
                            .replace(/<\/ul>\n<ul>/g, '') // Merge adjacent lists
                    }}
                />
            </div>

            <div className="space-y-3">
                {question.options.map((option: any, index: number) => {
                    // Determine styling based on state
                    let optionStyles = "border-border hover:bg-muted-light/30 bg-surface";
                    if (isSubmitted) {
                        if (index === question.correctOptionIndex) {
                            optionStyles = "border-success bg-success-light text-success font-medium";
                        } else if (index === selectedOption && !isCorrect) {
                            optionStyles = "border-error bg-error-light text-error";
                        } else {
                            optionStyles = "opacity-50 border-border bg-surface";
                        }
                    } else if (selectedOption === index) {
                        optionStyles = "border-primary bg-primary-light ring-1 ring-primary";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !isSubmitted && setSelectedOption(index)}
                            disabled={isSubmitted}
                            className={clsx(
                                "flex w-full items-center rounded-md border p-3 text-left transition-colors",
                                optionStyles
                            )}
                        >
                            <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs opacity-70">
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                {typeof option === 'string' ? option : option.text}
                            </span>
                        </button>
                    );
                })}
            </div>

            {!isSubmitted ? (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className="btn btn-primary"
                    >
                        Submit Answer
                    </button>
                </div>
            ) : (
                <div className="mt-6 rounded-md bg-muted-light/30 border border-border p-4">
                    <h4 className="mb-2 font-semibold text-foreground">Explanation:</h4>
                    <p className="text-sm text-muted leading-relaxed">{explanation || "No explanation provided."}</p>
                </div>
            )}
        </div>
    );
}
