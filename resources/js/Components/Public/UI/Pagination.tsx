import { PaginationLink } from '@/types/pagination';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface PaginationProps {
	links: PaginationLink[];
	className?: string;
}

export const Pagination: FC<PaginationProps> = ({ links, className = '' }) => {
	if (!links || links.length <= 3) {
		return null;
	}

	return (
		<nav
			className={`flex items-center justify-center gap-1.5 ${className}`}
			aria-label="Pagination"
		>
			{links.map((link, index) => {
				const isPrevious = index === 0;
				const isNext = index === links.length - 1;

				if (!link.url) {
					return (
						<span
							key={index}
							className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-400 cursor-not-allowed select-none"
						>
							{isPrevious ? (
								<ChevronLeft className="h-4 w-4" />
							) : isNext ? (
								<ChevronRight className="h-4 w-4" />
							) : (
								<span dangerouslySetInnerHTML={{ __html: link.label }} />
							)}
						</span>
					);
				}

				return (
					<Link
						key={index}
						href={link.url}
						preserveScroll
						preserveState
						className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-xs font-bold transition-all ${
							link.active
								? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
								: 'border border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-900'
						}`}
					>
						{isPrevious ? (
							<ChevronLeft className="h-4 w-4" />
						) : isNext ? (
							<ChevronRight className="h-4 w-4" />
						) : (
							<span dangerouslySetInnerHTML={{ __html: link.label }} />
						)}
					</Link>
				);
			})}
		</nav>
	);
};

export default Pagination;
