import AvatarUploader from '@/Components/Admin/Form/AvatarUploader';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Briefcase, GraduationCap, IdCard, Save, Shield, User } from 'lucide-react';
import {
	DEPARTMENT_MAJOR_LABELS,
	DepartmentMajor,
	MEMBER_STATUS_LABELS,
	MemberStatus,
} from '@/types/member';
import { FC, FormEvent } from 'react';

interface DivisionOption {
	id: string;
	name: string;
	slug: string;
}

interface CreateMemberProps {
	divisions: DivisionOption[];
}

interface MemberFormData {
	name: string;
	member_number: string;
	division_id: string;
	position: string;
	batch_year: string | number;
	major: DepartmentMajor | '';
	phone: string;
	email: string;
	status: MemberStatus;
	bio: string;
	avatar: File | null;
	avatar_url: string;
	is_pengurus: boolean;
	sort_order: number;
	is_active: boolean;
}

export const CreateMember: FC<CreateMemberProps> = ({ divisions = [] }) => {
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Pengurus & Anggota', href: '/admin/members' },
		{ label: 'Tambah Anggota' },
	];

	const form = useForm<MemberFormData>({
		name: '',
		member_number: '',
		division_id: '',
		position: '',
		batch_year: new Date().getFullYear(),
		major: '',
		phone: '',
		email: '',
		status: 'regular',
		bio: '',
		avatar: null,
		avatar_url: '',
		is_pengurus: false,
		sort_order: 0,
		is_active: true,
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		form.post('/admin/members');
	};

	return (
		<AdminLayout
			title="Tambah Anggota Baru"
			breadcrumbs={breadcrumbs}
			headerTitle="Tambah Anggota Baru"
			headerDescription="Daftarkan anggota baru atau pengurus ke dalam basis data KPA EMC²."
			headerActions={
				<Link
					href="/admin/members"
					className="shadow-xs flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Kembali ke Daftar</span>
				</Link>
			}
		>
			<Head title="Tambah Anggota Baru" />

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left 2 Columns: Identity & Organizational Data */}
					<div className="space-y-6 lg:col-span-2">
						{/* Basic Info Card */}
						<div className="shadow-xs space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
							<h3 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-900">
								<User className="h-4 w-4 text-purple-600" />
								<span>Informasi Identitas Anggota</span>
							</h3>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Full Name */}
								<div>
									<label
										htmlFor="name"
										className="block text-xs font-semibold text-slate-700"
									>
										Nama Lengkap <span className="text-rose-500">*</span>
									</label>
									<input
										type="text"
										id="name"
										value={form.data.name}
										onChange={(e) => form.setData('name', e.target.value)}
										placeholder="Contoh: Ali Musthafa Kamal"
										className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
										required
									/>
									{form.errors.name && (
										<p className="mt-1 text-xs text-rose-600">
											{form.errors.name}
										</p>
									)}
								</div>

								{/* Member Number (NIA) */}
								<div>
									<label
										htmlFor="member_number"
										className="block text-xs font-semibold text-slate-700"
									>
										Nomor Anggota <span className="text-rose-500">*</span>
									</label>
									<div className="shadow-xs mt-1.5 flex rounded-xl border border-slate-200 bg-slate-50 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
										<span className="inline-flex items-center rounded-l-xl px-3 font-mono text-xs text-slate-400">
											<IdCard className="h-3.5 w-3.5" />
										</span>
										<input
											type="text"
											id="member_number"
											value={form.data.member_number}
											onChange={(e) =>
												form.setData('member_number', e.target.value)
											}
											placeholder="175/KPA EMC²/2022"
											className="focus:outline-hidden w-full border-0 bg-transparent px-2 py-2 font-mono text-xs text-slate-800 placeholder-slate-400 focus:ring-0"
											required
										/>
									</div>
									{form.errors.member_number && (
										<p className="mt-1 text-xs text-rose-600">
											{form.errors.member_number}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Batch Year */}
								<div>
									<label
										htmlFor="batch_year"
										className="block text-xs font-semibold text-slate-700"
									>
										Tahun Angkatan / Masuk
									</label>
									<input
										type="number"
										id="batch_year"
										value={form.data.batch_year}
										onChange={(e) => form.setData('batch_year', e.target.value)}
										placeholder="2023"
										min={1980}
										max={new Date().getFullYear() + 1}
										className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.batch_year && (
										<p className="mt-1 text-xs text-rose-600">
											{form.errors.batch_year}
										</p>
									)}
								</div>

								{/* Major / Study Program */}
								<div>
									<label
										htmlFor="major"
										className="block text-xs font-semibold text-slate-700"
									>
										Program Studi / Jurusan
									</label>
									<select
										id="major"
										value={form.data.major}
										onChange={(e) =>
											form.setData(
												'major',
												e.target.value as DepartmentMajor | ''
											)
										}
										className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
									>
										<option value="">-- Pilih Jurusan / Prodi --</option>
										{Object.entries(DEPARTMENT_MAJOR_LABELS).map(
											([value, label]) => (
												<option key={value} value={value}>
													{label}
												</option>
											)
										)}
									</select>
									{form.errors.major && (
										<p className="mt-1 text-xs text-rose-600">
											{form.errors.major}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Phone */}
								<div>
									<label
										htmlFor="phone"
										className="block text-xs font-semibold text-slate-700"
									>
										Nomor Telepon / WhatsApp
									</label>
									<input
										type="text"
										id="phone"
										value={form.data.phone}
										onChange={(e) => form.setData('phone', e.target.value)}
										placeholder="081234567890"
										className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.phone && (
										<p className="mt-1 text-xs text-rose-600">
											{form.errors.phone}
										</p>
									)}
								</div>

								{/* Email */}
								<div>
									<label
										htmlFor="email"
										className="block text-xs font-semibold text-slate-700"
									>
										Alamat Email
									</label>
									<input
										type="email"
										id="email"
										value={form.data.email}
										onChange={(e) => form.setData('email', e.target.value)}
										placeholder="anggota@kpa-emc2.org"
										className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
									/>
									{form.errors.email && (
										<p className="mt-1 text-xs text-rose-600">
											{form.errors.email}
										</p>
									)}
								</div>
							</div>

							{/* Bio */}
							<div>
								<label
									htmlFor="bio"
									className="block text-xs font-semibold text-slate-700"
								>
									Profil Singkat / Riwayat Ekspedisi
								</label>
								<textarea
									id="bio"
									rows={3}
									value={form.data.bio}
									onChange={(e) => form.setData('bio', e.target.value)}
									placeholder="Catatan singkat tentang minat minat alam bebas, riwayat diksar, atau pengalaman kepengurusan..."
									className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.bio && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.bio}</p>
								)}
							</div>
						</div>

						{/* Photo Avatar Card */}
						<div className="shadow-xs rounded-2xl border border-slate-200 bg-white p-6">
							<AvatarUploader
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
						<div className="shadow-xs space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
							<h3 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-900">
								<Briefcase className="h-4 w-4 text-purple-600" />
								<span>Organisasi & Kepengurusan</span>
							</h3>

							{/* Division Select */}
							<div>
								<label
									htmlFor="division_id"
									className="block text-xs font-semibold text-slate-700"
								>
									Divisi Organisasi
								</label>
								<select
									id="division_id"
									value={form.data.division_id}
									onChange={(e) => form.setData('division_id', e.target.value)}
									className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
								>
									<option value="">-- Tidak Terikat Divisi Khusus --</option>
									{divisions.map((div) => (
										<option key={div.id} value={div.id}>
											{div.name}
										</option>
									))}
								</select>
								{form.errors.division_id && (
									<p className="mt-1 text-xs text-rose-600">
										{form.errors.division_id}
									</p>
								)}
							</div>

							{/* Position Title */}
							<div>
								<label
									htmlFor="position"
									className="block text-xs font-semibold text-slate-700"
								>
									Jabatan / Posisi
								</label>
								<input
									type="text"
									id="position"
									value={form.data.position}
									onChange={(e) => form.setData('position', e.target.value)}
									placeholder="Contoh: Ketua Umum / Kadiv Hutan Gunung"
									className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.position && (
									<p className="mt-1 text-xs text-rose-600">
										{form.errors.position}
									</p>
								)}
							</div>

							{/* Status Select */}
							<div>
								<label
									htmlFor="status"
									className="block text-xs font-semibold text-slate-700"
								>
									Status Keanggotaan
								</label>
								<select
									id="status"
									value={form.data.status}
									onChange={(e) =>
										form.setData('status', e.target.value as MemberStatus)
									}
									className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
								>
									{Object.entries(MEMBER_STATUS_LABELS).map(([value, label]) => (
										<option key={value} value={value}>
											{label}
										</option>
									))}
								</select>
								{form.errors.status && (
									<p className="mt-1 text-xs text-rose-600">
										{form.errors.status}
									</p>
								)}
							</div>

							{/* Sort Order */}
							<div>
								<label
									htmlFor="sort_order"
									className="block text-xs font-semibold text-slate-700"
								>
									Urutan Tampil (Sort Order)
								</label>
								<input
									type="number"
									id="sort_order"
									value={form.data.sort_order}
									onChange={(e) =>
										form.setData('sort_order', parseInt(e.target.value) || 0)
									}
									min={0}
									className="shadow-xs focus:outline-hidden mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
								/>
								<p className="mt-1 text-[11px] text-slate-400">
									Semakin kecil angka, semakin awal muncul di bagan struktur.
								</p>
							</div>

							{/* Toggles */}
							<div className="space-y-3 border-t border-slate-100 pt-2">
								{/* Is Pengurus Toggle */}
								<label className="flex cursor-pointer items-start gap-3">
									<input
										type="checkbox"
										checked={form.data.is_pengurus}
										onChange={(e) =>
											form.setData('is_pengurus', e.target.checked)
										}
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

							{/* Submit Button */}
							<div className="border-t border-slate-100 pt-4">
								<button
									type="submit"
									disabled={form.processing}
									className="shadow-xs flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-2.5 text-xs font-bold text-white transition hover:bg-purple-800 disabled:opacity-50"
								>
									<Save className="h-4 w-4" />
									<span>
										{form.processing ? 'Menyimpan...' : 'Simpan Data Anggota'}
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</AdminLayout>
	);
};

export default CreateMember;
