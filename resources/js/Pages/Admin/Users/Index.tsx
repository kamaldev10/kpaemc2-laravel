import AdminLayout from '@/Layouts/AdminLayout';
import AdminPagination from '@/Components/Admin/UI/AdminPagination';
import { BreadcrumbItem } from '@/types/admin';
import { PageProps, PaginatedResource, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
	CheckCircle,
	Edit,
	Eye,
	EyeOff,
	Filter,
	Lock,
	Mail,
	Plus,
	Search,
	Shield,
	ShieldAlert,
	ShieldCheck,
	Trash2,
	UserCheck,
	UserPlus,
	Users,
	X,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface AdminUserItem {
	id: string;
	name: string;
	email: string;
	role: 'super_admin' | 'admin' | 'editor';
	role_label: string;
	avatar_url?: string | null;
	avatar_public_id?: string | null;
	is_active: boolean;
	email_verified_at?: string | null;
	created_at?: string;
	updated_at?: string;
	can?: {
		update?: boolean;
		delete?: boolean;
		is_self?: boolean;
	};
}

interface RoleOption {
	value: 'super_admin' | 'admin' | 'editor';
	label: string;
}

interface UsersIndexProps {
	users: PaginatedResource<AdminUserItem>;
	filters: {
		search?: string;
		role?: string;
		is_active?: string;
		per_page?: string;
	};
	metrics: {
		total: number;
		super_admin: number;
		admin: number;
		editor: number;
		active: number;
	};
	roles: RoleOption[];
}

interface UserFormData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	role: 'super_admin' | 'admin' | 'editor';
	is_active: boolean;
}

