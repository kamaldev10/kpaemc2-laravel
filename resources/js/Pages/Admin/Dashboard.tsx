import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
	return (
		<>
			<Head title="Admin Dashboard" />

			<div className="min-h-screen bg-gray-100">
				{/* Header */}
				<header className="bg-white shadow">
					<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900">
							Admin Dashboard
						</h1>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-600">{auth.user.name}</span>
							<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
								{auth.user.role}
							</span>
						</div>
					</div>
				</header>

				{/* Content */}
				<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{/* Placeholder cards — will be replaced with real data */}
						<DashboardCard title="Artikel" count="—" />
						<DashboardCard title="Postingan" count="—" />
						<DashboardCard title="Anggota" count="—" />
						<DashboardCard title="Kegiatan" count="—" />
					</div>
				</main>
			</div>
		</>
	);
}

interface DashboardCardProps {
	title: string;
	count: string;
}

function DashboardCard({ title, count }: DashboardCardProps) {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow">
			<div className="p-5">
				<div className="flex items-center">
					<div className="flex-1">
						<p className="truncate text-sm font-medium text-gray-500">{title}</p>
						<p className="mt-1 text-3xl font-semibold text-gray-900">{count}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
