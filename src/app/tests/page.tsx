'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockTests, TestType } from '@/data/mockTests';
import MockTestCard from '@/components/MockTestCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockTestsPage() {
    const [selectedType, setSelectedType] = useState<TestType | 'All'>('All');

    const filteredTests = mockTests.filter(test =>
        selectedType === 'All' || test.type === selectedType
    );

    return (
        <div className="min-h-screen bg-background pb-12">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Mock Test Simulator ⏱️</h1>
                    <p className="mt-1 text-sm text-muted">
                        Practice under real exam pressure with topic-wise drills, full mocks, and speed challenges.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelectedType('All')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedType === 'All' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-surface border border-border text-muted hover:text-foreground hover:bg-muted-light/50'}`}
                    >
                        All Tests
                    </button>
                    <button
                        onClick={() => setSelectedType('Topic')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedType === 'Topic' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-surface border border-border text-muted hover:text-foreground hover:bg-muted-light/50'}`}
                    >
                        Topic Tests
                    </button>
                    <button
                        onClick={() => setSelectedType('Sectional')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedType === 'Sectional' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-surface border border-border text-muted hover:text-foreground hover:bg-muted-light/50'}`}
                    >
                        Sectional Tests
                    </button>
                    <button
                        onClick={() => setSelectedType('Speed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedType === 'Speed' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-surface border border-border text-muted hover:text-foreground hover:bg-muted-light/50'}`}
                    >
                        Speed Drills ⚡
                    </button>
                </div>

                {/* Grid */}
                <main>
                    <AnimatePresence>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredTests.map((test) => (
                                <MockTestCard key={test.id} test={test} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredTests.length === 0 && (
                        <div className="rounded-lg border border-dashed border-border p-12 text-center bg-surface mt-6">
                            <p className="text-muted">No tests found for this category.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
