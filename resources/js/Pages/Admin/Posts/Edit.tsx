import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import RichTextEditor from '@/Components/Admin/Editor/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { Post } from '@/types/post';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
	ArrowLeft,
	ExternalLink,
	Globe,
	Save,
	Tag,
	Trash2,
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

interface EditPostProps {
	post: Post & {
		can?: { update?: boolean; delete?: boolean };
		category_id?: string;
		division_id?: string;
	};
	categories: CategoryOption[];
	divisions: DivisionOption[];
}

interface PostFormData {
	title: string;
	slug: string;
	category_id: string;
	division_id: string;
	excerpt: string;
	content: string;
	content_source: string;
	cover_image: File | null;
	cover_image_url: string;
	cover_image_source: string;
	author_name: string;
	tags: string[];
	is_featured: boolean;
	is_published: boolean;
	published_at: string;
}

export const EditPost: FC<EditPostProps> = ({
	post,
	categories = [],
	divisions = [],
}) => {
	const [tagInput, setTagInput] = useState('');
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Artikel & Berita', href: '/admin/posts' },
		{ label: 'Edit Artikel' },
	];

	const form = useForm<PostFormData>({
		title: post.title || '',
		slug: post.slug || '',
		category_id: post.category_id || post.category?.id || '',
		division_id: post.division_id || '',
		excerpt: post.excerpt || '',
		content: post.content || '',
		content_source: post.content_source || '',
		cover_image: null,
		cover_image_url: post.cover_image_url || '',
		cover_image_source: post.cover_image_source || '',
		author_name: post.author_name || '',
		tags: post.tags || [],
		is_featured: Boolean(post.is_featured),
		is_published: Boolean(post.is_published),
		published_at: post.published_at || '',
	});

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

	const handleSubmit = (e: FormEvent, publishState?: boolean) => {
		e.preventDefault();
		const nextPublished =
			typeof publishState === 'boolean'
				? publishState
				: form.data.is_published;

		if (form.data.cover_image) {
			router.post(`/admin/posts/${post.id}`, {
				_method: 'PUT',
				...form.data,
				is_published: nextPublished,
			});
		} else {
			form.transform((data) => ({
				...data,
				is_published: nextPublished,
			}));
			form.put(`/admin/posts/${post.id}`);
		}
	};

	const handleDeleteConfirm = () => {
		router.delete(`/admin/posts/${post.id}`, {
			onSuccess: () => setDeleteModalOpen(false),
		});
	};

	return (
		<AdminLayout
			title={`Edit: ${post.title}`}
			breadcrumbs={breadcrumbs}
			headerTitle="Edit Artikel"
			headerDescription={`Memperbarui konten artikel "${post.title}"`}
			headerActions={
				<div className="flex items-center gap-2">
					<a
						href={`/posts/${post.slug}`}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
					>
						<ExternalLink className="h-4 w-4 text-slate-500" />
						<span>Lihat di Web</span>
					</a>
					<Link
						href="/admin/posts"
						className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>Kembali</span>
					</Link>
				</div>
			}
		>
			<Head title={`Edit: ${post.title}`} />

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
									onChange={(e) => form.setData('title', e.target.value)}
									className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-base font-semibold text-slate-900 placeholder-slate-400 shadow-xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
									required
								/>
								{form.errors.title && (
									<p className="mt-1 text-xs text-rose-600">{form.errors.title}</p>
								)}
							</div>

							{/* URL Slug */}
							<div>
								<label
									htmlFor="slug"
									className="block text-xs font-semibold text-slate-600"
								>
									Slug URL
								</label>
								<div className="mt-1.5 flex rounded-xl border border-slate-200 bg-slate-50 shadow-xs focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
									<span className="inline-flex items-center rounded-l-xl px-3 text-xs text-slate-400">
										/posts/
									</span>
									<input
										type="text"
										id="slug"
										value={form.data.slug}
										onChange={(e) => form.setData('slug', e.target.value)}
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
								currentImageUrl={post.cover_image_url}
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
									placeholder="Contoh: Dokumentasi KPA EMC²"
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
								Status & Publikasi
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
											Status Publikasi (Diterbitkan)
										</span>
										<p className="text-[11px] text-slate-400">
											Hilangkan centang untuk menyimpan sebagai draf rahasia.
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
											Ditampilkan di banner utama / sorotan beranda.
										</p>
									</div>
								</label>
							</div>

							{/* Action Buttons */}
							<div className="pt-2 border-t border-slate-100 space-y-2">
								<button
									type="button"
									disabled={form.processing}
									onClick={(e) => handleSubmit(e)}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800 disabled:opacity-50"
								>
									<Save className="h-4 w-4" />
									<span>{form.processing ? 'Menyimpan...' : 'Perbarui Artikel'}</span>
								</button>

								{post.can?.delete !== false && (
									<button
										type="button"
										onClick={() => setDeleteModalOpen(true)}
										className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
									>
										<Trash2 className="h-4 w-4" />
										<span>Hapus Artikel Ini</span>
									</button>
								)}
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
							Hapus Artikel Ini?
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600">
							Apakah Anda yakin ingin menghapus artikel{' '}
							<span className="font-bold text-slate-900">"{post.title}"</span>? Tindakan ini akan memindahkan artikel ke tempat sampah.
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
								Ya, Hapus Artikel
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default EditPost;
