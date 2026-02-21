import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { Target } from 'lucide-react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();
    if (session?.user) {
        redirect('/dashboard');
    }
    return (
        <main className="flex min-h-screen bg-gray-50">
            {/* Left half: Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-12 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
                <div className="relative z-10 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Target className="text-purple-700 w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold">Math Mastery</span>
                </div>

                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Master the Math <br /> Ace the Exam.
                    </h1>
                    <p className="text-lg text-indigo-200 max-w-md">
                        Join thousands of students cracking SSC, Railway, and State level exams with dynamic AI tools and top-tier question banks.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-indigo-300">
                    © {new Date().getFullYear()} Math Mastery Platform. All rights reserved.
                </div>
            </div>

            {/* Right half: Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 relative z-10">
                <div className="w-full max-w-md bg-white lg:bg-transparent rounded-2xl p-8 lg:p-0 shadow-xl lg:shadow-none border border-gray-100 lg:border-none">
                    <div className="mb-10 lg:hidden flex items-center space-x-3 justify-center">
                        <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
                            <Target className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Math Mastery</span>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-sm text-gray-500 mt-2">Log in to track your progress and continue learning.</p>
                    </div>

                    <LoginForm />

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
