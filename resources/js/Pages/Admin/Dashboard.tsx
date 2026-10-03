import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import {
	ArrowUpRight,
	Bell,
	Calendar,
	CheckCircle2,
	ClipboardList,
	FileText,
	FolderKanban,
	Hourglass,
	Plus,
	Users,
} from 'lucide-react';
import { FC, ReactNode } from 'react';

interface DashboardStats {
	total_posts: number;
	published_posts: number;
	total_events: number;
	open_events: number;
	total_members: number;
	pengurus_count: number;
	total_registrations: number;
	pending_registrations: number;
	unread_contacts: number;
}

interface DashboardProps extends PageProps {
	stats: DashboardStats;
}

export default function Dashboard({ auth, stats }: DashboardProps) {
	const user = auth.user;

	const quickStats = [
		{
			title: 'Artikel & Berita',
			count: stats.total_posts.toString(),
			subCount: `${stats.published_posts} dipublikasikan`,
			description: 'Catatan ekspedisi & jurnal',
			icon: <FileText className="h-6 w-6 text-purple-600" />,
			bgColor: 'bg-purple-50',
			href: '/admin/posts',
			actionText: 'Kelola Artikel',
		},
		{
			title: 'Agenda Kegiatan',
			count: stats.total_events.toString(),
			subCount: `${stats.open_events} sedang dibuka`,
			description: 'Semua kegiatan terdaftar',
			icon: <Calendar className="h-6 w-6 text-emerald-600" />,
			bgColor: 'bg-emerald-50',
			href: '/admin/events',
			actionText: 'Kelola Kegiatan',
		},
		{
			title: 'Anggota Terdaftar',
			count: stats.total_members.toString(),
			subCount: `${stats.pengurus_count} pengurus aktif`,
			description: 'Total anggota organisasi',
			icon: <Users className="h-6 w-6 text-blue-600" />,
			bgColor: 'bg-blue-50',
			href: '/admin/members',
			actionText: 'Lihat Anggota',
		},
		{
			title: 'Pendaftaran Peserta',
			count: stats.total_registrations.toString(),
			subCount: `${stats.pending_registrations} menunggu verifikasi`,
			description: 'Semua registrasi event',
			icon: <ClipboardList className="h-6 w-6 text-amber-600" />,
			bgColor: 'bg-amber-50',
			href: '/admin/events',
			actionText: 'Lihat Pendaftaran',
		},
	];

	return (
		<AdminLayout
			title="Dashboard"
			headerTitle={`Selamat Datang, ${user.name}!`}
			headerDescription="Ringkasan sistem dan pusat kendali publikasi informasi portal KPA EMC²."
			headerActions={
				<div className="flex items-center gap-2">
					<Link
						href="/admin/posts/create"
						className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-900/20 transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
					>
						<Plus className="h-4 w-4" />
						<span>Tulis Artikel</span>
					</Link>
				</div>
			}
		>
			{/* Alert Badges */}
			{(stats.pending_registrations > 0 || stats.unread_contacts > 0) && (
				<div className="mt-4 flex flex-wrap gap-3">
					{stats.pending_registrations > 0 && (
						<div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
							<Hourglass className="h-4 w-4 text-amber-600" />
							<span>{stats.pending_registrations} pendaftaran menunggu verifikasi</span>
						</div>
					)}
					{stats.unread_contacts > 0 && (
						<div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800">
							<Bell className="h-4 w-4 text-blue-600" />
							<Link href="/admin/contacts" className="hover:underline">
								{stats.unread_contacts} pesan masuk belum dibaca
							</Link>
						</div>
					)}
				</div>
			)}

			{/* Metrics Overview Grid */}
			<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{quickStats.map((stat) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>

			{/* Quick Links */}
			<div className="mt-8">
				<h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
					Akses Cepat
				</h2>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{[
						{ label: 'Tambah Kegiatan', href: '/admin/events/create', icon: <Calendar className="h-4 w-4" /> },
						{ label: 'Tambah Anggota', href: '/admin/members/create', icon: <Users className="h-4 w-4" /> },
						{ label: 'Upload Galeri', href: '/admin/galleries/create', icon: <FolderKanban className="h-4 w-4" /> },
						{ label: 'Pesan Masuk', href: '/admin/contacts', icon: <Bell className="h-4 w-4" /> },
					].map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-900"
						>
							{link.icon}
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</AdminLayout>
	);
}

interface StatCardProps {
	title: string;
	count: string;
	subCount?: string;
	description: string;
	icon: ReactNode;
	bgColor: string;
	href: string;
	actionText: string;
}

const StatCard: FC<StatCardProps> = ({
	title,
	count,
	subCount,
	description,
	icon,
	bgColor,
	href,
	actionText,
}) => {
	return (
		<div className="shadow-xs group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:border-purple-200 hover:shadow-md">
			<div>
				<div className="flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wider text-slate-500">
						{title}
					</span>
					<div className={`rounded-xl p-2.5 ${bgColor}`}>{icon}</div>
				</div>

				<div className="mt-3">
					<span className="text-3xl font-black tracking-tight text-slate-900">
						{count}
					</span>
					{subCount && (
						<span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
							<CheckCircle2 className="h-3 w-3" />
							{subCount}
						</span>
					)}
					<p className="mt-1 text-xs text-slate-500">{description}</p>
				</div>
			</div>

			<div className="mt-4 border-t border-slate-100 pt-3">
				<Link
					href={href}
					className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 transition group-hover:text-purple-900"
				>
					<span>{actionText}</span>
					<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</Link>
			</div>
		</div>
	);
};
