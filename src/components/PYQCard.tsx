'use client';

import React, { useState } from 'react';
import { PYQ } from '@/data/pyq';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface PYQCardProps {
    pyq: PYQ;
}

export default function PYQCard({ pyq }: PYQCardProps) {
    const { t, language } = useLanguage();
    const [showSolution, setShowSolution] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Content Helper
    const content = (en: string, hi?: string) => (language === 'hi' && hi) ? hi : en;

    const handleOptionSelect = (option: string) => {
        if (showSolution) return; // Prevent changing after solution shown
        setSelectedOption(option);
    };

    const isCorrect = (option: string) => option === pyq.correctAnswer;
    const isSelected = (option: string) => option === selectedOption;

    const getOptionStyle = (option: string) => {
        if (!selectedOption && !showSolution) {
            return 'bg-surface hover:bg-muted-light text-foreground border-border hover:border-border-hover';
        }
        if (isSelected(option)) {
            if (!showSolution) return 'bg-primary-light text-primary border-primary ring-1 ring-primary';
            if (isCorrect(option)) return 'bg-success-light text-success border-success ring-1 ring-success';
            return 'bg-error-light text-error border-error ring-1 ring-error';
        }
        if (showSolution && isCorrect(option)) {
            return 'bg-success-light text-success border-success ring-1 ring-success';
        }
        return 'bg-surface text-muted border-border opacity-50';
    };

    return (
        <motion.div
            layout
            className="card-premium p-6 group flex flex-col"
        >
            {/* Header: Exam Tag & Topic */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 items-center flex-wrap">
                    <span className="badge badge-primary">
                        {pyq.exam} {pyq.year}
                    </span>
                    <span className="text-muted">•</span>
                    <span className="text-foreground font-semibold text-sm">
                        {content(pyq.topic)}
                    </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted">{pyq.shift}</span>
                    <span className={`badge ${pyq.difficulty === 'Easy' ? 'badge-success' :
                            pyq.difficulty === 'Medium' ? 'badge-warning' :
                                'badge-outline' // Hard or default
                        }`}>
                        {pyq.difficulty.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Question */}
            <h3 className="text-base font-medium text-foreground mb-6 leading-relaxed">
                {content(pyq.question, pyq.questionHi)}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {pyq.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={showSolution}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${getOptionStyle(option)}`}
                    >
                        <span className="opacity-50 mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {option}
                    </button>
                ))}
            </div>

            {/* Show Solution Button */}
            {!showSolution ? (
                <button
                    onClick={() => setShowSolution(true)}
                    className="btn btn-primary w-full"
                >
                    {t('viewSolution')} 💡
                </button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-4 border-t border-white/10"
                >
                    {/* Ideal Method */}
                    <div className="bg-success-light border border-success/20 p-4 rounded-md">
                        <h4 className="text-sm font-semibold text-success flex items-center gap-2 mb-2">
                            <span>🚀 {t('idealMethod')}</span>
                            <span className="text-xs bg-success text-white px-1.5 py-0.5 rounded">
                                {pyq.timeExpected}s
                            </span>
                        </h4>
                        <p className="text-success text-sm leading-relaxed">
                            {content(pyq.idealMethod, pyq.idealMethodHi)}
                        </p>
                    </div>

                    {/* Analysis Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Trap */}
                        {pyq.commonTrap && (
                            <div className="border border-error/20 bg-error-light p-3 rounded-md">
                                <h5 className="text-xs font-semibold text-error mb-1 uppercase tracking-wider">⚠️ {t('trapPoint')}</h5>
                                <p className="text-error text-xs leading-relaxed">{content(pyq.commonTrap)}</p>
                            </div>
                        )}

                        {/* Type */}
                        <div className="border border-primary/20 bg-primary-light p-3 rounded-md">
                            <h5 className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">🧠 Type</h5>
                            <p className="text-primary text-xs leading-relaxed">{pyq.type}</p>
                        </div>
                    </div>

                    {/* Link to Pattern */}
                    {pyq.patternId && (
                        <div className="text-center pt-2">
                            <span className="text-xs text-gray-500">
                                Pattern: <span className="text-cyan-400 font-mono hover:underline cursor-pointer">{pyq.patternId}</span>
                            </span>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
