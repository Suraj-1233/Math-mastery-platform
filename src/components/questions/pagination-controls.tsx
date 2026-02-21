'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newPage <= 1) {
            params.delete('page');
        } else {
            params.set('page', newPage.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    // Calculate max pages to show based on window
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-1 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="btn btn-outline btn-sm px-2 disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {startPage > 1 && (
                <>
                    <button onClick={() => handlePageChange(1)} className="btn btn-outline btn-sm px-3">1</button>
                    {startPage > 2 && <span className="px-2 text-muted">...</span>}
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={clsx(
                        "btn btn-sm px-3",
                        p === currentPage ? "btn-primary" : "btn-outline border-transparent hover:border-primary/30 hover:bg-muted-light/20"
                    )}
                >
                    {p}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2 text-muted">...</span>}
                    <button onClick={() => handlePageChange(totalPages)} className="btn btn-outline btn-sm px-3">{totalPages}</button>
                </>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="btn btn-outline btn-sm px-2 disabled:opacity-50"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
