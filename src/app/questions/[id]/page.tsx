
import { getQuestion } from '@/actions/questions';
import { QuestionCard } from '@/components/questions/question-card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { auth } from '@/auth';

export default async function QuestionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const question = await getQuestion(id);
    const session = await auth();
    const isLoggedIn = !!session?.user;

    if (!question) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-muted-light/30 pb-20">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="mb-8">
                    <Link
                        href="/questions"
                        className="inline-flex items-center text-sm font-bold text-muted hover:text-primary transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Question Bank
                    </Link>
                    <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Question Details</h1>
                </div>

                <QuestionCard question={question} />

                {!isLoggedIn ? (
                    <div className="mt-8 card-premium p-6 bg-primary text-white">
                        <h3 className="text-lg font-bold mb-2">Practice & Master</h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            This question is part of our comprehensive SSC CGL Math Practice Bank.
                            Sign in to track your progress, earn badges, and compete with other aspirants.
                        </p>
                        <div className="mt-4">
                            <Link href="/signup" className="btn bg-white text-primary hover:bg-white/90 font-bold">
                                Create Free Account <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 card-premium p-6 bg-surface text-center">
                        <h3 className="text-lg font-bold mb-2 text-foreground">Want to solve more?</h3>
                        <p className="text-sm text-muted mb-4 max-w-md mx-auto">
                            Head back to our comprehensive Question Bank to continue mastering Mathematics.
                        </p>
                        <Link href="/questions" className="btn btn-primary font-bold">
                            Go to Question Bank <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
