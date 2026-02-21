'use client';

import React from 'react';
import { Shortcut } from '@/data/shortcuts';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShortcutCardProps {
    shortcut: Shortcut;
}

export default function ShortcutCard({ shortcut }: ShortcutCardProps) {
    const { t, language } = useLanguage();

    // Content Helper
    const content = (en: string, hi?: string) => (language === 'hi' && hi) ? hi : en;

    const categoryColor: Record<string, string> = {
        'Calculation': 'badge-primary',
        'Percentage': 'badge-primary',
        'Algebra': 'badge-secondary',
        'Geometry': 'badge-secondary',
        'Number System': 'badge-warning',
        'Trigonometry': 'badge-primary'
    };

    const iconMap: Record<string, string> = {
        'Calculation': '🧮',
        'Percentage': '📊',
        'Algebra': '✖️',
        'Geometry': '📐',
        'Number System': '🔢',
        'Trigonometry': '🔺'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="card-premium flex flex-col h-full overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-border relative overflow-hidden bg-muted-light/30">
                <div className={`absolute top-0 right-0 p-2 opacity-10 text-6xl select-none`}>
                    {iconMap[shortcut.category]}
                </div>

                <div className="relative z-10">
                    <span className={`badge ${categoryColor[shortcut.category]}`}>
                        {content(shortcut.category)}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-3 mb-1">
                        {content(shortcut.title, shortcut.titleHi)}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow space-y-4">
                {/* Description */}
                <p className="text-muted text-sm leading-relaxed">
                    {content(shortcut.description || '', shortcut.descriptionHi)}
                </p>

                {/* Formula Box (if exists) */}
                {shortcut.formula && (
                    <div className="bg-primary-light rounded-md p-4 text-center border border-primary/20">
                        <code className="text-primary font-mono text-sm font-semibold">
                            {shortcut.formula}
                        </code>
                    </div>
                )}

                {/* Example Section */}
                <div className="bg-warning-light rounded-md p-4 border-l-4 border-warning">
                    <div className="text-xs text-warning font-bold mb-1 uppercase tracking-wider">
                        {language === 'hi' ? 'उदाहरण' : 'Example'}
                    </div>
                    <p className="text-sm text-foreground font-mono">
                        {content(shortcut.example, shortcut.exampleHi)}
                    </p>
                </div>

                {/* When to Use */}
                <div className="pt-4 border-t border-border mt-auto">
                    <div className="flex items-start gap-2">
                        <span className="text-success text-xs mt-0.5">🚀</span>
                        <p className="text-xs text-muted">
                            <span className="text-foreground font-bold uppercase mr-1">
                                {language === 'hi' ? 'उपयोगी' : 'Best For'}:
                            </span>
                            {content(shortcut.whenToUse, shortcut.whenToUseHi)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
