import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { FC } from 'react';

interface PostCardProps {
	post: Post;
	className?: string;
	featured?: boolean;
}

export const PostCard: FC<PostCardProps> = ({ post, className = '', featured = false }) => {
	const formattedDate = post.published_at
		? new Date(post.published_at).toLocaleDateString('id-ID', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: post.created_at
			? new Date(post.created_at).toLocaleDateString('id-ID', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})
			: '';

	return (
		<article
			className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 ${
				featured ? 'md:col-span-2 md:grid md:grid-cols-12 md:items-center' : ''
			} ${className}`}
		>
			{/* Image Cover */}
			<div
				className={`relative overflow-hidden bg-slate-900 ${
					featured ? 'h-64 md:col-span-6 md:h-full min-h-[260px]' : 'h-52 w-full'
				}`}
			>
				{post.cover_url ? (
					<img
						src={post.cover_url}
						alt={post.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-950 text-white/40">
						<span className="text-xl font-black">KPA EMC²</span>
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

				{/* Category Badge */}
				{post.category && (
					<div className="absolute left-4 top-4">
						<span className="inline-flex items-center rounded-full bg-purple-900/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md shadow-xs">
							{post.category.name}
						</span>
					</div>
				)}
			</div>

			{/* Card Body */}
			<div
				className={`flex flex-1 flex-col justify-between p-6 ${
					featured ? 'md:col-span-6 md:p-8' : ''
				}`}
			>
				<div>
					{/* Meta */}
					<div className="mb-2.5 flex items-center gap-4 text-xs text-slate-500">
						{formattedDate && (
							<span className="flex items-center gap-1.5 font-medium">
								<Calendar className="h-3.5 w-3.5 text-purple-600" />
								<span>{formattedDate}</span>
							</span>
						)}
						{post.author_name && (
							<span className="flex items-center gap-1.5 font-medium">
								<User className="h-3.5 w-3.5 text-purple-600" />
								<span className="truncate max-w-[120px]">{post.author_name}</span>
							</span>
						)}
					</div>

					{/* Title */}
					<h3
						className={`font-bold tracking-tight text-slate-900 transition-colors group-hover:text-purple-900 ${
							featured ? 'text-xl md:text-2xl line-clamp-2' : 'text-base sm:text-lg line-clamp-2'
						}`}
					>
						<Link href={`/posts/${post.slug}`}>{post.title}</Link>
					</h3>

					{/* Excerpt */}
					{post.excerpt && (
						<p
							className={`mt-2 text-slate-600 line-clamp-3 leading-relaxed ${
								featured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
							}`}
						>
							{post.excerpt}
						</p>
					)}

					{/* Tags Preview */}
					{post.tags && post.tags.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-1.5">
							{post.tags.slice(0, 3).map((tag, idx) => (
								<span
									key={idx}
									className="rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-800"
								>
									#{tag}
								</span>
							))}
						</div>
					)}
				</div>

				{/* Read More Link */}
				<div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
					<Link
						href={`/posts/${post.slug}`}
						className="inline-flex items-center gap-2 text-xs font-bold text-purple-800 transition group-hover:text-purple-600 group-hover:gap-3"
					>
						<span>Baca Selengkapnya</span>
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</article>
	);
};

export default PostCard;
