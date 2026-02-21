'use client';

import { LogOut, AlertTriangle, Loader2 } from 'lucide-react';
import { logout } from '@/actions/auth';
import { useState } from 'react';

export function LogoutButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleConfirmLogout = async () => {
        setIsLoggingOut(true);
        await logout();
        // Server action will handle the redirect, no need to setIsLoggingOut(false)
    };

    return (
        <>
            <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
            </button>

            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border border-gray-100 transform transition-all">
                        <div className="flex items-center space-x-3 text-red-600 mb-4">
                            <div className="bg-red-100 p-2 rounded-full">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Sign Out?</h3>
                        </div>

                        <p className="text-gray-500 text-sm mb-6">
                            Are you sure you want to log out of your account? You will need to sign in again to access practice materials.
                        </p>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                disabled={isLoggingOut}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmLogout}
                                disabled={isLoggingOut}
                                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                            >
                                {isLoggingOut ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Logging out...
                                    </>
                                ) : (
                                    'Log out'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
