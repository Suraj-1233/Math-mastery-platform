
'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface TopicAnalysisProps {
    data: {
        topic: string;
        subject: string;
        total: number;
        score: number;
    }[];
}

export function TopicAnalysis({ data }: TopicAnalysisProps) {
    // Limit to top 6 topics for cleaner UI
    const chartData = data.slice(0, 6);

    const getBarColor = (score: number) => {
        if (score >= 80) return '#10b981'; // Success Green
        if (score >= 60) return '#3b82f6'; // Primary Blue
        if (score >= 40) return '#f59e0b'; // Warning Orange
        return '#ef4444'; // Danger Red
    };

    return (
        <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                        dataKey="topic"
                        type="category"
                        width={100}
                        tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 700 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 ring-1 ring-black/5">
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{data.topic}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-gray-900">{data.score}%</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Mastery</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-medium mt-1">Based on {data.total} practiced questions</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        dataKey="score"
                        radius={[0, 8, 8, 0]}
                        barSize={24}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
