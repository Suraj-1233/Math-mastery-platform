'use client';

import React, { useState, useEffect, useRef } from 'react';
export interface Question {
    id: string;
    question_number?: number;
    question_text: string;
    question_text_hi?: string;
    topic: string;
    exam?: string;
    year: number;
    difficulty: string;
    imageUrl?: string;
    options: string[];
    answer?: string;
    page?: number;
}
import { motion } from 'framer-motion';

// Declare MathJax global type
declare global {
    interface Window {
        MathJax?: {
            typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
            typeset?: (elements?: HTMLElement[]) => void;
        };
    }
}

interface QuestionCardProps {
    question: Question;
    index: number;
}

export default function QuestionBankCard({ question, index }: QuestionCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [lang, setLang] = useState<'en' | 'hi'>('en');
    const cardRef = useRef<HTMLDivElement>(null);

    // Re-render MathJax when question changes or language changes
    useEffect(() => {
        if (cardRef.current && window.MathJax?.typesetPromise) {
            window.MathJax.typesetPromise([cardRef.current]).catch(() => { });
        }
    }, [question, showAnswer, lang]);

    const getTopicColor = (topic: string): string => {
        const colors: Record<string, string> = {
            'Number System': 'from-blue-500 to-cyan-500',
            'Percentage': 'from-green-500 to-emerald-500',
            'Profit & Loss': 'from-yellow-500 to-amber-500',
            'Algebra': 'from-purple-500 to-violet-500',
            'Trigonometry': 'from-pink-500 to-rose-500',
            'Geometry': 'from-indigo-500 to-blue-500',
            'Mensuration': 'from-orange-500 to-red-500',
            'Time Speed Distance': 'from-teal-500 to-green-500',
            'Time & Work': 'from-cyan-500 to-blue-500',
            'Simple Interest': 'from-lime-500 to-green-500',
            'Compound Interest': 'from-emerald-500 to-teal-500',
            'Ratio & Proportion': 'from-fuchsia-500 to-pink-500',
            'Average': 'from-sky-500 to-blue-500',
            'Mixture & Alligation': 'from-amber-500 to-orange-500',
            'Pipe & Cistern': 'from-slate-500 to-gray-500',
            'Age Problems': 'from-violet-500 to-purple-500',
            'Simplification': 'from-red-500 to-orange-500',
            'Coordinate Geometry': 'from-rose-500 to-pink-500',
            'Probability': 'from-indigo-500 to-violet-500',
            'Permutation & Combination': 'from-cyan-500 to-teal-500',
            'Data Interpretation': 'from-blue-500 to-indigo-500',
            'Partnership': 'from-green-500 to-lime-500',
        };
        return colors[topic] || 'from-gray-500 to-slate-500';
    };

    const getDifficultyStyle = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'badge-success';
            case 'Medium': return 'badge-warning';
            case 'Hard': return 'badge-error';
            default: return 'badge-outline';
        }
    };

    const getOptionStyle = (idx: number) => {
        if (selectedOption === null) {
            return 'bg-surface hover:bg-muted-light text-foreground border-border cursor-pointer';
        }
        if (showAnswer && question.answer) {
            const correctIdx = question.options.findIndex(o => o === question.answer);
            if (idx === correctIdx) return 'bg-success-light text-success border-success ring-1 ring-success';
            if (idx === selectedOption) return 'bg-error-light text-error border-error ring-1 ring-error';
        }
        if (idx === selectedOption) return 'bg-primary-light text-primary border-primary ring-1 ring-primary';
        return 'bg-surface text-muted border-border opacity-50';
    };

    const displayText = (lang === 'hi' && question.question_text_hi)
        ? question.question_text_hi
        : question.question_text;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
            className="card-premium relative overflow-hidden flex flex-col group"
        >
            {/* Top gradient accent */}
            <div className={`h-1 w-full bg-gradient-to-r ${getTopicColor(question.topic)}`} />

            <div className="p-6 flex flex-col flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                        <span className={`bg-gradient-to-r ${getTopicColor(question.topic)} bg-clip-text text-transparent font-bold text-sm tracking-wide`}>
                            {question.topic}
                        </span>
                        {question.exam && (
                            <span className="badge badge-primary font-mono text-[10px]">
                                {question.exam} {question.year > 0 ? question.year : ''}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        {question.question_text_hi && (
                            <button
                                onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
                                className="px-2 py-0.5 text-[10px] font-bold border border-border text-muted rounded hover:bg-muted-light uppercase transition-colors"
                            >
                                {lang === 'en' ? '🇮🇳 HI' : '🇺🇸 EN'}
                            </button>
                        )}
                        <span className={`badge ${getDifficultyStyle(question.difficulty)}`}>
                            {question.difficulty.toUpperCase()}
                        </span>
                        <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className="text-lg transition-transform hover:scale-110 active:scale-90"
                        >
                            {isBookmarked ? '⭐' : '☆'}
                        </button>
                    </div>
                </div>

                {/* Question Image */}
                {question.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-border bg-muted-light/30">
                        <img
                            src={question.imageUrl}
                            alt="Question Diagram"
                            className="w-full h-auto object-contain max-h-64 mx-auto"
                        />
                    </div>
                )}

                {/* Question Number & Text */}
                <div className="mb-6">
                    <span className="text-xs text-muted font-mono mb-2 block">
                        Q.{question.question_number || question.id}
                    </span>
                    <h3
                        className="text-base font-medium text-foreground leading-relaxed math-content"
                        dangerouslySetInnerHTML={{ __html: displayText }}
                    />
                </div>

                {/* Options */}
                {question.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {question.options.map((option: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (!showAnswer) setSelectedOption(idx);
                                }}
                                disabled={showAnswer}
                                className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${getOptionStyle(idx)}`}
                            >
                                <span className="opacity-60 mr-2 font-mono uppercase text-xs">{String.fromCharCode(97 + idx)})</span>
                                <span dangerouslySetInnerHTML={{ __html: option }} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                    {selectedOption !== null && !showAnswer && (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="btn btn-primary btn-sm rounded-full px-5"
                        >
                            Check Answer 💡
                        </button>
                    )}
                    {showAnswer && (
                        <button
                            onClick={() => { setSelectedOption(null); setShowAnswer(false); }}
                            className="btn btn-outline btn-sm rounded-full px-5"
                        >
                            Reset 🔄
                        </button>
                    )}
                    <span className="text-[10px] text-muted font-mono ml-auto tracking-wider uppercase">
                        Page {question.page}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
