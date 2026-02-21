
'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

interface SubjectChartProps {
    data: {
        subject: string;
        score: number;
        fullMark?: number;
    }[];
}

export function SubjectRadarChart({ data }: SubjectChartProps) {
    // Transform data to ensure it fits the chart structure if needed, currently direct mapping
    const chartData = data.map(item => ({
        ...item,
        fullMark: 100 // Scale to 100%
    }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                        name="Performance"
                        dataKey="score"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
