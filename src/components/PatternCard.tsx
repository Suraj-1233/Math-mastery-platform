'use client';

import React, { useState } from 'react';
import { QuestionPattern } from '@/data/patterns';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface PatternCardProps {
    pattern: QuestionPattern;
}

export default function PatternCard({ pattern }: PatternCardProps) {
    const { language, t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);

    // Helper to select content based on language
    const content = (en: string | undefined, hi: string | undefined) => (language === 'hi' && hi) ? hi : en;
    const trapPoints = (language === 'hi' && pattern.trapPointsHi) ? pattern.trapPointsHi : pattern.trapPoints;

    // ... colors remain same ...
    const difficultyColor = {
        'Easy': 'badge-success',
        'Medium': 'badge-warning',
        'Hard': 'badge-outline text-error border-error'
    };

    const frequencyColor = {
        'Very High': 'bg-purple-100 text-purple-800 border-purple-200',
        'High': 'bg-blue-100 text-blue-800 border-blue-200',
        'Medium': 'bg-gray-100 text-gray-800 border-gray-200',
        'Low': 'bg-slate-100 text-slate-800 border-slate-200'
    };

    return (
        <motion.div
            layout
            className="card-premium p-6 group flex flex-col"
        >
            {/* Header: Title & badges */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-xs font-mono text-primary font-semibold mb-1 block">
                        {pattern.topic.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {content(pattern.patternName, pattern.patternNameHi)}
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`badge ${difficultyColor[pattern.difficultyLevel]}`}>
                        {pattern.difficultyLevel}
                    </span>
                    <span className={`badge ${frequencyColor[pattern.frequency]}`}>
                        {pattern.frequency}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-muted text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                {content(pattern.description, pattern.descriptionHi)}
            </p>

            {/* Short Trick Highlight */}
            {pattern.shortTrick && (
                <div className="mb-4 bg-primary-light border border-primary/20 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">⚡</span>
                        <span className="text-primary font-bold text-xs uppercase tracking-wider">Short Trick</span>
                    </div>
                    <p className="text-primary font-mono text-sm leading-relaxed">
                        {content(pattern.shortTrick, pattern.shortTrickHi)}
                    </p>
                </div>
            )}

            {/* Expand Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-outline w-full gap-2 group/btn"
            >
                {isExpanded ? 'Show Less' : language === 'hi' ? t('viewSolution') : 'View Full Solution'}
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 space-y-4 border-t border-border mt-4">
                            {/* Example Question */}
                            <div>
                                <h4 className="text-sm font-semibold text-muted mb-2 flex items-center gap-2">
                                    <span className="text-warning">❓</span> {language === 'hi' ? t('question') : 'Example Question'}
                                </h4>
                                <div className="bg-muted-light p-4 rounded-md text-foreground text-sm italic">
                                    "{content(pattern.exampleQuestion, pattern.exampleQuestionHi)}"
                                </div>
                            </div>

                            {/* Solving Approach */}
                            <div>
                                <h4 className="text-sm font-semibold text-muted mb-2 flex items-center gap-2">
                                    <span className="text-success">✅</span> {language === 'hi' ? t('idealMethod') : 'Solution Approach'}
                                </h4>
                                <p className="text-foreground text-sm leading-relaxed">
                                    {content(pattern.solvingApproach, pattern.solvingApproachHi)}
                                </p>
                            </div>

                            {/* Trap Points */}
                            {trapPoints && trapPoints.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-error mb-2 flex items-center gap-2">
                                        <span>⚠️</span> {language === 'hi' ? t('trapPoint') : 'Watch Out For Traps!'}
                                    </h4>
                                    <ul className="list-disc list-inside text-error text-sm space-y-1">
                                        {trapPoints.map((trap, idx) => (
                                            <li key={idx}>{trap}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Time Estimate */}
                            <div className="flex items-center gap-2 text-xs text-muted pt-3 border-t border-border">
                                <span>⏱️ {t('estimatedTime')}: {pattern.timeToSolve} sec</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
