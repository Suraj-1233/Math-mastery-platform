import React from 'react';
import { getMockTestEngineData } from '@/actions/tests';
import { TestSimulator } from '@/components/TestSimulator';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

export default async function TestPage({ params }: { params: Promise<{ testId: string }> }) {
    const resolvedParams = await params;

    try {
        const { testMeta, questions } = await getMockTestEngineData(resolvedParams.testId);

        return (
            <div className="bg-background min-h-screen">
                <TestSimulator testMeta={testMeta} questions={questions} />
            </div>
        );
    } catch (error: any) {
        const errorMsg = error?.message || '';

        // Already attempted — show friendly page
        if (errorMsg.includes('already attempted')) {
            return (
                <div className="min-h-screen bg-muted-light/30 flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center">
                        <div className="bg-surface border border-border rounded-3xl p-10 shadow-lg">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h1 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                                Already Submitted ✅
                            </h1>
                            <p className="text-muted text-sm leading-relaxed mb-6">
                                You have already completed this exam. Each test can only be attempted once.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8">
                                <p className="text-xs font-bold text-blue-700">
                                    📋 Your response has been recorded. Results will appear on your dashboard once published by your institution.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Link
                                    href="/org/dashboard"
                                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Unauthorized — show access denied
        if (errorMsg.includes('Unauthorized')) {
            return (
                <div className="min-h-screen bg-muted-light/30 flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center">
                        <div className="bg-surface border border-border rounded-3xl p-10 shadow-lg">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-red-500" />
                            </div>
                            <h1 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                                Access Denied
                            </h1>
                            <p className="text-muted text-sm leading-relaxed mb-6">
                                {errorMsg.replace('Unauthorized: ', '')}
                            </p>
                            <Link href="/org/dashboard" className="btn btn-primary w-full">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        console.error('Test Load Error:', error);
        return notFound();
    }
}
