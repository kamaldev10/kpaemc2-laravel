import { mockHomePosts } from '@/mocks/homeMock';
import { Post } from '@/types/post';
import { Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react';
import { FC } from 'react';

interface ArticleHighlightProps {
	posts?: Post[] | null;
}

export const ArticleHighlight: FC<ArticleHighlightProps> = ({ posts = mockHomePosts }) => {
	const currentPosts = posts && posts.length > 0 ? posts : mockHomePosts;

	return (
		<section id="posts" className="scroll-mt-20 bg-white py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase text-purple-900">
							<BookOpen className="h-3.5 w-3.5 text-purple-700" />
							<span>Artikel & Postingan</span>
						</div>
						<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
							Berita, Kegiatan, Artikel & Lainnya
						</h2>
						<p className="mt-3 text-base text-slate-600">
							Setiap postingan memiliki makna yang mendalam demi terjaganya
							kelestarian alam
						</p>
					</div>

					<div>
						<Link
							href="/posts"
							className="inline-flex items-center gap-2 text-sm font-bold text-purple-800 transition hover:text-purple-950 hover:underline"
						>
							<span>Lihat Semua Artikel</span>
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				{/* 3 Articles Grid */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{currentPosts.map((post) => {
						const cover =
							post.cover_url ||
							'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';
						const dateFormatted = post.published_at
							? new Date(post.published_at).toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})
							: 'Baru saja';

						return (
							<article
								key={post.id}
								className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-950/10"
							>
								{/* Thumbnail */}
								<div className="relative aspect-video w-full overflow-hidden bg-slate-100">
									<img
										src={cover}
										alt={post.title}
										loading="lazy"
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									{post.category && (
										<div className="absolute left-3 top-3">
											<span className="inline-flex items-center rounded-full bg-purple-900/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
												{post.category.name}
											</span>
										</div>
									)}
								</div>

								{/* Content */}
								<div className="flex flex-1 flex-col justify-between p-6">
									<div>
										{/* Meta Date */}
										<div className="mb-2.5 flex items-center gap-2 text-xs text-slate-500">
											<Calendar className="h-3.5 w-3.5 text-purple-700" />
											<span>{dateFormatted}</span>
										</div>

										{/* Title */}
										<h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-purple-800">
											<Link
												href={`/posts/${post.slug}`}
												className="line-clamp-2"
											>
												{post.title}
											</Link>
										</h3>

										{/* Excerpt */}
										<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
											{post.excerpt ||
												'Baca selengkapnya artikel dan catatan ekspedisi ini...'}
										</p>
									</div>

									{/* Footer Tags & Link */}
									<div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
										<div className="flex items-center gap-1.5 overflow-hidden">
											{post.tags && post.tags.length > 0 ? (
												<span className="inline-flex items-center gap-1 text-xs text-slate-500">
													<Tag className="h-3 w-3 text-purple-600" />
													<span className="max-w-[120px] truncate">
														{post.tags[0]}
													</span>
												</span>
											) : null}
										</div>

										<Link
											href={`/posts/${post.slug}`}
											className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 transition group-hover:text-purple-950"
										>
											<span>Baca</span>
											<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ArticleHighlight;
