import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import {
	ArrowLeft,
	Calendar,
	Image as ImageIcon,
	Images,
	MapPin,
	Plus,
	Save,
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

interface CreateGalleryProps {
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
	is_published: boolean;
	is_active: boolean;
	sort_order: number;
}

export const CreateGallery: FC<CreateGalleryProps> = ({
	categories = [],
	divisions = [],
}) => {
	const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Galeri & Dokumentasi', href: '/admin/galleries' },
		{ label: 'Buat Album' },
	];

	const form = useForm<GalleryFormData>({
		title: '',
		description: '',
		category_id: categories[0]?.id || '',
		division_id: '',
		event_date: new Date().toISOString().split('T')[0],
		location: '',
		cover_image: null,
		cover_url: '',
		photos: [],
		is_published: true,
		is_active: true,
		sort_order: 0,
	});

	const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			const updatedPhotos = [...form.data.photos, ...files];
			form.setData('photos', updatedPhotos);

			const newPreviews = files.map((file) => URL.createObjectURL(file));
			setPhotoPreviews([...photoPreviews, ...newPreviews]);
		}
	};

	const handleRemovePhoto = (index: number) => {
		const updatedPhotos = form.data.photos.filter((_, i) => i !== index);
		form.setData('photos', updatedPhotos);

		const updatedPreviews = photoPreviews.filter((_, i) => i !== index);
		setPhotoPreviews(updatedPreviews);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		form.post('/admin/galleries');
	};

	return (
		<AdminLayout
			title="Buat Album Galeri Baru"
			breadcrumbs={breadcrumbs}
			headerTitle="Buat Album Galeri Baru"
			headerDescription="Unggah dokumentasi foto kegiatan, ekspedisi alam, atau diksar ke Cloudinary."
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
			<Head title="Buat Album Galeri" />

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
									placeholder="Contoh: Ekspedisi Pendakian Gunung Kerinci 2026"
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
									placeholder="Ceritakan momen, rute, atau suasana kegiatan pada dokumentasi ini..."
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
											placeholder="Taman Nasional Kerinci Seblat"
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

						{/* Multi-Photo Uploader */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
							<div className="flex items-center justify-between border-b border-slate-100 pb-3">
								<h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
									<Images className="h-4 w-4 text-purple-600" />
									<span>Unggah Foto-foto Dokumentasi</span>
								</h4>
								<span className="text-xs text-slate-400">
									{form.data.photos.length} foto dipilih
								</span>
							</div>

							{/* Dropzone */}
							<div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/40 p-6 text-center hover:bg-purple-50/60 transition-colors">
								<input
									type="file"
									multiple
									accept="image/png,image/jpeg,image/webp,image/jpg"
									onChange={handlePhotosChange}
									className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
								/>
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
									<Upload className="h-6 w-6" />
								</div>
								<p className="mt-3 text-xs font-semibold text-slate-800">
									<span className="text-purple-700">Pilih banyak foto</span> atau seret file ke area ini
								</p>
								<p className="mt-1 text-[11px] text-slate-400">
									PNG, JPG, WEBP hingga 5MB per gambar
								</p>
							</div>

							{/* Previews Grid */}
							{photoPreviews.length > 0 && (
								<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
									{photoPreviews.map((preview, idx) => (
										<div
											key={idx}
											className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs"
										>
											<img
												src={preview}
												alt={`Preview ${idx + 1}`}
												className="h-full w-full object-cover"
											/>
											<button
												type="button"
												onClick={() => handleRemovePhoto(idx)}
												className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
											>
												<X className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Cover Image Custom */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
							<ImageUploader
								onFileSelect={(file) => form.setData('cover_image', file)}
								imageUrlValue={form.data.cover_url}
								onImageUrlChange={(url) => form.setData('cover_url', url)}
								label="Foto Sampul Album (Opsional, otomatis dari foto pertama jika kosong)"
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

							{/* Submit */}
							<div className="pt-4 border-t border-slate-100">
								<button
									type="submit"
									disabled={form.processing}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800 disabled:opacity-50"
								>
									<Save className="h-4 w-4" />
									<span>{form.processing ? 'Mengunggah...' : 'Simpan Album'}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</AdminLayout>
	);
};

export default CreateGallery;
