import SignupForm from '@/components/auth/signup-form';
import Link from 'next/link';
import { Target, Trophy } from 'lucide-react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
    const session = await auth();
    if (session?.user) {
        redirect('/questions');
    }
    return (
        <main className="flex min-h-screen bg-gray-50">
            {/* Left half: Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-900 via-blue-900 to-black p-12 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
                <div className="relative z-10 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Target className="text-blue-700 w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold">Math Mastery</span>
                </div>

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                        <Trophy className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Start Your Journey <br /> to the Top 1%.
                    </h1>
                    <p className="text-lg text-blue-200 max-w-md">
                        Get unlimited access to tailored mock tests, topic-wise practice banks, and expert shortcuts.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-blue-300">
                    © {new Date().getFullYear()} Math Mastery Platform. All rights reserved.
                </div>
            </div>

            {/* Right half: Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 relative z-10">
                <div className="w-full max-w-md bg-white lg:bg-transparent rounded-2xl p-8 lg:p-0 shadow-xl lg:shadow-none border border-gray-100 lg:border-none">
                    <div className="mb-10 lg:hidden flex items-center space-x-3 justify-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Target className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Math Mastery</span>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
                        <p className="text-sm text-gray-500 mt-2">Join thousands of students achieving their goals.</p>
                    </div>

                    <SignupForm />

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
