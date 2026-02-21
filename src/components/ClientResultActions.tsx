'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flag } from 'lucide-react';

interface ClientResultActionsProps {
    testId: string;
}

export function ClientResultActions({ testId }: ClientResultActionsProps) {
    const [markedCount, setMarkedCount] = useState(0);

    useEffect(() => {
        const markedStr = localStorage.getItem(`review_${testId}`);
        if (markedStr) {
            try {
                const arr = JSON.parse(markedStr);
                setMarkedCount(arr.length);
            } catch (error) {
                console.error('Failed to parse marked questions', error);
            }
        }
    }, [testId]);

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/dashboard" className="btn btn-outline border-border">
                Return to Dashboard
            </Link>
            {markedCount > 0 && (
                <Link href={`/questions?status=BOOKMARKED`} className="btn bg-warning-light text-warning-dark hover:bg-warning/20 border-warning/30 font-medium">
                    <Flag className="w-4 h-4 mr-2" />
                    Review Marked ({markedCount})
                </Link>
            )}
            <Link href="/tests" className="btn btn-primary shadow-lg shadow-primary/20">
                Take Another Test
            </Link>
        </div>
    );
}
