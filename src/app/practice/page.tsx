'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { practiceQuestions } from '@/data/content';
import { pyqDatabase } from '@/data/pyq';
import { patterns } from '@/data/patterns';
import { shortcuts } from '@/data/shortcuts';
import { useEffect } from 'react';

// Declare MathJax global type
declare global {
    interface Window {
        MathJax?: {
            typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
            typeset?: (elements?: HTMLElement[]) => void;
        };
    }
}

export default function PracticePage() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || 'general'; // patterns, shortcuts, pyq, revision, or general

    // Filter questions based on mode
    const questions = useMemo(() => {
        switch (mode) {
            case 'patterns':
                // Convert patterns to question format
                return patterns.slice(0, 10).map((pattern, idx) => ({
                    id: `pattern_${idx}`,
                    question: pattern.exampleQuestion || pattern.description || '',
                    options: ['Option A', 'Option B', 'Option C', 'Option D'], // Placeholder
                    correctAnswer: 'Option A', // Placeholder
                    difficulty: pattern.difficultyLevel,
                    topic: pattern.topic,
                    module: 'Patterns',
                    timeEstimate: pattern.timeToSolve,
                    explanation: pattern.solvingApproach || '',
                    formulaUsed: pattern.shortTrick || ''
                }));
            case 'shortcuts':
                // Convert shortcuts to question format
                return shortcuts.slice(0, 10).map((shortcut, idx) => ({
                    id: `shortcut_${idx}`,
                    question: shortcut.example || shortcut.description || '',
                    options: ['Option A', 'Option B', 'Option C', 'Option D'], // Placeholder
                    correctAnswer: 'Option A', // Placeholder
                    difficulty: 'Medium',
                    topic: shortcut.category,
                    module: 'Shortcuts',
                    timeEstimate: 30,
                    explanation: shortcut.description || '',
                    formulaUsed: shortcut.formula || ''
                }));
            case 'pyq':
                // Use PYQ database
                return pyqDatabase.map(pyq => ({
                    id: pyq.id,
                    question: pyq.question,
                    options: pyq.options,
                    correctAnswer: pyq.correctAnswer,
                    difficulty: pyq.difficulty,
                    topic: pyq.topic,
                    module: `${pyq.exam} ${pyq.year}`,
                    timeEstimate: pyq.timeExpected,
                    explanation: pyq.idealMethod,
                    formulaUsed: pyq.formulaUsed?.join(', ') || ''
                }));
            case 'questionbank':
                // Removed static fallback in favor of DB routing
                return [];
            case 'revision':
                // Use general practice questions for revision
                return practiceQuestions;
            default:
                return practiceQuestions;
        }
    }, [mode]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

    // Re-render MathJax when question changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.MathJax?.typesetPromise) {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                window.MathJax?.typesetPromise?.();
            }, 50);
        }
    }, [currentQuestion, mode]);

    const question = questions[currentQuestion];

    const handleAnswerSelect = (answer: string) => {
        if (answeredQuestions.has(currentQuestion)) return;

        setSelectedAnswer(answer);
        setShowExplanation(true);

        if (answer === question.correctAnswer) {
            setScore(score + 1);
        }

        setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Hard': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    // Get mode-specific title
    const getModeTitle = () => {
        switch (mode) {
            case 'patterns': return 'Pattern Recognition Practice';
            case 'shortcuts': return 'Speed Shortcuts Practice';
            case 'pyq': return 'Previous Year Questions Practice';
            case 'revision': return 'Revision Practice';
            case 'questionbank': return 'Question Bank Challenge';
            default: return 'Practice Questions';
        }
    };

    const getModeIcon = () => {
        switch (mode) {
            case 'patterns': return '🎯';
            case 'shortcuts': return '⚡';
            case 'pyq': return '🏛️';
            case 'revision': return '📝';
            case 'questionbank': return '📚';
            default: return '💪';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Script
                id="mathjax-config"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.MathJax = {
                            tex: {
                                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                            },
                            options: {
                                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                            },
                        };
                    `,
                }}
            />
            <Script
                id="mathjax-script"
                src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                strategy="afterInteractive"
            />

            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="text-4xl">{getModeIcon()}</div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Math Mastery</h1>
                                <p className="text-sm text-purple-300">{getModeTitle()}</p>
                            </div>
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="text-white hover:text-purple-300 transition">Home</Link>
                            <Link href="/modules" className="text-white hover:text-purple-300 transition">Modules</Link>
                            <Link href="/practice" className="text-purple-300 font-bold">Practice</Link>
                            <Link href="/formulas" className="text-white hover:text-purple-300 transition">Formulas</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Practice Interface */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">Progress</span>
                        <span className="text-purple-300">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Score Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-purple-300">Current Score</div>
                            <div className="text-3xl font-bold text-white">{score} / {answeredQuestions.size}</div>
                        </div>
                        <div>
                            <div className="text-sm text-purple-300">Accuracy</div>
                            <div className="text-3xl font-bold text-white">
                                {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-purple-300">Time Est.</div>
                            <div className="text-3xl font-bold text-white">{question.timeEstimate}s</div>
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
                    {/* Question Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <span className={`${getDifficultyColor(question.difficulty)} text-white text-xs px-3 py-1 rounded-full`}>
                                {question.difficulty}
                            </span>
                            <span className="bg-purple-500/30 text-purple-200 text-xs px-3 py-1 rounded-full">
                                {question.topic}
                            </span>
                        </div>
                        <div className="text-purple-300 text-sm">
                            {question.module}
                        </div>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        <h3
                            className="text-2xl font-bold text-white mb-4 math-content"
                            dangerouslySetInnerHTML={{ __html: question.question }}
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === question.correctAnswer;
                            const showResult = showExplanation;

                            let bgClass = 'bg-white/5 hover:bg-white/10';
                            if (showResult) {
                                if (isCorrect) {
                                    bgClass = 'bg-green-500/30 border-green-500';
                                } else if (isSelected && !isCorrect) {
                                    bgClass = 'bg-red-500/30 border-red-500';
                                }
                            } else if (isSelected) {
                                bgClass = 'bg-purple-500/30 border-purple-500';
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={answeredQuestions.has(currentQuestion)}
                                    className={`w-full text-left p-4 rounded-xl border border-white/10 transition ${bgClass} ${answeredQuestions.has(currentQuestion) ? 'cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <div className="text-white font-medium" dangerouslySetInnerHTML={{ __html: option }} />
                                        {showResult && isCorrect && <span className="ml-auto text-green-400">✓</span>}
                                        {showResult && isSelected && !isCorrect && <span className="ml-auto text-red-400">✗</span>}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    {showExplanation && (
                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 mb-6">
                            <h4 className="text-lg font-bold text-white mb-3">💡 Explanation</h4>
                            <p className="text-purple-100 mb-4">{question.explanation}</p>
                            <div className="bg-white/10 rounded-lg p-3">
                                <div className="text-sm text-purple-300 mb-1">Formula Used:</div>
                                <div className="text-white font-mono">{question.formulaUsed}</div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                            className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next →
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-500/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30 text-center">
                        <div className="text-2xl font-bold text-green-300">{score}</div>
                        <div className="text-sm text-white">Correct</div>
                    </div>
                    <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 border border-red-500/30 text-center">
                        <div className="text-2xl font-bold text-red-300">{answeredQuestions.size - score}</div>
                        <div className="text-sm text-white">Incorrect</div>
                    </div>
                    <div className="bg-purple-500/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 text-center">
                        <div className="text-2xl font-bold text-purple-300">{questions.length - answeredQuestions.size}</div>
                        <div className="text-sm text-white">Remaining</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-purple-300">
                        <p className="text-sm">📚 Math Mastery Platform - Practice Mode</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
