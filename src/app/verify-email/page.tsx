
import React, { Suspense } from 'react';
import VerifyEmailForm from '@/components/auth/verify-email-form';
import { Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background overflow-hidden relative">
            {/* Animated Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] animate-pulse delay-700" />

            <Suspense fallback={
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Loading...
                </div>
            }>
                <VerifyEmailForm />
            </Suspense>
        </div>
    );
}
