import AdminBreadcrumbs from '@/Components/Admin/Layout/AdminBreadcrumbs';
import AdminUserDropdown from '@/Components/Admin/Layout/AdminUserDropdown';
import { BreadcrumbItem } from '@/types/admin';
import { User } from '@/types';
import { Menu } from 'lucide-react';
import { FC } from 'react';

interface AdminNavbarProps {
    user: User;
    breadcrumbs?: BreadcrumbItem[];
    onToggleSidebar: () => void;
}

export const AdminNavbar: FC<AdminNavbarProps> = ({ user, breadcrumbs = [], onToggleSidebar }) => {
    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
            {/* Left side: Hamburger button (mobile) + Breadcrumbs */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 lg:hidden"
                    aria-label="Buka Menu Sidebar"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <AdminBreadcrumbs items={breadcrumbs} />
            </div>

            {/* Right side: User dropdown */}
            <div className="flex items-center gap-3">
                <AdminUserDropdown user={user} />
            </div>
        </header>
    );
};

export default AdminNavbar;
