import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import {
	ArrowUpRight,
	Calendar,
	FileText,
	FolderKanban,
	Plus,
	Sparkles,
	Users,
} from 'lucide-react';
import { FC, ReactNode } from 'react';

export default function Dashboard({ auth }: PageProps) {
	const user = auth.user;

	const quickStats = [
		{
			title: 'Artikel & Berita',
			count: '0',
			description: 'Publikasi dan catatan ekspedisi',
			icon: <FileText className="h-6 w-6 text-purple-600" />,
			bgColor: 'bg-purple-50',
			href: '/admin/posts',
			actionText: 'Kelola Artikel',
		},
		{
			title: 'Agenda Kegiatan',
			count: '0',
			description: 'Jadwal kegiatan aktif & terbuka',
			icon: <Calendar className="h-6 w-6 text-emerald-600" />,
			bgColor: 'bg-emerald-50',
			href: '/admin/events',
			actionText: 'Kelola Kegiatan',
		},
		{
			title: 'Anggota Terdaftar',
			count: '0',
			description: 'Pengurus & anggota aktif organisasi',
			icon: <Users className="h-6 w-6 text-blue-600" />,
			bgColor: 'bg-blue-50',
			href: '/admin/members',
			actionText: 'Lihat Anggota',
		},
		{
			title: 'Kategori Konten',
			count: '0',
			description: 'Taksonomi rubrik & kegiatan',
			icon: <FolderKanban className="h-6 w-6 text-amber-600" />,
			bgColor: 'bg-amber-50',
			href: '/admin/categories',
			actionText: 'Kelola Kategori',
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
						href="/admin/posts"
						className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-900/20 transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
					>
						<Plus className="h-4 w-4" />
						<span>Tulis Artikel</span>
					</Link>
				</div>
			}
		>
			{/* Metrics Overview Grid */}
			<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{quickStats.map((stat) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>

			{/* TODO: Chart Analitics */}
		</AdminLayout>
	);
}

interface StatCardProps {
	title: string;
	count: string;
	description: string;
	icon: ReactNode;
	bgColor: string;
	href: string;
	actionText: string;
}

const StatCard: FC<StatCardProps> = ({
	title,
	count,
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
