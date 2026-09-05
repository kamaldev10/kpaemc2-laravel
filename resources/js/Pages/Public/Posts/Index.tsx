import PostCard from '@/Components/Public/Cards/PostCard';
import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import CategoryFilter from '@/Components/Public/UI/CategoryFilter';
import CTABanner from '@/Components/Public/UI/CTABanner';
import PageHero from '@/Components/Public/UI/PageHero';
import Pagination from '@/Components/Public/UI/Pagination';
import SearchBar from '@/Components/Public/UI/SearchBar';
import useSearch from '@/hooks/useSearch';
import { mockCategories, mockPosts } from '@/mocks/postMock';
import { PaginatedData } from '@/types/pagination';
import { Category, Post } from '@/types/post';
import { resolveData, useIsMockDataEnabled } from '@/utils/mockData';
import { Head, router } from '@inertiajs/react';
import { BookOpen, SearchX } from 'lucide-react';
import { FC, useMemo } from 'react';

interface PostsIndexProps {
	posts?: PaginatedData<Post> | Post[] | null;
	categories?: Category[] | null;
	filters?: {
		search?: string;
		category?: string;
	};
}

export const PostsIndex: FC<PostsIndexProps> = ({ posts, categories, filters = {} }) => {
	const isMockEnabled = useIsMockDataEnabled();

	const currentCategories = resolveData(categories, mockCategories, isMockEnabled) ?? [];

	// Extract pagination metadata or wrap mock array
	const isPaginated = posts && typeof posts === 'object' && 'data' in posts;
	const currentPostsList: Post[] = useMemo(() => {
		if (isPaginated) {
			return (posts as PaginatedData<Post>).data;
		}
		if (Array.isArray(posts)) {
			return posts;
		}
		if (isMockEnabled) {
			return mockPosts;
		}
		return [];
	}, [posts, isPaginated, isMockEnabled]);

	const paginationLinks = isPaginated ? (posts as PaginatedData<Post>).links : [];

	// Search handler
	const { term, setTerm } = useSearch({
		baseUrl: '/posts',
		initialValue: filters.search || '',
		paramName: 'search',
		otherParams: {
			category: filters.category,
		},
		delay: 350,
	});

	// Category filter handler
	const handleSelectCategory = (catSlug: string) => {
		router.get(
			'/posts',
			{
				search: term || undefined,
				category: catSlug || undefined,
			},
			{
				preserveState: true,
				preserveScroll: true,
			}
		);
	};

	return (
		<PublicLayout>
			<Head>
				<title>Artikel & Postingan — KPA EMC²</title>
				<meta
					name="description"
					content="Kumpulan artikel dan postingan seputar catatan ekspedisi rimba gunung, riset lingkungan hidup, dan kegiatan KPA EMC² FMIPA Universitas Riau."
				/>
			</Head>

			{/* Page Hero */}
			<PageHero
				title="Artikel & Postingan"
				subtitle="Kumpulan artikel, kabar terbaru, dan catatan kegiatan alam bebas KPA EMC²."
			/>

			{/* Filter & Search Bar Section */}
			<section className="sticky top-20 z-30 border-b border-purple-100 bg-white/95 backdrop-blur-md shadow-xs py-4">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						{/* Search Bar */}
						<div className="w-full md:max-w-md">
							<SearchBar
								value={term}
								onChange={setTerm}
								placeholder="Cari judul, kata kunci, atau topik..."
							/>
						</div>

						{/* Category Pills */}
						<div className="overflow-x-auto pb-1 md:pb-0">
							<CategoryFilter
								categories={currentCategories}
								selectedCategory={filters.category || ''}
								onSelect={handleSelectCategory}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Article Grid Section */}
			<section className="py-16 bg-slate-50/50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Active Filter Indicators */}
					{(term || filters.category) && (
						<div className="mb-8 flex items-center gap-2 text-xs text-slate-600">
							<BookOpen className="h-4 w-4 text-purple-700" />
							<span>Menampilkan hasil</span>
							{term && (
								<span className="font-semibold text-slate-900">
									pencarian "{term}"
								</span>
							)}
							{filters.category && (
								<span className="rounded-md bg-purple-100 px-2 py-0.5 font-bold text-purple-900">
									kategori: {filters.category}
								</span>
							)}
						</div>
					)}

					{currentPostsList.length > 0 ? (
						<div className="space-y-12">
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{currentPostsList.map((post, idx) => (
									<PostCard
										key={post.id}
										post={post}
										featured={idx === 0 && !term && !filters.category}
									/>
								))}
							</div>

							{/* Pagination */}
							{paginationLinks.length > 0 && (
								<div className="pt-6">
									<Pagination links={paginationLinks} />
								</div>
							)}
						</div>
					) : (
						<div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-xs">
							<SearchX className="mx-auto h-16 w-16 text-slate-300" />
							<h3 className="mt-4 text-lg font-bold text-slate-900">
								Artikel Tidak Ditemukan
							</h3>
							<p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
								Coba gunakan kata kunci pencarian yang berbeda atau hapus filter kategori untuk
								menemukan artikel lainnya.
							</p>
							<button
								type="button"
								onClick={() => {
									setTerm('');
									handleSelectCategory('');
								}}
								className="mt-6 inline-flex items-center justify-center rounded-xl bg-purple-900 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-purple-800"
							>
								Reset Filter & Pencarian
							</button>
						</div>
					)}
				</div>
			</section>

			<CTABanner
				title="Punya Catatan Perjalanan atau Karya Tulis Lapangan?"
				description="Kirimkan artikel atau laporan riset ke redaksi buletin KPA EMC²."
				primaryButtonText="Hubungi Redaksi"
				primaryButtonHref="/contact"
				secondaryButtonText="Kembali ke Beranda"
				secondaryButtonHref="/"
			/>
		</PublicLayout>
	);
};

export default PostsIndex;
