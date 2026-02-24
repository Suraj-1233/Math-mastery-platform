
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
    const chartData = data.map(item => ({
        ...item,
        fullMark: 100
    }));

    return (
        <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <defs>
                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                    <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                        axisLine={false}
                    />
                    <Radar
                        name="My Mastery"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="url(#radarGradient)"
                        fillOpacity={0.6}
                        animationBegin={200}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
