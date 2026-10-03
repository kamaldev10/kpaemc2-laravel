import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import RichTextEditor from '@/Components/Admin/Editor/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import {
	ArrowLeft,
	Calendar,
	DollarSign,
	Globe,
	MapPin,
	Plus,
	Save,
	Tag,
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

interface CreateEventProps {
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

export const CreateEvent: FC<CreateEventProps> = ({ categories = [], divisions = [] }) => {
	const [tagInput, setTagInput] = useState('');

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Agenda & Kegiatan', href: '/admin/events' },
		{ label: 'Tambah Kegiatan' },
	];

	const form = useForm<EventFormData>({
		title: '',
		slug: '',
		category_id: categories[0]?.id || '',
		division_id: '',
		type: 'seminar',
		description: '',
		location: '',
		start_date: '',
		end_date: '',
		registration_open_at: '',
		registration_close_at: '',
		max_participants: 50,
		requires_payment: false,
		payment_amount: 0,
		tags: ['kegiatan', 'emc2'],
		cover_image: null,
		cover_url: '',
		is_published: true,
		is_active: true,
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
		form.post('/admin/events');
	};

	return (
		<AdminLayout
			title="Tambah Kegiatan Baru"
			breadcrumbs={breadcrumbs}
			headerTitle="Tambah Kegiatan Baru"
			headerDescription="Publikasikan agenda ekspedisi, seminar, diksar, atau aksi lingkungan KPA EMC²."
			headerActions={
				<Link
					href="/admin/events"
					className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Kembali ke Daftar</span>
				</Link>
			}
		>
			<Head title="Tambah Kegiatan Baru" />

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
									placeholder="Contoh: Pendidikan dan Latihan Dasar (DIKSAR) Angkatan XXX"
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
											placeholder="Contoh: Gedung Aula FMIPA UNRI / Gunung Marapi"
											className="w-full border-0 bg-transparent px-2 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
										/>
									</div>
									{form.errors.location && (
										<p className="mt-1 text-xs text-rose-600">{form.errors.location}</p>
									)}
								</div>
							</div>

							{/* Custom Slug Override */}
							<div>
								<label htmlFor="slug" className="block text-xs font-semibold text-slate-700">
									Slug URL (Opsional / Otomatis)
								</label>
								<input
									type="text"
									id="slug"
									value={form.data.slug}
									onChange={(e) => form.setData('slug', e.target.value)}
									placeholder="diksar-angkatan-xxx (biarkan kosong untuk auto-generate)"
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
									placeholder="Contoh: 50"
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
												placeholder="50000"
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

							{/* Submit Button */}
							<div className="pt-4 border-t border-slate-100">
								<button
									type="submit"
									disabled={form.processing}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800 disabled:opacity-50"
								>
									<Save className="h-4 w-4" />
									<span>{form.processing ? 'Menyimpan...' : 'Simpan & Publikasikan'}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</AdminLayout>
	);
};

export default CreateEvent;
