
import { QuestionCardSkeleton } from '@/components/ui/skeletons';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 space-y-2">
                    <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-64 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <aside className="w-full space-y-6 lg:w-64">
                        <div className="h-64 rounded bg-gray-200 animate-pulse" />
                    </aside>
                    <main className="flex-1 space-y-6">
                        <QuestionCardSkeleton />
                        <QuestionCardSkeleton />
                        <QuestionCardSkeleton />
                    </main>
                </div>
            </div>
        </div>
    );
}
