'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Building2, User, ChevronRight } from 'lucide-react';

export default function WorkspaceSelector({ memberships, userName }: { memberships: any[], userName: string }) {
    const router = useRouter();
    const { update } = useSession();

    const handleSelect = async (orgId: string | null, slug: string | null) => {
        // Update session organizationId context
        await update({ organizationId: orgId || 'personal' });

        if (slug) {
            window.location.href = `/org/${slug}/dashboard`;
        } else {
            window.location.href = '/dashboard'; // Personal dashboard
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome, {userName}</h2>
                        <p className="text-sm text-gray-500 font-medium">Select an identity to continue</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Personal Workspace */}
                    <button
                        onClick={() => handleSelect(null, null)}
                        className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-blue-100 bg-blue-50/30 hover:bg-blue-50 transition-all text-left group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">Personal Account</p>
                                <p className="text-[11px] text-blue-600 font-black uppercase tracking-widest">Public Practice & PYQs</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-blue-400" />
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-gray-400 font-bold tracking-widest">Your Organizations</span>
                        </div>
                    </div>

                    {/* Organizations */}
                    <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                        {memberships.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => handleSelect(m.organizationId, m.organization.slug)}
                                className="w-full flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-gray-50 transition-all text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <Building2 className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{m.organization.name}</p>
                                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Role: {m.role}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium">
                    You can switch contexts later from your profile menu.
                </p>
            </div>
        </div>
    );
}
