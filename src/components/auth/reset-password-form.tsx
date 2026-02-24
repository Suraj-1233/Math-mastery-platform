
'use client';

import React, { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/actions/password';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        startTransition(() => {
            resetPassword({ password, token: token || "" }, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    if (success) {
        return (
            <div className="w-full max-w-md bg-surface/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-3xl font-black font-outfit tracking-tight mb-4">Password reset!</h1>
                <p className="text-muted text-sm font-medium mb-8">Your password has been successfully updated. You can now log in with your new password.</p>
                <Link
                    href="/login"
                    className="block w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                    Log In Now
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-surface/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black font-outfit tracking-tight mb-2">New Password</h1>
                <p className="text-muted text-sm font-medium">Please enter your new password below.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-1">New Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            required
                            type="password"
                            name="password"
                            disabled={isPending}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-6 py-4 bg-muted/20 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-1">Confirm Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            required
                            type="password"
                            name="confirmPassword"
                            disabled={isPending}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-6 py-4 bg-muted/20 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-error/10 border border-error/20 rounded-2xl text-xs font-bold text-error flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-error" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