export const UsersIndex: FC<UsersIndexProps> = ({
	users,
	filters = {},
	metrics = { total: 0, super_admin: 0, admin: 0, editor: 0, active: 0 },
	roles = [],
}) => {
	const { auth } = usePage<PageProps>().props;
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedRole, setSelectedRole] = useState(filters.role || '');
	const [selectedStatus, setSelectedStatus] = useState(
		filters.is_active !== undefined ? filters.is_active : ''
	);
	const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
	const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
	const [deleteModalUser, setDeleteModalUser] = useState<AdminUserItem | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Kelola Pengguna' },
	];

	const form = useForm<UserFormData>({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		role: 'admin',
		is_active: true,
	});

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			'/admin/users',
			{
				search: searchTerm || undefined,
				role: selectedRole || undefined,
				is_active: selectedStatus !== '' ? selectedStatus : undefined,
				per_page: filters.per_page || undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedRole('');
		setSelectedStatus('');
		router.get('/admin/users', {}, { preserveState: true, replace: true });
	};

	const openCreateModal = () => {
		form.reset();
		form.clearErrors();
		setShowPassword(false);
		form.setData({
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			role: 'admin',
			is_active: true,
		});
		setEditingUser(null);
		setModalMode('create');
	};

	const openEditModal = (targetUser: AdminUserItem) => {
		form.clearErrors();
		setShowPassword(false);
		setEditingUser(targetUser);
		form.setData({
			name: targetUser.name,
			email: targetUser.email,
			password: '',
			password_confirmation: '',
			role: targetUser.role,
			is_active: targetUser.is_active,
		});
		setModalMode('edit');
	};

	const closeModal = () => {
		setModalMode(null);
		setEditingUser(null);
		form.reset();
		form.clearErrors();
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (modalMode === 'create') {
			form.post('/admin/users', {
				preserveScroll: true,
				onSuccess: () => closeModal(),
			});
		} else if (modalMode === 'edit' && editingUser) {
			form.put(`/admin/users/${editingUser.id}`, {
				preserveScroll: true,
				onSuccess: () => closeModal(),
			});
		}
	};

	const handleDeleteConfirm = () => {
		if (!deleteModalUser) return;

		router.delete(`/admin/users/${deleteModalUser.id}`, {
			preserveScroll: true,
			onSuccess: () => setDeleteModalUser(null),
		});
	};

	const getRoleBadge = (role: string, label: string) => {
		switch (role) {
			case 'super_admin':
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-800 border border-purple-200">
						<ShieldCheck className="h-3.5 w-3.5 text-purple-700" />
						{label || 'Super Admin'}
					</span>
				);
			case 'admin':
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
						<Shield className="h-3.5 w-3.5 text-indigo-600" />
						{label || 'Admin'}
					</span>
				);
			case 'editor':
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
						<UserCheck className="h-3.5 w-3.5 text-emerald-600" />
						{label || 'Editor'}
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
						{label || role}
					</span>
				);
		}
	};

	const roleOptions = roles.length > 0 ? roles : [
		{ value: 'super_admin' as const, label: 'Super Admin' },
		{ value: 'admin' as const, label: 'Admin' },
		{ value: 'editor' as const, label: 'Editor' },
	];

	return (
		<AdminLayout
			title="Kelola Pengguna"
			breadcrumbs={breadcrumbs}
			headerTitle="Kelola Akun Pengguna"
			headerDescription="Manajemen akun super admin, admin, dan editor untuk mengelola portal KPA EMC²."
			headerActions={
				<button
					type="button"
					onClick={openCreateModal}
					className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-purple-800 focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
				>
					<UserPlus className="h-4 w-4" />
					<span>Tambah Pengguna Baru</span>
				</button>
			}
		>
			<Head title="Kelola Pengguna - Portal Admin KPA EMC²" />

			<div className="space-y-6">
				{/* 4 Metric Cards */}
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
					<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-purple-200 hover:shadow-xs">
						<div className="flex items-center justify-between">
							<span className="text-xs font-semibold text-slate-500">Total Pengguna</span>
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
								<Users className="h-4 w-4" />
							</div>
						</div>
						<div className="mt-2 flex items-baseline gap-2">
							<span className="text-2xl font-black text-slate-900">{metrics.total}</span>
							<span className="text-[11px] font-medium text-slate-400">akun</span>
						</div>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-purple-200 hover:shadow-xs">
						<div className="flex items-center justify-between">
							<span className="text-xs font-semibold text-slate-500">Super Admin</span>
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
								<ShieldCheck className="h-4 w-4" />
							</div>
						</div>
						<div className="mt-2 flex items-baseline gap-2">
							<span className="text-2xl font-black text-purple-900">{metrics.super_admin}</span>
							<span className="text-[11px] font-medium text-slate-400">role tertinggi</span>
						</div>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-purple-200 hover:shadow-xs">
						<div className="flex items-center justify-between">
							<span className="text-xs font-semibold text-slate-500">Admin</span>
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
								<Shield className="h-4 w-4" />
							</div>
						</div>
						<div className="mt-2 flex items-baseline gap-2">
							<span className="text-2xl font-black text-indigo-900">{metrics.admin}</span>
							<span className="text-[11px] font-medium text-slate-400">pengelola</span>
						</div>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-purple-200 hover:shadow-xs">
						<div className="flex items-center justify-between">
							<span className="text-xs font-semibold text-slate-500">Editor</span>
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
								<UserCheck className="h-4 w-4" />
							</div>
						</div>
						<div className="mt-2 flex items-baseline gap-2">
							<span className="text-2xl font-black text-emerald-900">{metrics.editor}</span>
							<span className="text-[11px] font-medium text-slate-400">penulis</span>
						</div>
					</div>
				</div>

				{/* Filter Toolbar */}
				<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
					<form
						onSubmit={handleFilterSubmit}
						className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
					>
						<div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
							{/* Search input */}
							<div className="relative">
								<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Cari nama atau email pengguna..."
									className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-3 pl-9 text-xs text-slate-800 placeholder-slate-400 transition-colors focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
							</div>

							{/* Role filter */}
							<div>
								<select
									value={selectedRole}
									onChange={(e) => setSelectedRole(e.target.value)}
									className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 transition-colors focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="">Semua Peran</option>
									{roleOptions.map((r) => (
										<option key={r.value} value={r.value}>
											{r.label}
										</option>
									))}
								</select>
							</div>

							{/* Status filter */}
							<div>
								<select
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
									className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 transition-colors focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="">Semua Status</option>
									<option value="1">Aktif</option>
									<option value="0">Nonaktif</option>
								</select>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button
								type="submit"
								className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-800"
							>
								<Filter className="h-3.5 w-3.5" />
								<span>Terapkan</span>
							</button>

							{(filters.search || filters.role || filters.is_active !== undefined) && (
								<button
									type="button"
									onClick={handleResetFilters}
									className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
								>
									<X className="h-3.5 w-3.5" />
									<span>Reset</span>
								</button>
							)}
						</div>
					</form>
				</div>

				{/* Data Table */}
				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="border-b border-slate-200 bg-slate-50/80 font-semibold text-slate-600">
								<tr>
									<th scope="col" className="px-5 py-3.5">
										Pengguna
									</th>
									<th scope="col" className="px-5 py-3.5">
										Peran (Role)
									</th>
									<th scope="col" className="px-5 py-3.5">
										Status
									</th>
									<th scope="col" className="px-5 py-3.5">
										Terdaftar Pada
									</th>
									<th scope="col" className="px-5 py-3.5 text-right">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{users.data.length === 0 ? (
									<tr>
										<td colSpan={5} className="px-6 py-12 text-center">
											<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
												<Users className="h-6 w-6" />
											</div>
											<h4 className="mt-3 text-sm font-semibold text-slate-900">
												Tidak ada pengguna ditemukan
											</h4>
											<p className="mt-1 text-xs text-slate-500">
												Silakan coba ubah kata kunci pencarian atau sesuaikan filter di atas.
											</p>
										</td>
									</tr>
								) : (
									users.data.map((item) => {
										const isSelf = item.can?.is_self ?? (item.id === auth.user.id);
										const canDelete = !isSelf && (item.can?.delete ?? true);

										return (
											<tr key={item.id} className="transition-colors hover:bg-slate-50/60">
												{/* User Column: Avatar + Name + Email */}
												<td className="px-5 py-3.5">
													<div className="flex items-center gap-3">
														{item.avatar_url ? (
															<img
																src={item.avatar_url}
																alt={item.name}
																className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-2xs"
															/>
														) : (
															<div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-900 text-xs font-bold text-white shadow-2xs">
																{item.name.charAt(0).toUpperCase()}
															</div>
														)}
														<div>
															<div className="flex items-center gap-2">
																<span className="font-bold text-slate-900">
																	{item.name}
																</span>
																{isSelf && (
																	<span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
																		Akun Anda
																	</span>
																)}
															</div>
															<span className="text-[11px] text-slate-500">
																{item.email}
															</span>
														</div>
													</div>
												</td>

												{/* Role Column */}
												<td className="px-5 py-3.5 whitespace-nowrap">
													{getRoleBadge(item.role, item.role_label)}
												</td>

												{/* Status Column */}
												<td className="px-5 py-3.5 whitespace-nowrap">
													{item.is_active ? (
														<span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
															<span className="h-2 w-2 rounded-full bg-emerald-500" />
															<span>Aktif</span>
														</span>
													) : (
														<span className="inline-flex items-center gap-1.5 font-medium text-slate-400">
															<span className="h-2 w-2 rounded-full bg-slate-300" />
															<span>Nonaktif</span>
														</span>
													)}
												</td>

												{/* Created At Column */}
												<td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
													{item.created_at
														? new Date(item.created_at).toLocaleDateString('id-ID', {
																day: 'numeric',
																month: 'short',
																year: 'numeric',
															})
														: '-'}
												</td>

												{/* Action Column */}
												<td className="px-5 py-3.5 text-right whitespace-nowrap">
													<div className="flex items-center justify-end gap-1">
														<button
															type="button"
															onClick={() => openEditModal(item)}
															title="Edit Akun Pengguna"
															className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700 transition-colors"
														>
															<Edit className="h-4 w-4" />
														</button>

														{canDelete ? (
															<button
																type="button"
																onClick={() => setDeleteModalUser(item)}
																title="Hapus Akun Pengguna"
																className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
															>
																<Trash2 className="h-4 w-4" />
															</button>
														) : (
															<button
																type="button"
																disabled
																title="Tidak dapat menghapus akun Anda sendiri"
																className="rounded-lg p-1.5 text-slate-200 cursor-not-allowed"
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
					<AdminPagination
						pagination={users}
						perPage={filters.per_page || 10}
						baseUrl="/admin/users"
						filters={{
							search: searchTerm || undefined,
							role: selectedRole || undefined,
							is_active: selectedStatus !== '' ? selectedStatus : undefined,
						}}
						itemName="pengguna"
					/>
				</div>
			</div>

			{/* Create / Edit Modal */}
			{modalMode && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={closeModal}
					/>
					<div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all">
						<div className="flex items-center justify-between border-b border-slate-100 pb-4">
							<div className="flex items-center gap-2.5">
								<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
									{modalMode === 'create' ? (
										<UserPlus className="h-5 w-5" />
									) : (
										<Edit className="h-5 w-5" />
									)}
								</div>
								<div>
									<h3 className="text-base font-bold text-slate-900">
										{modalMode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Akun Pengguna'}
									</h3>
									<p className="text-[11px] text-slate-500">
										{modalMode === 'create'
											? 'Buat akun pengurus baru untuk akses portal admin.'
											: `Memperbarui akun untuk "${editingUser?.name}".`}
									</p>
								</div>
							</div>
							<button
								type="button"
								onClick={closeModal}
								className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<form onSubmit={handleFormSubmit} className="mt-4 space-y-4 text-xs">
							{/* Name Field */}
							<div>
								<label className="block font-semibold text-slate-700">
									Nama Lengkap <span className="text-rose-500">*</span>
								</label>
								<input
									type="text"
									value={form.data.name}
									onChange={(e) => form.setData('name', e.target.value)}
									placeholder="e.g. Ali Musthafa Kamal"
									className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-2 text-xs text-slate-800 transition-colors focus:outline-hidden focus:ring-1 ${
										form.errors.name
											? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
											: 'border-slate-200 focus:border-purple-600 focus:ring-purple-600'
									}`}
								/>
								{form.errors.name && (
									<p className="mt-1 text-[11px] text-rose-600">{form.errors.name}</p>
								)}
							</div>

							{/* Email Field */}
							<div>
								<label className="block font-semibold text-slate-700">
									Alamat Email <span className="text-rose-500">*</span>
								</label>
								<div className="relative mt-1.5">
									<Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
									<input
										type="email"
										value={form.data.email}
										onChange={(e) => form.setData('email', e.target.value)}
										placeholder="e.g. admin@kpa-emc2.org"
										className={`w-full rounded-xl border bg-white py-2 pr-3 pl-9 text-xs text-slate-800 transition-colors focus:outline-hidden focus:ring-1 ${
											form.errors.email
												? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
												: 'border-slate-200 focus:border-purple-600 focus:ring-purple-600'
										}`}
									/>
								</div>
								{form.errors.email && (
									<p className="mt-1 text-[11px] text-rose-600">{form.errors.email}</p>
								)}
							</div>

							{/* Role Field */}
							<div>
								<label className="block font-semibold text-slate-700">
									Peran (Role) <span className="text-rose-500">*</span>
								</label>
								<select
									value={form.data.role}
									onChange={(e) =>
										form.setData('role', e.target.value as 'super_admin' | 'admin' | 'editor')
									}
									disabled={modalMode === 'edit' && editingUser?.id === auth.user.id}
									className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-2 text-xs text-slate-800 transition-colors focus:outline-hidden focus:ring-1 ${
										form.errors.role
											? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
											: 'border-slate-200 focus:border-purple-600 focus:ring-purple-600'
									} ${modalMode === 'edit' && editingUser?.id === auth.user.id ? 'bg-slate-100 cursor-not-allowed' : ''}`}
								>
									{roleOptions.map((r) => (
										<option key={r.value} value={r.value}>
											{r.label}
										</option>
									))}
								</select>
								{modalMode === 'edit' && editingUser?.id === auth.user.id && (
									<p className="mt-1 text-[11px] text-slate-400 italic">
										Anda tidak dapat mengubah peran akun Anda sendiri.
									</p>
								)}
								{form.errors.role && (
									<p className="mt-1 text-[11px] text-rose-600">{form.errors.role}</p>
								)}
							</div>

							{/* Password Field */}
							<div>
								<div className="flex items-center justify-between">
									<label className="block font-semibold text-slate-700">
										{modalMode === 'create' ? 'Password' : 'Password Baru (Opsional)'}{' '}
										{modalMode === 'create' && <span className="text-rose-500">*</span>}
									</label>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="text-[11px] font-medium text-purple-700 hover:text-purple-900"
									>
										{showPassword ? 'Sembunyikan' : 'Lihat'}
									</button>
								</div>
								<div className="relative mt-1.5">
									<Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
									<input
										type={showPassword ? 'text' : 'password'}
										value={form.data.password}
										onChange={(e) => form.setData('password', e.target.value)}
										placeholder={
											modalMode === 'create'
												? 'Minimal 8 karakter'
												: 'Kosongkan jika tidak ingin mengganti password'
										}
										className={`w-full rounded-xl border bg-white py-2 pr-10 pl-9 text-xs text-slate-800 transition-colors focus:outline-hidden focus:ring-1 ${
											form.errors.password
												? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
												: 'border-slate-200 focus:border-purple-600 focus:ring-purple-600'
										}`}
									/>
								</div>
								{form.errors.password && (
									<p className="mt-1 text-[11px] text-rose-600">{form.errors.password}</p>
								)}
							</div>

							{/* Password Confirmation Field */}
							{(modalMode === 'create' || form.data.password) && (
								<div>
									<label className="block font-semibold text-slate-700">
										Konfirmasi Password <span className="text-rose-500">*</span>
									</label>
									<div className="relative mt-1.5">
										<Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
										<input
											type={showPassword ? 'text' : 'password'}
											value={form.data.password_confirmation}
											onChange={(e) => form.setData('password_confirmation', e.target.value)}
											placeholder="Ketik ulang password"
											className={`w-full rounded-xl border bg-white py-2 pr-10 pl-9 text-xs text-slate-800 transition-colors focus:outline-hidden focus:ring-1 ${
												form.errors.password_confirmation
													? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
													: 'border-slate-200 focus:border-purple-600 focus:ring-purple-600'
											}`}
										/>
									</div>
									{form.errors.password_confirmation && (
										<p className="mt-1 text-[11px] text-rose-600">
											{form.errors.password_confirmation}
										</p>
									)}
								</div>
							)}

							{/* Active Status Toggle */}
							<div className="pt-2">
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										checked={form.data.is_active}
										onChange={(e) => form.setData('is_active', e.target.checked)}
										disabled={modalMode === 'edit' && editingUser?.id === auth.user.id}
										className="h-4 w-4 rounded-md border-slate-300 text-purple-700 focus:ring-purple-600 disabled:cursor-not-allowed"
									/>
									<span className="font-semibold text-slate-800">
										Akun Aktif (Dapat Login ke Portal)
									</span>
								</label>
								{modalMode === 'edit' && editingUser?.id === auth.user.id && (
									<p className="mt-1 text-[11px] text-slate-400 italic pl-6">
										Anda tidak dapat menonaktifkan akun Anda sendiri.
									</p>
								)}
								{form.errors.is_active && (
									<p className="mt-1 text-[11px] text-rose-600">{form.errors.is_active}</p>
								)}
							</div>

							{/* Form Action Buttons */}
							<div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
								<button
									type="button"
									onClick={closeModal}
									className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={form.processing}
									className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-800 disabled:opacity-50 transition-all"
								>
									<CheckCircle className="h-4 w-4" />
									<span>
										{form.processing
											? 'Menyimpan...'
											: modalMode === 'create'
												? 'Buat Pengguna'
												: 'Simpan Perubahan'}
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{deleteModalUser && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalUser(null)}
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
							<Trash2 className="h-6 w-6" />
						</div>
						<h3 className="mt-4 text-lg font-bold text-slate-900">
							Hapus Akun Pengguna?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus akun{' '}
							<span className="font-bold text-slate-900">"{deleteModalUser.name}"</span> (
							{deleteModalUser.email})? Tindakan ini permanen dan pengguna tidak akan bisa
							login kembali.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalUser(null)}
								className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteConfirm}
								className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
							>
								Ya, Hapus Pengguna
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default UsersIndex;
