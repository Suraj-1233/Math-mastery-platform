'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    Trash2,
    Search,
    User as UserIcon,
    Clock,
    Mail,
    UserPlus,
    X,
    Save,
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
    Shield,
    Crown,
    Building2,
    GraduationCap,
    Upload
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/lib/constants';
import BulkUserModal from '@/components/admin/BulkUserModal';

type SortField = 'name' | 'role' | 'subscriptionStatus' | 'createdAt' | null;
type SortDir = 'asc' | 'desc';

export default function UsersAdminPage() {
    const { data: session } = useSession();
    const params = React.use(useParams() as any) as any;
    const slug = params?.slug;

    const currentUserRole = (session?.user as any)?.role || ROLES.USER;
    const isAdmin = currentUserRole === ROLES.ADMIN;

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<'ALL' | 'ADMIN' | 'ORG_OWNER' | 'TEACHER' | 'USER'>('ALL');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    // Add User Modal
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isBulkOpen, setIsBulkOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER', subscriptionStatus: 'FREE', organizationId: '' });
    const [addError, setAddError] = useState('');
    const [addLoading, setAddLoading] = useState(false);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users`);
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string, email: string) => {
        if (!confirm(`Are you sure you want to remove ${email}? This cannot be undone.`)) return;
        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
            if (res.ok) fetchUsers();
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });
            if (res.ok) fetchUsers();
        } catch (err) { console.error(err); }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddError('');
        setAddLoading(true);
        try {
            const res = await fetch(`/api/admin/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (!res.ok) { setAddError(data.error || 'Failed to create user'); return; }
            setIsAddOpen(false);
            setNewUser({ name: '', email: '', password: '', role: 'USER', subscriptionStatus: 'FREE', organizationId: '' });
            fetchUsers();
        } catch (err) {
            setAddError('Network error');
        } finally {
            setAddLoading(false);
        }
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('asc');
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />;
        return sortDir === 'asc'
            ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
            : <ChevronDown className="w-3.5 h-3.5 text-primary" />;
    };

    let filtered = users.filter(u => {
        const matchSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = filterRole === 'ALL' || u.role === filterRole;
        return matchSearch && matchRole;
    });

    if (sortField) {
        filtered = [...filtered].sort((a, b) => {
            let av = (a[sortField] || '').toString().toLowerCase();
            let bv = (b[sortField] || '').toString().toLowerCase();
            if (av < bv) return sortDir === 'asc' ? -1 : 1;
            if (av > bv) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-outfit">
                        {isAdmin ? 'Global User Directory' : 'Organization Members'}
                    </h1>
                    <p className="text-muted mt-1">
                        {isAdmin ? 'Manage all accounts across the entire platform.' : 'Manage teachers and students within your institution.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsBulkOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-muted-light/20 border border-border text-foreground rounded-2xl text-sm font-bold hover:bg-muted-light/40 transition-all font-outfit"
                    >
                        <Upload className="w-5 h-5 text-muted" />
                        Bulk Import
                    </button>
                    <button
                        onClick={() => { setIsAddOpen(true); setAddError(''); }}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-outfit"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add Member
                    </button>
                </div>
            </div>

            {/* Summary Pills */}
            <div className="flex gap-3 flex-wrap">
                <div className="px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {users.length} Total Members
                </div>
                {isAdmin && (
                    <div className="px-4 py-2 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-purple-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        {users.filter(u => u.role === ROLES.ADMIN).length} High Admins
                    </div>
                )}
                <div className="px-4 py-2 bg-orange-500/5 border border-orange-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-orange-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    {users.filter(u => u.role === ROLES.TEACHER).length} Teachers
                </div>
                <div className="px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {users.filter(u => u.role === ROLES.USER).length} Students
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
                {/* Filters Bar */}
                <div className="p-5 border-b border-border flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px] max-w-sm text-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-11 pr-4 py-2.5 bg-muted-light/30 border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-1 bg-muted-light/20 border border-border rounded-2xl p-1">
                        {(['ALL', 'TEACHER', 'USER', 'ORG_OWNER'] as const).map(r => (
                            <button
                                key={r}
                                onClick={() => setFilterRole(r)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${filterRole === r ? 'bg-primary text-primary-foreground shadow' : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                {r === 'ALL' ? 'Everyone' : r === 'USER' ? 'Students' : r.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted gap-3">
                        <UserIcon className="w-12 h-12 opacity-20" />
                        <p className="text-sm font-semibold">No members match your criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted-light/10 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
                                    <th className="px-8 py-4">Identity</th>
                                    <th className="px-8 py-4">Capabilities</th>
                                    <th className="px-8 py-4">Security</th>
                                    {isAdmin && <th className="px-8 py-4">Organization</th>}
                                    <th className="px-8 py-4">Member Since</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filtered.map(user => {
                                    const roleColors: Record<string, string> = {
                                        ADMIN: 'bg-purple-500/10 text-purple-600 border-purple-200',
                                        ORG_OWNER: 'bg-blue-500/10 text-blue-600 border-blue-200',
                                        TEACHER: 'bg-green-500/10 text-green-600 border-green-200',
                                        USER: 'bg-muted-light/50 text-muted border-border',
                                    };

                                    return (
                                        <tr key={user.id} className="hover:bg-muted-light/5 transition-all group">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black shadow-sm ${user.role === ROLES.ADMIN ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white' : 'bg-primary/5 text-primary border border-primary/10'}`}>
                                                        {(user.name || user.email).charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black"> {user.name || 'Anonymous User'} </p>
                                                        <p className="text-[10px] text-muted font-bold flex items-center gap-1 mt-0.5">
                                                            <Mail className="w-3 h-3" /> {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className={`text-[9px] font-black uppercase px-2 py-1 rounded-full border inline-block ${roleColors[user.role]}`}>
                                                    {user.role === 'USER' ? 'Student' : user.role.replace('_', ' ')}
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                {user.needsPasswordChange ? (
                                                    <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100 w-fit">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-[9px] font-black uppercase tracking-wider">Pending Change</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 w-fit">
                                                        <Shield className="w-3 h-3" />
                                                        <span className="text-[9px] font-black uppercase tracking-wider">Secure</span>
                                                    </div>
                                                )}
                                            </td>
                                            {isAdmin && (
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-3.5 h-3.5 text-muted" />
                                                        <span className="text-xs font-bold text-muted truncate max-w-[120px]">
                                                            {user.organizationId ? `ORG-${user.organizationId.slice(-6).toUpperCase()}` : 'PLATFORM DIRECT'}
                                                        </span>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="px-8 py-4">
                                                <p className="text-xs font-bold text-muted">
                                                    {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                                </p>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id, user.email)}
                                                    className="p-2.5 text-muted hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal for adding user */}
            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <div className="bg-surface w-full max-w-md rounded-3xl shadow-2xl border border-border">
                        <div className="px-8 py-6 border-b border-border">
                            <h2 className="text-xl font-bold font-outfit">Add New Member</h2>
                            <p className="text-xs text-muted mt-1">Configure user access and institutional role.</p>
                        </div>
                        <form onSubmit={handleAddUser} className="p-8 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5">Full Name</label>
                                <input required type="text" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" placeholder="e.g. John Doe" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5">Email Address</label>
                                <input required type="email" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" placeholder="john@example.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5">Password</label>
                                <input required type="password" minLength={6} className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" placeholder="••••••••" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5">Role</label>
                                    <select className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                                        <option value="USER">Student</option>
                                        <option value="TEACHER">Teacher</option>
                                        {isAdmin && <option value="ORG_OWNER">Org Manager</option>}
                                        {isAdmin && <option value="ADMIN">Super Admin</option>}
                                    </select>
                                </div>
                                {isAdmin && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5">Org (Optional)</label>
                                        <input type="text" placeholder="Org ID" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" value={newUser.organizationId} onChange={e => setNewUser({ ...newUser, organizationId: e.target.value })} />
                                    </div>
                                )}
                            </div>
                            {addError && <div className="p-3 bg-red-500/10 border border-red-200 rounded-xl text-xs text-red-600 font-bold">⚠️ {addError}</div>}
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsAddOpen(false)} className="flex-1 py-3 border border-border rounded-2xl text-sm font-bold">Cancel</button>
                                <button type="submit" disabled={addLoading} className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-lg shadow-primary/20">
                                    {addLoading ? 'Creating...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <BulkUserModal
                isOpen={isBulkOpen}
                onClose={() => setIsBulkOpen(false)}
                onSuccess={fetchUsers}
            />
        </div>
    );
}
