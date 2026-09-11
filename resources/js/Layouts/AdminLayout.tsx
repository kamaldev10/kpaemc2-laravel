import AdminNavbar from '@/Components/Admin/Layout/AdminNavbar';
import AdminSidebar from '@/Components/Admin/Layout/AdminSidebar';
import { BreadcrumbItem } from '@/types/admin';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
    headerTitle?: ReactNode;
    headerDescription?: ReactNode;
    headerActions?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export const AdminLayout: FC<AdminLayoutProps> = ({
    title,
    headerTitle,
    headerDescription,
    headerActions,
    breadcrumbs = [],
    children,
}) => {
    const { auth, flash } = usePage<PageProps>().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const user = auth.user;

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
            {title && <Head title={title} />}

            {/* Sidebar (Desktop Persistent & Mobile Drawer) */}
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                user={user}
            />

            {/* Main Content Area */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Navbar Topbar */}
                <AdminNavbar
                    user={user}
                    breadcrumbs={breadcrumbs}
                    onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                />

                {/* Optional Page Header */}
                {(headerTitle || headerActions) && (
                    <div className="border-b border-slate-200/80 bg-white px-4 py-5 sm:px-6 lg:px-8">
                        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                {typeof headerTitle === 'string' ? (
                                    <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                        {headerTitle}
                                    </h1>
                                ) : (
                                    headerTitle
                                )}

                                {headerDescription && (
                                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                        {headerDescription}
                                    </p>
                                )}
                            </div>

                            {headerActions && (
                                <div className="flex shrink-0 items-center gap-2.5">
                                    {headerActions}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Content Body */}
                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {/* Flash Alerts */}
                        {flash?.success && (
                            <div className="mb-6 flex items-start justify-between rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-emerald-900 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
                                    <p className="text-sm font-medium">{flash.success}</p>
                                </div>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-6 flex items-start justify-between rounded-xl border border-rose-200 bg-rose-50/90 p-4 text-rose-900 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="mt-0.5 h-5 w-5 text-rose-600 shrink-0" />
                                    <p className="text-sm font-medium">{flash.error}</p>
                                </div>
                            </div>
                        )}
                        {flash?.message && (
                            <div className="mb-6 flex items-start justify-between rounded-xl border border-blue-200 bg-blue-50/90 p-4 text-blue-900 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Info className="mt-0.5 h-5 w-5 text-blue-600 shrink-0" />
                                    <p className="text-sm font-medium">{flash.message}</p>
                                </div>
                            </div>
                        )}

                        {children}
                    </div>
                </main>

                {/* Admin Footer */}
                <footer className="border-t border-slate-200/70 bg-white/60 py-4 text-center text-xs text-slate-400">
                    <div className="mx-auto max-w-7xl px-4">
                        <span>© {new Date().getFullYear()} KPA EMC² FMIPA UNRI · Portal Pengurus Internal</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
