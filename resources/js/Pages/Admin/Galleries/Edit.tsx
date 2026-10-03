import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	ArrowLeft,
	Calendar,
	Image as ImageIcon,
	Images,
	MapPin,
	Plus,
	Save,
	Trash2,
	Upload,
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

interface GalleryPhotoItem {
	id: string;
	url: string;
	caption?: string | null;
	sort_order?: number;
}

interface EditGalleryProps {
	gallery: {
		id: string;
		title: string;
		description?: string | null;
		category_id?: string | null;
		division_id?: string | null;
		event_date?: string | null;
		location?: string | null;
		cover_url?: string | null;
		is_published: boolean;
		is_active: boolean;
		sort_order: number;
		items?: GalleryPhotoItem[];
		can?: { update?: boolean; delete?: boolean };
	};
	categories: CategoryOption[];
	divisions: DivisionOption[];
}

interface GalleryFormData {
	title: string;
	description: string;
	category_id: string;
	division_id: string;
	event_date: string;
	location: string;
	cover_image: File | null;
	cover_url: string;
	photos: File[];
	deleted_item_ids: string[];
	is_published: boolean;
	is_active: boolean;
	sort_order: number;
}

export const EditGallery: FC<EditGalleryProps> = ({
	gallery,
	categories = [],
	divisions = [],
}) => {
	const [existingItems, setExistingItems] = useState<GalleryPhotoItem[]>(gallery.items || []);
	const [newPhotoPreviews, setNewPhotoPreviews] = useState<string[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Galeri & Dokumentasi', href: '/admin/galleries' },
		{ label: 'Edit Album' },
	];

	const form = useForm<GalleryFormData>({
		title: gallery.title || '',
		description: gallery.description || '',
		category_id: gallery.category_id || '',
		division_id: gallery.division_id || '',
		event_date: gallery.event_date || '',
		location: gallery.location || '',
		cover_image: null,
		cover_url: gallery.cover_url || '',
		photos: [],
		deleted_item_ids: [],
		is_published: Boolean(gallery.is_published),
		is_active: Boolean(gallery.is_active),
		sort_order: gallery.sort_order || 0,
	});

	const handleNewPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			const updatedPhotos = [...form.data.photos, ...files];
			form.setData('photos', updatedPhotos);

			const newPreviews = files.map((file) => URL.createObjectURL(file));
			setNewPhotoPreviews([...newPhotoPreviews, ...newPreviews]);
		}
	};

	const handleRemoveNewPhoto = (index: number) => {
		const updatedPhotos = form.data.photos.filter((_, i) => i !== index);
		form.setData('photos', updatedPhotos);

		const updatedPreviews = newPhotoPreviews.filter((_, i) => i !== index);
		setNewPhotoPreviews(updatedPreviews);
	};

	const handleDeleteExistingItem = (itemId: string) => {
		const updatedDeleted = [...form.data.deleted_item_ids, itemId];
		form.setData('deleted_item_ids', updatedDeleted);
		setExistingItems(existingItems.filter((item) => item.id !== itemId));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (form.data.cover_image || form.data.photos.length > 0) {
			router.post(`/admin/galleries/${gallery.id}`, {
				_method: 'PUT',
				...form.data,
			});
		} else {
			form.put(`/admin/galleries/${gallery.id}`);
		}
	};

	const handleDeleteConfirm = () => {
		router.delete(`/admin/galleries/${gallery.id}`, {
			onSuccess: () => setDeleteModalOpen(false),
		});
	};

	return (
		<AdminLayout
			title={`Edit Album: ${gallery.title}`}
			breadcrumbs={breadcrumbs}
			headerTitle="Edit Album Galeri"
			headerDescription={`Memperbarui foto dan informasi album "${gallery.title}"`}
			headerActions={
				<Link
					href="/admin/galleries"
					className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Kembali ke Galeri</span>
				</Link>
			}
		>
			<Head title={`Edit: ${gallery.title}`} />

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left 2 Columns */}
					<div className="space-y-6 lg:col-span-2">
						{/* Basic Info */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
							<div>
								<label htmlFor="title" className="block text-xs font-semibold text-slate-700">
									Nama / Judul Album <span className="text-rose-500">*</span>
								</label>
								<input
									type="text"
									id="title"
									value={form.data.title}
									onChange={(e) => form.setData('title', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									required
								/>
								{form.errors.title && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.title}</p>
								)}
							</div>

							<div>
								<label htmlFor="description" className="block text-xs font-semibold text-slate-700">
									Deskripsi / Catatan Dokumentasi
								</label>
								<textarea
									id="description"
									rows={3}
									value={form.data.description}
									onChange={(e) => form.setData('description', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Location */}
								<div>
									<label htmlFor="location" className="block text-xs font-semibold text-slate-700">
										Lokasi Kegiatan
									</label>
									<div className="mt-1.5 flex rounded-xl border border-slate-200 bg-slate-50 shadow-xs focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
										<span className="inline-flex items-center rounded-l-xl px-3 text-xs text-slate-400">
											<MapPin className="h-3.5 w-3.5" />
										</span>
										<input
											type="text"
											id="location"
											value={form.data.location}
											onChange={(e) => form.setData('location', e.target.value)}
											className="w-full border-0 bg-transparent px-2 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
										/>
									</div>
								</div>

								{/* Event Date */}
								<div>
									<label htmlFor="event_date" className="block text-xs font-semibold text-slate-700">
										Tanggal Kegiatan
									</label>
									<input
										type="date"
										id="event_date"
										value={form.data.event_date}
										onChange={(e) => form.setData('event_date', e.target.value)}
										className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
								</div>
							</div>
						</div>

						{/* Existing Photos Grid */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
							<div className="flex items-center justify-between border-b border-slate-100 pb-3">
								<h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
									<Images className="h-4 w-4 text-purple-600" />
									<span>Foto dalam Album ({existingItems.length})</span>
								</h4>
								{form.data.deleted_item_ids.length > 0 && (
									<span className="text-xs text-rose-600 font-medium">
										{form.data.deleted_item_ids.length} foto akan dihapus saat disimpan
									</span>
								)}
							</div>

							{existingItems.length === 0 ? (
								<p className="text-xs text-slate-400 italic">
									Belum ada foto dalam album ini atau semua foto ditandai hapus.
								</p>
							) : (
								<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
									{existingItems.map((item) => (
										<div
											key={item.id}
											className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs"
										>
											<img
												src={item.url}
												alt="Foto Galeri"
												className="h-full w-full object-cover"
											/>
											<button
												type="button"
												onClick={() => handleDeleteExistingItem(item.id)}
												title="Hapus foto ini dari album"
												className="absolute top-1.5 right-1.5 rounded-full bg-rose-600/90 p-1 text-white backdrop-blur-xs hover:bg-rose-700 transition-colors"
											>
												<X className="h-3.5 w-3.5" />
											</button>
										</div>
									))}
								</div>
							)}

							{/* Add More Photos */}
							<div className="pt-4 border-t border-slate-100">
								<label className="block text-xs font-semibold text-slate-700 mb-2">
									Tambah Foto Baru ke Album Ini
								</label>
								<div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/40 p-4 text-center hover:bg-purple-50/60 transition-colors">
									<input
										type="file"
										multiple
										accept="image/png,image/jpeg,image/webp,image/jpg"
										onChange={handleNewPhotosChange}
										className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
									/>
									<div className="flex items-center gap-2 text-xs font-semibold text-purple-700">
										<Upload className="h-4 w-4" />
										<span>Pilih Foto Tambahan (Bisa Banyak)</span>
									</div>
								</div>

								{/* New Previews Grid */}
								{newPhotoPreviews.length > 0 && (
									<div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
										{newPhotoPreviews.map((preview, idx) => (
											<div
												key={idx}
												className="group relative aspect-square overflow-hidden rounded-xl border-2 border-purple-400 bg-slate-100 shadow-xs"
											>
												<img
													src={preview}
													alt={`New Preview ${idx + 1}`}
													className="h-full w-full object-cover"
												/>
												<button
													type="button"
													onClick={() => handleRemoveNewPhoto(idx)}
													className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white backdrop-blur-xs hover:bg-rose-600"
												>
													<X className="h-3 w-3" />
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Cover Image Custom */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
							<ImageUploader
								currentImageUrl={gallery.cover_url}
								onFileSelect={(file) => form.setData('cover_image', file)}
								imageUrlValue={form.data.cover_url}
								onImageUrlChange={(url) => form.setData('cover_url', url)}
								label="Ganti Foto Sampul Album"
							/>
						</div>
					</div>

					{/* Right 1 Column */}
					<div className="space-y-6">
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
							<h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
								Pengaturan Album
							</h4>

							{/* Category */}
							<div>
								<label htmlFor="category_id" className="block text-xs font-semibold text-slate-700">
									Kategori Galeri
								</label>
								<select
									id="category_id"
									value={form.data.category_id}
									onChange={(e) => form.setData('category_id', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="">-- Tanpa Kategori Khusus --</option>
									{categories.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.name}
										</option>
									))}
								</select>
							</div>

							{/* Division */}
							<div>
								<label htmlFor="division_id" className="block text-xs font-semibold text-slate-700">
									Divisi Terkait
								</label>
								<select
									id="division_id"
									value={form.data.division_id}
									onChange={(e) => form.setData('division_id', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="">-- Seluruh Organisasi --</option>
									{divisions.map((div) => (
										<option key={div.id} value={div.id}>
											{div.name}
										</option>
									))}
								</select>
							</div>

							{/* Published Toggle */}
							<div className="pt-2 border-t border-slate-100">
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={form.data.is_published}
										onChange={(e) => form.setData('is_published', e.target.checked)}
										className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
									/>
									<div>
										<span className="text-xs font-semibold text-slate-800">
											Terbitkan Album Ini
										</span>
										<p className="text-[11px] text-slate-400">
											Dapat dilihat langsung pada galeri publik.
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
									<span>{form.processing ? 'Menyimpan...' : 'Perbarui Album'}</span>
								</button>

								<button
									type="button"
									onClick={() => setDeleteModalOpen(true)}
									className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
								>
									<Trash2 className="h-4 w-4" />
									<span>Hapus Album Ini</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>

			{/* Delete Modal */}
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
							Hapus Album Galeri Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus album{' '}
							<span className="font-bold text-slate-900">"{gallery.title}"</span>? Semua foto di dalam album ini juga akan dihapus.
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
								Ya, Hapus Album
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default EditGallery;
