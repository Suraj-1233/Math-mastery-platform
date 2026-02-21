'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
    const { t } = useLanguage();

    return (
        <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="text-4xl group-hover:scale-110 transition-transform">📚</div>
                            <div>
                                <h1 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{t('appName')}</h1>
                                <p className="text-sm text-purple-300 group-hover:text-white transition-colors">{t('tagline')}</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav className="hidden xl:flex space-x-1 items-center overflow-x-auto no-scrollbar max-w-[800px]">
                            <Link href="/" className="text-white hover:text-purple-300 transition px-2 py-2 text-sm whitespace-nowrap">{t('home')}</Link>
                            <Link href="/modules" className="text-white hover:text-purple-300 transition px-2 py-2 text-sm whitespace-nowrap">{t('modules')}</Link>
                            <Link href="/patterns" className="text-white hover:text-cyan-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg text-sm whitespace-nowrap ml-1">{t('patterns')} 🔥</Link>
                            <Link href="/pyq" className="text-white hover:text-green-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap">{t('pyq')} 🏛️</Link>
                            <Link href="/questions" className="text-white hover:text-amber-300 transition font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap border border-purple-500/30">{t('questionBank')} 📚</Link>
                            <Link href="/shortcuts" className="text-white hover:text-yellow-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap">{t('shortcuts')} ⚡</Link>
                            <Link href="/revision" className="text-white hover:text-pink-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap">{t('revision')} 📝</Link>
                            <Link href="/tests" className="text-white hover:text-red-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap">{t('tests')} 🎯</Link>
                            <Link href="/paths" className="text-white hover:text-blue-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap">{t('paths')} 🛤️</Link>
                            <Link href="/analytics" className="text-white hover:text-purple-300 transition font-bold bg-white/10 px-3 py-1 rounded-lg ml-1 text-sm whitespace-nowrap">{t('analytics')} 📊</Link>
                        </nav>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
}
