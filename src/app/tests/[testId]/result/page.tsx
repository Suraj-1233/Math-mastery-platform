import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { mockTests } from '@/data/mockTests';
import { ClientResultActions } from '@/components/ClientResultActions';
import { Target, Clock, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

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
    });

    if (!attempt || attempt.testId !== resolvedParams.testId) return notFound();

    const testMeta = mockTests.find(t => t.id === resolvedParams.testId);
    if (!testMeta) return notFound();

    const maxScore = testMeta.totalMarks;
    const accuracy = attempt.accuracy.toFixed(1);

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-4">
                        Test Completed Successfully!
                    </h1>
                    <p className="text-xl text-muted-foreground">{testMeta.title}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="card-premium p-6 text-center">
                        <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-muted text-sm font-bold uppercase tracking-wider mb-2">Final Score</h3>
                        <p className="text-4xl font-bold text-foreground">
                            {attempt.score.toFixed(2)} <span className="text-xl text-muted">/ {maxScore}</span>
                        </p>
                    </div>

                    <div className="card-premium p-6 text-center">
                        <Target className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h3 className="text-muted text-sm font-bold uppercase tracking-wider mb-2">Accuracy</h3>
                        <p className="text-4xl font-bold text-foreground">
                            {accuracy}%
                        </p>
                    </div>

                    <div className="card-premium p-6 text-center">
                        <Clock className="w-10 h-10 text-success mx-auto mb-4" />
                        <h3 className="text-muted text-sm font-bold uppercase tracking-wider mb-2">Completed On</h3>
                        <p className="text-lg font-bold text-foreground mt-4">
                            {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="card-premium p-8 text-center space-y-6">
                    <h2 className="text-2xl font-bold">What's Next?</h2>
                    <p className="text-muted max-w-2xl mx-auto leading-relaxed">
                        Great job putting in the effort! Review your incorrectly answered questions to continuously improve your weak areas before the real exam.
                    </p>
                    <ClientResultActions testId={resolvedParams.testId} />
                </div>
            </div>
        </div>
    );
}
