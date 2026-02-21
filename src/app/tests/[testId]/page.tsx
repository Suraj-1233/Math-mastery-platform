import React from 'react';
import { getMockTestEngineData } from '@/actions/tests';
import { TestSimulator } from '@/components/TestSimulator';
import { notFound } from 'next/navigation';

export default async function TestPage({ params }: { params: Promise<{ testId: string }> }) {
    const resolvedParams = await params;

    try {
        const { testMeta, questions } = await getMockTestEngineData(resolvedParams.testId);

        return (
            <div className="bg-background min-h-screen">
                <TestSimulator testMeta={testMeta} questions={questions} />
            </div>
        );
    } catch (error) {
        console.error('Test Load Error:', error);
        return notFound();
    }
}
