import AdminLayout from '@/Layouts/AdminLayout';
import AdminPagination from '@/Components/Admin/UI/AdminPagination';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    CheckCheck,
    Eye,
    Mail,
    MailOpen,
    MessageSquare,
    Search,
    Trash2,
    User,
    X,
} from 'lucide-react';
import React, { FC, useState } from 'react';

interface ContactItem {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    ip_address?: string;
    created_at: string;
    created_at_human: string;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ContactsPageProps {
    contacts: {
        data: ContactItem[];
        meta?: PaginationMeta;
        links?: Array<{ url: string | null; label: string; active: boolean }>;
        from?: number;
        to?: number;
        total?: number;
    };
    unreadCount: number;
    filters: {
        search: string;
        status: string;
        per_page?: string;
    };
}

export const ContactsIndex: FC<ContactsPageProps> = ({
    contacts,
    unreadCount,
    filters,
}) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/contacts',
            { search: searchTerm, status: filters.status, per_page: filters.per_page },
            { preserveState: true }
        );
    };

    const handleStatusFilter = (status: string) => {
        router.get(
            '/admin/contacts',
            { search: searchTerm, status, per_page: filters.per_page },
            { preserveState: true }
        );
    };

    const handleMarkAsRead = (contact: ContactItem) => {
        router.patch(
            route('admin.contacts.read', contact.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedContact?.id === contact.id) {
                        setSelectedContact({ ...selectedContact, is_read: true });
                    }
                },
            }
        );
    };

    const handleMarkAllAsRead = () => {
        if (confirm('Tandai semua pesan kontak sebagai sudah dibaca?')) {
            router.post(
                route('admin.contacts.read-all'),
                {},
                { preserveScroll: true }
            );
        }
    };

    const handleDelete = (contact: ContactItem) => {
        if (confirm(`Hapus pesan dari "${contact.name}"?`)) {
            router.delete(route('admin.contacts.destroy', contact.id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedContact?.id === contact.id) {
                        setSelectedContact(null);
                    }
                },
            });
        }
    };

    const contactList = contacts?.data ?? [];

    return (
        <AdminLayout
            title="Pesan Masuk"
            headerTitle="Pesan Masuk (Inbox)"
            headerDescription="Daftar pesan dan formulir kontak yang dikirim oleh pengunjung portal publik."
            headerActions={
                unreadCount > 0 ? (
                    <button
                        type="button"
                        onClick={handleMarkAllAsRead}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
                    >
                        <CheckCheck className="h-4 w-4 text-purple-600" />
                        <span>Tandai Semua Dibaca ({unreadCount})</span>
                    </button>
                ) : undefined
            }
            breadcrumbs={[
                { label: 'Admin', href: '/admin' },
                { label: 'Pesan Masuk' },
            ]}
        >
            <Head title="Pesan Masuk" />

            <div className="space-y-6">
                {/* Search & Filter Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleStatusFilter('')}
                            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                                !filters.status
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            Semua Pesan
                        </button>
                        <button
                            type="button"
                            onClick={() => handleStatusFilter('unread')}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                                filters.status === 'unread'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            <Mail className="h-3.5 w-3.5" />
                            <span>Belum Dibaca</span>
                            {unreadCount > 0 && (
                                <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleStatusFilter('read')}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                                filters.status === 'read'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            <MailOpen className="h-3.5 w-3.5" />
                            <span>Sudah Dibaca</span>
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama, subjek, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64 rounded-xl border border-slate-300 py-2 pl-9 pr-3 text-xs focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
                        >
                            Cari
                        </button>
                    </form>
                </div>

                {/* Contact List / Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                    {contactList.length === 0 ? (
                        <div className="py-16 text-center">
                            <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
                            <h3 className="mt-3 text-sm font-bold text-slate-800">Tidak ada pesan</h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Belum ada formulir kontak yang masuk atau sesuai dengan pencarian Anda.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-200">
                            {contactList.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => {
                                        setSelectedContact(contact);
                                        if (!contact.is_read) {
                                            handleMarkAsRead(contact);
                                        }
                                    }}
                                    className={`flex cursor-pointer items-start justify-between p-4 transition-colors hover:bg-slate-50 ${
                                        !contact.is_read ? 'bg-purple-50/50 font-semibold' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div
                                            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                                !contact.is_read
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-slate-100 text-slate-400'
                                            }`}
                                        >
                                            {contact.is_read ? (
                                                <MailOpen className="h-4 w-4" />
                                            ) : (
                                                <Mail className="h-4 w-4" />
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-slate-900">
                                                    {contact.name}
                                                </span>
                                                <span className="text-xs text-slate-400 font-normal">
                                                    &lt;{contact.email}&gt;
                                                </span>
                                                {!contact.is_read && (
                                                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                                                        Baru
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="mt-1 text-xs font-semibold text-slate-800">
                                                {contact.subject}
                                            </h4>
                                            <p className="mt-1 line-clamp-2 text-xs text-slate-500 font-normal">
                                                {contact.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                                        <span className="text-[11px] text-slate-400 font-normal">
                                            {contact.created_at_human}
                                        </span>
                                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(contact)}
                                                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                                title="Hapus Pesan"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <AdminPagination
                        pagination={contacts.meta ? contacts.meta : contacts}
                        perPage={filters.per_page || 10}
                        baseUrl="/admin/contacts"
                        filters={{
                            search: searchTerm || undefined,
                            status: filters.status || undefined,
                        }}
                        itemName="pesan kontak"
                    />
                </div>
            </div>

            {/* Read Modal Drawer */}
            {selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                    <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-5">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    {selectedContact.subject}
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Diterima pada {selectedContact.created_at} ({selectedContact.created_at_human})
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedContact(null)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Sender info */}
                        <div className="rounded-xl bg-slate-50 p-4 text-xs space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-700">Pengirim:</span>
                                <span className="text-slate-900">{selectedContact.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-700">Email:</span>
                                <a
                                    href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(
                                        selectedContact.subject
                                    )}`}
                                    className="text-purple-600 hover:underline"
                                >
                                    {selectedContact.email}
                                </a>
                            </div>
                            {selectedContact.ip_address && (
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-700">IP Address:</span>
                                    <span className="font-mono text-slate-500">{selectedContact.ip_address}</span>
                                </div>
                            )}
                        </div>

                        {/* Message Content */}
                        <div className="rounded-xl border border-slate-200 p-4">
                            <p className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed">
                                {selectedContact.message}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                            <button
                                type="button"
                                onClick={() => handleDelete(selectedContact)}
                                className="flex items-center gap-1.5 rounded-xl border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Hapus Pesan</span>
                            </button>

                            <div className="flex items-center gap-2">
                                <a
                                    href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(
                                        selectedContact.subject
                                    )}`}
                                    className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>Balas via Email</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ContactsIndex;
