import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { PaginatedResource } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import {
	Calendar,
	CheckCircle,
	Edit,
	FileText,
	Filter,
	FolderKanban,
	Image as ImageIcon,
	Plus,
	Search,
	Trash2,
	X,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface CategoryItem {
	id: string;
	name: string;
	slug: string;
	type: 'post' | 'event' | 'gallery';
	color?: string | null;
	sort_order: number;
	is_active: boolean;
	posts_count?: number;
	events_count?: number;
	galleries_count?: number;
	can?: { update?: boolean; delete?: boolean };
}

interface CategoriesIndexProps {
	categories: PaginatedResource<CategoryItem>;
	filters: {
		search?: string;
		type?: string;
	};
}

interface CategoryFormData {
	name: string;
	slug: string;
	type: 'post' | 'event' | 'gallery';
	color: string;
	sort_order: number;
	is_active: boolean;
}

export const CategoriesIndex: FC<CategoriesIndexProps> = ({
	categories,
	filters = {},
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedType, setSelectedType] = useState(filters.type || '');
	const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
	const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
	const [deleteModalCategory, setDeleteModalCategory] = useState<CategoryItem | null>(null);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Kategori Konten' },
	];

	const form = useForm<CategoryFormData>({
		name: '',
		slug: '',
		type: 'post',
		color: '#6b21a8',
		sort_order: 0,
		is_active: true,
	});

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			'/admin/categories',
			{
				search: searchTerm || undefined,
				type: selectedType || undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedType('');
		router.get('/admin/categories', {}, { preserveState: true, replace: true });
	};

	const openCreateModal = () => {
		form.reset();
		form.setData({
			name: '',
			slug: '',
			type: (selectedType as 'post' | 'event' | 'gallery') || 'post',
			color: '#6b21a8',
			sort_order: 0,
			is_active: true,
		});
		setEditingCategory(null);
		setModalMode('create');
	};

	const openEditModal = (cat: CategoryItem) => {
		setEditingCategory(cat);
		form.setData({
			name: cat.name,
			slug: cat.slug,
			type: cat.type,
			color: cat.color || '#6b21a8',
			sort_order: cat.sort_order,
			is_active: cat.is_active,
		});
		setModalMode('edit');
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (modalMode === 'create') {
			form.post('/admin/categories', {
				onSuccess: () => setModalMode(null),
			});
		} else if (modalMode === 'edit' && editingCategory) {
			form.put(`/admin/categories/${editingCategory.id}`, {
				onSuccess: () => setModalMode(null),
			});
		}
	};

	const handleDeleteConfirm = () => {
		if (!deleteModalCategory) return;
		router.delete(`/admin/categories/${deleteModalCategory.id}`, {
			onSuccess: () => setDeleteModalCategory(null),
		});
	};

	const getTypeBadge = (type: string) => {
		switch (type) {
			case 'post':
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">
						<FileText className="h-3 w-3" />
						<span>Artikel & Berita</span>
					</span>
				);
			case 'event':
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
						<Calendar className="h-3 w-3" />
						<span>Agenda Kegiatan</span>
					</span>
				);
			case 'gallery':
				return (
					<span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
						<ImageIcon className="h-3 w-3" />
						<span>Galeri Foto</span>
					</span>
				);
			default:
				return <span className="text-slate-500">{type}</span>;
		}
	};

	return (
		<AdminLayout
			title="Manajemen Kategori Konten"
			breadcrumbs={breadcrumbs}
			headerTitle="Kategori Konten"
			headerDescription="Kelola taksonomi kategori untuk artikel, agenda kegiatan, dan galeri dokumentasi."
			headerActions={
				<button
					type="button"
					onClick={openCreateModal}
					className="flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-800"
				>
					<Plus className="h-4 w-4" />
					<span>Tambah Kategori</span>
				</button>
			}
		>
			<Head title="Manajemen Kategori Konten" />

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
							placeholder="Cari nama kategori atau slug..."
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						/>
					</div>

					{/* Type Select */}
					<div className="w-full md:w-48">
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Modul Tipe</option>
							<option value="post">Artikel & Berita (Post)</option>
							<option value="event">Agenda Kegiatan (Event)</option>
							<option value="gallery">Galeri Dokumentasi (Gallery)</option>
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
						{(filters.search || filters.type) && (
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

			{/* Categories Table */}
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs text-slate-600">
						<thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
							<tr>
								<th scope="col" className="px-5 py-3.5">
									Nama Kategori & Slug
								</th>
								<th scope="col" className="px-4 py-3.5">
									Tipe Modul
								</th>
								<th scope="col" className="px-4 py-3.5">
									Jumlah Konten
								</th>
								<th scope="col" className="px-4 py-3.5">
									Urutan
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
							{categories.data.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
											<FolderKanban className="h-6 w-6" />
										</div>
										<h4 className="mt-3 text-sm font-semibold text-slate-900">
											Belum ada kategori ditemukan
										</h4>
										<div className="mt-4">
											<button
												type="button"
												onClick={openCreateModal}
												className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-800"
											>
												<Plus className="h-4 w-4" />
												<span>Tambah Kategori Sekarang</span>
											</button>
										</div>
									</td>
								</tr>
							) : (
								categories.data.map((cat) => (
									<tr key={cat.id} className="transition-colors hover:bg-slate-50/60">
										{/* Name & Slug */}
										<td className="px-5 py-3.5">
											<div className="flex items-center gap-2">
												{cat.color && (
													<span
														className="h-3 w-3 rounded-full shrink-0 ring-1 ring-slate-200"
														style={{ backgroundColor: cat.color }}
													/>
												)}
												<div>
													<span className="font-semibold text-slate-900">{cat.name}</span>
													<span className="block font-mono text-[11px] text-slate-400">
														/{cat.slug}
													</span>
												</div>
											</div>
										</td>

										{/* Module Type */}
										<td className="px-4 py-3.5">{getTypeBadge(cat.type)}</td>

										{/* Content Count */}
										<td className="px-4 py-3.5">
											<span className="font-semibold text-slate-800">
												{cat.type === 'post'
													? `${cat.posts_count || 0} Artikel`
													: cat.type === 'event'
														? `${cat.events_count || 0} Kegiatan`
														: `${cat.galleries_count || 0} Foto`}
											</span>
										</td>

										{/* Sort Order */}
										<td className="px-4 py-3.5 font-mono text-slate-500">
											{cat.sort_order}
										</td>

										{/* Status */}
										<td className="px-4 py-3.5">
											{cat.is_active ? (
												<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
													<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
													<span>Aktif</span>
												</span>
											) : (
												<span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
													<span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
													<span>Nonaktif</span>
												</span>
											)}
										</td>

										{/* Actions */}
										<td className="px-5 py-3.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<button
													type="button"
													onClick={() => openEditModal(cat)}
													title="Edit Kategori"
													className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
												>
													<Edit className="h-4 w-4" />
												</button>

												<button
													type="button"
													onClick={() => setDeleteModalCategory(cat)}
													title="Hapus Kategori"
													className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{categories.links && categories.links.length > 3 && (
					<div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 bg-slate-50/50 text-xs">
						<span className="text-slate-500">
							Menampilkan <span className="font-semibold">{categories.from || 0}</span> -{' '}
							<span className="font-semibold">{categories.to || 0}</span> dari{' '}
							<span className="font-semibold">{categories.total}</span> kategori
						</span>

						<div className="flex items-center gap-1">
							{categories.links.map((link, idx) => (
								<button
									key={idx}
									onClick={() => link.url && router.get(link.url)}
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

			{/* Create / Edit Modal */}
			{modalMode && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setModalMode(null)}
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex items-center justify-between border-b border-slate-100 pb-3">
							<h3 className="text-base font-bold text-slate-900">
								{modalMode === 'create' ? 'Tambah Kategori Baru' : 'Edit Kategori'}
							</h3>
							<button
								type="button"
								onClick={() => setModalMode(null)}
								className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
							{/* Name */}
							<div>
								<label htmlFor="cat_name" className="block text-xs font-semibold text-slate-700">
									Nama Kategori <span className="text-rose-500">*</span>
								</label>
								<input
									type="text"
									id="cat_name"
									value={form.data.name}
									onChange={(e) => form.setData('name', e.target.value)}
									placeholder="Contoh: Konservasi & Ekspedisi"
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									required
								/>
								{form.errors.name && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.name}</p>
								)}
							</div>

							{/* Type Select */}
							<div>
								<label htmlFor="cat_type" className="block text-xs font-semibold text-slate-700">
									Tipe Modul Konten <span className="text-rose-500">*</span>
								</label>
								<select
									id="cat_type"
									value={form.data.type}
									onChange={(e) =>
										form.setData(
											'type',
											e.target.value as 'post' | 'event' | 'gallery'
										)
									}
									className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="post">Artikel & Berita (Post)</option>
									<option value="event">Agenda Kegiatan (Event)</option>
									<option value="gallery">Galeri Dokumentasi (Gallery)</option>
								</select>
								{form.errors.type && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.type}</p>
								)}
							</div>

							{/* Slug */}
							<div>
								<label htmlFor="cat_slug" className="block text-xs font-semibold text-slate-700">
									Slug URL (Opsional)
								</label>
								<input
									type="text"
									id="cat_slug"
									value={form.data.slug}
									onChange={(e) => form.setData('slug', e.target.value)}
									placeholder="konservasi-ekspedisi"
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-700 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{/* Color */}
								<div>
									<label htmlFor="cat_color" className="block text-xs font-semibold text-slate-700">
										Warna Aksen
									</label>
									<div className="mt-1.5 flex items-center gap-2">
										<input
											type="color"
											id="cat_color"
											value={form.data.color}
											onChange={(e) => form.setData('color', e.target.value)}
											className="h-8 w-10 cursor-pointer rounded border border-slate-200 p-0.5"
										/>
										<span className="font-mono text-xs text-slate-600">
											{form.data.color}
										</span>
									</div>
								</div>

								{/* Sort Order */}
								<div>
									<label htmlFor="cat_sort" className="block text-xs font-semibold text-slate-700">
										Urutan Tampil
									</label>
									<input
										type="number"
										id="cat_sort"
										value={form.data.sort_order}
										onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
										min={0}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
								</div>
							</div>

							{/* Actions */}
							<div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
								<button
									type="button"
									onClick={() => setModalMode(null)}
									className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={form.processing}
									className="rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-800 disabled:opacity-50"
								>
									{form.processing ? 'Menyimpan...' : 'Simpan Kategori'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Delete Modal */}
			{deleteModalCategory && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalCategory(null)}
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
							<Trash2 className="h-6 w-6" />
						</div>
						<h3 className="mt-4 text-lg font-bold text-slate-900">
							Hapus Kategori Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus kategori{' '}
							<span className="font-bold text-slate-900">"{deleteModalCategory.name}"</span>? Konten yang menggunakan kategori ini akan dialihkan ke kategori umum.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalCategory(null)}
								className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteConfirm}
								className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
							>
								Ya, Hapus Kategori
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default CategoriesIndex;
