import AdminLayout from '@/Layouts/AdminLayout';
import AdminPagination from '@/Components/Admin/UI/AdminPagination';
import { BreadcrumbItem } from '@/types/admin';
import { PaginatedResource } from '@/types';
import { Event, Registration } from '@/types/event';
import { Head, Link, router } from '@inertiajs/react';
import {
	ArrowLeft,
	Calendar,
	CheckCircle,
	Clock,
	Download,
	ExternalLink,
	Eye,
	FileText,
	Filter,
	Mail,
	Phone,
	Search,
	ShieldCheck,
	User,
	Users,
	X,
	XCircle,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface RegistrationsPageProps {
	event: Event;
	registrations: PaginatedResource<Registration>;
	filters: {
		search?: string;
		status?: string;
		per_page?: string;
	};
}

export const EventRegistrations: FC<RegistrationsPageProps> = ({
	event,
	registrations,
	filters = {},
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
	const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
	const [reviewNotes, setReviewNotes] = useState('');
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Agenda & Kegiatan', href: '/admin/events' },
		{ label: 'Daftar Pendaftar' },
	];

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			`/admin/events/${event.id}/registrations`,
			{
				search: searchTerm || undefined,
				status: selectedStatus || undefined,
				per_page: filters.per_page || undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedStatus('');
		router.get(`/admin/events/${event.id}/registrations`, {}, { preserveState: true, replace: true });
	};

	const openReviewModal = (reg: Registration) => {
		setSelectedRegistration(reg);
		setReviewNotes(reg.reviewer_notes || '');
		setIsReviewModalOpen(true);
	};

	const handleStatusUpdate = (newStatus: 'verified' | 'rejected' | 'pending') => {
		if (!selectedRegistration) return;

		router.patch(
			`/admin/events/${event.id}/registrations/${selectedRegistration.id}`,
			{
				status: newStatus,
				reviewer_notes: reviewNotes,
			},
			{
				onSuccess: () => {
					setIsReviewModalOpen(false);
					setSelectedRegistration(null);
				},
			}
		);
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'verified':
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
						<CheckCircle className="h-3 w-3 text-emerald-600" />
						<span>Terverifikasi</span>
					</span>
				);
			case 'rejected':
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
						<XCircle className="h-3 w-3 text-rose-600" />
						<span>Ditolak</span>
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
						<Clock className="h-3 w-3 text-amber-600" />
						<span>Menunggu</span>
					</span>
				);
		}
	};

	return (
		<AdminLayout
			title={`Pendaftar: ${event.title}`}
			breadcrumbs={breadcrumbs}
			headerTitle="Daftar Pendaftar Kegiatan"
			headerDescription={`Kelola data registrasi dan verifikasi peserta untuk "${event.title}"`}
			headerActions={
				<div className="flex items-center gap-2">
					<a
						href={`/admin/events/${event.id}/registrations/export`}
						className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100"
					>
						<Download className="h-4 w-4" />
						<span>Unduh CSV</span>
					</a>
					<Link
						href="/admin/events"
						className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>Kembali</span>
					</Link>
				</div>
			}
		>
			<Head title={`Pendaftar: ${event.title}`} />

			{/* Event Brief Info Card */}
			<div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<span className="rounded bg-purple-100 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-800 uppercase">
							{event.type || 'Kegiatan'}
						</span>
						<h3 className="mt-1 text-base font-bold text-slate-900">{event.title}</h3>
						<p className="text-xs text-slate-500">{event.location || 'Lokasi menyusul'}</p>
					</div>

					<div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-6 text-xs">
						<div>
							<span className="block text-[11px] text-slate-400">Total Pendaftar</span>
							<span className="text-lg font-bold text-slate-900">
								{registrations.total}{' '}
								{event.max_participants && (
									<span className="text-xs text-slate-400">/ {event.max_participants} kuota</span>
								)}
							</span>
						</div>
						<div>
							<span className="block text-[11px] text-slate-400">Biaya Pendaftaran</span>
							<span className="text-sm font-semibold text-emerald-700">
								{event.requires_payment
									? `Rp ${Number(event.payment_amount || 0).toLocaleString('id-ID')}`
									: 'Gratis (Free)'}
							</span>
						</div>
					</div>
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
							placeholder="Cari nama peserta, email, kode registrasi, telepon..."
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						/>
					</div>

					{/* Status Select */}
					<div className="w-full md:w-44">
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Status</option>
							<option value="pending">Menunggu Verifikasi</option>
							<option value="verified">Terverifikasi</option>
							<option value="rejected">Ditolak</option>
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
						{(filters.search || filters.status) && (
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

			{/* Registrations Table */}
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs text-slate-600">
						<thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
							<tr>
								<th scope="col" className="px-5 py-3.5">
									Kode & Tanggal
								</th>
								<th scope="col" className="px-4 py-3.5">
									Nama & Kontak
								</th>
								<th scope="col" className="px-4 py-3.5">
									Institusi / Prodi
								</th>
								<th scope="col" className="px-4 py-3.5">
									Bukti Pembayaran
								</th>
								<th scope="col" className="px-4 py-3.5">
									Status
								</th>
								<th scope="col" className="px-5 py-3.5 text-right">
									Aksi Verifikasi
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{registrations.data.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
											<Users className="h-6 w-6" />
										</div>
										<h4 className="mt-3 text-sm font-semibold text-slate-900">
											Belum ada data pendaftar
										</h4>
										<p className="mt-1 text-xs text-slate-500">
											Belum ada peserta yang mendaftar pada kegiatan ini atau coba sesuaikan filter di atas.
										</p>
									</td>
								</tr>
							) : (
								registrations.data.map((reg) => (
									<tr key={reg.id} className="transition-colors hover:bg-slate-50/60">
										{/* Registration Code & Date */}
										<td className="px-5 py-3.5">
											<span className="font-mono text-xs font-bold text-purple-700">
												{reg.registration_code}
											</span>
											<div className="text-[11px] text-slate-400">
												{reg.created_at ? new Date(reg.created_at).toLocaleDateString('id-ID') : '-'}
											</div>
										</td>

										{/* Name & Contact */}
										<td className="px-4 py-3.5">
											<div className="font-semibold text-slate-900">{reg.full_name}</div>
											<div className="flex items-center gap-2 text-[11px] text-slate-500">
												<span className="flex items-center gap-1">
													<Mail className="h-3 w-3 text-slate-400" />
													{reg.email}
												</span>
												{reg.phone && (
													<span className="flex items-center gap-1">
														<Phone className="h-3 w-3 text-slate-400" />
														{reg.phone}
													</span>
												)}
											</div>
										</td>

										{/* Institution & Major */}
										<td className="px-4 py-3.5">
											<div className="text-slate-800 font-medium">{reg.institution || '-'}</div>
											<div className="text-[11px] text-slate-400">{reg.major || '-'}</div>
										</td>

										{/* Payment Proof */}
										<td className="px-4 py-3.5">
											{reg.payment_proof_url ? (
												<a
													href={reg.payment_proof_url}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100"
												>
													<Eye className="h-3 w-3" />
													<span>Lihat Bukti</span>
												</a>
											) : (
												<span className="text-[11px] text-slate-400">
													{event.requires_payment ? 'Belum Unggah' : 'Tidak Perlu'}
												</span>
											)}
										</td>

										{/* Status */}
										<td className="px-4 py-3.5">
											{getStatusBadge(reg.status)}
											{reg.reviewer_notes && (
												<p className="mt-0.5 max-w-xs text-[10px] text-slate-400 truncate">
													{reg.reviewer_notes}
												</p>
											)}
										</td>

										{/* Review Button */}
										<td className="px-5 py-3.5 text-right">
											<button
												type="button"
												onClick={() => openReviewModal(reg)}
												className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-purple-100 hover:text-purple-800 transition-colors"
											>
												Tinjau Status
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<AdminPagination
					pagination={registrations}
					perPage={filters.per_page || 10}
					baseUrl={`/admin/events/${event.id}/registrations`}
					filters={{
						search: searchTerm || undefined,
						status: selectedStatus || undefined,
					}}
					itemName="pendaftar"
				/>
			</div>

			{/* Review Status Modal */}
			{isReviewModalOpen && selectedRegistration && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setIsReviewModalOpen(false)}
					/>
					<div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex items-center justify-between border-b border-slate-100 pb-3">
							<h3 className="text-base font-bold text-slate-900">
								Tinjau Pendaftaran Peserta
							</h3>
							<button
								type="button"
								onClick={() => setIsReviewModalOpen(false)}
								className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Participant Details Summary */}
						<div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4 text-xs">
							<div className="grid grid-cols-2 gap-2">
								<div>
									<span className="text-slate-400 block text-[10px]">Nama Peserta</span>
									<span className="font-bold text-slate-900">{selectedRegistration.full_name}</span>
								</div>
								<div>
									<span className="text-slate-400 block text-[10px]">Kode Registrasi</span>
									<span className="font-mono font-bold text-purple-700">
										{selectedRegistration.registration_code}
									</span>
								</div>
								<div>
									<span className="text-slate-400 block text-[10px]">Email</span>
									<span className="text-slate-800">{selectedRegistration.email}</span>
								</div>
								<div>
									<span className="text-slate-400 block text-[10px]">No Telepon / WA</span>
									<span className="text-slate-800">{selectedRegistration.phone || '-'}</span>
								</div>
								<div>
									<span className="text-slate-400 block text-[10px]">Institusi</span>
									<span className="text-slate-800">{selectedRegistration.institution || '-'}</span>
								</div>
								<div>
									<span className="text-slate-400 block text-[10px]">Jurusan / Prodi</span>
									<span className="text-slate-800">{selectedRegistration.major || '-'}</span>
								</div>
							</div>

							{/* Motivation */}
							{selectedRegistration.motivation && (
								<div className="border-t border-slate-200/60 pt-2">
									<span className="text-slate-400 block text-[10px]">Motivasi Bergabung:</span>
									<p className="text-slate-700 mt-0.5 italic">{selectedRegistration.motivation}</p>
								</div>
							)}

							{/* Payment Proof link */}
							{selectedRegistration.payment_proof_url && (
								<div className="border-t border-slate-200/60 pt-2">
									<a
										href={selectedRegistration.payment_proof_url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 underline hover:text-purple-900"
									>
										<ExternalLink className="h-3.5 w-3.5" />
										<span>Buka Foto / Berkas Bukti Pembayaran</span>
									</a>
								</div>
							)}
						</div>

						{/* Reviewer Notes Input */}
						<div className="mt-4">
							<label htmlFor="reviewer_notes" className="block text-xs font-semibold text-slate-700">
								Catatan Peninjau / Alasan
							</label>
							<textarea
								id="reviewer_notes"
								rows={2}
								value={reviewNotes}
								onChange={(e) => setReviewNotes(e.target.value)}
								placeholder="Tambahkan catatan untuk panitia (misal: pembayaran terkonfirmasi di rekening BCA)..."
								className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
							/>
						</div>

						{/* Action Buttons */}
						<div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
							<button
								type="button"
								onClick={() => handleStatusUpdate('rejected')}
								className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
							>
								Tolak Pendaftaran
							</button>
							<button
								type="button"
								onClick={() => handleStatusUpdate('pending')}
								className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
							>
								Set ke Menunggu
							</button>
							<button
								type="button"
								onClick={() => handleStatusUpdate('verified')}
								className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
							>
								Verifikasi & Terima Peserta
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default EventRegistrations;
