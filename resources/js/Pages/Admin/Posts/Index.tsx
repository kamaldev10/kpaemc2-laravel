import AdminLayout from '@/Layouts/AdminLayout';
import { BreadcrumbItem } from '@/types/admin';
import { PaginatedResource } from '@/types';
import { Post } from '@/types/post';
import { Head, Link, router } from '@inertiajs/react';
import {
	BookOpen,
	CheckCircle,
	Edit,
	ExternalLink,
	Eye,
	FilePlus2,
	FileText,
	Filter,
	Layers,
	Plus,
	Search,
	Star,
	Trash2,
	X,
} from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

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

interface PostIndexProps {
	posts: PaginatedResource<
		Post & {
			can?: { update?: boolean; delete?: boolean };
			author?: { id: string; name: string; email: string };
		}
	>;
	categories: CategoryOption[];
	divisions: DivisionOption[];
	filters: {
		search?: string;
		category_id?: string;
		division_id?: string;
		status?: string;
	};
	metrics: {
		total: number;
		published: number;
		draft: number;
		featured: number;
	};
}

export const PostsIndex: FC<PostIndexProps> = ({
	posts,
	categories = [],
	divisions = [],
	filters = {},
	metrics = { total: 0, published: 0, draft: 0, featured: 0 },
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
	const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
	const [deleteModalPost, setDeleteModalPost] = useState<Post | null>(null);

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', href: '/admin' },
		{ label: 'Artikel & Berita' },
	];

	const handleFilterSubmit = (e?: FormEvent) => {
		if (e) e.preventDefault();
		router.get(
			'/admin/posts',
			{
				search: searchTerm || undefined,
				category_id: selectedCategory || undefined,
				status: selectedStatus || undefined,
			},
			{ preserveState: true, replace: true }
		);
	};

	const handleResetFilters = () => {
		setSearchTerm('');
		setSelectedCategory('');
		setSelectedStatus('');
		router.get('/admin/posts', {}, { preserveState: true, replace: true });
	};

	const handleDeleteConfirm = () => {
		if (!deleteModalPost) return;
		router.delete(`/admin/posts/${deleteModalPost.id}`, {
			onSuccess: () => setDeleteModalPost(null),
		});
	};

	return (
		<AdminLayout
			title="Manajemen Artikel & Berita"
			breadcrumbs={breadcrumbs}
			headerTitle="Artikel & Berita"
			headerDescription="Kelola publikasi berita, ekspedisi, wawasan alam, dan kegiatan organisasi KPA EMC²."
			headerActions={
				<Link
					href="/admin/posts/create"
					className="flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-800"
				>
					<Plus className="h-4 w-4" />
					<span>Tulis Artikel Baru</span>
				</Link>
			}
		>
			<Head title="Manajemen Artikel & Berita" />

			{/* Metric Summary Cards */}
			<div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Total Artikel</span>
						<FileText className="h-4 w-4 text-purple-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-slate-900">{metrics.total}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Diterbitkan</span>
						<CheckCircle className="h-4 w-4 text-emerald-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-emerald-700">{metrics.published}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Draf</span>
						<BookOpen className="h-4 w-4 text-amber-600" />
					</div>
					<p className="mt-2 text-2xl font-bold text-amber-700">{metrics.draft}</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-slate-500">Unggulan (Featured)</span>
						<Star className="h-4 w-4 text-purple-500" />
					</div>
					<p className="mt-2 text-2xl font-bold text-purple-700">{metrics.featured}</p>
				</div>
			</div>

			{/* Filters and Search Bar */}
			<div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
				<form onSubmit={handleFilterSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
					{/* Search input */}
					<div className="relative flex-1">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Cari judul, kutipan, isi, atau nama penulis..."
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						/>
					</div>

					{/* Category Select */}
					<div className="w-full md:w-56">
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

					{/* Status Select */}
					<div className="w-full md:w-44">
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-600"
						>
							<option value="">Semua Status</option>
							<option value="published">Diterbitkan</option>
							<option value="draft">Draf</option>
						</select>
					</div>

					{/* Filter Buttons */}
					<div className="flex items-center gap-2">
						<button
							type="submit"
							className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800"
						>
							<Filter className="h-3.5 w-3.5" />
							<span>Terapkan</span>
						</button>
						{(filters.search || filters.category_id || filters.status) && (
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

			{/* Posts Table */}
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs text-slate-600">
						<thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
							<tr>
								<th scope="col" className="px-5 py-3.5">
									Artikel
								</th>
								<th scope="col" className="px-4 py-3.5">
									Kategori
								</th>
								<th scope="col" className="px-4 py-3.5">
									Penulis
								</th>
								<th scope="col" className="px-4 py-3.5">
									Status
								</th>
								<th scope="col" className="px-4 py-3.5">
									Tanggal
								</th>
								<th scope="col" className="px-5 py-3.5 text-right">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{posts.data.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
											<FilePlus2 className="h-6 w-6" />
										</div>
										<h4 className="mt-3 text-sm font-semibold text-slate-900">
											Belum ada artikel ditemukan
										</h4>
										<p className="mt-1 text-xs text-slate-500">
											Mulai tulis artikel pertama Anda atau ubah filter pencarian di atas.
										</p>
										<div className="mt-4">
											<Link
												href="/admin/posts/create"
												className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-800"
											>
												<Plus className="h-4 w-4" />
												<span>Buat Artikel Baru</span>
											</Link>
										</div>
									</td>
								</tr>
							) : (
								posts.data.map((post) => {
									const isPublished = post.is_published && post.is_active;
									const canUpdate = post.can?.update ?? true;
									const canDelete = post.can?.delete ?? true;

									return (
										<tr key={post.id} className="transition-colors hover:bg-slate-50/60">
											{/* Post title & image */}
											<td className="px-5 py-3.5">
												<div className="flex items-center gap-3">
													<img
														src={
															post.cover_image_url ||
															'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg'
														}
														alt={post.title}
														className="h-11 w-16 rounded-lg object-cover ring-1 ring-slate-200"
													/>
													<div className="min-w-0 max-w-sm">
														<Link
															href={canUpdate ? `/admin/posts/${post.id}/edit` : '#'}
															className="font-semibold text-slate-900 hover:text-purple-700 line-clamp-1"
														>
															{post.title}
														</Link>
														<span className="block font-mono text-[10px] text-slate-400 line-clamp-1">
															/{post.slug}
														</span>
													</div>
												</div>
											</td>

											{/* Category */}
											<td className="px-4 py-3.5">
												{post.category ? (
													<span
														className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
														style={{
															backgroundColor: `${post.category.color || '#6B21A8'}15`,
															color: post.category.color || '#6B21A8',
														}}
													>
														{post.category.name}
													</span>
												) : (
													<span className="text-slate-400">-</span>
												)}
											</td>

											{/* Author */}
											<td className="px-4 py-3.5 text-slate-700 font-medium">
												{post.author_name || post.author?.name || 'Anonim'}
											</td>

											{/* Status */}
											<td className="px-4 py-3.5">
												{isPublished ? (
													<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
														<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
														<span>Diterbitkan</span>
													</span>
												) : (
													<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
														<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
														<span>Draf</span>
													</span>
												)}
											</td>

											{/* Date */}
											<td className="px-4 py-3.5 text-slate-500">
												{post.published_at
													? new Date(post.published_at).toLocaleDateString('id-ID', {
															day: 'numeric',
															month: 'short',
															year: 'numeric',
														})
													: post.created_at
														? new Date(post.created_at).toLocaleDateString('id-ID', {
																day: 'numeric',
																month: 'short',
																year: 'numeric',
															})
														: '-'}
											</td>

											{/* Action Buttons */}
											<td className="px-5 py-3.5 text-right">
												<div className="flex items-center justify-end gap-1.5">
													{/* Public View link */}
													<a
														href={`/posts/${post.slug}`}
														target="_blank"
														rel="noreferrer"
														title="Lihat Pratinjau Publik"
														className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
													>
														<ExternalLink className="h-4 w-4" />
													</a>

													{/* Edit button */}
													{canUpdate && (
														<Link
															href={`/admin/posts/${post.id}/edit`}
															title="Edit Artikel"
															className="rounded-lg p-1.5 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
														>
															<Edit className="h-4 w-4" />
														</Link>
													)}

													{/* Delete button */}
													{canDelete && (
														<button
															type="button"
															onClick={() => setDeleteModalPost(post)}
															title="Hapus Artikel"
															className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
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
				{posts.links && posts.links.length > 3 && (
					<div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 bg-slate-50/50 text-xs">
						<span className="text-slate-500">
							Menampilkan <span className="font-semibold">{posts.from || 0}</span> -{' '}
							<span className="font-semibold">{posts.to || 0}</span> dari{' '}
							<span className="font-semibold">{posts.total}</span> artikel
						</span>

						<div className="flex items-center gap-1">
							{posts.links.map((link, idx) => (
								<Link
									key={idx}
									href={link.url || '#'}
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

			{/* Delete Confirmation Modal */}
			{deleteModalPost && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
						onClick={() => setDeleteModalPost(null)}
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
							<span className="font-bold text-slate-900">"{deleteModalPost.title}"</span>? Tindakan ini akan memindahkan artikel ke tempat sampah.
						</p>

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setDeleteModalPost(null)}
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

export default PostsIndex;
