
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserStats, getUserTestAttempts } from '@/actions/stats';
import { SubjectRadarChart } from '@/components/dashboard/subject-chart';
import { TopicAnalysis } from '@/components/dashboard/topic-analysis';
import { ActivityHeatmap } from '@/components/dashboard/activity-heatmap';
import { Target, Zap, Trophy, BookOpen, Award, Clock } from 'lucide-react';
import Link from 'next/link';
import { getUserBadges } from '@/actions/badges';
import { BadgesList } from '@/components/dashboard/BadgesDisplay';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
    const session = await auth();
    if (!session?.user) redirect('/login');

    const user = session.user as any;
    const role = user.role;
    const memberships = user.memberships || [];

    // System Admin goes to Admin Panel
    if (role === 'ADMIN') redirect('/admin');


    // Only normal individual users reach here
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
        );
    }

    const { totalSolved, accuracy, currentStreak, subjectWise, topicWise, activityData } = stats;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back, {user.name || 'Student'}! Here's an overview of your progress.
                    </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <MetricCard icon={<Target className="h-6 w-6 text-blue-500" />} label="Accuracy" value={`${accuracy}%`} />
                    <MetricCard icon={<Zap className="h-6 w-6 text-yellow-500" />} label="Current Streak" value={`${currentStreak} Days`} />
                    <MetricCard icon={<BookOpen className="h-6 w-6 text-green-500" />} label="Questions Solved" value={totalSolved} />
                </div>

                {/* Activity Heatmap */}
                <div className="mb-8 relative z-10">
                    <ActivityHeatmap data={new Map(Object.entries(activityData || {}))} year={targetYear} />
                </div>

                {/* Achievements */}
                <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-6 ring-1 ring-blue-100/50">
                    <div className="mb-6 flex items-center">
                        <Award className="mr-2 h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900">Your Achievements</h2>
                    </div>
                    <BadgesList badges={badges} />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                    {/* Subject Radar Chart */}
                    <div className="rounded-3xl bg-white p-7 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Subject Performance</h3>
                            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Mastery Radar</div>
                        </div>
                        <p className="text-xs text-gray-500 mb-6 font-medium">Your overall ability across different subjects.</p>
                        {subjectWise.length > 0 ? <SubjectRadarChart data={subjectWise} /> : (
                            <div className="flex h-[300px] flex-col items-center justify-center text-gray-400 gap-3">
                                <Trophy className="w-10 h-10 opacity-20" />
                                <p className="text-sm font-bold">Solve questions to see your radar chart.</p>
                            </div>
                        )}
                    </div>

                    {/* Topic Horizontal Bar Chart */}
                    <div className="rounded-3xl bg-white p-7 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Detailed Topic Analysis</h3>
                            <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Topic Mastery</div>
                        </div>
                        <p className="text-xs text-gray-500 mb-6 font-medium">Breakdown of your performance in specific areas.</p>
                        {topicWise && topicWise.length > 0 ? <TopicAnalysis data={topicWise} /> : (
                            <div className="flex h-[300px] flex-col items-center justify-center text-gray-400 gap-3">
                                <BookOpen className="w-10 h-10 opacity-20" />
                                <p className="text-sm font-bold">Practice more to unlock detailed topic insights.</p>
                            </div>
                        )}
                    </div>

                    {/* Test History */}
                    <div className="rounded-3xl bg-white p-7 shadow-sm border border-gray-100">
                        <h3 className="mb-4 text-lg font-black text-gray-900 flex items-center gap-2 tracking-tight">
                            <Clock className="w-5 h-5 text-blue-600" /> Recent Test History
                        </h3>
                        <div className="space-y-3">
                            {testHistory && testHistory.length > 0 ? (
                                testHistory.slice(0, 5).map((attempt) => (
                                    <Link key={attempt.id} href={`/tests/${attempt.testId}/result?attemptId=${attempt.id}`}
                                        className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:bg-gray-50 group transition-all">
                                        <div>
                                            <p className="font-bold text-sm">{attempt.test?.title || 'Unknown Test'}</p>
                                            <p className="text-[11px] text-gray-400 font-medium">{new Date(attempt.startedAt).toLocaleDateString()} • {attempt.accuracy.toFixed(1)}% Accuracy</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-black text-gray-900">{attempt.score.toFixed(1)}</p>
                                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Score</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
                                    <p className="text-sm text-gray-500">No tests taken yet.</p>
                                    <Link href="/tests" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">Take your first test →</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-3xl bg-white p-7 shadow-sm border border-gray-100">
                        <h3 className="mb-4 text-lg font-black text-gray-900 tracking-tight">Quick Actions</h3>
                        <div className="space-y-3">
                            <ActionLink href="/questions?status=UNSOLVED" title="Resume Practice" sub="Continue with new questions based on your level." />
                            <ActionLink href="/questions?status=WRONG" title="Review Mistakes" sub="Re-attempt questions you got wrong recently." />
                            <ActionLink href="/tests" title="Take a Mock Test" sub="Test yourself under real exam conditions." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
                <div>
                    <dt className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</dt>
                    <dd className="text-2xl font-black text-gray-900">{value}</dd>
                </div>
            </div>
        </div>
    );
}

function ActionLink({ href, title, sub }: { href: string; title: string; sub: string }) {
    return (
        <Link href={href} className="block rounded-2xl border border-gray-100 p-5 hover:bg-gray-50 hover:border-blue-100 hover:translate-x-1 transition-all">
            <div className="font-bold text-gray-900">{title}</div>
            <div className="text-[11px] text-gray-400 font-medium mt-0.5">{sub}</div>
        </Link>
    );
}
