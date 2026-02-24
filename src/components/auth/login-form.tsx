'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate, googleSignIn } from '@/actions/auth';
import { Loader2, User, Building2 } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [loginType, setLoginType] = useState<'individual' | 'organization'>('individual');

    return (
        <div className="space-y-6">
            {/* Login Type Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                    type="button"
                    onClick={() => setLoginType('individual')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${loginType === 'individual'
                            ? 'bg-white text-purple-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <User className="w-4 h-4 mr-2" />
                    Individual
                </button>
                <button
                    type="button"
                    onClick={() => setLoginType('organization')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${loginType === 'organization'
                            ? 'bg-white text-purple-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <Building2 className="w-4 h-4 mr-2" />
                    Organization
                </button>
            </div>

            {message === 'verify-email' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm font-medium text-blue-700">
                    Account created! Please check your email for a verification code.
                </div>
            )}

            {/* Google Login Action - Only show for individuals */}
            {loginType === 'individual' && (
                <>
                    <form action={googleSignIn}>
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center space-x-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white lg:bg-gray-50 px-2 text-gray-500">Or continue with email</span>
                        </div>
                    </div>
                </>
            )}

            {loginType === 'organization' && (
                <div className="text-sm text-gray-600 text-center pb-2">
                    Please use the credentials provided by your institute.
                </div>
            )}

            <form action={dispatch} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        {loginType === 'organization' ? 'Organization Email' : 'Email Address'}
                    </label>
                    <input
                        className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-400"
                        id="email"
                        type="email"
                        name="email"
                        placeholder={loginType === 'organization' ? 'student@institute.com' : 'you@example.com'}
                        required
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <a href="/forgot-password" className="text-xs font-semibold text-purple-600 hover:text-purple-700">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-400"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                    />
                </div>

                <LoginButton />

                <div aria-live="polite" aria-atomic="true" className="min-h-8">
                    {errorMessage && <p className="text-sm font-medium text-red-600 mt-2">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            aria-disabled={pending}
            type="submit"
        >
            {pending ? (
                <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Logging in...
                </>
            ) : 'Log in'}
        </button>
    );
}
