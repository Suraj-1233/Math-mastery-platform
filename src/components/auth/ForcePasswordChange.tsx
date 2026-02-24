
'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ForcePasswordChange() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const user = session.user as any;

            // If user needs password change and isn't already on the change-password page
            if (user.needsPasswordChange === true && pathname !== '/change-password') {
                router.replace('/change-password');
            }
        }
    }, [session, status, pathname, router]);

    return null;
}
