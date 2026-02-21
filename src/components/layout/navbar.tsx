
import Link from 'next/link';
import { PenTool } from 'lucide-react';
import { auth } from '@/auth';

export async function Navbar() {
    const session = await auth();

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center text-xl font-bold text-blue-600">
                        <PenTool className="mr-2 h-6 w-6" />
                        ExamPrep
                    </Link>
                    <div className="ml-10 hidden space-x-8 md:flex">
                        <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Dashboard
                        </Link>
                        <Link href="/questions" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Practice
                        </Link>
                        <Link href="/tests" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Mock Tests
                        </Link>
                    </div>
                </div>
                <div>
                    {session?.user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">Hi, {session.user.name || 'User'}</span>
                            <form action={async () => {
                                'use server';
                                // Need to import signOut from auth.ts but cannot direct import in client if this was client component
                                // Since this is server component, we can use the signOut function logic or just link
                                // For simplicity in MVP without client-side signOut button logic:
                                const { signOut } = await import('@/auth');
                                await signOut({ redirectTo: '/login' });
                            }}>
                                <button className="text-sm text-red-600 hover:underline">Log out</button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                Log in
                            </Link>
                            <Link href="/signup" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
