import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { PaginatedResource } from '@/types';
import { Member } from '@/types/member';
import { Head, Link, router } from '@inertiajs/react';
import {
	Briefcase,
	CheckCircle,
	Edit,
	Filter,
	GraduationCap,
	Plus,
	Search,
	Shield,
	Trash2,
	UserCheck,
	UserPlus,
	Users,
	X,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface DivisionOption {
	id: string;
	name: string;
	slug: string;
}

interface MemberIndexProps {
	members: PaginatedResource<
		Member & {
			can?: { update?: boolean; delete?: boolean };
		}
	>;
	divisions: DivisionOption[];
	filters: {
		search?: string;
		division_id?: string;
		status?: string;
		is_pengurus?: string;
	};
	metrics: {
		total: number;
		pengurus: number;
		active: number;
		alumni: number;
	};
}

export const MembersIndex: FC<MemberIndexProps> = ({
	members,
	divisions = [],
	filters = {},
	metrics = { total: 0, pengurus: 0, active: 0, alumni: 0 },
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedDivision, setSelectedDivision] = useState(filters.division_id || '');
	const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
	const [selectedPengurus, setSelectedPengurus] = useState(filters.is_pengurus || '');
	const [deleteModalMember, setDeleteModalMember] = useState<Member | null>(null);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Pengurus & Anggota' },
	];

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			'/admin/members',
			{
				search: searchTerm || undefined,
				division_id: selectedDivision || undefined,
				status: selectedStatus || undefined,
				is_pengurus: selectedPengurus !== '' ? selectedPengurus : undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedDivision('');
		setSelectedStatus('');
		setSelectedPengurus('');
		router.get('/admin/members', {}, { preserveState: true, replace: true });
	};

	const handleDeleteConfirm = () => {
		if (!deleteModalMember) return;
		router.delete(`/admin/members/${deleteModalMember.id}`, {
			onSuccess: () => setDeleteModalMember(null),
		});
	};

	const getStatusBadge = (status: string | null | undefined) => {
		switch (status) {
			case 'active':
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
						<span>Aktif</span>
					</span>
				);
			case 'alumni':
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
						<span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
						<span>Alumni</span>
					</span>
				);
			case 'honorary':
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700">
						<span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
						<span>Kehormatan</span>
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
						<span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
						<span>Biasa</span>
					</span>
				);
		}
	};

	return (
		<AdminLayout
			title="Manajemen Pengurus & Anggota"
			breadcrumbs={breadcrumbs}
			headerTitle="Pengurus & Anggota"
			headerDescription="Kelola data keanggotaan, struktur kepengurusan organisasi, dan arsip anggota KPA EMC²."
			headerActions={
				<Link
					href="/admin/members/create"
					className="flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-800"
				>
					<Plus className="h-4 w-4" />
					<span>Tambah Anggota Baru</span>
				</Link>
			}
		>
			<Head title="Manajemen Pengurus & Anggota" />

			{/* Metric Summary Cards */}
			<div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Total Anggota</span>
						<Users className="h-4 w-4 text-purple-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-slate-900">{metrics.total}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Pengurus Aktif</span>
						<Shield className="h-4 w-4 text-emerald-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-emerald-700">{metrics.pengurus}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Anggota Aktif</span>
						<UserCheck className="h-4 w-4 text-blue-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-blue-700">{metrics.active}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Alumni</span>
						<GraduationCap className="h-4 w-4 text-amber-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-amber-700">{metrics.alumni}</p>
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
							placeholder="Cari nama, NIA, jurusan, atau jabatan..."
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						/>
					</div>

					{/* Division Select */}
					<div className="w-full md:w-48">
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
							<option value="active">Aktif</option>
							<option value="regular">Biasa</option>
							<option value="alumni">Alumni</option>
							<option value="honorary">Kehormatan</option>
						</select>
					</div>

					{/* Is Pengurus Select */}
					<div className="w-full md:w-40">
						<select
							value={selectedPengurus}
							onChange={(e) => setSelectedPengurus(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Peran</option>
							<option value="1">Pengurus Aktif</option>
							<option value="0">Bukan Pengurus</option>
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
						{(filters.search || filters.division_id || filters.status || filters.is_pengurus) && (
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

			{/* Members Table */}
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs text-slate-600">
						<thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
							<tr>
								<th scope="col" className="px-5 py-3.5">
									Nama & NIA
								</th>
								<th scope="col" className="px-4 py-3.5">
									Divisi & Jabatan
								</th>
								<th scope="col" className="px-4 py-3.5">
									Angkatan / Prodi
								</th>
								<th scope="col" className="px-4 py-3.5">
									Kepengurusan
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
							{members.data.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
											<UserPlus className="h-6 w-6" />
										</div>
										<h4 className="mt-3 text-sm font-semibold text-slate-900">
											Belum ada data anggota
										</h4>
										<p className="mt-1 text-xs text-slate-500">
											Mulai tambahkan anggota baru atau sesuaikan filter pencarian di atas.
										</p>
										<div className="mt-4">
											<Link
												href="/admin/members/create"
												className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-800"
											>
												<Plus className="h-4 w-4" />
												<span>Tambah Anggota Baru</span>
											</Link>
										</div>
									</td>
								</tr>
							) : (
								members.data.map((member) => {
									const canUpdate = member.can?.update ?? true;
									const canDelete = member.can?.delete ?? true;

									return (
										<tr key={member.id} className="transition-colors hover:bg-slate-50/60">
											{/* Avatar & Name */}
											<td className="px-5 py-3.5">
												<div className="flex items-center gap-3">
													{member.avatar_url ? (
														<img
															src={member.avatar_url}
															alt={member.name}
															className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
														/>
													) : (
														<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
															{member.name.charAt(0).toUpperCase()}
														</div>
													)}
													<div className="min-w-0 max-w-xs">
														<Link
															href={canUpdate ? `/admin/members/${member.id}/edit` : '#'}
															className="font-semibold text-slate-900 hover:text-purple-700 line-clamp-1"
														>
															{member.name}
														</Link>
														<span className="font-mono text-[10px] text-purple-700">
															{member.member_number || '-'}
														</span>
													</div>
												</div>
											</td>

											{/* Division & Position */}
											<td className="px-4 py-3.5">
												<div className="text-slate-800 font-medium">
													{member.position || 'Anggota'}
												</div>
												<div className="text-[11px] text-slate-400">
													{member.division?.name || 'Umum'}
												</div>
											</td>

											{/* Batch Year & Major */}
											<td className="px-4 py-3.5">
												<div className="text-slate-800 font-medium">
													{member.batch_year ? `Angkatan ${member.batch_year}` : '-'}
												</div>
												<div className="text-[11px] text-slate-400">
													{member.major || '-'}
												</div>
											</td>

											{/* Pengurus Status */}
											<td className="px-4 py-3.5">
												{member.is_pengurus ? (
													<span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[11px] font-semibold text-purple-900">
														<Shield className="h-3 w-3 text-purple-700" />
														<span>Pengurus</span>
													</span>
												) : (
													<span className="text-[11px] text-slate-400">
														Anggota Biasa
													</span>
												)}
											</td>

											{/* Status */}
											<td className="px-4 py-3.5">
												{getStatusBadge(member.status)}
											</td>

											{/* Actions */}
											<td className="px-5 py-3.5 text-right">
												<div className="flex items-center justify-end gap-1.5">
													{canUpdate && (
														<Link
															href={`/admin/members/${member.id}/edit`}
															title="Edit Data Anggota"
															className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
														>
															<Edit className="h-4 w-4" />
														</Link>
													)}

													{canDelete && (
														<button
															type="button"
															onClick={() => setDeleteModalMember(member)}
															title="Hapus Anggota"
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
				{members.links && members.links.length > 3 && (
					<div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 bg-slate-50/50 text-xs">
						<span className="text-slate-500">
							Menampilkan <span className="font-semibold">{members.from || 0}</span> -{' '}
							<span className="font-semibold">{members.to || 0}</span> dari{' '}
							<span className="font-semibold">{members.total}</span> anggota
						</span>

						<div className="flex items-center gap-1">
							{members.links.map((link, idx) => (
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
			{deleteModalMember && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalMember(null)}
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
							<Trash2 className="h-6 w-6" />
						</div>
						<h3 className="mt-4 text-lg font-bold text-slate-900">
							Hapus Anggota Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus data anggota{' '}
							<span className="font-bold text-slate-900">"{deleteModalMember.name}"</span> ({deleteModalMember.member_number})? Tindakan ini akan memindahkan data ke tempat sampah.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalMember(null)}
								className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteConfirm}
								className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
							>
								Ya, Hapus Anggota
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default MembersIndex;
