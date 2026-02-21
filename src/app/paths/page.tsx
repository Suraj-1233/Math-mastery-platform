'use client';

import React from 'react';
import Link from 'next/link';
import { learningPaths } from '@/data/learningPaths';
import LearningPathCard from '@/components/LearningPathCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function LearningPathsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header / Navbar */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="text-4xl group-hover:scale-110 transition-transform">📚</div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Math Mastery</h1>
                                <p className="text-sm text-cyan-400 font-mono">Learning Paths v1.0</p>
                            </div>
                        </Link>
                        <nav className="hidden xl:flex space-x-6 items-center">
                            <Link href="/modules" className="text-white hover:text-purple-300 transition">Modules</Link>
                            <Link href="/patterns" className="text-white hover:text-cyan-300 transition">Patterns</Link>
                            <Link href="/pyq" className="text-white hover:text-green-300 transition">PYQ</Link>
                            <Link href="/shortcuts" className="text-white hover:text-yellow-300 transition">Shortcuts</Link>
                            <Link href="/revision" className="text-white hover:text-pink-300 transition">Revision</Link>
                            <Link href="/tests" className="text-white hover:text-red-300 transition">Tests</Link>
                            <span className="text-blue-400 font-bold bg-white/10 px-3 py-1 rounded-lg">Paths 🛤️</span>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="p-8">
                <header className="max-w-7xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                        Structured Learning Paths 🛤️
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        Follow a guided, step-by-step roadmap to master complex topics. <span className="text-blue-400 font-bold">Stop random study, start structured learning.</span>
                    </p>
                </header>

                {/* Grid */}
                <main className="max-w-7xl mx-auto">
                    <AnimatePresence>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                        >
                            {learningPaths.map((path) => (
                                <LearningPathCard key={path.id} path={path} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {learningPaths.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No learning paths found.
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
