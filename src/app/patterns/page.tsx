'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { patterns } from '@/data/patterns';
import PatternCard from '@/components/PatternCard';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatternsPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [sortBy, setSortBy] = useState<'frequency' | 'difficulty'>('frequency');

    // Get unique topics
    const uniqueTopics = useMemo(() => {
        const topics = new Set(patterns.map(p => p.topic));
        return [language === 'hi' ? 'सभी' : 'All', ...Array.from(topics)];
    }, [language]);

    // Filter and Sort patterns
    const filteredPatterns = useMemo(() => {
        let result = patterns;

        // Filter by Topic
        if (selectedTopic !== 'All' && selectedTopic !== 'सभी') {
            result = result.filter(p => p.topic === selectedTopic);
        }

        // Filter by Search
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(p =>
                (p.patternName && p.patternName.toLowerCase().includes(lowerSearch)) ||
                (p.description && p.description.toLowerCase().includes(lowerSearch)) ||
                (p.shortTrick && p.shortTrick.toLowerCase().includes(lowerSearch)) ||
                (p.patternNameHi && p.patternNameHi.toLowerCase().includes(lowerSearch))
            );
        }

        // Sort
        return result.sort((a, b) => {
            if (sortBy === 'frequency') {
                const freqOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
                return (freqOrder[b.frequency] || 0) - (freqOrder[a.frequency] || 0);
            } else {
                const diffOrder = { 'Hard': 3, 'Medium': 2, 'Easy': 1 };
                return (diffOrder[b.difficultyLevel] || 0) - (diffOrder[a.difficultyLevel] || 0);
            }
        });
    }, [searchTerm, selectedTopic, sortBy, language]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
                            {t('patternRecognizer')}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            {language === 'hi'
                                ? "परीक्षा में बार-बार आने वाले पैटर्न को पहचानें और उन्हें सेकंडों में हल करें।"
                                : "Identify recurring exam traps and solve them in seconds."}
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                            />
                            <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <select
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer min-w-[120px] text-sm"
                            >
                                {uniqueTopics.map(topic => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>

                            <div className="flex border border-white/20 rounded-lg overflow-hidden shrink-0">
                                <button
                                    onClick={() => setSortBy('frequency')}
                                    className={`px-3 py-2 text-xs font-medium transition-colors ${sortBy === 'frequency' ? 'bg-cyan-600 text-white' : 'bg-black/40 text-gray-400 hover:text-white'}`}
                                >
                                    Freq
                                </button>
                                <button
                                    onClick={() => setSortBy('difficulty')}
                                    className={`px-3 py-2 text-xs font-medium transition-colors ${sortBy === 'difficulty' ? 'bg-cyan-600 text-white' : 'bg-black/40 text-gray-400 hover:text-white'}`}
                                >
                                    Diff
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <AnimatePresence>
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredPatterns.map((pattern) => (
                            <PatternCard key={pattern.id} pattern={pattern} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredPatterns.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No patterns found matching your search.
                    </div>
                )}
            </main>

            {/* Floating Practice Button */}
            <Link
                href="/practice?mode=patterns"
                className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 z-50 group"
            >
                <span className="text-2xl">🎯</span>
                <span>{language === 'hi' ? 'पैटर्न का अभ्यास करें' : 'Practice Patterns'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Link>
        </div>
    );
}
