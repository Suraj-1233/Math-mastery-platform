'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formulas } from '@/data/content';

export default function FormulasPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', ...Array.from(new Set(formulas.map(f => f.category)))];

    const filteredFormulas = formulas.filter(formula => {
        const matchesCategory = selectedCategory === 'All' || formula.category === selectedCategory;
        const matchesSearch = formula.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
            formula.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            formula.whenToUse.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Hard': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="text-4xl">📚</div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Math Mastery</h1>
                                <p className="text-sm text-purple-300">Formula Reference</p>
                            </div>
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="text-white hover:text-purple-300 transition">Home</Link>
                            <Link href="/modules" className="text-white hover:text-purple-300 transition">Modules</Link>
                            <Link href="/practice" className="text-white hover:text-purple-300 transition">Practice</Link>
                            <Link href="/formulas" className="text-purple-300 font-bold">Formulas</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-white mb-4">📐 Formula Reference</h2>
                    <p className="text-xl text-purple-200">
                        150+ mathematical formulas with memory tricks and usage guidelines
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-white font-bold mb-2">🔍 Search Formulas</label>
                            <input
                                type="text"
                                placeholder="Search by formula, category, or usage..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-white font-bold mb-2">📂 Filter by Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-xl font-medium transition ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-purple-300 text-sm">
                        Showing {filteredFormulas.length} of {formulas.length} formulas
                    </div>
                </div>

                {/* Formulas Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredFormulas.map((formula) => (
                        <div
                            key={formula.id}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                                    {formula.category}
                                </div>
                                <span className={`${getDifficultyColor(formula.difficulty)} text-white text-xs px-3 py-1 rounded-full`}>
                                    {formula.difficulty}
                                </span>
                            </div>

                            {/* Formula */}
                            <div className="bg-black/30 rounded-xl p-4 mb-4">
                                <div className="text-2xl font-bold text-white font-mono text-center">
                                    {formula.formula}
                                </div>
                            </div>

                            {/* Variables */}
                            <div className="mb-4">
                                <div className="text-sm font-bold text-purple-300 mb-2">📝 Variables:</div>
                                <div className="text-sm text-purple-100 bg-white/5 rounded-lg p-3">
                                    {formula.variables}
                                </div>
                            </div>

                            {/* When to Use */}
                            <div className="mb-4">
                                <div className="text-sm font-bold text-purple-300 mb-2">🎯 When to Use:</div>
                                <div className="text-sm text-purple-100 bg-white/5 rounded-lg p-3">
                                    {formula.whenToUse}
                                </div>
                            </div>

                            {/* Memory Trick */}
                            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-xl">💡</span>
                                    <div className="text-sm font-bold text-white">Memory Trick:</div>
                                </div>
                                <div className="text-sm text-purple-100 italic">
                                    "{formula.memoryTrick}"
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredFormulas.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No formulas found</h3>
                        <p className="text-purple-200">Try adjusting your search or filter</p>
                    </div>
                )}

                {/* Quick Tips */}
                <div className="mt-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">💡 Formula Mastery Tips</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-purple-200">
                        <div>
                            <div className="font-bold text-white mb-2">✓ Understand, don't memorize</div>
                            <p className="text-sm">Know why the formula works, not just what it is.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white mb-2">✓ Practice with variations</div>
                            <p className="text-sm">Apply formulas to different types of problems.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white mb-2">✓ Use memory tricks</div>
                            <p className="text-sm">Leverage the provided mnemonics for quick recall.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white mb-2">✓ Revise regularly</div>
                            <p className="text-sm">Review formulas every 3 days for retention.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-purple-300">
                        <p className="text-sm">📚 Math Mastery Platform - Formula Reference</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
