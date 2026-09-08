import { BreadcrumbItem } from '@/types/admin';
import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import { FC } from 'react';

interface AdminBreadcrumbsProps {
    items?: BreadcrumbItem[];
}

export const AdminBreadcrumbs: FC<AdminBreadcrumbsProps> = ({ items = [] }) => {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm">
            <Link
                href="/admin"
                className="flex items-center gap-1 text-slate-500 transition-colors hover:text-purple-700"
            >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1 || item.current;

                return (
                    <div key={`${item.label}-${index}`} className="flex items-center space-x-2">
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        {isLast || !item.href ? (
                            <span className="font-semibold text-slate-900 line-clamp-1" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-slate-500 transition-colors hover:text-purple-700 line-clamp-1"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default AdminBreadcrumbs;
