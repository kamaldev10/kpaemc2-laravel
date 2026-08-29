import PostCard from '@/Components/Public/Cards/PostCard';
import { Post } from '@/types/post';
import { BookOpen } from 'lucide-react';
import { FC } from 'react';

interface RelatedArticlesProps {
	posts: Post[];
	title?: string;
	className?: string;
}

export const RelatedArticles: FC<RelatedArticlesProps> = ({
	posts,
	title = 'Artikel & Catatan Terkait',
	className = '',
}) => {
	if (!posts || posts.length === 0) {
		return null;
	}

	return (
		<section className={`py-16 bg-slate-50/70 border-t border-slate-100 ${className}`}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10 flex items-center justify-between">
					<div className="flex items-center gap-2.5">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-900">
							<BookOpen className="h-5 w-5" />
						</div>
						<div>
							<h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
								{title}
							</h3>
							<p className="text-xs text-slate-500">
								Eksplorasi cerita perjalanan dan riset lainnya
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	);
};

export default RelatedArticles;
