import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { mockTests } from '@/data/mockTests';
import { ClientResultActions } from '@/components/ClientResultActions';
import { Target, Clock, Trophy, CheckCircle, XCircle, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { auth } from '@/auth';
import { QuestionReviewList } from '@/components/QuestionReviewList';
import { ShareReportButton } from '@/components/ShareReportButton';

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

    const testMeta = mockTests.find(t => t.id === resolvedParams.testId);
    if (!testMeta) return notFound();

    // Calculate Rank
    const session = await auth();
    const userId = session?.user?.id;

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

    // Use raw SQL to fetch questions as Prisma client may be out of sync
    const questionIdsString = questionIds.map(id => `'${id}'`).join(',');
    const questions = questionIds.length > 0
        ? await prisma.$queryRawUnsafe(`SELECT * FROM Question WHERE id IN (${questionIdsString})`) as any[]
        : [];

    // Fetch user progress manually for these questions
    let userProgress: any[] = [];
    if (userId && questions.length > 0) {
        userProgress = await prisma.$queryRawUnsafe(
            `SELECT * FROM UserProgress WHERE userId = '${userId}' AND questionId IN (${questionIdsString})`
        );
    }

    const questionsWithStatus = questions.map((q: any) => {
        const progress = userProgress.find(p => p.questionId === q.id);
        return {
            ...q,
            options: typeof q.options === 'string' ? q.options : JSON.stringify(q.options),
            isBookmarked: progress?.isBookmarked || false
        };
    });

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

        // Add bookmark check
        (q as any).isBookmarked = q.userProgress?.[0]?.isBookmarked || false;
    });

    const maxScore = testMeta.totalMarks;
    const accuracy = attempt.accuracy.toFixed(1);
    const skippedCount = testMeta.questionCount - questionIds.length;

    return (
        <div className="min-h-screen bg-muted-light/30 pb-20">
            <div className="mx-auto max-w-5xl px-4 py-12">
                {/* Certificate Section for Download */}
                <div id="certificate-container" className="bg-white p-8 sm:p-12 rounded-[2rem] mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden border border-border/50">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-success/5 blur-3xl" />

                    {/* Header Section */}
                    <div className="text-center mb-12 relative z-10">
                        <div className="inline-flex items-center justify-center p-3 bg-success-light rounded-full mb-4 shadow-sm">
                            <CheckCircle className="w-8 h-8 text-success" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2 tracking-tight uppercase">
                            Performance Certificate
                        </h1>
                        <p className="text-lg text-primary font-bold">{testMeta.title}</p>
                        <p className="text-sm font-medium text-muted mt-1">Presented to <span className="text-foreground">{attempt.user?.name || 'A Student'}</span></p>
                    </div>

                    {/* Score Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
                        <div className="card-premium p-4 sm:p-6 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-warning mx-auto mb-2 sm:mb-3" />
                            <h3 className="text-muted text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">Final Score</h3>
                            <p className="text-xl sm:text-2xl font-black text-foreground">
                                {attempt.score.toFixed(1)}<span className="text-xs sm:text-sm text-muted">/{maxScore}</span>
                            </p>
                        </div>

                        <div className="card-premium p-4 sm:p-6 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                            <h3 className="text-muted text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">Rank</h3>
                            <p className="text-xl sm:text-2xl font-black text-foreground">#{rank} <span className="text-xs text-muted">/{totalAttempts}</span></p>
                        </div>

                        <div className="card-premium p-4 sm:p-6 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                            <h3 className="text-muted text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">Accuracy</h3>
                            <p className="text-xl sm:text-2xl font-black text-foreground">{accuracy}%</p>
                        </div>

                        <div className="card-premium p-4 sm:p-6 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                            <h3 className="text-muted text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">Correct</h3>
                            <p className="text-xl sm:text-2xl font-black text-success">{correctCount}</p>
                        </div>

                        <div className="col-span-2 md:col-span-1 card-premium p-4 sm:p-6 text-center bg-error-light/30 border-error/20">
                            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-error mx-auto mb-2 sm:mb-3" />
                            <h3 className="text-error-dark text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">Wrong</h3>
                            <p className="text-xl sm:text-2xl font-black text-error">{wrongCount}</p>
                        </div>
                    </div>
                </div>

                {/* Promotional Share Section */}
                <div className="flex justify-center mb-12">
                    <ShareReportButton
                        userName={attempt.user?.name || 'A Student'}
                        score={attempt.score}
                        maxScore={testMeta.totalMarks}
                        testTitle={testMeta.title}
                        accuracy={accuracy}
                        testId={resolvedParams.testId}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Subject-Wise Analysis */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card-premium p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center text-foreground">
                                <Target className="mr-2 h-5 w-5 text-primary" />
                                Subject Performance
                            </h2>
                            <div className="space-y-6">
                                {Object.entries(subjectStats).map(([subject, stats]) => {
                                    const perc = Math.round((stats.correct / stats.total) * 100);
                                    return (
                                        <div key={subject} className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="font-semibold text-foreground text-sm">{subject}</span>
                                                <span className="text-xs font-bold text-primary">{perc}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-muted-light rounded-full overflow-hidden">
                                                <div
                                                    className={clsx(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        perc > 70 ? "bg-success" : perc > 40 ? "bg-warning" : "bg-error"
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

                        {/* Detailed Question Review List */}
                        <QuestionReviewList
                            questions={questions}
                            answersMap={answersMap}
                            language="EN"
                        />
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        <div className="card-premium p-8 sticky top-8 text-center flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-bold mb-1 text-foreground">Next Steps</h2>
                                <p className="text-xs text-muted">Ready for the next challenge?</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <ClientResultActions testId={resolvedParams.testId} />
                            </div>

                            <div className="pt-6 border-t border-border">
                                <Link
                                    href="/questions?status=BOOKMARKED"
                                    className="btn btn-outline w-full"
                                >
                                    Review Bookmarks
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
