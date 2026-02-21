'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            // Need to hit a client-compatible server action or api endpoint for NextAuth logout.
            // Using a simple form submission or redirect can trigger NextAuth to kill the session.
            router.push('/api/auth/signout?callbackUrl=/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
        >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
        </button>
    );
}
