import { PaginationLink } from '@/types/pagination';
import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface PaginationProps {
	links: PaginationLink[];
	className?: string;
	perPage?: number | string;
	baseUrl?: string;
	filters?: Record<string, any>;
	showPageLimit?: boolean;
}

export const Pagination: FC<PaginationProps> = ({
	links,
	className = '',
	perPage,
	baseUrl,
	filters = {},
	showPageLimit = false,
}) => {
	const hasLinks = links && links.length > 3;

	if (!hasLinks && !showPageLimit) {
		return null;
	}

	const handleLimitChange = (newLimit: number) => {
		if (baseUrl) {
			router.get(
				baseUrl,
				{
					...filters,
					per_page: newLimit,
					page: 1,
				},
				{ preserveState: true, preserveScroll: true }
			);
		}
	};

	return (
		<div className={`flex flex-col items-center justify-between gap-4 sm:flex-row ${className}`}>
			{/* Per page limit selector if enabled */}
			{showPageLimit && baseUrl ? (
				<div className="flex items-center gap-2 text-xs text-slate-500">
					<span>Tampilkan:</span>
					<select
						value={Number(perPage) || 10}
						onChange={(e) => handleLimitChange(Number(e.target.value))}
						className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>
					<span>per halaman</span>
				</div>
			) : (
				<div />
			)}

			{/* Links */}
			{hasLinks && (
				<nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
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
			)}
		</div>
	);
};

export default Pagination;
