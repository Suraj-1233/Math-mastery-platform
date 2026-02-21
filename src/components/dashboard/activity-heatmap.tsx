'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface ActivityMapProps {
    data?: Map<string, number>; // "YYYY-MM-DD" -> count
    year?: number;
}

export function ActivityHeatmap({ data = new Map(), year = new Date().getFullYear() }: ActivityMapProps) {
    const today = new Date();
    const router = useRouter();
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'year' | 'month'>('year');

    // Use the actual current year unless overriden
    const activeYear = year || today.getFullYear();

    const availableYears = [today.getFullYear(), today.getFullYear() - 1, today.getFullYear() - 2];

    const handleYearChange = (newYear: number) => {
        setIsDropdownOpen(false);
        router.push(`${pathname}?year=${newYear}`);
    };

    // Data generation
    const startDate = viewMode === 'year' ? new Date(activeYear, 0, 1) : new Date(activeYear, today.getMonth(), 1);
    const dayOffset = startDate.getDay(); // 0 is Sunday

    // We want 53 columns for year, 6 columns for month
    const cols = viewMode === 'year' ? 53 : 6;
    const weeks = Array.from({ length: cols }, () => new Array(7).fill(null));

    let currentDate = new Date(startDate);
    let totalSubmissions = 0;

    const limitDate = viewMode === 'year'
        ? new Date(activeYear + 1, 0, 1)
        : new Date(activeYear, today.getMonth() + 1, 1);

    // Fill the grid based on the dates
    while (currentDate.getTime() < limitDate.getTime()) {
        // Calculate offset-adjusted week indexing so Jan 1 appears correctly on its weekday
        // Note: For month view, diffDays is relative to the 1st of the month
        const diffDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const gridIndex = diffDays + dayOffset;

        const col = Math.floor(gridIndex / 7);
        const row = gridIndex % 7;

        const mYear = currentDate.getFullYear();
        const mMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const mDay = String(currentDate.getDate()).padStart(2, '0');
        const dateString = `${mYear}-${mMonth}-${mDay}`;

        const count = data.get(dateString) || 0;

        // Ensure we don't accidentally index out of bounds due to leap years pushing to week 54 edge cases
        if (col < cols) {
            weeks[col][row] = { date: dateString, count };
            totalSubmissions += count;
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Pre-calculate month label positions
    const monthLabels = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentMonth = -1;
    for (let col = 0; col < cols; col++) {
        const firstDayOfWeek = weeks[col].find(day => day !== null);
        if (firstDayOfWeek) {
            const dateObj = new Date(firstDayOfWeek.date);
            if (viewMode === 'year') {
                if (dateObj.getMonth() !== currentMonth) {
                    currentMonth = dateObj.getMonth();
                    const monthName = monthNames[dateObj.getMonth()];
                    if (col < 50) {
                        monthLabels.push({ col, label: monthName });
                    }
                }
            } else if (col === 0) {
                // In month view, just label the current month once
                monthLabels.push({ col: 0, label: monthNames[dateObj.getMonth()] });
            }
        }
    }

    const getColorClass = (count: number) => {
        if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
        if (count <= 2) return 'bg-success-light';
        if (count <= 5) return 'bg-success';
        return 'bg-green-700 dark:bg-green-500';
    };

    return (
        <div className="card-premium p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center space-x-2 text-lg font-medium text-foreground relative z-30">
                    <span>{totalSubmissions || 0} Submissions {viewMode === 'year' ? 'in Year' : 'in Month'}</span>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center text-primary font-bold hover:underline focus:outline-none"
                    >
                        {activeYear} <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-8 left-0 mt-2 w-32 rounded-md shadow-lg bg-surface ring-1 ring-black ring-opacity-5 z-20 border border-border">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                {availableYears.map(y => (
                                    <button
                                        key={y}
                                        onClick={() => handleYearChange(y)}
                                        className={`w-full text-left block px-4 py-2 text-sm hover:bg-muted-light/50 transition-colors ${activeYear === y ? 'text-primary font-bold bg-primary-light/10' : 'text-foreground'}`}
                                        role="menuitem"
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex bg-muted-light/30 rounded-md p-1 mt-4 md:mt-0">
                    <button
                        onClick={() => setViewMode('year')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'year' ? 'bg-surface text-foreground shadow-sm border border-border' : 'text-muted hover:text-foreground hover:bg-muted-light/50'}`}
                    >
                        Year
                    </button>
                    <button
                        onClick={() => setViewMode('month')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'month' ? 'bg-surface text-foreground shadow-sm border border-border' : 'text-muted hover:text-foreground hover:bg-muted-light/50'}`}
                    >
                        Month
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto pb-4">
                <div className="inline-block relative min-w-[700px]">
                    {/* Months Row */}
                    <div className="flex mb-2 text-xs text-muted relative h-5">
                        {monthLabels.map(({ col, label }, index) => (
                            <div key={index} className="absolute" style={{ left: `${col * 16}px` }}>
                                {label}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap Grid */}
                    <div className="flex gap-[4px]">
                        {weeks.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[4px]">
                                {week.map((day, dIndex) => {
                                    if (!day) {
                                        // Empty placeholder for start/end alignment
                                        return <div key={dIndex} className="w-3 h-3 rounded-[2px]" />;
                                    }
                                    return (
                                        <div
                                            key={dIndex}
                                            title={`${day.count} submissions on ${day.date}`}
                                            className={`w-3 h-3 rounded-[2px] transition-colors hover:ring-1 hover:ring-foreground/50 ${getColorClass(day.count)}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted space-x-2">
                <span>Less</span>
                <div className="flex gap-[4px]">
                    <div className="w-3 h-3 rounded-[2px] bg-gray-100 dark:bg-gray-800" />
                    <div className="w-3 h-3 rounded-[2px] bg-success-light" />
                    <div className="w-3 h-3 rounded-[2px] bg-success" />
                    <div className="w-3 h-3 rounded-[2px] bg-green-700 dark:bg-green-500" />
                </div>
                <span>More</span>
            </div>
        </div >
    );
}
