
'use client';

import React, { useState, useTransition } from 'react';
import { forgotPassword } from '@/actions/password';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        startTransition(() => {
            forgotPassword({ email })
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    return (
        <div className="w-full max-w-md bg-surface/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black font-outfit tracking-tight mb-2">Forgot Password?</h1>
                <p className="text-muted text-sm font-medium">No worries, we'll send you reset instructions.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            required
                            type="email"
                            name="email"
                            disabled={isPending}
                            placeholder="name@example.com"
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
                {success && (
                    <div className="p-4 bg-success/10 border border-success/20 rounded-2xl text-xs font-bold text-success flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <Link href="/login" className="text-muted hover:text-foreground font-bold flex items-center justify-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Log In
                </Link>
            </div>
        </div>
    );
}
