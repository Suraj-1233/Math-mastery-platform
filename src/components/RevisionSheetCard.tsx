'use client';

import React, { useState } from 'react';
import { RevisionSheet } from '@/data/revisionSheets';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface RevisionSheetCardProps {
    sheet: RevisionSheet;
}

export default function RevisionSheetCard({ sheet }: RevisionSheetCardProps) {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'memorize' | 'tricks' | 'mistakes'>('memorize');

    // Checkbox state (local only for now)
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // Content Helper
    const content = (en: string, hi?: string) => (language === 'hi' && hi) ? hi : en;
    const contentList = (en: string[], hi?: string[]) => (language === 'hi' && hi) ? hi : en;

    const toggleCheck = (item: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    // Derived Lists based on Language
    const memorizeList = contentList(sheet.mustMemorize, sheet.mustMemorizeHi);
    const tricksList = contentList(sheet.crucialTricks, sheet.crucialTricksHi);
    const mistakesList = contentList(sheet.commonMistakes, sheet.commonMistakesHi);
    const checklist = contentList(sheet.patternChecklist, sheet.patternChecklistHi);

    return (
        <motion.div
            layout
            className="card-premium flex flex-col h-full overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-border bg-muted-light/30">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-mono text-primary font-semibold mb-1 block uppercase tracking-wider">
                            {content(sheet.topic)}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">
                            {content(sheet.title, sheet.titleHi)}
                        </h3>
                    </div>
                </div>
                <p className="text-muted text-sm mt-2 line-clamp-2">
                    {content(sheet.description, sheet.descriptionHi)}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
                <button
                    onClick={() => setActiveTab('memorize')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'memorize' ? 'text-primary border-primary bg-primary-light' : 'text-muted border-transparent hover:text-foreground'}`}
                >
                    {language === 'hi' ? 'याद रखें 🧠' : 'Memorize 🧠'}
                </button>
                <button
                    onClick={() => setActiveTab('tricks')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'tricks' ? 'text-warning border-warning bg-warning-light' : 'text-muted border-transparent hover:text-foreground'}`}
                >
                    {language === 'hi' ? 'ट्रिक्स ⚡' : 'Tricks ⚡'}
                </button>
                <button
                    onClick={() => setActiveTab('mistakes')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'mistakes' ? 'text-error border-error bg-error-light' : 'text-muted border-transparent hover:text-foreground'}`}
                >
                    {language === 'hi' ? 'गलतियाँ ⚠️' : 'Mistakes ⚠️'}
                </button>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-grow relative min-h-[250px] bg-surface">
                <AnimatePresence mode="wait">
                    {activeTab === 'memorize' && (
                        <motion.div
                            key="memorize"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="space-y-3"
                        >
                            <h4 className="text-xs font-bold text-primary uppercase mb-3">
                                {language === 'hi' ? 'आवश्यक सूत्र' : 'Essential Formulas'}
                            </h4>
                            <ul className="space-y-3">
                                {memorizeList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-primary-light p-3 rounded-md border border-primary/20 text-sm text-primary font-mono font-medium">
                                        <span className="text-primary mt-0.5">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {activeTab === 'tricks' && (
                        <motion.div
                            key="tricks"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="space-y-3"
                        >
                            <h4 className="text-xs font-bold text-warning uppercase mb-3">
                                {language === 'hi' ? 'प्रमुख शॉर्टकट्स' : 'Top Shortcuts'}
                            </h4>
                            <ul className="space-y-3">
                                {tricksList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-warning-light p-3 rounded-md border border-warning/20 text-sm text-warning font-semibold italic">
                                        <span className="text-warning mt-0.5">⚡</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {activeTab === 'mistakes' && (
                        <motion.div
                            key="mistakes"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="space-y-3"
                        >
                            <h4 className="text-xs font-bold text-error uppercase mb-3">
                                {language === 'hi' ? 'आम गलतियाँ (Common Pitfalls)' : 'Common Pitfalls'}
                            </h4>
                            <ul className="space-y-3">
                                {mistakesList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-error-light p-3 rounded-md border border-error/20 text-sm text-error font-medium">
                                        <span className="text-error mt-0.5">❌</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Checklist Footer */}
            <div className="p-4 bg-muted-light border-t border-border">
                <div className="text-xs font-bold text-muted mb-3 uppercase tracking-wide">
                    {language === 'hi' ? 'पैटर्न जाँच (Checklist)' : 'Pattern Checklist'}
                </div>
                <div className="flex flex-wrap gap-2">
                    {checklist.map((pattern, idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleCheck(pattern)}
                            className={`badge px-3 py-1.5 transition-all flex items-center gap-2 ${checkedItems[pattern]
                                ? 'badge-success line-through opacity-80'
                                : 'badge-outline hover:bg-muted-light'
                                }`}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${checkedItems[pattern] ? 'border-success bg-success' : 'border-muted'
                                }`}>
                                {checkedItems[pattern] && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            {pattern}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
