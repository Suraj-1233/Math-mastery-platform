import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { mockTests } from '@/data/mockTests';
import { ClientResultActions } from '@/components/ClientResultActions';
import { Target, Trophy, CheckCircle, XCircle, TrendingUp, Clock, Lock } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { auth } from '@/auth';
import { QuestionReviewList } from '@/components/QuestionReviewList';

export default async function TestResultPage({
    params,
    searchParams
}: {
    params: Promise<{ testId: string }>,
    searchParams: Promise<{ attemptId?: string }>
}) {
    const resolvedParams = await params;
    const resolvedSearch = await searchParams;

    if (!resolvedSearch.attemptId) return notFound();

    const attempt = await prisma.userTestAttempt.findUnique({
        where: { id: resolvedSearch.attemptId },
        include: { user: { select: { name: true } } }
    });

    if (!attempt || attempt.testId !== resolvedParams.testId) return notFound();

    // Fetch test metadata
    let testMeta: any = mockTests.find(t => t.id === resolvedParams.testId);
    let isOrgTest = false;
    let resultsDisclosed = true; // default true for non-org tests

    if (!testMeta) {
        // Database-backed test (org / admin created)
        const dbTest = await prisma.test.findUnique({
            where: { id: resolvedParams.testId },
        });
        if (!dbTest) return notFound();

        isOrgTest = !!dbTest.organizationId;

        // Use raw SQL to get resultsDisclosed since field may not be in Prisma client
        if (isOrgTest) {
            const rawTest: any[] = await prisma.$queryRawUnsafe(
                `SELECT CAST(resultsDisclosed AS TEXT) as rd FROM Test WHERE id = ?`,
                resolvedParams.testId
            );
            resultsDisclosed = rawTest.length > 0 ? rawTest[0].rd === '1' : false;
        }

        testMeta = {
            id: dbTest.id,
            title: dbTest.title,
            titleHi: dbTest.titleHi || '',
            description: dbTest.description,
            type: dbTest.type || 'Full',
            duration: dbTest.duration,
            questionCount: dbTest.questionCount,
            difficulty: dbTest.difficulty || 'Medium',
            totalMarks: dbTest.totalMarks,
            negativeMarking: dbTest.negativeMarking,
        };
    }

    // Check user identity
    const session = await auth();
    const userId = session?.user?.id;
    const userRole = (session?.user as any)?.role;

    // For org tests: only show results if disclosed OR user is admin/owner/teacher
    const isStaff = ['ADMIN', 'ORG_OWNER', 'TEACHER'].includes(userRole);
    const canSeeResults = !isOrgTest || resultsDisclosed || isStaff;

    // ── RESULTS NOT YET DISCLOSED ──
    if (!canSeeResults) {
        return (
            <div className="min-h-screen bg-muted-light/30 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-surface border border-border rounded-3xl p-10 shadow-lg">
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-amber-500" />
                        </div>
                        <h1 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                            Exam Submitted Successfully ✅
                        </h1>
                        <p className="text-muted text-sm leading-relaxed mb-6">
                            Your response has been recorded. Results for this exam will be
                            available once your institution releases them.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
                            <p className="text-xs font-bold text-amber-700">
                                ⏳ Results are pending disclosure by your organization admin.
                                You will be notified when results are published.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Link
                                href="/org/dashboard"
                                className="btn btn-primary w-full"
                            >
                                Back to Dashboard
                            </Link>
                            <Link
                                href="/tests"
                                className="btn btn-outline w-full"
                            >
                                Take Another Test
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── FULL RESULTS (disclosed or non-org test) ──
    const rank = await prisma.userTestAttempt.count({
        where: {
            testId: resolvedParams.testId,
            score: { gt: attempt.score }
        }
    }) + 1;

    const totalAttempts = await prisma.userTestAttempt.count({
        where: { testId: resolvedParams.testId }
    });

    const answersMap = JSON.parse(attempt.answersJson) as Record<string, number>;
    const questionIds = Object.keys(answersMap);

    const questionIdsString = questionIds.map(id => `'${id}'`).join(',');
    const questions = questionIds.length > 0
        ? await prisma.$queryRawUnsafe(`SELECT * FROM Question WHERE id IN (${questionIdsString})`) as any[]
        : [];

    let userProgress: any[] = [];
    if (userId && questions.length > 0) {
        userProgress = await prisma.$queryRawUnsafe(
            `SELECT * FROM UserProgress WHERE userId = '${userId}' AND questionId IN (${questionIdsString})`
        );
    }

    const subjectStats: Record<string, { total: number; correct: number }> = {};
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach(q => {
        const selected = answersMap[q.id];
        const isCorrect = selected === q.correctOptionIndex;

        if (isCorrect) correctCount++;
        else if (selected !== null) wrongCount++;

        if (!subjectStats[q.subject]) {
            subjectStats[q.subject] = { total: 0, correct: 0 };
        }
        subjectStats[q.subject].total++;
        if (isCorrect) subjectStats[q.subject].correct++;
    });

    const maxScore = testMeta.totalMarks;
    const accuracy = attempt.accuracy.toFixed(1);
    const skippedCount = testMeta.questionCount - questionIds.length;

    return (
        <div className="min-h-screen bg-muted-light/30 pb-20">
            <div className="mx-auto max-w-5xl px-4 py-12">

                {/* Header */}
                <div className="mb-8">
                    <Link href={isOrgTest ? '/org/dashboard' : '/tests'} className="text-sm text-muted hover:text-primary flex items-center gap-1 mb-3 transition-colors">
                        ← Back
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">{testMeta.title}</h1>
                    <p className="text-sm text-muted mt-1">
                        Attempted by {attempt.user?.name || 'Student'} • {new Date(attempt.completedAt || attempt.startedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>

                {/* Score Summary — Clean, no certificate */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
                    <ScoreCard icon={<Trophy className="w-6 h-6 text-amber-500" />} label="Score" value={`${attempt.score.toFixed(1)}/${maxScore}`} />
                    <ScoreCard icon={<TrendingUp className="w-6 h-6 text-blue-500" />} label="Rank" value={`#${rank}/${totalAttempts}`} />
                    <ScoreCard icon={<Target className="w-6 h-6 text-purple-500" />} label="Accuracy" value={`${accuracy}%`} />
                    <ScoreCard icon={<CheckCircle className="w-6 h-6 text-green-500" />} label="Correct" value={String(correctCount)} accent="text-green-600" />
                    <ScoreCard icon={<XCircle className="w-6 h-6 text-red-500" />} label="Wrong" value={String(wrongCount)} accent="text-red-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Subject-Wise Analysis */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-surface border border-border rounded-2xl p-6">
                            <h2 className="text-lg font-black mb-5 flex items-center text-foreground tracking-tight">
                                <Target className="mr-2 h-5 w-5 text-primary" />
                                Subject Performance
                            </h2>
                            <div className="space-y-5">
                                {Object.entries(subjectStats).map(([subject, stats]) => {
                                    const perc = Math.round((stats.correct / stats.total) * 100);
                                    return (
                                        <div key={subject} className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="font-bold text-foreground text-sm">{subject}</span>
                                                <span className="text-xs font-black text-primary">{perc}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-muted-light rounded-full overflow-hidden">
                                                <div
                                                    className={clsx(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        perc > 70 ? "bg-green-500" : perc > 40 ? "bg-amber-500" : "bg-red-500"
                                                    )}
                                                    style={{ width: `${perc}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted tracking-wide">
                                                <span>{stats.correct} / {stats.total} Correct</span>
                                                <span>{perc > 70 ? 'Excellent' : perc > 40 ? 'Average' : 'Needs Focus'}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Detailed Question Review */}
                        <QuestionReviewList
                            questions={questions}
                            answersMap={answersMap}
                            language="EN"
                        />
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        <div className="bg-surface border border-border rounded-2xl p-6 sticky top-8 text-center flex flex-col gap-5">
                            <div>
                                <h2 className="text-lg font-black mb-1 text-foreground">Next Steps</h2>
                                <p className="text-xs text-muted">Ready for the next challenge?</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <ClientResultActions testId={resolvedParams.testId} />
                            </div>

                            <div className="pt-4 border-t border-border">
                                <Link
                                    href={isOrgTest ? '/org/dashboard' : '/tests'}
                                    className="btn btn-outline w-full"
                                >
                                    {isOrgTest ? 'Back to Dashboard' : 'Browse Tests'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScoreCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: string }) {
    return (
        <div className="bg-surface border border-border rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">{icon}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{label}</p>
            <p className={clsx("text-lg font-black", accent || "text-foreground")}>{value}</p>
        </div>
    );
}
