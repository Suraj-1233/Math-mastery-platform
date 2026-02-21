'use client';

import { useParams, useRouter } from 'next/navigation';
import { modules } from '@/data/content';
import { useState } from 'react';
import ConceptModal from '@/components/ConceptModal';

export default function ModuleDetailPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = params.id as string;

    const module = modules.find(m => m.id === moduleId);
    const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
    const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

    if (!module) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Module Not Found</h1>
                    <p className="text-gray-300 mb-8">The module you're looking for doesn't exist.</p>
                    <button
                        onClick={() => router.push('/modules')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                    >
                        ← Back to Modules
                    </button>
                </div>
            </div>
        );
    }

    const currentIndex = modules.findIndex(m => m.id === moduleId);
    const previousModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
    const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">📚</span>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Math Mastery</h1>
                            <p className="text-sm text-gray-300">Module Details</p>
                        </div>
                    </div>
                    <nav className="flex gap-6">
                        <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
                        <a href="/modules" className="text-gray-300 hover:text-white transition-colors">Modules</a>
                        <a href="/practice" className="text-gray-300 hover:text-white transition-colors">Practice</a>
                        <a href="/formulas" className="text-gray-300 hover:text-white transition-colors">Formulas</a>
                    </nav>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/modules')}
                    className="mb-8 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                    <span>←</span> Back to All Modules
                </button>

                {/* Module Header */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-6xl">{module.icon}</span>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl font-bold text-white">{module.name}</h1>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${module.difficulty === 'Foundation' ? 'bg-green-500/20 text-green-300' :
                                        module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                                            'bg-red-500/20 text-red-300'
                                        }`}>
                                        {module.difficulty}
                                    </span>
                                </div>
                                <p className="text-xl text-gray-300">{module.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Module Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-black/20 rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-purple-300">{module.lessons.length}</div>
                            <div className="text-sm text-gray-400">Lessons</div>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-blue-300">{module.estimatedHours}h</div>
                            <div className="text-sm text-gray-400">Estimated Time</div>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-pink-300">
                                {module.lessons.reduce((acc, l) => acc + l.duration, 0)}min
                            </div>
                            <div className="text-sm text-gray-400">Total Duration</div>
                        </div>
                    </div>
                </div>

                {/* Lessons List */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <span>📖</span> Lessons
                    </h2>
                    <div className="space-y-4">
                        {module.lessons.map((lesson, index) => (
                            <div
                                key={lesson.id}
                                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all"
                            >
                                <button
                                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                                    className="w-full p-6 text-left flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-1">{lesson.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span>⏱️ {lesson.duration} min</span>
                                                <span>📚 {lesson.concepts.length} concepts</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-2xl text-gray-400">
                                        {expandedLesson === lesson.id ? '−' : '+'}
                                    </span>
                                </button>

                                {expandedLesson === lesson.id && (
                                    <div className="px-6 pb-6 border-t border-white/10 pt-4">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Concepts:</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {lesson.concepts.map((concept, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedConcept(concept)}
                                                    className="bg-black/20 hover:bg-black/30 rounded-lg p-3 text-sm text-gray-300 flex items-start gap-2 transition-all hover:scale-105 cursor-pointer text-left"
                                                >
                                                    <span className="text-green-400 mt-0.5">✓</span>
                                                    <span>{concept}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-purple-300 mt-3 text-center">💡 Click on any concept to learn more!</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => router.push(`/practice?module=${moduleId}`)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 text-left hover:scale-105 transition-transform"
                        >
                            <div className="text-3xl mb-2">💪</div>
                            <div className="font-semibold text-lg mb-1">Practice Questions</div>
                            <div className="text-sm opacity-90">Test your knowledge</div>
                        </button>
                        <button
                            onClick={() => router.push('/formulas')}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6 text-left hover:scale-105 transition-transform"
                        >
                            <div className="text-3xl mb-2">📐</div>
                            <div className="font-semibold text-lg mb-1">View Formulas</div>
                            <div className="text-sm opacity-90">Quick reference</div>
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    {previousModule ? (
                        <button
                            onClick={() => router.push(`/modules/${previousModule.id}`)}
                            className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all"
                        >
                            <span className="text-2xl">←</span>
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Previous Module</div>
                                <div className="text-white font-semibold">{previousModule.name}</div>
                            </div>
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {nextModule ? (
                        <button
                            onClick={() => router.push(`/modules/${nextModule.id}`)}
                            className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all"
                        >
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Next Module</div>
                                <div className="text-white font-semibold">{nextModule.name}</div>
                            </div>
                            <span className="text-2xl">→</span>
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>

            {/* Concept Explanation Modal */}
            <ConceptModal
                conceptName={selectedConcept || ''}
                isOpen={selectedConcept !== null}
                onClose={() => setSelectedConcept(null)}
            />
        </div>
    );
}
