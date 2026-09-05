import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import RelatedArticles from '@/Components/Public/Sections/RelatedArticles';
import ShareButtons from '@/Components/Public/UI/ShareButtons';
import TagList from '@/Components/Public/UI/TagList';
import { mockPosts } from '@/mocks/postMock';
import { Post } from '@/types/post';
import { resolveData, useIsMockDataEnabled } from '@/utils/mockData';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronLeft, Clock, Tag, User } from 'lucide-react';
import { FC, useMemo } from 'react';

interface PostShowProps {
	post: Post;
	relatedPosts?: Post[] | null;
}

export const PostShow: FC<PostShowProps> = ({ post, relatedPosts }) => {
	const isMockEnabled = useIsMockDataEnabled();

	const currentPost = resolveData(post, mockPosts[0], isMockEnabled) ?? post;

	const fallbackRelated = mockPosts
		.filter((p) => p.id !== currentPost?.id)
		.slice(0, 3);
	const currentRelated = resolveData(relatedPosts, fallbackRelated, isMockEnabled) ?? [];

	const formattedDate = currentPost.published_at
		? new Date(currentPost.published_at).toLocaleDateString('id-ID', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: currentPost.created_at
			? new Date(currentPost.created_at).toLocaleDateString('id-ID', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})
			: '';

	// Approximate reading time
	const readTimeMinutes = useMemo(() => {
		const wordCount = (currentPost.content || currentPost.excerpt || '').split(/\s+/).length;
		return Math.max(1, Math.ceil(wordCount / 180));
	}, [currentPost.content, currentPost.excerpt]);

	return (
		<PublicLayout>
			<Head>
				<title>{`${currentPost.title} — KPA EMC²`}</title>
				<meta name="description" content={currentPost.excerpt || currentPost.title} />
				<meta property="og:title" content={`${currentPost.title} — KPA EMC²`} />
				<meta property="og:description" content={currentPost.excerpt || currentPost.title} />
				<meta property="og:type" content="article" />
				{currentPost.cover_url && (
					<meta property="og:image" content={currentPost.cover_url} />
				)}
			</Head>

			<article className="min-h-screen bg-white">
				{/* Top Header Section */}
				<header className="border-b border-slate-100 bg-slate-50/60 py-12">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
						{/* Back Link */}
						<Link
							href="/posts"
							className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 transition hover:border-purple-200 hover:text-purple-900 mb-6"
						>
							<ChevronLeft className="h-4 w-4" />
							<span>Kembali ke Semua Artikel</span>
						</Link>

						{/* Category & Read Time */}
						<div className="flex flex-wrap items-center gap-3 mb-4">
							{currentPost.category && (
								<span className="rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-purple-900">
									{currentPost.category.name}
								</span>
							)}
							<span className="inline-flex items-center gap-1 text-xs text-slate-500">
								<Clock className="h-3.5 w-3.5" />
								<span>{readTimeMinutes} menit membaca</span>
							</span>
						</div>

						{/* Title */}
						<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
							{currentPost.title}
						</h1>

						{/* Author & Date Bar */}
						<div className="mt-6 flex flex-wrap items-center gap-6 border-t border-slate-200/60 pt-6 text-xs text-slate-600">
							{currentPost.author_name && (
								<div className="flex items-center gap-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-900 font-bold">
										<User className="h-4 w-4" />
									</div>
									<div>
										<span className="text-[11px] text-slate-400 block">Penulis</span>
										<span className="font-semibold text-slate-900">
											{currentPost.author_name}
										</span>
									</div>
								</div>
							)}

							{formattedDate && (
								<div className="flex items-center gap-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold">
										<Calendar className="h-4 w-4" />
									</div>
									<div>
										<span className="text-[11px] text-slate-400 block">Diterbitkan</span>
										<span className="font-semibold text-slate-900">{formattedDate}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</header>

				{/* Featured Cover Image */}
				{(currentPost.cover_image_url || currentPost.cover_url) && (
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-6">
						<div className="overflow-hidden rounded-3xl shadow-xl shadow-purple-950/5 border border-slate-100 bg-slate-900 max-h-[520px]">
							<img
								src={currentPost.cover_image_url || currentPost.cover_url || ''}
								alt={currentPost.title}
								className="w-full h-full object-cover max-h-[520px]"
							/>
						</div>
					</div>
				)}

				{/* Article Main Body Content */}
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
					{/* Excerpt Lead Paragraph */}
					{currentPost.excerpt && (
						<p className="text-lg sm:text-xl font-medium leading-relaxed text-slate-700 mb-10 border-l-4 border-purple-700 pl-6 italic">
							{currentPost.excerpt}
						</p>
					)}

					{/* Rich Text Body */}
					<div
						className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-purple-700 prose-a:underline hover:prose-a:text-purple-900 prose-img:rounded-2xl"
						dangerouslySetInnerHTML={{
							__html:
								currentPost.content ||
								'<p>Konten artikel sedang dalam proses penyusunan redaksi.</p>',
						}}
					/>

					{/* Tags & Share Footer */}
					<div className="mt-16 border-t border-slate-100 pt-8 space-y-6">
						{currentPost.tags && currentPost.tags.length > 0 && (
							<div>
								<div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3">
									<Tag className="h-3.5 w-3.5" />
									<span>TOPIK ARTIKEL:</span>
								</div>
								<TagList tags={currentPost.tags} />
							</div>
						)}

						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
							<ShareButtons title={currentPost.title} />
						</div>
					</div>
				</div>
			</article>

			{/* Related Articles */}
			{currentRelated.length > 0 && (
				<RelatedArticles posts={currentRelated} title="Artikel & Catatan Terkait Lainnya" />
			)}
		</PublicLayout>
	);
};

export default PostShow;
