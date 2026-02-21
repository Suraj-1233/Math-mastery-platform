
export function QuestionCardSkeleton() {
    return (
        <div className="card-premium p-6">
            <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-24 rounded bg-muted-light animate-pulse" />
                <div className="h-5 w-5 rounded bg-muted-light animate-pulse" />
            </div>
            <div className="mb-6 space-y-2">
                <div className="h-4 w-full rounded bg-muted-light animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-muted-light animate-pulse" />
            </div>
            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-full rounded-md border border-border bg-muted-light/30 animate-pulse" />
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <div className="h-9 w-32 rounded-md bg-muted-light animate-pulse" />
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-background pb-12">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 space-y-2">
                    <div className="h-8 w-48 rounded bg-muted-light animate-pulse" />
                    <div className="h-4 w-64 rounded bg-muted-light animate-pulse" />
                </div>
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 card-premium animate-pulse" />
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="h-80 card-premium animate-pulse" />
                    <div className="h-80 card-premium animate-pulse" />
                </div>
            </div>
        </div>
    )
}
