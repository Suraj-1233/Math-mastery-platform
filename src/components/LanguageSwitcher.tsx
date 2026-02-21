'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
            <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${language === 'en'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white'
                    }`}
            >
                English
            </button>
            <button
                onClick={() => setLanguage('hi')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${language === 'hi'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white'
                    }`}
            >
                हिंदी
            </button>
        </div>
    );
}
