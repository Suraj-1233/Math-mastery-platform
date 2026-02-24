
'use client';

import React, { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmail } from '@/actions/auth';
import { KeyRound, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const code = formData.get("code") as string;

        startTransition(() => {
            verifyEmail(code)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        setSuccess(data.success);
                        setTimeout(() => {
                            router.push('/login');
                        }, 3000);
                    }
                });
        });
    };

    if (success) {
        return (
            <div className="w-full max-w-md bg-surface/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-3xl font-black font-outfit tracking-tight mb-4">Email Verified!</h1>
                <p className="text-muted text-sm font-medium mb-8">Your email has been successfully verified. Redirecting you to login...</p>
                <Link
                    href="/login"
                    className="block w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                    Return to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-surface/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black font-outfit tracking-tight mb-2">Verify Email</h1>
                <p className="text-muted text-sm font-medium">We've sent a 6-digit code to <span className="text-foreground font-bold">{email || "your email"}</span></p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-1">Verification Code</label>
                    <div className="relative group text-center flex justify-center">
                        <input
                            required
                            type="text"
                            name="code"
                            disabled={isPending}
                            placeholder="000000"
                            maxLength={6}
                            className="w-full text-center tracking-[1em] text-2xl font-black py-4 bg-muted/20 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
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
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Code"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <p className="text-muted font-medium mb-2">Didn't receive the code?</p>
                <button className="text-primary hover:text-primary/80 font-black transition-colors">
                    Resend Code
                </button>
            </div>
        </div>
    );
}
