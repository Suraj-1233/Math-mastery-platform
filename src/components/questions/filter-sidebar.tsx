
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SUBJECT_TOPICS: Record<string, string[]> = {
    'Math': [
        'Percentage', 'Profit & Loss', 'Algebra', 'Number System',
        'Trigonometry', 'Geometry', 'Time Speed Distance', 'Time & Work'
    ],
    'English': [
        'Grammar', 'Vocabulary', 'Reading Comprehension', 'Cloze Test'
    ],
    'Reasoning': [
        'Analogy', 'Number Series', 'Syllogism', 'Blood Relations', 'Coding Decoding'
    ],
    'GS': [
        'History', 'Geography', 'Polity', 'Science', 'Economics'
    ]
};

export function FilterSidebar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentSubject = searchParams.get('subject') || '';
    const availableTopics = currentSubject ? SUBJECT_TOPICS[currentSubject] || [] : [];

    const handleFilter = useDebouncedCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // If subject changes, clear topic
        if (key === 'subject') {
            params.delete('topic');
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
                    value={currentSubject}
                    onChange={(e) => handleFilter('subject', e.target.value)}
                >
                    <option value="">All Subjects</option>
                    {Object.keys(SUBJECT_TOPICS).map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            {pathname === '/pyqs' && (
                <div>
                    <h3 className="mb-2 font-medium">Exam</h3>
                    <select
                        className="input-base w-full"
                        defaultValue={searchParams.get('examType')?.toString()}
                        onChange={(e) => handleFilter('examType', e.target.value)}
                    >
                        <option value="">All Exams</option>
                        <option value="SSC CGL Tier 1">SSC CGL Tier 1</option>
                        <option value="SSC CGL Tier 2">SSC CGL Tier 2</option>
                        <option value="SSC CHSL">SSC CHSL</option>
                        <option value="SSC CPO">SSC CPO</option>
                    </select>
                </div>
            )}

            <div>
                <h3 className="mb-2 font-medium">Topic</h3>
                <select
                    className="input-base w-full"
                    value={searchParams.get('topic') || ''}
                    disabled={!currentSubject}
                    onChange={(e) => handleFilter('topic', e.target.value)}
                >
                    <option value="">{currentSubject ? 'All Topics' : 'Select Subject First'}</option>
                    {availableTopics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
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
                            checked={!searchParams.get('status')}
                            onChange={() => handleFilter('status', '')}
                        />
                        <span>All</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value="SOLVED"
                            checked={searchParams.get('status') === 'SOLVED'}
                            onChange={() => handleFilter('status', 'SOLVED')}
                        />
                        <span>Solved</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value="UNSOLVED"
                            checked={searchParams.get('status') === 'UNSOLVED'}
                            onChange={() => handleFilter('status', 'UNSOLVED')}
                        />
                        <span>Unsolved</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            value="BOOKMARKED"
                            checked={searchParams.get('status') === 'BOOKMARKED'}
                            onChange={() => handleFilter('status', 'BOOKMARKED')}
                        />
                        <span>Bookmarked</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
