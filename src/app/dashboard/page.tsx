import { getUserStats, getUserTestAttempts } from '@/actions/stats';
import { SubjectRadarChart } from '@/components/dashboard/subject-chart';
import { ActivityHeatmap } from '@/components/dashboard/activity-heatmap';
import { Target, Zap, Trophy, BookOpen, Award, Clock } from 'lucide-react';
import Link from 'next/link';
import { getUserBadges } from '@/actions/badges';
import { BadgesList } from '@/components/dashboard/BadgesDisplay';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
    const resolvedParams = await searchParams;
    const currentYear = new Date().getFullYear();
    const targetYear = resolvedParams.year ? parseInt(resolvedParams.year) : currentYear;

    const stats = await getUserStats(targetYear);
    const badges = await getUserBadges();
    const testHistory = await getUserTestAttempts();

    if (!stats) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p>Please log in to view your dashboard.</p>
            </div>
        )
    }

    const { totalSolved, accuracy, currentStreak, subjectWise, activityData } = stats;

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
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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


                </div>

                {/* Activity Heatmap Grid */}
                <div className="mb-8 relative z-10">
                    <ActivityHeatmap data={new Map(Object.entries(activityData || {}))} year={targetYear} />
                </div>

                {/* Achievements Section */}
                <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-6 ring-1 ring-blue-100/50">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <Award className="mr-2 h-5 w-5 text-primary" />
                                Your Achievements
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">Badges earned through your hard work and consistency.</p>
                        </div>
                    </div>
                    <BadgesList badges={badges} />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Test History Section */}
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Recent Test History
                        </h3>
                        <div className="space-y-3">
                            {testHistory && testHistory.length > 0 ? (
                                testHistory.slice(0, 5).map((attempt) => (
                                    <Link
                                        key={attempt.id}
                                        href={`/tests/${attempt.testId}/result?attemptId=${attempt.id}`}
                                        className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted-light group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                                {attempt.test?.title || 'Unknown Test'}
                                            </p>
                                            <p className="text-[10px] uppercase font-black text-muted tracking-tighter">
                                                {new Date(attempt.startedAt).toLocaleDateString()} • {attempt.accuracy.toFixed(1)}% Accuracy
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-foreground">{attempt.score.toFixed(1)}</p>
                                            <p className="text-[10px] uppercase font-black text-muted tracking-tighter">Score</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-10 border-2 border-dashed border-border rounded-xl">
                                    <p className="text-sm text-muted">No tests taken yet.</p>
                                    <Link href="/tests" className="text-primary font-bold text-sm hover:underline mt-2 inline-block">
                                        Take your first test →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

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
