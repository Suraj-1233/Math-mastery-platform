
import { getUserStats } from '@/actions/stats';
import { SubjectRadarChart } from '@/components/dashboard/subject-chart';
import { ActivityHeatmap } from '@/components/dashboard/activity-heatmap';
import { Target, Zap, Trophy, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
    const resolvedParams = await searchParams;
    const currentYear = new Date().getFullYear();
    const targetYear = resolvedParams.year ? parseInt(resolvedParams.year) : currentYear;

    const stats = await getUserStats(targetYear);

    if (!stats) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p>Please log in to view your dashboard.</p>
            </div>
        )
    }

    const { totalSolved, accuracy, currentStreak, rank, percentile, subjectWise, activityData } = stats;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here&apos;s an overview of your progress.
                    </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Target className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Accuracy
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {accuracy}%
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Zap className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Current Streak
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {currentStreak} Days
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <BookOpen className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Questions Solved
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                {totalSolved}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Trophy className="h-6 w-6 text-purple-500" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Global Rank
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                #{rank} (Top {percentile}%)
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Heatmap Grid */}
                <div className="mb-8 relative z-10">
                    <ActivityHeatmap data={new Map(Object.entries(activityData || {}))} year={targetYear} />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Chart Section */}
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Subject Performance</h3>
                        {subjectWise.length > 0 ? (
                            <SubjectRadarChart data={subjectWise} />
                        ) : (
                            <div className="flex h-[300px] items-center justify-center text-gray-500">
                                Solve questions to see your performance chart.
                            </div>
                        )}
                    </div>

                    {/* Quick Actions / Recent Activity Placeholder */}
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h3>
                        <div className="space-y-4">
                            <Link href="/questions?status=UNSOLVED" className="block rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                                <div className="font-medium text-gray-900">Resume Practice</div>
                                <div className="text-sm text-gray-500">Continue with new questions based on your level.</div>
                            </Link>
                            <Link href="/questions?status=WRONG" className="block rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                                <div className="font-medium text-gray-900">Review Mistakes</div>
                                <div className="text-sm text-gray-500">Re-attempt questions you got wrong recently.</div>
                            </Link>
                            <Link href="/questions?difficulty=HARD" className="block rounded-md border border-gray-200 p-4 hover:bg-gray-50">
                                <div className="font-medium text-gray-900">Challenge Yourself</div>
                                <div className="text-sm text-gray-500">Try solving hard level problems.</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
