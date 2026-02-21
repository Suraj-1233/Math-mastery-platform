'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AnalyticsPage() {
    const { t, language } = useLanguage();
    // Mock Data for Visualization
    const stats = {
        questionsSolved: 1240,
        accuracy: 85,
        streak: 12,
        rank: 1542,
        hoursStudied: 42
    };

    const weakAreas = [
        { topic: 'Geometry', accuracy: 45, reason: 'Circle Theorems' },
        { topic: 'Trigonometry', accuracy: 52, reason: 'Height & Distance' },
        { topic: 'Mensuration', accuracy: 60, reason: '3D Formulas' }
    ];

    const performanceData = [
        { day: 'Mon', score: 65 },
        { day: 'Tue', score: 72 },
        { day: 'Wed', score: 68 },
        { day: 'Thu', score: 85 },
        { day: 'Fri', score: 82 },
        { day: 'Sat', score: 90 },
        { day: 'Sun', score: 88 }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="p-8 max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        {t('analyticsDashboard')} 📊
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {language === 'hi'
                            ? "अपने प्रदर्शन को ट्रैक करें और कमजोर क्षेत्रों को पहचानें।"
                            : "Track your performance, identify weak spots, and optimize your study plan."}
                    </p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Questions Solved</div>
                        <div className="text-4xl font-bold text-white">{stats.questionsSolved}</div>
                        <div className="text-green-400 text-xs mt-2">↑ 12% from last week</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Accuracy</div>
                        <div className="text-4xl font-bold text-white">{stats.accuracy}%</div>
                        <div className="text-yellow-400 text-xs mt-2">Needs Improvement</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Study Streak</div>
                        <div className="text-4xl font-bold text-white">{stats.streak} <span className="text-xl">Days</span></div>
                        <div className="text-orange-400 text-xs mt-2">🔥 Keep it up!</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Hours Studied</div>
                        <div className="text-4xl font-bold text-white">{stats.hoursStudied}h</div>
                        <div className="text-blue-400 text-xs mt-2">Total Time</div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Performance Graph */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-6">Weekly Performance</h3>
                        <div className="h-64 flex items-end gap-4 justify-between">
                            {performanceData.map((data, idx) => (
                                <div key={idx} className="flex flex-col items-center w-full group h-full justify-end">
                                    <div className="relative w-full flex justify-center flex-1 items-end px-2">
                                        <div
                                            style={{ height: `${data.score}%` }}
                                            className="w-full max-w-[40px] bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out relative"
                                        >
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
                                                {data.score}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-xs mt-3">{data.day}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Weak Areas */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-6">⚠️ Weak Areas</h3>
                        <div className="space-y-4">
                            {weakAreas.map((area, idx) => (
                                <div key={idx} className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-red-200">{area.topic}</span>
                                        <span className="text-xs bg-red-900/40 text-red-300 px-2 py-1 rounded border border-red-500/20">{area.accuracy}% Acc</span>
                                    </div>
                                    <p className="text-xs text-gray-400">Issue: <span className="text-gray-300">{area.reason}</span></p>
                                    <button className="mt-3 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold rounded border border-red-500/20 transition-colors">
                                        Practice Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
