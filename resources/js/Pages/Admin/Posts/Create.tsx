import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import RichTextEditor from '@/Components/Admin/Editor/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
	ArrowLeft,
	Calendar,
	Check,
	CheckCircle,
	FileText,
	Globe,
	Lock,
	Save,
	Sparkles,
	Tag,
	X,
} from 'lucide-react';
import { FC, FormEvent, KeyboardEvent, useState } from 'react';

interface CategoryOption {
	id: string;
	name: string;
	slug: string;
	color?: string;
}

interface DivisionOption {
	id: string;
	name: string;
	slug: string;
}

interface CreatePostProps {
	categories: CategoryOption[];
	divisions: DivisionOption[];
}

export const CreatePost: FC<CreatePostProps> = ({
	categories = [],
	divisions = [],
}) => {
	const { auth } = usePage<PageProps>().props;
	const [tagInput, setTagInput] = useState('');
	const [isAutoSlug, setIsAutoSlug] = useState(true);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Artikel & Berita', href: '/admin/posts' },
		{ label: 'Tulis Artikel' },
	];

	const form = useForm({
		title: '',
		slug: '',
		category_id: categories[0]?.id || '',
		division_id: '',
		excerpt: '',
		content: '',
		content_source: '',
		cover_image: null as File | null,
		cover_image_url: '',
		cover_image_source: '',
		author_name: auth.user.name || '',
		tags: [] as string[],
		is_featured: false,
		is_published: true,
		published_at: '',
	});

	const slugify = (text: string) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w\-]+/g, '')
			.replace(/\-\-+/g, '-');
	};

	const handleTitleChange = (val: string) => {
		form.setData((prev) => ({
			...prev,
			title: val,
			slug: isAutoSlug ? slugify(val) : prev.slug,
		}));
	};

	const handleAddTag = () => {
		const trimmed = tagInput.trim().replace(/^#/, '');
		if (trimmed && !form.data.tags.includes(trimmed)) {
			form.setData('tags', [...form.data.tags, trimmed]);
			setTagInput('');
		}
	};

	const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		form.setData(
			'tags',
			form.data.tags.filter((t) => t !== tagToRemove)
		);
	};

	const handleSubmit = (e: FormEvent, publishState: boolean) => {
		e.preventDefault();
		form.transform((data) => ({
			...data,
			is_published: publishState,
		}));
		form.post('/admin/posts');
	};

	return (
		<AdminLayout
			title="Tulis Artikel Baru"
			breadcrumbs={breadcrumbs}
			headerTitle="Tulis Artikel Baru"
			headerDescription="Buat tulisan baru untuk diterbitkan di portal website KPA EMC²."
			headerActions={
				<Link
					href="/admin/posts"
					className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Kembali ke Daftar</span>
				</Link>
			}
		>
			<Head title="Tulis Artikel Baru" />

			<form onSubmit={(e) => handleSubmit(e, form.data.is_published)}>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left 2 Columns: Main Content Inputs */}
					<div className="space-y-6 lg:col-span-2">
						{/* Title & Slug Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
							<div>
								<label
									htmlFor="title"
									className="block text-sm font-bold text-slate-800"
								>
									Judul Artikel <span className="text-rose-500">*</span>
								</label>
								<input
									type="text"
									id="title"
									value={form.data.title}
									onChange={(e) => handleTitleChange(e.target.value)}
									placeholder="Contoh: Ekspedisi Menyusuri Gunung Leuser..."
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-base font-semibold text-slate-900 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									required
								/>
								{form.errors.title && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.title}</p>
								)}
							</div>

							{/* URL Slug */}
							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="slug"
										className="block text-xs font-semibold text-slate-600"
									>
										Slug URL
									</label>
									<button
										type="button"
										onClick={() => setIsAutoSlug(!isAutoSlug)}
										className="text-[11px] font-medium text-purple-700 hover:underline"
									>
										{isAutoSlug ? 'Ubah Manual' : 'Otomatis dari Judul'}
									</button>
								</div>
								<div className="mt-1.5 flex rounded-xl border border-slate-200 bg-slate-50 shadow-xs focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
									<span className="inline-flex items-center rounded-l-xl px-3 text-xs text-slate-400">
										/posts/
									</span>
									<input
										type="text"
										id="slug"
										value={form.data.slug}
										onChange={(e) => {
											setIsAutoSlug(false);
											form.setData('slug', e.target.value);
										}}
										placeholder="ekspedisi-menyusuri-gunung-leuser"
										className="w-full border-0 bg-transparent px-2 py-2 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-0"
									/>
								</div>
								{form.errors.slug && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.slug}</p>
								)}
							</div>

							{/* Excerpt */}
							<div>
								<label
									htmlFor="excerpt"
									className="block text-xs font-semibold text-slate-600"
								>
									Kutipan / Ringkasan Singkat (Opsional)
								</label>
								<textarea
									id="excerpt"
									rows={2}
									value={form.data.excerpt}
									onChange={(e) => form.setData('excerpt', e.target.value)}
									placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu artikel di halaman depan..."
									className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								<p className="mt-1 text-[11px] text-slate-400">
									Jika dikosongkan, ringkasan akan otomatis diambil dari paragraf pertama isi artikel.
								</p>
								{form.errors.excerpt && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.excerpt}</p>
								)}
							</div>
						</div>

						{/* Content Rich Text Editor */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
							<label
								htmlFor="content"
								className="block text-sm font-bold text-slate-800"
							>
								Isi Konten Artikel <span className="text-rose-500">*</span>
							</label>
							<RichTextEditor
								id="content"
								value={form.data.content}
								onChange={(val) => form.setData('content', val)}
								error={form.errors.content}
								minHeight="380px"
							/>
							{form.errors.content && (
								<p className="mt-1 text-xs text-rose-600">{form.errors.content}</p>
							)}
						</div>

						{/* Cover Image Uploader */}
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
							<ImageUploader
								onFileSelect={(file) => form.setData('cover_image', file)}
								imageUrlValue={form.data.cover_image_url}
								onImageUrlChange={(url) => form.setData('cover_image_url', url)}
								error={form.errors.cover_image || form.errors.cover_image_url}
							/>

							{/* Cover Image Source/Credit */}
							<div className="mt-4">
								<label
									htmlFor="cover_image_source"
									className="block text-xs font-semibold text-slate-600"
								>
									Kredit / Sumber Gambar (Opsional)
								</label>
								<input
									type="text"
									id="cover_image_source"
									value={form.data.cover_image_source}
									onChange={(e) => form.setData('cover_image_source', e.target.value)}
									placeholder="Contoh: Dokumentasi KPA EMC² / Foto oleh Ahmad"
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
							</div>
						</div>
					</div>

					{/* Right 1 Column: Publishing Metadata & Settings */}
					<div className="space-y-6">
						{/* Publish Actions Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
							<h3 className="text-sm font-bold text-slate-800">
								Publikasi & Visibilitas
							</h3>

							<div className="space-y-3 pt-1">
								{/* Publish Status Toggle */}
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={form.data.is_published}
										onChange={(e) => form.setData('is_published', e.target.checked)}
										className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
									/>
									<div>
										<span className="text-xs font-semibold text-slate-800">
											Terbitkan Langsung ke Publik
										</span>
										<p className="text-[11px] text-slate-400">
											Jika tidak dicentang, artikel akan tersimpan sebagai draf.
										</p>
									</div>
								</label>

								{/* Featured Article Toggle */}
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={form.data.is_featured}
										onChange={(e) => form.setData('is_featured', e.target.checked)}
										className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
									/>
									<div>
										<span className="text-xs font-semibold text-slate-800">
											Jadikan Artikel Unggulan
										</span>
										<p className="text-[11px] text-slate-400">
											Ditampilkan di banner utama / sorotan halaman depan.
										</p>
									</div>
								</label>
							</div>

							{/* Action Buttons */}
							<div className="pt-2 border-t border-slate-100 space-y-2">
								<button
									type="button"
									disabled={form.processing}
									onClick={(e) => handleSubmit(e, true)}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800 disabled:opacity-50"
								>
									<Globe className="h-4 w-4" />
									<span>{form.processing ? 'Menyimpan...' : 'Terbitkan Sekarang'}</span>
								</button>

								<button
									type="button"
									disabled={form.processing}
									onClick={(e) => handleSubmit(e, false)}
									className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
								>
									<Save className="h-4 w-4" />
									<span>Simpan sebagai Draf</span>
								</button>
							</div>
						</div>

						{/* Organization Categorization Card */}
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
							<h3 className="text-sm font-bold text-slate-800">
								Kategori & Pengorganisasian
							</h3>

							{/* Category select */}
							<div>
								<label
									htmlFor="category_id"
									className="block text-xs font-semibold text-slate-600"
								>
									Kategori Artikel
								</label>
								<select
									id="category_id"
									value={form.data.category_id}
									onChange={(e) => form.setData('category_id', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								>
									<option value="">-- Pilih Kategori --</option>
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

							{/* Division select */}
							<div>
								<label
									htmlFor="division_id"
									className="block text-xs font-semibold text-slate-600"
								>
									Divisi Terkait (Opsional)
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

							{/* Author Name */}
							<div>
								<label
									htmlFor="author_name"
									className="block text-xs font-semibold text-slate-600"
								>
									Nama Penulis
								</label>
								<input
									type="text"
									id="author_name"
									value={form.data.author_name}
									onChange={(e) => form.setData('author_name', e.target.value)}
									placeholder="Nama pengurus / penulis"
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
								/>
								{form.errors.author_name && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.author_name}</p>
								)}
							</div>

							{/* Tags Input */}
							<div>
								<label
									htmlFor="tag_input"
									className="block text-xs font-semibold text-slate-600"
								>
									Label / Tags (Tekan Enter)
								</label>
								<div className="mt-1.5 flex gap-2">
									<input
										type="text"
										id="tag_input"
										value={tagInput}
										onChange={(e) => setTagInput(e.target.value)}
										onKeyDown={handleTagKeyDown}
										placeholder="tambah label..."
										className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									/>
									<button
										type="button"
										onClick={handleAddTag}
										className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
									>
										Tambah
									</button>
								</div>

								{/* Tag Pills List */}
								{form.data.tags.length > 0 && (
									<div className="mt-2.5 flex flex-wrap gap-1.5">
										{form.data.tags.map((tag) => (
											<span
												key={tag}
												className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-medium text-purple-800 ring-1 ring-purple-200"
											>
												<Tag className="h-3 w-3 text-purple-500" />
												<span>{tag}</span>
												<button
													type="button"
													onClick={() => handleRemoveTag(tag)}
													className="rounded-full p-0.5 hover:bg-purple-200"
												>
													<X className="h-3 w-3" />
												</button>
											</span>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</form>
		</AdminLayout>
	);
};

export default CreatePost;
