'use client';

import { Sword, Flame, Target, Sun, Award, Shield, Zap, Share2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';

const ICON_MAP: Record<string, any> = {
    Sword,
    Flame,
    Target,
    Sun,
    Award,
    Shield,
    Zap
};

export function BadgeCard({ badge }: { badge: any }) {
    const Icon = ICON_MAP[badge.icon] || Award;
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const shareData = {
            title: `I earned the ${badge.name} badge!`,
            text: `Just unlocked the "${badge.name}" achievement on Math Mastery Platform: ${badge.description}`,
            url: window.location.origin + '/dashboard',
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} Check it out at ${shareData.url}`);
                setIsSharing(true);
                setTimeout(() => setIsSharing(false), 2000);
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <div className="group relative flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <button
                onClick={handleShare}
                className="absolute right-2 top-2 p-1.5 rounded-full bg-gray-50 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-primary/10 hover:text-primary transition-all"
                title="Share Achievement"
            >
                <Share2 className="h-3.5 w-3.5" />
            </button>

            {isSharing && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce rounded bg-gray-900 px-3 py-1 text-[10px] text-white z-50 shadow-lg font-bold whitespace-nowrap">
                    Link Copied!
                </div>
            )}

            <div className={clsx(
                "mb-3 flex h-14 w-14 items-center justify-center rounded-full shadow-inner ring-4 ring-white transition-transform group-hover:scale-110",
                badge.type === 'ACHIEVEMENT' ? "bg-blue-50 text-blue-600" :
                    badge.type === 'STREAK' ? "bg-orange-50 text-orange-600" :
                        "bg-purple-50 text-purple-600"
            )}>
                <Icon className="h-7 w-7" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 text-center leading-tight">{badge.name}</h4>
            <div className="absolute inset-x-0 -bottom-14 z-20 hidden group-hover:block px-2 pointer-events-none transition-all">
                <div className="rounded-lg bg-gray-900/95 p-2 text-[10px] text-white shadow-xl backdrop-blur-sm border border-white/10 text-center">
                    {badge.description}
                </div>
            </div>
        </div>
    );
}

export function BadgesList({ badges }: { badges: any[] }) {
    if (badges.length === 0) {
        return (
            <div className="rounded-2xl border-2 border-dashed border-gray-100 p-8 text-center">
                <Award className="mx-auto h-10 w-10 text-gray-200" />
                <p className="mt-2 text-sm text-gray-400">No badges earned yet. Keep solving questions to unlock them!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
            ))}
        </div>
    );
}
