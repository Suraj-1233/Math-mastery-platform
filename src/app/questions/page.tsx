
import { getQuestions } from '@/actions/questions';
import { QuestionCard } from '@/components/questions/question-card';
import { FilterSidebar } from '@/components/questions/filter-sidebar';
import { PaginationControls } from '@/components/questions/pagination-controls';

export default async function QuestionBankPage({
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
    const { questions, totalCount, totalPages } = await getQuestions({
        page,
        limit: 10,
        search: resolvedSearchParams.search,
        subject: resolvedSearchParams.subject,
        topic: resolvedSearchParams.topic,
        examType: resolvedSearchParams.examType,
        difficulty: resolvedSearchParams.difficulty,
        status: resolvedSearchParams.status,
        sortBy: 'newest', // Default sort
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Question Bank</h1>
                    <p className="mt-1 text-sm text-muted">
                        Practice over {totalCount} questions sorted by topic and difficulty.
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
                                    <p className="text-muted">No questions found matching your filters.</p>
                                </div>
                            ) : (
                                questions.map((question) => (
                                    <QuestionCard key={question.id} question={question} />
                                ))
                            )}
                        </div>

                        {/* Simple Pagination */}
                        {totalPages > 1 && (
                            <PaginationControls currentPage={page} totalPages={totalPages} />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
