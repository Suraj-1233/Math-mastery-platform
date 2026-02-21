'use client';

import { conceptExplanations, ConceptExplanation } from '@/data/conceptExplanations';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConceptModalProps {
    conceptName: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ConceptModal({ conceptName, isOpen, onClose }: ConceptModalProps) {
    const { language } = useLanguage();

    if (!isOpen) return null;

    const conceptData = conceptExplanations[conceptName];

    if (!conceptData) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-2xl font-bold text-white mb-4">{language === 'hi' ? 'अवधारणा नहीं मिली' : 'Concept Not Found'}</h2>
                    <p className="text-purple-200">{language === 'hi' ? 'इस अवधारणा के लिए स्पष्टीकरण उपलब्ध नहीं है।' : 'Explanation not available for this concept.'}</p>
                    <button
                        onClick={onClose}
                        className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition"
                    >
                        {language === 'hi' ? 'बंद करें' : 'Close'}
                    </button>
                </div>
            </div>
        );
    }

    const concept: ConceptExplanation = conceptData[language];

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 max-w-3xl w-full border border-white/20 my-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{concept.title}</h2>
                        <p className="text-purple-300 italic">{concept.definition}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-purple-300 text-3xl font-bold transition"
                    >
                        ×
                    </button>
                </div>

                {/* Explanation */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-4 border border-white/10">
                    <h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center">
                        <span className="text-2xl mr-2">📖</span>
                        {language === 'hi' ? 'व्याख्या' : 'Explanation'}
                    </h3>
                    <p className="text-white leading-relaxed">{concept.explanation}</p>
                </div>

                {/* Formula */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl p-6 mb-4 border border-blue-300/20">
                    <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center">
                        <span className="text-2xl mr-2">📐</span>
                        {language === 'hi' ? 'सूत्र' : 'Formula'}
                    </h3>
                    <p className="text-white font-mono text-lg bg-black/30 p-4 rounded-lg">{concept.formula}</p>
                </div>

                {/* Example */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl p-6 mb-4 border border-green-300/20">
                    <h3 className="text-xl font-bold text-green-300 mb-3 flex items-center">
                        <span className="text-2xl mr-2">💡</span>
                        {language === 'hi' ? 'उदाहरण' : 'Example'}
                    </h3>
                    <p className="text-white">{concept.example}</p>
                </div>

                {/* Memory Trick */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-6 mb-4 border border-yellow-300/20">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🧠</span>
                        {language === 'hi' ? 'याद रखने की ट्रिक' : 'Memory Trick'}
                    </h3>
                    <p className="text-white font-semibold">{concept.memoryTrick}</p>
                </div>

                {/* Applications */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl p-6 mb-6 border border-purple-300/20">
                    <h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🎯</span>
                        {language === 'hi' ? 'उपयोग' : 'Applications'}
                    </h3>
                    <ul className="space-y-2">
                        {concept.applications.map((app, index) => (
                            <li key={index} className="text-white flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>{app}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition transform shadow-lg"
                >
                    {language === 'hi' ? 'समझ गया! बंद करें' : 'Got it! Close'}
                </button>
            </div>
        </div>
    );
}
