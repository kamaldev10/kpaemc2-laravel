import AdminLayout from '@/Layouts/AdminLayout';
import AdminPagination from '@/Components/Admin/UI/AdminPagination';
import { BreadcrumbItem } from '@/types/admin';
import { PaginatedResource } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
	Calendar,
	Edit,
	Filter,
	Image as ImageIcon,
	Images,
	MapPin,
	Plus,
	Search,
	Trash2,
	X,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

interface CategoryOption {
	id: string;
	name: string;
}

interface DivisionOption {
	id: string;
	name: string;
}

interface GalleryItem {
	id: string;
	title: string;
	description?: string | null;
	cover_url?: string | null;
	event_date?: string | null;
	location?: string | null;
	items_count?: number;
	category?: CategoryOption | null;
	division?: DivisionOption | null;
	is_published: boolean;
	can?: { update?: boolean; delete?: boolean };
}

interface GalleriesIndexProps {
	galleries: PaginatedResource<GalleryItem>;
	categories: CategoryOption[];
	divisions: DivisionOption[];
	filters: {
		search?: string;
		category_id?: string;
		division_id?: string;
		per_page?: string;
	};
}

export const GalleriesIndex: FC<GalleriesIndexProps> = ({
	galleries,
	categories = [],
	divisions = [],
	filters = {},
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
	const [selectedDivision, setSelectedDivision] = useState(filters.division_id || '');
	const [deleteModalGallery, setDeleteModalGallery] = useState<GalleryItem | null>(null);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Galeri & Dokumentasi' },
	];

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			'/admin/galleries',
			{
				search: searchTerm || undefined,
				category_id: selectedCategory || undefined,
				division_id: selectedDivision || undefined,
				per_page: filters.per_page || undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedCategory('');
		setSelectedDivision('');
		router.get('/admin/galleries', {}, { preserveState: true, replace: true });
	};

	const handleDeleteConfirm = () => {
		if (!deleteModalGallery) return;
		router.delete(`/admin/galleries/${deleteModalGallery.id}`, {
			onSuccess: () => setDeleteModalGallery(null),
		});
	};

	return (
		<AdminLayout
			title="Manajemen Galeri & Dokumentasi"
			breadcrumbs={breadcrumbs}
			headerTitle="Galeri & Dokumentasi"
			headerDescription="Kelola album foto, arsip ekspedisi, diksar, dan kegiatan alam bebas KPA EMC²."
			headerActions={
				<Link
					href="/admin/galleries/create"
					className="flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-800"
				>
					<Plus className="h-4 w-4" />
					<span>Buat Album Baru</span>
				</Link>
			}
		>
			<Head title="Manajemen Galeri" />

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
							placeholder="Cari judul album atau lokasi..."
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						/>
					</div>

					{/* Category Select */}
					<div className="w-full md:w-44">
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
					<div className="w-full md:w-44">
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

					{/* Submit & Reset */}
					<div className="flex items-center gap-2">
						<button
							type="submit"
							className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800"
						>
							<Filter className="h-3.5 w-3.5" />
							<span>Terapkan</span>
						</button>
						{(filters.search || filters.category_id || filters.division_id) && (
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

			{/* Albums Grid */}
			{galleries.data.length === 0 ? (
				<div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
						<Images className="h-6 w-6" />
					</div>
					<h4 className="mt-3 text-sm font-semibold text-slate-900">
						Belum ada album galeri
					</h4>
					<p className="mt-1 text-xs text-slate-500">
						Mulai unggah foto kegiatan atau sesuaikan filter pencarian di atas.
					</p>
					<div className="mt-4">
						<Link
							href="/admin/galleries/create"
							className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-800"
						>
							<Plus className="h-4 w-4" />
							<span>Buat Album Baru</span>
						</Link>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{galleries.data.map((gallery) => (
						<div
							key={gallery.id}
							className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md"
						>
							{/* Cover Thumbnail */}
							<div className="relative aspect-video w-full overflow-hidden bg-slate-100">
								{gallery.cover_url ? (
									<img
										src={gallery.cover_url}
										alt={gallery.title}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center text-slate-300">
										<ImageIcon className="h-8 w-8" />
									</div>
								)}
								<div className="absolute top-2 right-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
									{gallery.items_count || 0} Foto
								</div>
							</div>

							{/* Album Info */}
							<div className="flex flex-1 flex-col justify-between p-4">
								<div>
									<div className="flex items-center gap-1 text-[11px] text-purple-700 font-medium">
										<span>{gallery.category?.name || 'Dokumentasi'}</span>
										{gallery.division && <span>• {gallery.division.name}</span>}
									</div>
									<h4 className="mt-1 text-sm font-bold text-slate-900 line-clamp-1">
										{gallery.title}
									</h4>
									<div className="mt-2 space-y-1 text-[11px] text-slate-400">
										{gallery.event_date && (
											<div className="flex items-center gap-1">
												<Calendar className="h-3 w-3 text-slate-400" />
												<span>{new Date(gallery.event_date).toLocaleDateString('id-ID')}</span>
											</div>
										)}
										{gallery.location && (
											<div className="flex items-center gap-1 line-clamp-1">
												<MapPin className="h-3 w-3 text-slate-400 shrink-0" />
												<span>{gallery.location}</span>
											</div>
										)}
									</div>
								</div>

								{/* Actions */}
								<div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
									<span
										className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
											gallery.is_published
												? 'bg-emerald-50 text-emerald-700'
												: 'bg-slate-100 text-slate-600'
										}`}
									>
										{gallery.is_published ? 'Publik' : 'Draf'}
									</span>

									<div className="flex items-center gap-1">
										<Link
											href={`/admin/galleries/${gallery.id}/edit`}
											className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
										>
											<Edit className="h-4 w-4" />
										</Link>
										<button
											type="button"
											onClick={() => setDeleteModalGallery(gallery)}
											className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Pagination */}
			<div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
				<AdminPagination
					pagination={galleries}
					perPage={filters.per_page || 10}
					baseUrl="/admin/galleries"
					filters={{
						search: searchTerm || undefined,
						category_id: selectedCategory || undefined,
						division_id: selectedDivision || undefined,
					}}
					itemName="album galeri"
				/>
			</div>

			{/* Delete Modal */}
			{deleteModalGallery && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalGallery(null)}
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
							<Trash2 className="h-6 w-6" />
						</div>
						<h3 className="mt-4 text-lg font-bold text-slate-900">
							Hapus Album Galeri Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus album{' '}
							<span className="font-bold text-slate-900">"{deleteModalGallery.title}"</span>? Semua foto di dalam album ini juga akan dihapus.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalGallery(null)}
								className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleDeleteConfirm}
								className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
							>
								Ya, Hapus Album
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default GalleriesIndex;
