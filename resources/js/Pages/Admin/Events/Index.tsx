import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { PaginatedResource } from '@/types';
import { Event } from '@/types/event';
import { Head, Link, router } from '@inertiajs/react';
import {
	Calendar,
	CheckCircle,
	Clock,
	Edit,
	ExternalLink,
	Eye,
	Filter,
	MapPin,
	Plus,
	Search,
	Tag,
	Trash2,
	UserCheck,
	Users,
	X,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface CategoryOption {
	id: string;
	name: string;
	slug: string;
}

interface DivisionOption {
	id: string;
	name: string;
	slug: string;
}

interface EventIndexProps {
	events: PaginatedResource<
		Event & {
			can?: { update?: boolean; delete?: boolean };
		}
	>;
	categories: CategoryOption[];
	divisions: DivisionOption[];
	filters: {
		search?: string;
		category_id?: string;
		division_id?: string;
		type?: string;
		status?: string;
	};
	metrics: {
		total: number;
		upcoming: number;
		ongoing: number;
		registrations: number;
	};
}

export const EventsIndex: FC<EventIndexProps> = ({
	events,
	categories = [],
	divisions = [],
	filters = {},
	metrics = { total: 0, upcoming: 0, ongoing: 0, registrations: 0 },
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
	const [selectedDivision, setSelectedDivision] = useState(filters.division_id || '');
	const [selectedType, setSelectedType] = useState(filters.type || '');
	const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
	const [deleteModalEvent, setDeleteModalEvent] = useState<Event | null>(null);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Agenda & Kegiatan' },
	];

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			'/admin/events',
			{
				search: searchTerm || undefined,
				category_id: selectedCategory || undefined,
				division_id: selectedDivision || undefined,
				type: selectedType || undefined,
				status: selectedStatus || undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedCategory('');
		setSelectedDivision('');
		setSelectedType('');
		setSelectedStatus('');
		router.get('/admin/events', {}, { preserveState: true, replace: true });
	};

	const handleDeleteConfirm = () => {
		if (!deleteModalEvent) return;
		router.delete(`/admin/events/${deleteModalEvent.id}`, {
			onSuccess: () => setDeleteModalEvent(null),
		});
	};

	const formatDate = (dateStr?: string | null) => {
		if (!dateStr) return '-';
		try {
			const d = new Date(dateStr);
			return d.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
			});
		} catch {
			return dateStr;
		}
	};

	return (
		<AdminLayout
			title="Manajemen Agenda & Kegiatan"
			breadcrumbs={breadcrumbs}
			headerTitle="Agenda & Kegiatan"
			headerDescription="Kelola kalender kegiatan, ekspedisi alam, diksar, seminar, dan pendaftaran peserta KPA EMC²."
			headerActions={
				<Link
					href="/admin/events/create"
					className="flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-800"
				>
					<Plus className="h-4 w-4" />
					<span>Tambah Kegiatan Baru</span>
				</Link>
			}
		>
			<Head title="Manajemen Agenda & Kegiatan" />

			{/* Metric Summary Cards */}
			<div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Total Kegiatan</span>
						<Calendar className="h-4 w-4 text-purple-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-slate-900">{metrics.total}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Akan Datang</span>
						<Clock className="h-4 w-4 text-blue-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-blue-700">{metrics.upcoming}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Sedang Berlangsung</span>
						<CheckCircle className="h-4 w-4 text-emerald-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-emerald-700">{metrics.ongoing}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Total Pendaftar</span>
						<Users className="h-4 w-4 text-amber-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-amber-700">{metrics.registrations}</p>
				</div>
			</div>

			{/* Filters Bar */}
			<div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
				<form onSubmit={handleFilterSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
					{/* Search input */}
					<div className="relative flex-1">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Cari judul kegiatan, lokasi, tipe..."
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						/>
					</div>

					{/* Category Select */}
					<div className="w-full md:w-40">
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Kategori</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>

					{/* Division Select */}
					<div className="w-full md:w-40">
						<select
							value={selectedDivision}
							onChange={(e) => setSelectedDivision(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Divisi</option>
							{divisions.map((div) => (
								<option key={div.id} value={div.id}>
									{div.name}
								</option>
							))}
						</select>
					</div>

					{/* Status Select */}
					<div className="w-full md:w-36">
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Status</option>
							<option value="upcoming">Akan Datang</option>
							<option value="ongoing">Berlangsung</option>
							<option value="past">Selesai</option>
							<option value="published">Diterbitkan</option>
							<option value="draft">Draf</option>
						</select>
					</div>

					{/* Submit & Reset */}
					<div className="flex items-center gap-2">
						<button
							type="submit"
							className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800"
						>
							<Filter className="h-3.5 w-3.5" />
							<span>Terapkan</span>
						</button>
						{(filters.search || filters.category_id || filters.division_id || filters.type || filters.status) && (
							<button
								type="button"
								onClick={handleResetFilters}
								className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
							>
								<X className="h-3.5 w-3.5" />
								<span>Reset</span>
							</button>
						)}
					</div>
				</form>
			</div>

			{/* Events Table */}
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs text-slate-600">
						<thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
							<tr>
								<th scope="col" className="px-5 py-3.5">
									Kegiatan & Poster
								</th>
								<th scope="col" className="px-4 py-3.5">
									Kategori & Divisi
								</th>
								<th scope="col" className="px-4 py-3.5">
									Jadwal & Lokasi
								</th>
								<th scope="col" className="px-4 py-3.5">
									Pendaftar / Kuota
								</th>
								<th scope="col" className="px-4 py-3.5">
									Status
								</th>
								<th scope="col" className="px-5 py-3.5 text-right">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{events.data.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
											<Calendar className="h-6 w-6" />
										</div>
										<h4 className="mt-3 text-sm font-semibold text-slate-900">
											Belum ada kegiatan ditemukan
										</h4>
										<p className="mt-1 text-xs text-slate-500">
											Mulai buat agenda kegiatan baru atau sesuaikan filter pencarian di atas.
										</p>
										<div className="mt-4">
											<Link
												href="/admin/events/create"
												className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-800"
											>
												<Plus className="h-4 w-4" />
												<span>Tambah Kegiatan Baru</span>
											</Link>
										</div>
									</td>
								</tr>
							) : (
								events.data.map((event) => {
									const canUpdate = event.can?.update ?? true;
									const canDelete = event.can?.delete ?? true;
									const regCount = event.registrations_count ?? 0;
									const maxPart = event.max_participants;

									return (
										<tr key={event.id} className="transition-colors hover:bg-slate-50/60">
											{/* Poster & Title */}
											<td className="px-5 py-3.5">
												<div className="flex items-center gap-3">
													{event.cover_url ? (
														<img
															src={event.cover_url}
															alt={event.title}
															className="h-12 w-16 rounded-lg object-cover ring-1 ring-slate-200"
														/>
													) : (
														<div className="flex h-12 w-16 items-center justify-center rounded-lg bg-purple-100 font-bold text-purple-700">
															<Calendar className="h-5 w-5" />
														</div>
													)}
													<div className="min-w-0 max-w-xs">
														<Link
															href={canUpdate ? `/admin/events/${event.id}/edit` : '#'}
															className="font-semibold text-slate-900 hover:text-purple-700 line-clamp-1"
														>
															{event.title}
														</Link>
														<div className="flex items-center gap-1.5 text-[11px] text-slate-400">
															<span className="rounded bg-slate-100 px-1.5 py-0.2 font-mono text-[10px] text-slate-600">
																{event.type || 'Kegiatan'}
															</span>
															{event.requires_payment && (
																<span className="font-semibold text-emerald-600">
																	Rp {Number(event.payment_amount || 0).toLocaleString('id-ID')}
																</span>
															)}
														</div>
													</div>
												</div>
											</td>

											{/* Category & Division */}
											<td className="px-4 py-3.5">
												<div className="text-slate-800 font-medium">
													{event.category?.name || 'Umum'}
												</div>
												<div className="text-[11px] text-slate-400">
													{event.division?.name || 'Organisasi'}
												</div>
											</td>

											{/* Schedule & Location */}
											<td className="px-4 py-3.5">
												<div className="flex items-center gap-1 text-slate-800 font-medium">
													<Calendar className="h-3 w-3 text-purple-600" />
													<span>{formatDate(event.start_date)}</span>
												</div>
												<div className="flex items-center gap-1 text-[11px] text-slate-400 line-clamp-1">
													<MapPin className="h-3 w-3 shrink-0 text-slate-400" />
													<span>{event.location || 'Lokasi menyusul'}</span>
												</div>
											</td>

											{/* Registrations */}
											<td className="px-4 py-3.5">
												<Link
													href={`/admin/events/${event.id}/registrations`}
													className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50/50 px-2.5 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-100"
												>
													<Users className="h-3.5 w-3.5" />
													<span>
														{regCount} {maxPart ? `/ ${maxPart}` : 'Pendaftar'}
													</span>
												</Link>
											</td>

											{/* Publication & Registration Status */}
											<td className="px-4 py-3.5">
												<div className="space-y-1">
													{event.is_published ? (
														<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
															<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
															<span>Diterbitkan</span>
														</span>
													) : (
														<span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
															<span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
															<span>Draf</span>
														</span>
													)}
													<div>
														{event.is_registration_open ? (
															<span className="text-[10px] font-medium text-emerald-600">
																Pendaftaran Buka
															</span>
														) : (
															<span className="text-[10px] font-medium text-slate-400">
																Pendaftaran Tutup
															</span>
														)}
													</div>
												</div>
											</td>

											{/* Actions */}
											<td className="px-5 py-3.5 text-right">
												<div className="flex items-center justify-end gap-1.5">
													<Link
														href={`/admin/events/${event.id}/registrations`}
														title="Daftar Peserta"
														className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
													>
														<Users className="h-4 w-4" />
													</Link>

													{canUpdate && (
														<Link
															href={`/admin/events/${event.id}/edit`}
															title="Edit Kegiatan"
															className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
														>
															<Edit className="h-4 w-4" />
														</Link>
													)}

													{canDelete && (
														<button
															type="button"
															onClick={() => setDeleteModalEvent(event)}
															title="Hapus Kegiatan"
															className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
														>
															<Trash2 className="h-4 w-4" />
														</button>
													)}
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{events.links && events.links.length > 3 && (
					<div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 bg-slate-50/50 text-xs">
						<span className="text-slate-500">
							Menampilkan <span className="font-semibold">{events.from || 0}</span> -{' '}
							<span className="font-semibold">{events.to || 0}</span> dari{' '}
							<span className="font-semibold">{events.total}</span> kegiatan
						</span>

						<div className="flex items-center gap-1">
							{events.links.map((link, idx) => (
								<Link
									key={idx}
									href={link.url || '#'}
									dangerouslySetInnerHTML={{ __html: link.label }}
									className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
										link.active
											? 'bg-purple-700 text-white'
											: link.url
												? 'text-slate-600 hover:bg-slate-200'
												: 'cursor-not-allowed text-slate-300'
									}`}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Delete Modal */}
			{deleteModalEvent && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalEvent(null)}
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
							<Trash2 className="h-6 w-6" />
						</div>
						<h3 className="mt-4 text-lg font-bold text-slate-900">
							Hapus Kegiatan Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus agenda kegiatan{' '}
							<span className="font-bold text-slate-900">"{deleteModalEvent.title}"</span>? Tindakan ini akan menghapus data kegiatan dan arsip pendaftaran terkait.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalEvent(null)}
								className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteConfirm}
								className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
							>
								Ya, Hapus Kegiatan
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default EventsIndex;
