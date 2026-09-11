import AvatarUploader from '@/Components/Admin/Form/AvatarUploader';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Member } from '@/types/member';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	ArrowLeft,
	Briefcase,
	IdCard,
	Save,
	Trash2,
	User,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface DivisionOption {
	id: string;
	name: string;
	slug: string;
}

interface EditMemberProps {
	member: Member & {
		can?: { update?: boolean; delete?: boolean };
	};
	divisions: DivisionOption[];
}

interface MemberFormData {
	name: string;
	member_number: string;
	division_id: string;
	position: string;
	batch_year: string | number;
	major: string;
	phone: string;
	email: string;
	status: 'regular' | 'active' | 'alumni' | 'honorary';
	bio: string;
	avatar: File | null;
	avatar_url: string;
	is_pengurus: boolean;
	sort_order: number;
	is_active: boolean;
}

export const EditMember: FC<EditMemberProps> = ({ member, divisions = [] }) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Pengurus & Anggota', href: '/admin/members' },
		{ label: 'Edit Anggota' },
	];

	const form = useForm<MemberFormData>({
		name: member.name || '',
		member_number: member.member_number || '',
		division_id: member.division_id || member.division?.id || '',
		position: member.position || '',
		batch_year: member.batch_year || '',
		major: member.major || '',
		phone: member.phone || '',
		email: member.email || '',
		status: (member.status as 'regular' | 'active' | 'alumni' | 'honorary') || 'regular',
		bio: member.bio || '',
		avatar: null,
		avatar_url: member.avatar_url || '',
		is_pengurus: Boolean(member.is_pengurus),
		sort_order: member.sort_order || 0,
		is_active: Boolean(member.is_active),
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (form.data.avatar) {
			router.post(`/admin/members/${member.id}`, {
				_method: 'PUT',
				...form.data,
			});
		} else {
			form.put(`/admin/members/${member.id}`);
		}
	};

	const handleDeleteConfirm = () => {
		router.delete(`/admin/members/${member.id}`, {
			onSuccess: () => setDeleteModalOpen(false),
		});
	};

	return (
		<AdminLayout
			title={`Edit Anggota: ${member.name}`}
			breadcrumbs={breadcrumbs}
			headerTitle="Edit Data Anggota"
			headerDescription={`Memperbarui data profil ${member.name} (${member.member_number})`}
			headerActions={
				<Link
					href="/admin/members"
					className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Kembali ke Daftar</span>
				</Link>
			}
		>
			<Head title={`Edit: ${member.name}`} />

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left 2 Columns: Identity & Organizational Data */}
					<div className="space-y-6 lg:col-span-2">
						{/* Basic Info Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
							<h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
								<User className="h-4 w-4 text-purple-600" />
								<span>Informasi Identitas Anggota</span>
							</h3>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Full Name */}
								<div>
									<label htmlFor="name" className="block text-xs font-semibold text-slate-700">
										Nama Lengkap <span className="text-rose-500">*</span>
									</label>
									<input
										type="text"
										id="name"
										value={form.data.name}
										onChange={(e) => form.setData('name', e.target.value)}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
										required
									/>
									{form.errors.name && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.name}</p>
									)}
								</div>

								{/* Member Number (NIA) */}
								<div>
									<label htmlFor="member_number" className="block text-xs font-semibold text-slate-700">
										Nomor Induk Anggota (NIA) <span className="text-rose-500">*</span>
									</label>
									<div className="mt-1.5 flex rounded-xl border border-slate-200 bg-slate-50 shadow-xs focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
										<span className="inline-flex items-center rounded-l-xl px-3 text-xs font-mono text-slate-400">
											<IdCard className="h-3.5 w-3.5" />
										</span>
										<input
											type="text"
											id="member_number"
											value={form.data.member_number}
											onChange={(e) => form.setData('member_number', e.target.value)}
											className="w-full border-0 bg-transparent px-2 py-2 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
											required
										/>
									</div>
									{form.errors.member_number && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.member_number}</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Batch Year */}
								<div>
									<label htmlFor="batch_year" className="block text-xs font-semibold text-slate-700">
										Tahun Angkatan / Masuk
									</label>
									<input
										type="number"
										id="batch_year"
										value={form.data.batch_year}
										onChange={(e) => form.setData('batch_year', e.target.value)}
										min={1980}
										max={new Date().getFullYear() + 1}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.batch_year && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.batch_year}</p>
									)}
								</div>

								{/* Major / Study Program */}
								<div>
									<label htmlFor="major" className="block text-xs font-semibold text-slate-700">
										Program Studi / Jurusan
									</label>
									<input
										type="text"
										id="major"
										value={form.data.major}
										onChange={(e) => form.setData('major', e.target.value)}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.major && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.major}</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Phone */}
								<div>
									<label htmlFor="phone" className="block text-xs font-semibold text-slate-700">
										Nomor Telepon / WhatsApp
									</label>
									<input
										type="text"
										id="phone"
										value={form.data.phone}
										onChange={(e) => form.setData('phone', e.target.value)}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.phone && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.phone}</p>
									)}
								</div>

								{/* Email */}
								<div>
									<label htmlFor="email" className="block text-xs font-semibold text-slate-700">
										Alamat Email
									</label>
									<input
										type="email"
										id="email"
										value={form.data.email}
										onChange={(e) => form.setData('email', e.target.value)}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.email && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.email}</p>
									)}
								</div>
							</div>

							{/* Bio */}
							<div>
								<label htmlFor="bio" className="block text-xs font-semibold text-slate-700">
									Profil Singkat / Riwayat Ekspedisi
								</label>
								<textarea
									id="bio"
									rows={3}
									value={form.data.bio}
									onChange={(e) => form.setData('bio', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.bio && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.bio}</p>
								)}
							</div>
						</div>

						{/* Photo Avatar Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
							<AvatarUploader
								currentAvatarUrl={member.avatar_url}
								onFileSelect={(file) => form.setData('avatar', file)}
								avatarUrlValue={form.data.avatar_url}
								onAvatarUrlChange={(url) => form.setData('avatar_url', url)}
								error={form.errors.avatar || form.errors.avatar_url}
							/>
						</div>
					</div>

					{/* Right 1 Column: Organizational Structure & Position */}
					<div className="space-y-6">
						{/* Organization Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
							<h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
								<Briefcase className="h-4 w-4 text-purple-600" />
								<span>Organisasi & Kepengurusan</span>
							</h3>

							{/* Division Select */}
							<div>
								<label htmlFor="division_id" className="block text-xs font-semibold text-slate-700">
									Divisi Organisasi
								</label>
								<select
									id="division_id"
									value={form.data.division_id}
									onChange={(e) => form.setData('division_id', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="">-- Tidak Terikat Divisi Khusus --</option>
									{divisions.map((div) => (
										<option key={div.id} value={div.id}>
											{div.name}
										</option>
									))}
								</select>
								{form.errors.division_id && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.division_id}</p>
								)}
							</div>

							{/* Position Title */}
							<div>
								<label htmlFor="position" className="block text-xs font-semibold text-slate-700">
									Jabatan / Posisi
								</label>
								<input
									type="text"
									id="position"
									value={form.data.position}
									onChange={(e) => form.setData('position', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.position && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.position}</p>
								)}
							</div>

							{/* Status Select */}
							<div>
								<label htmlFor="status" className="block text-xs font-semibold text-slate-700">
									Status Keanggotaan
								</label>
								<select
									id="status"
									value={form.data.status}
									onChange={(e) =>
										form.setData(
											'status',
											e.target.value as 'regular' | 'active' | 'alumni' | 'honorary'
										)
									}
									className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="regular">Anggota Biasa</option>
									<option value="active">Anggota Aktif</option>
									<option value="alumni">Alumni</option>
									<option value="honorary">Anggota Kehormatan</option>
								</select>
								{form.errors.status && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.status}</p>
								)}
							</div>

							{/* Sort Order */}
							<div>
								<label htmlFor="sort_order" className="block text-xs font-semibold text-slate-700">
									Urutan Tampil (Sort Order)
								</label>
								<input
									type="number"
									id="sort_order"
									value={form.data.sort_order}
									onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
									min={0}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								<p className="mt-1 text-[11px] text-slate-400">
									Semakin kecil angka, semakin awal muncul di bagan struktur.
								</p>
							</div>

							{/* Toggles */}
							<div className="space-y-3 pt-2 border-t border-slate-100">
								{/* Is Pengurus Toggle */}
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={form.data.is_pengurus}
										onChange={(e) => form.setData('is_pengurus', e.target.checked)}
										className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
									/>
									<div>
										<span className="text-xs font-semibold text-slate-800">
											Masuk Pengurus Aktif
										</span>
										<p className="text-[11px] text-slate-400">
											Ditampilkan pada bagan struktur organisasi kepengurusan.
										</p>
									</div>
								</label>
							</div>

							{/* Actions */}
							<div className="pt-4 border-t border-slate-100 space-y-2">
								<button
									type="submit"
									disabled={form.processing}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800 disabled:opacity-50"
								>
									<Save className="h-4 w-4" />
									<span>{form.processing ? 'Menyimpan...' : 'Perbarui Data Anggota'}</span>
								</button>

								{member.can?.delete !== false && (
									<button
										type="button"
										onClick={() => setDeleteModalOpen(true)}
										className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
									>
										<Trash2 className="h-4 w-4" />
										<span>Hapus Anggota Ini</span>
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</form>

			{/* Delete Confirmation Modal */}
			{deleteModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalOpen(false)}
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
							<span className="font-bold text-slate-900">"{member.name}"</span> ({member.member_number})? Tindakan ini akan memindahkan data ke tempat sampah.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalOpen(false)}
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

export default EditMember;
