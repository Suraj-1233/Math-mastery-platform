import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import WorkspaceSelector from '@/components/dashboard/WorkspaceSelector';

export default async function WorkspacePage() {
    const session = await auth();
    if (!session?.user) redirect('/login');

    const user = session.user as any;
    const role = user.role;
    const memberships = user.memberships || [];

    // System Admin goes to Admin Panel
    if (role === 'ADMIN') redirect('/admin');

    // If no orgs, straight to personal dashboard
    if (memberships.length === 0) {
        redirect('/dashboard');
    }

    // If exactly one org, go straight to that org dashboard
    if (memberships.length === 1) {
        // We still don't auto-redirect immediately if we want them to choose between personal and org.
        // But let's ask them to choose anyway if they have ONE org, because they have a personal account too!
        // Wait, the user said "wah hum login ke just baad hi org decide to kar rahe thi waah se".
        // Let's just show the selector for ANY org membership.
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4">
            <WorkspaceSelector memberships={memberships} userName={user.name || 'User'} />
        </div>
    );
}
