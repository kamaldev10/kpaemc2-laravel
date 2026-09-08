import AdminNavbar from '@/Components/Admin/Layout/AdminNavbar';
import AdminSidebar from '@/Components/Admin/Layout/AdminSidebar';
import { BreadcrumbItem } from '@/types/admin';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
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
    const { auth } = usePage<PageProps>().props;
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
                    <div className="mx-auto max-w-7xl">{children}</div>
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
