'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { pyqDatabase, ExamType } from '@/data/pyq';
import PYQCard from '@/components/PYQCard';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PYQPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExam, setSelectedExam] = useState<ExamType | 'All'>('All');
    const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
    const [selectedTopic, setSelectedTopic] = useState('All');

    // Get unique filters
    const uniqueExams = useMemo(() => ['All', ...Array.from(new Set(pyqDatabase.map(p => p.exam)))], []);
    const uniqueYears = useMemo(() => ['All', ...Array.from(new Set(pyqDatabase.map(p => p.year))).sort((a, b) => b - a)], []);
    const uniqueTopics = useMemo(() => ['All', ...Array.from(new Set(pyqDatabase.map(p => p.topic))).sort()], []);

    // Filter Logic
    const filteredPYQs = useMemo(() => {
        return pyqDatabase.filter(pyq => {
            const matchesExam = selectedExam === 'All' || pyq.exam === selectedExam;
            const matchesYear = selectedYear === 'All' || pyq.year === selectedYear;
            const matchesTopic = selectedTopic === 'All' || pyq.topic === selectedTopic;
            const matchesSearch = searchTerm === '' ||
                pyq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pyq.subtopic.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesExam && matchesYear && matchesTopic && matchesSearch;
        });
    }, [selectedExam, selectedYear, selectedTopic, searchTerm]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="p-8">
                <header className="max-w-7xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                        {t('pyqArchive')}
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        {language === 'hi'
                            ? "विस्तृत समाधान और पैटर्न विश्लेषण के साथ 2022-2023 के वास्तविक परीक्षा प्रश्न।"
                            : "Real exam questions from 2022-2023 with detailed solutions and pattern analysis."}
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">

                        {/* Search */}
                        <div className="relative w-full xl:w-96">
                            <input
                                type="text"
                                placeholder="Search questions (e.g. 'Shopkeeper')..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Filters Group */}
                        <div className="flex flex-wrap gap-4 items-center w-full xl:w-auto">

                            {/* Exam Filter */}
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 mb-1 ml-1 uppercase font-bold tracking-wider">Exam</label>
                                <select
                                    value={selectedExam}
                                    onChange={(e) => setSelectedExam(e.target.value as ExamType | 'All')}
                                    className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 cursor-pointer min-w-[160px]"
                                >
                                    {uniqueExams.map(exam => (
                                        <option key={exam} value={exam}>{exam}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 mb-1 ml-1 uppercase font-bold tracking-wider">Year</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                                    className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 cursor-pointer min-w-[120px]"
                                >
                                    {uniqueYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Topic Filter */}
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 mb-1 ml-1 uppercase font-bold tracking-wider">Topic</label>
                                <select
                                    value={selectedTopic}
                                    onChange={(e) => setSelectedTopic(e.target.value)}
                                    className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 cursor-pointer min-w-[180px]"
                                >
                                    {uniqueTopics.map(topic => (
                                        <option key={topic} value={topic}>{topic}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Results Count */}
                            <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 mt-5 h-[50px] flex items-center justify-center min-w-[100px]">
                                <span className="font-mono text-xl font-bold text-green-400">{filteredPYQs.length}</span>
                                <span className="text-xs text-gray-400 ml-2">Questions</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Grid */}
                <main className="max-w-7xl mx-auto">
                    <AnimatePresence>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredPYQs.map((pyq) => (
                                <PYQCard key={pyq.id} pyq={pyq} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredPYQs.length === 0 && (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-white mb-2">No Questions Found</h3>
                            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedExam('All');
                                    setSelectedTopic('All');
                                    setSelectedYear('All');
                                }}
                                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Floating Practice Button */}
            <Link
                href="/practice?mode=pyq"
                className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 z-50 group"
            >
                <span className="text-2xl">🏛️</span>
                <span>{language === 'hi' ? 'PYQ का अभ्यास करें' : 'Practice PYQ'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Link>
        </div>
    );
}
