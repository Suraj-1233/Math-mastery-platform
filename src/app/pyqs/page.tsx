
import { getQuestions } from '@/actions/questions';
import { QuestionCard } from '@/components/questions/question-card';
import { FilterSidebar } from '@/components/questions/filter-sidebar';
import { PaginationControls } from '@/components/questions/pagination-controls';

export default async function PYQPage({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string;
        page?: string;
        subject?: string;
        topic?: string;
        examType?: string;
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        status?: 'SOLVED' | 'UNSOLVED' | 'BOOKMARKED';
    }>;
}) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;

    // For PYQ page, we might want to exclude "CONCEPTUAL" questions by default if they are not selected
    // For now, let's just pass all filters through
    const { questions, totalCount, totalPages } = await getQuestions({
        page,
        limit: 10,
        search: resolvedSearchParams.search,
        subject: resolvedSearchParams.subject,
        topic: resolvedSearchParams.topic,
        examType: resolvedSearchParams.examType,
        notExamType: "CONCEPTUAL", // Pure PYQ only
        difficulty: resolvedSearchParams.difficulty,
        status: resolvedSearchParams.status,
        sortBy: 'newest',
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Previous Year Questions (PYQs)</h1>
                    <p className="mt-1 text-sm text-muted">
                        Practice over {totalCount} authentic questions from previous years to understand the actual exam level.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    {/* Sidebar */}
                    <aside>
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="space-y-6">
                            {questions.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-border p-12 text-center bg-surface">
                                    <p className="text-muted">No PYQs found matching your filters.</p>
                                </div>
                            ) : (
                                questions.map((question: any) => (
                                    <QuestionCard key={question.id} question={question} />
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationControls currentPage={page} totalPages={totalPages} />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
