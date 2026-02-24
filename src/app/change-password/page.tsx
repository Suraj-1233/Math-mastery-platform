
'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { updatePassword } from '@/actions/auth'; // We'll need to create this

export default function ChangePasswordPage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await updatePassword(password);
            if (res.success) {
                setSuccess(true);
                // Update the session to reflect that password change is no longer needed
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        needsPasswordChange: false
                    }
                });

                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                setError(res.error || 'Failed to update password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted-light/30 flex items-center justify-center p-4">
            <div className="bg-surface w-full max-w-md rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-10">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-black font-outfit text-foreground items-center gap-2">
                        Secure Your Account
                    </h1>
                    <p className="text-sm text-muted mt-2 font-medium">
                        Since this is your first login, please set a new personal password to continue.
                    </p>
                </div>

                {success ? (
                    <div className="flex flex-col items-center text-center py-8 space-y-4">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 animate-bounce">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-green-700">Password Updated!</h2>
                        <p className="text-sm text-green-600">Redirecting you to your dashboard...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">New Password</label>
                            <input
                                required
                                type="password"
                                className="w-full p-4 bg-muted-light/50 border border-border rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Enter secure password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Confirm Password</label>
                            <input
                                required
                                type="password"
                                className="w-full p-4 bg-muted-light/50 border border-border rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Repeat your new password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-destructive/10 border border-destructive/10 rounded-2xl text-xs text-destructive font-black flex items-center gap-2 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive pulse" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Updating Security...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Update Password
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
