import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { KeyRound, LogOut, ShieldCheck, UserCheck } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';

interface AdminUserDropdownProps {
    user: User;
}

export const AdminUserDropdown: FC<AdminUserDropdownProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const roleBadgeColor = {
        super_admin: 'bg-amber-100 text-amber-900 border-amber-300',
        admin: 'bg-blue-100 text-blue-900 border-blue-300',
        editor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    }[user.role || 'editor'] || 'bg-slate-100 text-slate-800 border-slate-300';

    const roleLabel = {
        super_admin: 'Super Admin',
        admin: 'Admin',
        editor: 'Editor',
    }[user.role || 'editor'] || user.role;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* Avatar with fallback initial */}
                {user.avatar_url ? (
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="h-9 w-9 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 text-sm font-bold text-white shadow-xs">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* User Name & Role (Desktop) */}
                <div className="hidden text-left sm:block">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{user.name}</p>
                    <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{user.email}</p>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* Header info */}
                    <div className="border-b border-slate-100 px-3 py-2.5">
                        <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <div className="mt-2">
                            <span
                                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${roleBadgeColor}`}
                            >
                                <ShieldCheck className="h-3 w-3" />
                                {roleLabel}
                            </span>
                        </div>
                    </div>

                    {/* Action Links */}
                    <div className="py-1">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-purple-50 hover:text-purple-900"
                        >
                            <UserCheck className="h-4 w-4 text-slate-400" />
                            <span>Pengaturan Akun & Profil</span>
                        </Link>
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-purple-50 hover:text-purple-900"
                        >
                            <KeyRound className="h-4 w-4 text-slate-400" />
                            <span>Ubah Password</span>
                        </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            onClick={() => setIsOpen(false)}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                        >
                            <LogOut className="h-4 w-4 text-rose-500" />
                            <span>Keluar (Logout)</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserDropdown;
