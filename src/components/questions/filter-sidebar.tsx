
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function FilterSidebar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = useDebouncedCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="w-full space-y-8 lg:w-64 lg:shrink-0 lg:border-r border-border lg:pr-6">
            <div>
                <h3 className="mb-2 font-medium">Search</h3>
                <input
                    type="text"
                    placeholder="Search questions..."
                    className="input-base w-full"
                    defaultValue={searchParams.get('search')?.toString()}
                    onChange={(e) => handleFilter('search', e.target.value)}
                />
            </div>

            <div>
                <h3 className="mb-2 font-medium">Subject</h3>
                <select
                    className="input-base w-full"
                    defaultValue={searchParams.get('subject')?.toString()}
                    onChange={(e) => handleFilter('subject', e.target.value)}
                >
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="English">English</option>
                    <option value="General_Awareness">General Awareness</option>
                </select>
            </div>

            <div>
                <h3 className="mb-2 font-medium">Difficulty</h3>
                <select
                    className="input-base w-full"
                    defaultValue={searchParams.get('difficulty')?.toString()}
                    onChange={(e) => handleFilter('difficulty', e.target.value)}
                >
                    <option value="">Any Difficulty</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
            </div>

            <div>
                <h3 className="mb-3 font-medium">Status</h3>
                <div className="flex flex-col space-y-3 text-sm">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value=""
                            defaultChecked={!searchParams.get('status')}
                            onChange={() => handleFilter('status', '')}
                        />
                        <span>All</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value="SOLVED"
                            defaultChecked={searchParams.get('status') === 'SOLVED'}
                            onChange={() => handleFilter('status', 'SOLVED')}
                        />
                        <span>Solved</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value="UNSOLVED"
                            defaultChecked={searchParams.get('status') === 'UNSOLVED'}
                            onChange={() => handleFilter('status', 'UNSOLVED')}
                        />
                        <span>Unsolved</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value="BOOKMARKED"
                            defaultChecked={searchParams.get('status') === 'BOOKMARKED'}
                            onChange={() => handleFilter('status', 'BOOKMARKED')}
                        />
                        <span>Bookmarked</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
