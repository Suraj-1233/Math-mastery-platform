
'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-medium text-gray-900">Something went wrong!</h2>
            <p className="text-sm text-gray-500 max-w-md text-center">
                We encountered an error while loading the questions. It might be a network issue or server error.
            </p>
            <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
