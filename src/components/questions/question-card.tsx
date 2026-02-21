'use client';

import { useState } from 'react';
import { submitAnswer, toggleBookmark } from '@/actions/questions';
import { checkAndAwardBadges } from '@/actions/badges';
import { clsx } from 'clsx';
import { Bookmark, CheckCircle, XCircle, Zap, BookOpen, Share2 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface QuestionCardProps {
    question: any; // Type strictly with Prisma generated types later
}

export function QuestionCard({ question }: QuestionCardProps) {
    const { showToast } = useToast();
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
    const [explanationHi, setExplanationHi] = useState(
        question.userStatus?.isSolved ? question.explanationHi : null
    );
    const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newBadges, setNewBadges] = useState<any[]>([]);

    const handleSubmit = async () => {
        if (selectedOption === null || isSubmitted || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const result = await submitAnswer({
                questionId: question.id,
                selectedOptionIndex: selectedOption,
            });

            setIsSubmitted(true);
            setIsCorrect(result.isCorrect);
            setExplanation(result.explanation);
            setExplanationHi(result.explanationHi);


            // Trigger badge check - result.newBadges is already returned by updated submitAnswer
            if ((result as any).newBadges) {
                setNewBadges((result as any).newBadges);
            }
        } catch (error) {
            console.error('Failed to submit answer:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBookmark = async () => {
        setIsBookmarked(!isBookmarked);
        try {
            await toggleBookmark(question.id);
        } catch (error) {
            setIsBookmarked(!isBookmarked);
        }
    };

    const handleShare = () => {
        const url = `${window.location.origin}/questions/${question.id}`;
        if (navigator.share) {
            navigator.share({ title: 'Math Mastery Question', url }).catch(() => { });
        } else {
            navigator.clipboard.writeText(url);
            showToast('Question link copied to clipboard!', 'success');
        }
    };

    const currentText = (language === 'HI' && question.textHi) ? question.textHi : question.text;
    const currentExplanation = (language === 'HI' && explanationHi) ? explanationHi : explanation;

    // Format occurrences string
    const occurrenceList = question.occurrences?.length > 0
        ? question.occurrences.map((o: any) => `${o.examName} (${o.year})${o.shift ? ` - ${o.shift}` : ''}`).join(', ')
        : (question.examType && question.year ? `${question.examType} ${question.year}` : null);

    return (
        <div className="card-premium p-6">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex flex-col space-y-2">
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
                    <div className="flex flex-wrap gap-2">
                        {question.occurrences && question.occurrences.length > 0 ? (
                            question.occurrences.map((occ: any, idx: number) => (
                                <div key={occ.id} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <span className="opacity-70 mr-1">#</span>
                                    {occ.examName} {occ.year} {occ.shift && ` | ${occ.shift}`}
                                </div>
                            ))
                        ) : (
                            question.examType && question.year && (
                                <div className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <span className="opacity-70 mr-1">#</span>
                                    {question.examType} {question.year}
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {(question.textHi || question.explanationHi) && (
                        <button
                            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                            className="text-xs font-bold px-2 py-1 rounded bg-muted/20 hover:bg-muted/40 transition-colors uppercase"
                        >
                            {language === 'EN' ? 'HI' : 'EN'}
                        </button>
                    )}
                    <button
                        onClick={handleBookmark}
                        className="text-muted hover:text-warning transition-colors"
                    >
                        <Bookmark
                            className={clsx('h-5 w-5', isBookmarked && 'fill-current text-yellow-500')}
                        />
                    </button>
                    <button
                        onClick={handleShare}
                        className="text-muted hover:text-secondary transition-colors"
                        title="Share Question"
                    >
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Primary Question Image - Dynamic sizing from DB */}
            {question.imageUrl && (
                <div className="mb-6 flex justify-center">
                    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-white/50 p-2 shadow-sm transition-all hover:shadow-md">
                        <img
                            src={question.imageUrl}
                            alt="Question Diagram"
                            style={{ maxWidth: question.imageWidth ? `${question.imageWidth}px` : '320px' }}
                            className="h-auto w-full rounded-lg object-contain"
                        />
                        <div className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Click to Enlarge
                        </div>
                    </div>
                </div>
            )}

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
                        __html: currentText
                            .replace(/### \*\*(.*?)\*\*/g, '<h3>$1</h3>')
                            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                            .replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>')
                            .replace(/<\/ul>\n<ul>/g, '')
                    }}
                />
            </div>

            {/* Generic Media Support - Refined Gallery Style with Dynamic Sizing */}
            {question.media && question.media.length > 0 && (
                <div className="mb-6">
                    <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground text-center">Supplementary Media</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                        {question.media.map((item: any) => (
                            <div
                                key={item.id}
                                style={{ width: item.width ? `${item.width}px` : 'auto', maxWidth: '100%' }}
                                className="group relative overflow-hidden rounded-lg border border-border/40 bg-muted/5 p-1.5 transition-all hover:border-primary/30 shadow-sm"
                            >
                                {item.type === 'IMAGE' ? (
                                    <div className="overflow-hidden rounded">
                                        <img
                                            src={item.url}
                                            alt={item.caption || "Media"}
                                            className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex aspect-square items-center justify-center bg-muted/20 text-[10px] text-muted-foreground uppercase">{item.type}</div>
                                )}
                                {item.caption && (
                                    <div className="mt-1.5 truncate px-1 text-center text-[9px] font-medium text-muted-foreground uppercase tracking-tight">
                                        {item.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {question.options.map((option: any, index: number) => {
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

                    const optionText = typeof option === 'string' ? option : option.text;
                    const optionImage = typeof option === 'object' ? option.imageUrl : null;

                    return (
                        <button
                            key={index}
                            onClick={() => !isSubmitted && setSelectedOption(index)}
                            disabled={isSubmitted}
                            className={clsx(
                                "flex w-full flex-col rounded-md border p-3 text-left transition-colors",
                                optionStyles
                            )}
                        >
                            <div className="flex items-center">
                                <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs opacity-70">
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-sm font-medium">
                                    {optionText}
                                </span>
                            </div>
                            {optionImage && (
                                <img src={optionImage} alt={`Option ${index}`} className="mt-3 h-auto max-w-[200px] rounded border border-border/50" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null || isSubmitted}
                    className="btn btn-primary"
                >
                    {isSubmitted ? "Submitted" : "Submit Answer"}
                </button>
            </div>

            {isSubmitted && (
                <div className="mt-6 rounded-md bg-muted-light/30 border border-border p-4">
                    <h4 className="mb-2 font-semibold text-foreground">Explanation:</h4>
                    <div
                        className="text-sm text-muted leading-relaxed parsed-markdown"
                        dangerouslySetInnerHTML={{
                            __html: (currentExplanation || "No explanation provided.")
                                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                        }}
                    />
                </div>
            )}

        </div>
    );
}
