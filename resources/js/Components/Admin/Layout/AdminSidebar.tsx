import ApplicationLogo from '@/Components/ApplicationLogo';
import { AdminNavGroup } from '@/types/admin';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
	Calendar,
	ChevronRight,
	ExternalLink,
	FileText,
	FolderKanban,
	LayoutDashboard,
	Settings,
	ShieldAlert,
	Users,
	X,
} from 'lucide-react';
import { FC } from 'react';

interface AdminSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	user: User;
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ isOpen, onClose, user }) => {
	const { url } = usePage();

	const isSuperAdmin = user.role === 'super_admin';

	const navigationGroups: AdminNavGroup[] = [
		{
			groupName: 'Ringkasan',
			items: [
				{
					name: 'Dashboard',
					href: '/admin',
					icon: <LayoutDashboard className="h-4 w-4" />,
					activeMatcher: '/admin$',
				},
			],
		},
		{
			groupName: 'Manajemen Konten',
			items: [
				{
					name: 'Artikel & Berita',
					href: '/admin/posts',
					icon: <FileText className="h-4 w-4" />,
					activeMatcher: '^/admin/posts',
				},
				{
					name: 'Agenda & Kegiatan',
					href: '/admin/events',
					icon: <Calendar className="h-4 w-4" />,
					activeMatcher: '^/admin/events',
				},
				{
					name: 'Kategori Konten',
					href: '/admin/categories',
					icon: <FolderKanban className="h-4 w-4" />,
					activeMatcher: '^/admin/categories',
				},
			],
		},
		{
			groupName: 'Organisasi',
			items: [
				{
					name: 'Pengurus & Anggota',
					href: '/admin/members',
					icon: <Users className="h-4 w-4" />,
					activeMatcher: '^/admin/members',
				},
			],
		},
		...(isSuperAdmin
			? [
					{
						groupName: 'Sistem & Konfigurasi',
						items: [
							{
								name: 'Manajemen Pengguna',
								href: '/admin/users',
								icon: <ShieldAlert className="h-4 w-4" />,
								activeMatcher: '^/admin/users',
								minRole: 'super_admin' as const,
							},
							{
								name: 'Pengaturan Situs',
								href: '/admin/settings',
								icon: <Settings className="h-4 w-4" />,
								activeMatcher: '^/admin/settings',
								minRole: 'super_admin' as const,
							},
						],
					},
				]
			: []),
	];

	const isItemActive = (matcher: string) => {
		try {
			const regex = new RegExp(matcher);
			return regex.test(url);
		} catch {
			return url.startsWith(matcher);
		}
	};

	const sidebarContent = (
		<div className="flex h-full flex-col justify-between bg-slate-950 text-slate-200">
			{/* Brand Logo & Title */}
			<div>
				<div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-5">
					<Link href="/admin" className="flex items-center gap-3">
						<div className="shadow-xs flex h-9 w-9 items-center justify-center rounded-xl border border-purple-800 bg-purple-900/60 p-1.5">
							<ApplicationLogo className="h-6 w-6 object-contain" />
						</div>
						<div>
							<span className="text-sm font-black tracking-wider text-white">
								KPA EMC²
							</span>
							<span className="block text-[10px] font-semibold uppercase tracking-widest text-purple-400">
								Portal Pengurus
							</span>
						</div>
					</Link>

					{/* Close button for mobile drawer */}
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
						aria-label="Tutup Menu"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Navigation Menu Groups */}
				<nav className="space-y-6 px-3 py-5">
					{navigationGroups.map((group) => (
						<div key={group.groupName}>
							<h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
								{group.groupName}
							</h3>
							<ul className="mt-2 space-y-1">
								{group.items.map((item) => {
									const active = isItemActive(item.activeMatcher);

									return (
										<li key={item.name}>
											<Link
												href={item.href}
												onClick={onClose}
												className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
													active
														? 'bg-indigo-800 font-semibold text-white shadow-md shadow-purple-950/50'
														: 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
												}`}
											>
												<div className="flex items-center gap-3">
													<span
														className={`transition-colors ${
															active
																? 'text-purple-300'
																: 'text-slate-400 group-hover:text-purple-400'
														}`}
													>
														{item.icon}
													</span>
													<span>{item.name}</span>
												</div>

												{item.badge && (
													<span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
														{item.badge}
													</span>
												)}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>
			</div>

			{/* Bottom Footer shortcut to Public Site */}
			<div className="border-t border-slate-800/80 p-3">
				<a
					href="/"
					target="_blank"
					rel="noreferrer"
					className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-purple-950 hover:text-white"
				>
					<div className="flex items-center gap-2">
						<ExternalLink className="h-4 w-4 text-purple-400" />
						<span>Kunjungi Web Publik</span>
					</div>
					<ChevronRight className="h-3.5 w-3.5 text-slate-500" />
				</a>
			</div>
		</div>
	);

	return (
		<>
			{/* Desktop Fixed Sidebar */}
			<aside className="hidden w-64 shrink-0 border-r border-slate-800/60 lg:block">
				<div className="fixed inset-y-0 left-0 z-30 w-64">{sidebarContent}</div>
			</aside>

			{/* Mobile Drawer Backdrop & Menu */}
			{isOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
					<div
						className="backdrop-blur-xs fixed inset-0 bg-slate-950/70 transition-opacity"
						onClick={onClose}
						aria-hidden="true"
					/>

					<div className="animate-in slide-in-from-left fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl duration-200">
						{sidebarContent}
					</div>
				</div>
			)}
		</>
	);
};

export default AdminSidebar;
