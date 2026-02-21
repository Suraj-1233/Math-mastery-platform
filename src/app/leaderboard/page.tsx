
import { getLeaderboard } from '@/actions/leaderboard';
import { Trophy, Medal, Crown, Target, Zap } from 'lucide-react';
import { clsx } from 'clsx';

export default async function LeaderboardPage() {
    const topUsers = await getLeaderboard();

    return (
        <div className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Global <span className="text-primary">Leaderboard</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Top warriors acing their preparation. Competition is fierce!
                    </p>
                </div>

                {/* Top 3 Podium */}
                <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-3">
                    {/* Rank 2 */}
                    {topUsers[1] && (
                        <div className="order-2 md:order-1">
                            <PodiumItem user={topUsers[1]} rank={2} color="text-slate-400" />
                        </div>
                    )}

                    {/* Rank 1 */}
                    {topUsers[0] && (
                        <div className="order-1 md:order-2">
                            <div className="relative mb-8 scale-110">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                    <Crown className="h-12 w-12 text-yellow-500 animate-bounce" />
                                </div>
                                <PodiumItem user={topUsers[0]} rank={1} color="text-yellow-600" />
                            </div>
                        </div>
                    )}

                    {/* Rank 3 */}
                    {topUsers[2] && (
                        <div className="order-3">
                            <PodiumItem user={topUsers[2]} rank={3} color="text-amber-700" />
                        </div>
                    )}
                </div>

                {/* Remaining List */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Rank
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Student
                                </th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Correct
                                </th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Accuracy
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {topUsers.slice(3).map((user, idx) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="text-sm font-bold text-gray-500">#{idx + 4}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                        <div className="flex items-center justify-center text-sm text-gray-900 font-bold">
                                            <Target className="mr-1.5 h-3 w-3 text-green-500" />
                                            {user.correctCount}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-bold text-gray-900">{user.accuracy}%</span>
                                            <div className="h-1 w-12 rounded-full bg-gray-100 mt-1">
                                                <div className="h-full bg-primary rounded-full" style={{ width: `${user.accuracy}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function PodiumItem({ user, rank, color }: { user: any; rank: number; color: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className={clsx(
                "relative flex h-24 w-24 items-center justify-center rounded-full border-4 bg-white shadow-lg",
                rank === 1 ? "border-yellow-400 h-28 w-28" : rank === 2 ? "border-slate-300" : "border-amber-500"
            )}>
                <span className="text-3xl font-black text-gray-400">{user.name.charAt(0)}</span>
                <div className={clsx(
                    "absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-white font-bold shadow-md",
                    rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-slate-400" : "bg-amber-700"
                )}>
                    {rank}
                </div>
            </div>
            <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                <div className="flex items-center justify-center space-x-3 mt-1 text-sm">
                    <span className="flex items-center text-success font-bold">
                        <Zap className="mr-1 h-3 w-3" />
                        {user.correctCount}
                    </span>
                    <span className="text-muted">|</span>
                    <span className="text-primary font-bold">{user.accuracy}%</span>
                </div>
            </div>
        </div>
    );
}
