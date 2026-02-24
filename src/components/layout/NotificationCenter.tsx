
'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Check, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { getNotifications, markAsRead } from '@/actions/notifications';
import { cn } from '@/lib/utils';

const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "just now";
};

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data || []);
            setUnreadCount((data || []).filter((n: any) => !n.isRead).length);
        } catch (e) {
            console.error("Failed to fetch notifications");
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkAsRead = async (id: string) => {
        await markAsRead(id);
        fetchNotifications();
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'SUCCESS': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'ALERT': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'WARNING': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/5"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 ring-1 ring-black/5 z-50 overflow-hidden">
                        <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">In-App Alerts</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        className={cn(
                                            "p-4 border-b border-gray-50 flex gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer relative group",
                                            !n.isRead && "bg-blue-50/30"
                                        )}
                                        onClick={() => handleMarkAsRead(n.id)}
                                    >
                                        <div className="mt-1 shrink-0">{getIcon(n.type)}</div>
                                        <div className="flex-1">
                                            <p className={cn("text-xs leading-relaxed", !n.isRead ? "font-bold text-gray-900" : "text-gray-500")}>
                                                {n.message}
                                            </p>
                                            <p className="text-[9px] text-gray-400 mt-1 font-black uppercase tracking-wider">
                                                {timeAgo(n.createdAt)}
                                            </p>
                                        </div>
                                        {!n.isRead && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0 shadow-sm shadow-blue-500/50" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 px-6 text-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <Bell className="w-6 h-6 text-gray-200" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-loose">
                                        No active alerts
                                    </p>
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-4 bg-gray-50/50 text-center border-t border-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">
                                    Clear All History
                                </span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
