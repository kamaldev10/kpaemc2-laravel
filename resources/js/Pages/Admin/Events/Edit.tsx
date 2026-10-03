import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import RichTextEditor from '@/Components/Admin/Editor/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Event } from '@/types/event';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	ArrowLeft,
	Calendar,
	DollarSign,
	MapPin,
	Save,
	Tag,
	Trash2,
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

interface EditEventProps {
	event: Event & {
		can?: { update?: boolean; delete?: boolean };
	};
	categories: CategoryOption[];
	divisions: DivisionOption[];
}

interface EventFormData {
	title: string;
	slug: string;
	category_id: string;
	division_id: string;
	type: string;
	description: string;
	location: string;
	start_date: string;
	end_date: string;
	registration_open_at: string;
	registration_close_at: string;
	max_participants: string | number;
	requires_payment: boolean;
	payment_amount: string | number;
	tags: string[];
	cover_image: File | null;
	cover_url: string;
	is_published: boolean;
	is_active: boolean;
}

export const EditEvent: FC<EditEventProps> = ({ event, categories = [], divisions = [] }) => {
	const [tagInput, setTagInput] = useState('');
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Agenda & Kegiatan', href: '/admin/events' },
		{ label: 'Edit Kegiatan' },
	];

	// Format datetime for datetime-local inputs (YYYY-MM-DDTHH:mm)
	const formatDateTimeLocal = (dateStr?: string | null) => {
		if (!dateStr) return '';
		try {
			const d = new Date(dateStr);
			const pad = (num: number) => String(num).padStart(2, '0');
			return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
		} catch {
			return '';
		}
	};

	const form = useForm<EventFormData>({
		title: event.title || '',
		slug: event.slug || '',
		category_id: event.category_id || event.category?.id || '',
		division_id: event.division_id || event.division?.id || '',
		type: event.type || 'seminar',
		description: event.description || '',
		location: event.location || '',
		start_date: formatDateTimeLocal(event.start_date),
		end_date: formatDateTimeLocal(event.end_date),
		registration_open_at: formatDateTimeLocal(event.registration_open_at),
		registration_close_at: formatDateTimeLocal(event.registration_close_at),
		max_participants: event.max_participants || 50,
		requires_payment: Boolean(event.requires_payment),
		payment_amount: event.payment_amount || 0,
		tags: event.tags || ['kegiatan', 'emc2'],
		cover_image: null,
		cover_url: event.cover_url || '',
		is_published: Boolean(event.is_published),
		is_active: Boolean(event.is_active),
	});

	const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			const trimmed = tagInput.trim().replace(/^#/, '');
			if (trimmed && !form.data.tags.includes(trimmed)) {
				form.setData('tags', [...form.data.tags, trimmed]);
				setTagInput('');
			}
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		form.setData(
			'tags',
			form.data.tags.filter((t) => t !== tagToRemove)
		);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (form.data.cover_image) {
			router.post(`/admin/events/${event.id}`, {
				_method: 'PUT',
				...form.data,
			});
		} else {
			form.put(`/admin/events/${event.id}`);
		}
	};

	const handleDeleteConfirm = () => {
		router.delete(`/admin/events/${event.id}`, {
			onSuccess: () => setDeleteModalOpen(false),
		});
	};

	return (
		<AdminLayout
			title={`Edit Kegiatan: ${event.title}`}
			breadcrumbs={breadcrumbs}
			headerTitle="Edit Agenda Kegiatan"
			headerDescription={`Memperbarui informasi ${event.title}`}
			headerActions={
				<div className="flex items-center gap-2">
					<Link
						href={`/admin/events/${event.id}/registrations`}
						className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100"
					>
						<Users className="h-4 w-4" />
						<span>Lihat Pendaftar</span>
					</Link>
					<Link
						href="/admin/events"
						className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>Kembali ke Daftar</span>
					</Link>
				</div>
			}
		>
			<Head title={`Edit: ${event.title}`} />

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left 2 Columns: Main Details */}
					<div className="space-y-6 lg:col-span-2">
						{/* Title & Basic Info */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
							<div>
								<label htmlFor="title" className="block text-xs font-semibold text-slate-700">
									Judul Kegiatan <span className="text-rose-500">*</span>
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

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{/* Type */}
								<div>
									<label htmlFor="type" className="block text-xs font-semibold text-slate-700">
										Jenis / Tipe Kegiatan <span className="text-rose-500">*</span>
									</label>
									<select
										id="type"
										value={form.data.type}
										onChange={(e) => form.setData('type', e.target.value)}
										className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									>
										<option value="seminar">Seminar & Webinar</option>
										<option value="diksar">DIKSAR / Penerimaan Anggota</option>
										<option value="ekspedisi">Ekspedisi & Penjelajahan</option>
										<option value="workshop">Workshop & Pelatihan Teknis</option>
										<option value="conservation">Aksi Lingkungan & Konservasi</option>
										<option value="expo">Expo & Pameran</option>
										<option value="other">Kegiatan Lainnya</option>
									</select>
									{form.errors.type && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.type}</p>
									)}
								</div>

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
									{form.errors.location && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.location}</p>
									)}
								</div>
							</div>

							{/* Slug */}
							<div>
								<label htmlFor="slug" className="block text-xs font-semibold text-slate-700">
									Slug URL
								</label>
								<input
									type="text"
									id="slug"
									value={form.data.slug}
									onChange={(e) => form.setData('slug', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-700 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.slug && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.slug}</p>
								)}
							</div>
						</div>

						{/* Description Editor */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
							<label htmlFor="description" className="block text-xs font-semibold text-slate-700">
								Deskripsi & Detail Kegiatan (Markdown / HTML)
							</label>
							<RichTextEditor
								value={form.data.description}
								onChange={(val) => form.setData('description', val)}
								placeholder="Tuliskan latar belakang, tujuan kegiatan, rute, syarat peserta, dan informasi penting lainnya..."
								minHeight="320px"
							/>
							{form.errors.description && (
								<p className="text-xs text-rose-600">{form.errors.description}</p>
							)}
						</div>

						{/* Cover Image */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
							<ImageUploader
								currentImageUrl={event.cover_url}
								onFileSelect={(file) => form.setData('cover_image', file)}
								imageUrlValue={form.data.cover_url}
								onImageUrlChange={(url) => form.setData('cover_url', url)}
								error={form.errors.cover_image || form.errors.cover_url}
								label="Poster / Gambar Sampul Kegiatan"
							/>
						</div>

						{/* Tags */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
							<label htmlFor="tags" className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
								<Tag className="h-3.5 w-3.5 text-purple-600" />
								<span>Tag & Topik Kegiatan</span>
							</label>
							<div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 p-2.5 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
								{form.data.tags.map((t) => (
									<span
										key={t}
										className="inline-flex items-center gap-1 rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800"
									>
										<span>#{t}</span>
										<button
											type="button"
											onClick={() => handleRemoveTag(t)}
											className="rounded hover:text-rose-600"
										>
											<X className="h-3 w-3" />
										</button>
									</span>
								))}
								<input
									type="text"
									id="tags"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyDown={handleAddTag}
									placeholder="Ketik tag lalu tekan Enter..."
									className="flex-1 min-w-[120px] border-0 p-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
								/>
							</div>
						</div>
					</div>

					{/* Right 1 Column: Schedule & Registration Settings */}
					<div className="space-y-6">
						{/* Schedule & Category Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
							<h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
								<Calendar className="h-4 w-4 text-purple-600" />
								<span>Jadwal & Kategori</span>
							</h3>

							{/* Category */}
							<div>
								<label htmlFor="category_id" className="block text-xs font-semibold text-slate-700">
									Kategori
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
								{form.errors.category_id && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.category_id}</p>
								)}
							</div>

							{/* Division */}
							<div>
								<label htmlFor="division_id" className="block text-xs font-semibold text-slate-700">
									Divisi Penyelenggara
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
								{form.errors.division_id && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.division_id}</p>
								)}
							</div>

							{/* Start Date */}
							<div>
								<label htmlFor="start_date" className="block text-xs font-semibold text-slate-700">
									Tanggal & Waktu Mulai <span className="text-rose-500">*</span>
								</label>
								<input
									type="datetime-local"
									id="start_date"
									value={form.data.start_date}
									onChange={(e) => form.setData('start_date', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									required
								/>
								{form.errors.start_date && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.start_date}</p>
								)}
							</div>

							{/* End Date */}
							<div>
								<label htmlFor="end_date" className="block text-xs font-semibold text-slate-700">
									Tanggal & Waktu Selesai
								</label>
								<input
									type="datetime-local"
									id="end_date"
									value={form.data.end_date}
									onChange={(e) => form.setData('end_date', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.end_date && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.end_date}</p>
								)}
							</div>
						</div>

						{/* Registration Setup Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
							<h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
								<Users className="h-4 w-4 text-purple-600" />
								<span>Pengaturan Pendaftaran Peserta</span>
							</h3>

							{/* Open Registration Date */}
							<div>
								<label htmlFor="registration_open_at" className="block text-xs font-semibold text-slate-700">
									Buka Pendaftaran
								</label>
								<input
									type="datetime-local"
									id="registration_open_at"
									value={form.data.registration_open_at}
									onChange={(e) => form.setData('registration_open_at', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.registration_open_at && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.registration_open_at}</p>
								)}
							</div>

							{/* Close Registration Date */}
							<div>
								<label htmlFor="registration_close_at" className="block text-xs font-semibold text-slate-700">
									Tutup Pendaftaran
								</label>
								<input
									type="datetime-local"
									id="registration_close_at"
									value={form.data.registration_close_at}
									onChange={(e) => form.setData('registration_close_at', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.registration_close_at && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.registration_close_at}</p>
								)}
							</div>

							{/* Quota */}
							<div>
								<label htmlFor="max_participants" className="block text-xs font-semibold text-slate-700">
									Kuota Maksimal Peserta
								</label>
								<input
									type="number"
									id="max_participants"
									value={form.data.max_participants}
									onChange={(e) => form.setData('max_participants', e.target.value)}
									min={1}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.max_participants && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.max_participants}</p>
								)}
							</div>

							{/* Payment Required Toggle */}
							<div className="pt-2 border-t border-slate-100 space-y-3">
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={form.data.requires_payment}
										onChange={(e) => form.setData('requires_payment', e.target.checked)}
										className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
									/>
									<div>
										<span className="text-xs font-semibold text-slate-800">
											Pendaftaran Berbayar (HTM)
										</span>
										<p className="text-[11px] text-slate-400">
											Peserta diwajibkan mengunggah bukti pembayaran.
										</p>
									</div>
								</label>

								{form.data.requires_payment && (
									<div>
										<label htmlFor="payment_amount" className="block text-xs font-semibold text-slate-700">
											Nominal Biaya Pendaftaran (Rp)
										</label>
										<div className="mt-1.5 flex rounded-xl border border-slate-200 bg-slate-50 shadow-xs focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
											<span className="inline-flex items-center rounded-l-xl px-3 text-xs font-semibold text-slate-500">
												Rp
											</span>
											<input
												type="number"
												id="payment_amount"
												value={form.data.payment_amount}
												onChange={(e) => form.setData('payment_amount', e.target.value)}
												min={0}
												className="w-full border-0 bg-transparent px-2 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
											/>
										</div>
										{form.errors.payment_amount && (
											<p className="mt-1 text-xs text-rose-600">{form.errors.payment_amount}</p>
										)}
									</div>
								)}
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
											Terbitkan Kegiatan Ini
										</span>
										<p className="text-[11px] text-slate-400">
											Dapat dilihat langsung pada website publik.
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
									<span>{form.processing ? 'Menyimpan...' : 'Perbarui Kegiatan'}</span>
								</button>

								{event.can?.delete !== false && (
									<button
										type="button"
										onClick={() => setDeleteModalOpen(true)}
										className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
									>
										<Trash2 className="h-4 w-4" />
										<span>Hapus Kegiatan Ini</span>
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
							Hapus Kegiatan Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus agenda kegiatan{' '}
							<span className="font-bold text-slate-900">"{event.title}"</span>? Tindakan ini akan menghapus data kegiatan dan arsip pendaftaran terkait.
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
								Ya, Hapus Kegiatan
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default EditEvent;
