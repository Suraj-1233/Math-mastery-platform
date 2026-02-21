'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { shortcuts, ShortcutCategory } from '@/data/shortcuts';
import ShortcutCard from '@/components/ShortcutCard';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShortcutsPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ShortcutCategory | 'All'>('All');

    // Get unique categories
    const categories: ShortcutCategory[] = ['Calculation', 'Percentage', 'Algebra', 'Geometry', 'Number System', 'Trigonometry'];

    // Filter Logic
    const filteredShortcuts = useMemo(() => {
        return shortcuts.filter(s => {
            const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
            const matchesSearch = searchTerm === '' ||
                s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="p-8">
                <header className="max-w-7xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        {t('speedHub')} ⚡
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        {language === 'hi'
                            ? "प्रश्नों को 30 सेकंड से कम समय में हल करने के लिए मानसिक गणित की ट्रिक्स और सूत्र।"
                            : "Master mental math tricks, formulas, and calculation hacks to solve questions in under 30 seconds."}
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">

                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search shortcuts (e.g. 'Square 50')..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Category Buttons */}
                        <div className="flex gap-2 items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === 'All' ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
                            >
                                All Tricks
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Grid */}
                <main className="max-w-7xl mx-auto">
                    <AnimatePresence>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredShortcuts.map((shortcut) => (
                                <ShortcutCard key={shortcut.id} shortcut={shortcut} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredShortcuts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No shortcuts found. Try searching for "Digital Sum" or "Square".
                        </div>
                    )}
                </main>
            </div>

            {/* Floating Practice Button */}
            <Link
                href="/practice?mode=shortcuts"
                className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-6 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 z-50 group"
            >
                <span className="text-2xl">⚡</span>
                <span>{language === 'hi' ? 'शॉर्टकट्स का अभ्यास करें' : 'Practice Shortcuts'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Link>
        </div>
    );
}
