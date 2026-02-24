'use client';

import React from 'react';
import { Settings as SettingsIcon, Save, Bell, Shield, Globe, Database } from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold">Platform Settings</h1>
                <p className="text-muted mt-1">Configure global platform behavior and preferences.</p>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted-light/10 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        <h2 className="font-bold">General Configuration</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Platform Name</label>
                                <input type="text" className="w-full p-2.5 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" defaultValue="Math Mastery" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Support Email</label>
                                <input type="email" className="w-full p-2.5 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" defaultValue="support@mathmastery.com" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <input type="checkbox" id="maintenance" className="w-4 h-4 rounded text-primary" />
                            <label htmlFor="maintenance" className="text-sm font-medium">Maintenance Mode (Block user access)</label>
                        </div>
                    </div>
                </div>

                {/* Exam Settings */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted-light/10 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <h2 className="font-bold">Exam & Content Rules</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Default Negative Marking</label>
                                <input type="number" step="0.25" className="w-full p-2.5 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" defaultValue="0.25" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Passing Percentage (%)</label>
                                <input type="number" className="w-full p-2.5 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" defaultValue="33" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted-light/10 flex items-center gap-2">
                        <Database className="w-5 h-5 text-orange-500" />
                        <h2 className="font-bold">System & Database</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted-light/20 rounded-xl border border-border">
                            <div>
                                <p className="text-sm font-bold">Database Cleanup</p>
                                <p className="text-xs text-muted">Remove expired sessions and temporary files.</p>
                            </div>
                            <button className="px-4 py-2 bg-muted-light/50 hover:bg-muted-light/80 rounded-lg text-xs font-bold transition-all">
                                Run Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
                    <Save className="w-5 h-5" />
                    Save Global Settings
                </button>
            </div>
        </div>
    );
}
