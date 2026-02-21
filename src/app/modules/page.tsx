import Link from 'next/link';
import { modules } from '@/data/content';

export default function ModulesPage() {
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
                                <p className="text-sm text-purple-300">Learning Modules</p>
                            </div>
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="text-white hover:text-purple-300 transition">Home</Link>
                            <Link href="/modules" className="text-purple-300 font-bold">Modules</Link>
                            <Link href="/practice" className="text-white hover:text-purple-300 transition">Practice</Link>
                            <Link href="/formulas" className="text-white hover:text-purple-300 transition">Formulas</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">📚 All Learning Modules</h2>
                    <p className="text-xl text-purple-200">
                        {modules.length} comprehensive modules covering all topics from Geometry to Trigonometry
                    </p>
                </div>

                {/* Learning Path */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-12">
                    <h3 className="text-2xl font-bold text-white mb-4">🎯 Recommended Learning Path</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="bg-blue-500/20 rounded-xl p-4 mb-2">
                                <div className="text-3xl mb-2">📐</div>
                                <div className="text-white font-bold">Week 1</div>
                                <div className="text-sm text-purple-200">Foundation</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-500/20 rounded-xl p-4 mb-2">
                                <div className="text-3xl mb-2">🔺</div>
                                <div className="text-white font-bold">Week 2</div>
                                <div className="text-sm text-purple-200">Intermediate</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-500/20 rounded-xl p-4 mb-2">
                                <div className="text-3xl mb-2">📦</div>
                                <div className="text-white font-bold">Week 3</div>
                                <div className="text-sm text-purple-200">Mensuration</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-pink-500/20 rounded-xl p-4 mb-2">
                                <div className="text-3xl mb-2">📊</div>
                                <div className="text-white font-bold">Week 4</div>
                                <div className="text-sm text-purple-200">Advanced</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="space-y-6">
                    {modules.map((module, index) => (
                        <div
                            key={module.id}
                            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-6xl">{module.icon}</div>
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-2xl font-bold text-white">{module.name}</h3>
                                                <span className={`${module.color} text-white text-xs px-3 py-1 rounded-full`}>
                                                    {module.difficulty}
                                                </span>
                                            </div>
                                            <p className="text-purple-200">{module.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-purple-300">Module {index + 1} of {modules.length}</div>
                                        <div className="text-sm text-purple-300 mt-1">⏱️ {module.estimatedHours} hours</div>
                                    </div>
                                </div>

                                {/* Lessons */}
                                <div className="mt-6">
                                    <h4 className="text-lg font-bold text-white mb-3">📖 Lessons ({module.lessons.length})</h4>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {module.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h5 className="font-bold text-white text-sm">{lesson.name}</h5>
                                                    <span className="text-xs text-purple-300">{lesson.duration}min</span>
                                                </div>
                                                <div className="text-xs text-purple-200 space-y-1">
                                                    {lesson.concepts.slice(0, 2).map((concept, i) => (
                                                        <div key={i}>• {concept}</div>
                                                    ))}
                                                    {lesson.concepts.length > 2 && (
                                                        <div className="text-purple-400">+{lesson.concepts.length - 2} more</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="mt-6">
                                    <Link
                                        href={`/modules/${module.id}`}
                                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition transform"
                                    >
                                        <span>Start Module</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Study Tips */}
                <div className="mt-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">💡 Study Tips</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-purple-200">
                        <div>
                            <div className="font-bold text-white mb-2">✓ Follow the sequence</div>
                            <p className="text-sm">Modules are arranged in optimal learning order. Complete prerequisites first.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white mb-2">✓ Practice daily</div>
                            <p className="text-sm">Solve 40-60 questions daily for best results and retention.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white mb-2">✓ Revise formulas</div>
                            <p className="text-sm">Review formulas every 3 days to maintain muscle memory.</p>
                        </div>
                        <div>
                            <div className="font-bold text-white mb-2">✓ Take tests weekly</div>
                            <p className="text-sm">Module tests help identify weak areas and track progress.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-purple-300">
                        <p className="text-sm">📚 Math Mastery Platform - All Modules</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
