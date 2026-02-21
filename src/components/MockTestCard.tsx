'use client';

import React from 'react';
import { MockTest } from '@/data/mockTests';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MockTestCardProps {
    test: MockTest;
}

export default function MockTestCard({ test }: MockTestCardProps) {
    const typeColor = {
        'Topic': 'badge-primary',
        'Sectional': 'badge-secondary',
        'Full': 'badge-success',
        'Speed': 'badge-warning',
    };

    return (
        <motion.div
            layout
            whileHover={{ scale: 1.02 }}
            className="card-premium p-6 flex flex-col h-full overflow-hidden"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <span className={`badge ${typeColor[test.type as keyof typeof typeColor]}`}>
                    {test.type} Test
                </span>
                <span className={`badge badge-outline text-muted text-xs uppercase`}>
                    {test.difficulty}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                {test.title}
            </h3>
            <p className="text-muted text-sm mb-6 flex-grow leading-relaxed">
                {test.description}
            </p>

            {/* Stats */}
            <div className="flex justify-between items-center bg-muted-light/30 rounded-md border border-border p-4 mb-6">
                <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{test.duration}m</div>
                    <div className="text-[10px] text-muted font-semibold uppercase tracking-wide">Time</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{test.questionCount}</div>
                    <div className="text-[10px] text-muted font-semibold uppercase tracking-wide">Ques</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{test.totalMarks}</div>
                    <div className="text-[10px] text-muted font-semibold uppercase tracking-wide">Marks</div>
                </div>
            </div>

            {/* Button */}
            <Link href={`/tests/${test.id}`} className="mt-auto block">
                <button className="btn btn-primary w-full shadow-md text-base">
                    Start Test ⏱️
                </button>
            </Link>
        </motion.div>
    );
}
