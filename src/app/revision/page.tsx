'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { revisionSheets } from '@/data/revisionSheets';
import RevisionSheetCard from '@/components/RevisionSheetCard';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RevisionPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');

    // Get unique topics
    const uniqueTopics = useMemo(() => {
        const topics = new Set(revisionSheets.map(s => s.topic));
        return ['All', ...Array.from(topics)];
    }, []);

    // Filter Logic
    const filteredSheets = useMemo(() => {
        return revisionSheets.filter(sheet => {
            const matchesTopic = selectedTopic === 'All' || sheet.topic === selectedTopic;
            const matchesSearch = searchTerm === '' ||
                sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sheet.mustMemorize.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesTopic && matchesSearch;
        });
    }, [selectedTopic, searchTerm, revisionSheets, searchTerm]); // Added revisionSheets and searchTerm to dependency array for completeness

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="p-8">
                <header className="max-w-7xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                        {t('examNightRevision')} 📝
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        {language === 'hi'
                            ? "परीक्षा से पहले अंतिम मिनट की तैयारी के लिए शीट।"
                            : "Checklists, Formulas, and Last-Minute Tricks to revise before the exam."}
                        <span className="text-pink-400 font-bold">Don't enter the exam hall without checking these!</span>
                    </p>

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search topics (e.g. 'Algebra')..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </header>

                {/* Grid */}
                <main className="max-w-7xl mx-auto">
                    <AnimatePresence>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {filteredSheets.map((sheet) => (
                                <RevisionSheetCard key={sheet.id} sheet={sheet} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredSheets.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No revision sheets found.
                        </div>
                    )}
                </main>
            </div>

            {/* Floating Practice Button */}
            <Link
                href="/practice?mode=revision"
                className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 z-50 group"
            >
                <span className="text-2xl">📝</span>
                <span>{language === 'hi' ? 'रिवीजन का अभ्यास करें' : 'Practice Revision'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Link>
        </div>
    );
}
