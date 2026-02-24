'use client';

import React, { useState, useEffect } from 'react';
import {
    Building2, Plus, X, Save, Trash2, Pencil,
    Users, Crown, ChevronDown, Phone, Mail,
    Globe, CheckCircle2, AlertCircle, Clock, Search
} from 'lucide-react';

const PLAN_STYLES: Record<string, { label: string; bg: string; text: string; border: string }> = {
    FREE: { label: 'Free', bg: 'bg-muted-light/40', text: 'text-muted', border: 'border-border' },
    STANDARD: { label: 'Standard', bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-200' },
    ENTERPRISE: { label: 'Enterprise', bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-200' },
};

const STATUS_STYLES: Record<string, { icon: any; text: string; bg: string }> = {
    ACTIVE: { icon: CheckCircle2, text: 'text-green-600', bg: 'bg-green-500/10' },
    TRIAL: { icon: Clock, text: 'text-orange-500', bg: 'bg-orange-500/10' },
    SUSPENDED: { icon: AlertCircle, text: 'text-red-500', bg: 'bg-red-500/10' },
};

const emptyForm = {
    name: '', contactEmail: '', contactName: '', contactPhone: '',
    plan: 'STANDARD', maxSeats: 50, status: 'ACTIVE', notes: '',
};

export default function B2BPage() {
    const [orgs, setOrgs] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<any>(null);
    const [formData, setFormData] = useState<any>(emptyForm);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [expandedOrg, setExpandedOrg] = useState<string | null>(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [orgRes, usersRes] = await Promise.all([
                fetch('/api/admin/organizations'),
                fetch('/api/admin/users'),
            ]);
            const orgData = await orgRes.json();
            const usersData = await usersRes.json();
            setOrgs(Array.isArray(orgData) ? orgData : []);
            setAllUsers(Array.isArray(usersData) ? usersData : []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingOrg(null);
        setFormData(emptyForm);
        setFormError('');
        setIsFormOpen(true);
    };

    const openEdit = (org: any) => {
        setEditingOrg(org);
        setFormData({ name: org.name, contactEmail: org.contactEmail, contactName: org.contactName || '', contactPhone: org.contactPhone || '', plan: org.plan, maxSeats: org.maxSeats, status: org.status, notes: org.notes || '' });
        setFormError('');
        setIsFormOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setSaving(true);
        try {
            const url = editingOrg ? `/api/admin/organizations/${editingOrg.id}` : '/api/admin/organizations';
            const method = editingOrg ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            const data = await res.json();
            if (!res.ok) { setFormError(data.error || 'Failed'); return; }
            setIsFormOpen(false);
            fetchAll();
        } catch { setFormError('Network error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this organization? Members will be unlinked.')) return;
        await fetch(`/api/admin/organizations/${id}`, { method: 'DELETE' });
        fetchAll();
    };

    const handleAssignMember = async (orgId: string, userId: string, action: 'add' | 'remove') => {
        await fetch(`/api/admin/organizations/${orgId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, action }),
        });
        fetchAll();
    };

    const filtered = orgs.filter(o =>
        o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.contactEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalSeats = orgs.reduce((s, o) => s + o.maxSeats, 0);
    const totalMembers = orgs.reduce((s, o) => s + (o.memberCount || 0), 0);
    const enterpriseCount = orgs.filter(o => o.plan === 'ENTERPRISE').length;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-outfit flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-primary" />
                        B2B Organizations
                    </h1>
                    <p className="text-muted mt-1">Manage institutional clients, coaching centers, and enterprise accounts.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-outfit"
                >
                    <Plus className="w-5 h-5" />
                    Onboard Organization
                </button>
            </div>

            {/* Summary Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Organizations', value: orgs.length, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/10' },
                    { label: 'Enterprise Clients', value: enterpriseCount, color: 'text-purple-600', bg: 'bg-purple-500/5', border: 'border-purple-200' },
                    { label: 'Total Members', value: totalMembers, color: 'text-blue-600', bg: 'bg-blue-500/5', border: 'border-blue-200' },
                    { label: 'Total Seats Sold', value: totalSeats, color: 'text-green-600', bg: 'bg-green-500/5', border: 'border-green-200' },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4`}>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                    type="text"
                    placeholder="Search organizations..."
                    className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Org Cards */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted gap-4">
                    <Building2 className="w-16 h-16 opacity-10" />
                    <p className="text-lg font-bold">No organizations yet</p>
                    <p className="text-sm">Click "Onboard Organization" to add your first B2B client</p>
                    <button onClick={openCreate} className="mt-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-2xl text-sm font-bold">
                        + Onboard Now
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map(org => {
                        const planStyle = PLAN_STYLES[org.plan] || PLAN_STYLES.FREE;
                        const statusStyle = STATUS_STYLES[org.status] || STATUS_STYLES.ACTIVE;
                        const StatusIcon = statusStyle.icon;
                        const usagePercent = Math.min(100, Math.round(((org.memberCount || 0) / org.maxSeats) * 100));
                        const isExpanded = expandedOrg === org.id;
                        const orgMembers = allUsers.filter(u => u.organizationId === org.id);
                        const unassignedUsers = allUsers.filter(u => !u.organizationId);

                        return (
                            <div key={org.id} className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Card Header */}
                                <div className="p-6 flex items-center gap-5 flex-wrap">
                                    {/* Logo Placeholder */}
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 text-xl font-black text-primary">
                                        {org.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg font-bold">{org.name}</h3>
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${planStyle.bg} ${planStyle.text} ${planStyle.border}`}>
                                                {planStyle.label}
                                            </span>
                                            <div className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {org.status}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 flex-wrap mt-1.5 text-xs text-muted">
                                            {org.contactEmail && (
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {org.contactEmail}
                                                </span>
                                            )}
                                            {org.contactPhone && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" /> {org.contactPhone}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Usage + Actions */}
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs text-muted font-semibold mb-1">Seat Usage</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${usagePercent > 80 ? 'bg-red-500' : usagePercent > 50 ? 'bg-orange-500' : 'bg-green-500'}`}
                                                        style={{ width: `${usagePercent}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold">{org.memberCount || 0}/{org.maxSeats}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => openEdit(org)} className="p-2.5 hover:bg-primary/10 rounded-xl transition-all text-primary">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(org.id)} className="p-2.5 hover:bg-destructive/10 rounded-xl transition-all text-muted hover:text-destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setExpandedOrg(isExpanded ? null : org.id)}
                                            className={`p-2.5 rounded-xl transition-all ${isExpanded ? 'bg-primary/10 text-primary' : 'hover:bg-muted-light/30 text-muted'}`}
                                        >
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded: Member Management */}
                                {isExpanded && (
                                    <div className="border-t border-border p-6 bg-muted-light/5 space-y-5">
                                        {/* Current Members */}
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                                                <Users className="w-3.5 h-3.5" /> Current Members ({orgMembers.length})
                                            </h4>
                                            {orgMembers.length === 0 ? (
                                                <p className="text-xs text-muted italic">No members assigned yet.</p>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    {orgMembers.map(u => (
                                                        <div key={u.id} className="flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-xl text-xs">
                                                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                                                {(u.name || u.email).charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="font-medium">{u.name || u.email}</span>
                                                            <button
                                                                onClick={() => handleAssignMember(org.id, u.id, 'remove')}
                                                                className="text-muted hover:text-destructive transition-colors ml-1"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Add member */}
                                        {unassignedUsers.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-muted mb-3">Add Member</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {unassignedUsers.map(u => (
                                                        <button
                                                            key={u.id}
                                                            onClick={() => handleAssignMember(org.id, u.id, 'add')}
                                                            className="flex items-center gap-2 bg-primary/5 border border-primary/20 hover:bg-primary/10 px-3 py-1.5 rounded-xl text-xs transition-all"
                                                        >
                                                            <Plus className="w-3 h-3 text-primary" />
                                                            <span className="font-medium">{u.name || u.email}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {org.notes && (
                                            <div className="p-3 bg-yellow-500/5 border border-yellow-200 rounded-xl text-xs text-muted">
                                                <span className="font-bold text-yellow-700">Notes: </span>{org.notes}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-surface w-full max-w-xl rounded-3xl shadow-2xl border border-border">
                        <div className="px-7 py-5 border-b border-border flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold font-outfit">{editingOrg ? 'Edit Organization' : 'Onboard Organization'}</h2>
                                <p className="text-xs text-muted mt-0.5">Fill in the institutional details below.</p>
                            </div>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-muted-light/30 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-7 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Organization Name *</label>
                                    <input required type="text" placeholder="e.g. Brilliant Academy" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Contact Name</label>
                                    <input type="text" placeholder="e.g. Rahul Sharma" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" value={formData.contactName} onChange={e => setFormData({ ...formData, contactName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Contact Email *</label>
                                    <input required type="email" placeholder="e.g. rahul@academy.com" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" value={formData.contactEmail} onChange={e => setFormData({ ...formData, contactEmail: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Phone</label>
                                    <input type="tel" placeholder="+91 98765 43210" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" value={formData.contactPhone} onChange={e => setFormData({ ...formData, contactPhone: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Max Seats</label>
                                    <input type="number" min="1" className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" value={formData.maxSeats} onChange={e => setFormData({ ...formData, maxSeats: parseInt(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Plan</label>
                                    <select className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" value={formData.plan} onChange={e => setFormData({ ...formData, plan: e.target.value })}>
                                        <option value="FREE">Free</option>
                                        <option value="STANDARD">Standard</option>
                                        <option value="ENTERPRISE">Enterprise</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Status</label>
                                    <select className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="ACTIVE">Active</option>
                                        <option value="TRIAL">Trial</option>
                                        <option value="SUSPENDED">Suspended</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Internal Notes</label>
                                    <textarea placeholder="Deal notes, special instructions..." className="w-full p-3 bg-muted-light/30 border border-border rounded-xl text-sm outline-none min-h-[70px]" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                                </div>
                            </div>

                            {formError && (
                                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive font-semibold">
                                    ⚠️ {formError}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 border border-border rounded-2xl text-sm font-bold hover:bg-muted-light/30 transition-all">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50">
                                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" />{editingOrg ? 'Save Changes' : 'Onboard'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
