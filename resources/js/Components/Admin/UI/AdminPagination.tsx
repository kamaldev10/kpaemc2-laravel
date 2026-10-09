import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface PaginationLinkItem {
	url: string | null;
	label: string;
	active: boolean;
	page?: number | null;
}

interface AdminPaginationProps {
	pagination: {
		from?: number | null;
		to?: number | null;
		total?: number;
		current_page?: number;
		last_page?: number;
		per_page?: number;
		links?: PaginationLinkItem[] | Record<string, string | null>;
		meta?: {
			from?: number | null;
			to?: number | null;
			total?: number;
			current_page?: number;
			last_page?: number;
			per_page?: number;
			links?: PaginationLinkItem[];
		};
	};
	perPage?: number | string;
	onPerPageChange?: (perPage: number) => void;
	baseUrl?: string;
	filters?: Record<string, string | number | boolean | undefined | null>;
	itemName?: string;
}

export const AdminPagination: FC<AdminPaginationProps> = ({
	pagination,
	perPage = 10,
	onPerPageChange,
	baseUrl,
	filters = {},
	itemName = 'data',
}) => {
	const currentPerPage = Number(perPage) || 10;

	const meta = pagination?.meta ?? pagination;
	const from = meta?.from ?? pagination?.from ?? 0;
	const to = meta?.to ?? pagination?.to ?? 0;
	const total = meta?.total ?? pagination?.total ?? 0;

	const rawLinks = meta?.links ?? (Array.isArray(pagination?.links) ? pagination.links : []);
	const links: PaginationLinkItem[] = Array.isArray(rawLinks) ? rawLinks : [];

	const handlePerPageChange = (newLimit: number) => {
		if (onPerPageChange) {
			onPerPageChange(newLimit);
		} else if (baseUrl) {
			router.get(
				baseUrl,
				{
					...filters,
					per_page: newLimit,
					page: 1,
				},
				{ preserveState: true, replace: true }
			);
		}
	};

	const renderLabel = (label: string, isPrevious: boolean, isNext: boolean) => {
		if (isPrevious || label === 'pagination.previous' || label.toLowerCase().includes('previous')) {
			return <ChevronLeft className="h-3.5 w-3.5" />;
		}
		if (isNext || label === 'pagination.next' || label.toLowerCase().includes('next')) {
			return <ChevronRight className="h-3.5 w-3.5" />;
		}
		return <span dangerouslySetInnerHTML={{ __html: label }} />;
	};

	return (
		<div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 px-5 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
			{/* Left side: Count info and per page selector */}
			<div className="flex flex-wrap items-center gap-3 text-slate-500">
				<span>
					Menampilkan <span className="font-semibold text-slate-800">{from || 0}</span> -{' '}
					<span className="font-semibold text-slate-800">{to || 0}</span> dari{' '}
					<span className="font-semibold text-slate-800">{total}</span> {itemName}
				</span>

				<div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
					<label htmlFor="admin-page-limit" className="text-slate-400">
						Tampilkan:
					</label>
					<select
						id="admin-page-limit"
						value={currentPerPage}
						onChange={(e) => handlePerPageChange(Number(e.target.value))}
						className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-2xs focus:border-purple-600 focus:outline-hidden focus:ring-1 focus:ring-purple-600"
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>
					<span className="text-slate-400">per hal.</span>
				</div>
			</div>

			{/* Right side: Page navigation links */}
			{links && links.length > 3 && (
				<div className="flex items-center gap-1 overflow-x-auto">
					{links.map((link, idx) => {
						const isPrevious = idx === 0;
						const isNext = idx === links.length - 1;

						if (!link.url) {
							return (
								<span
									key={idx}
									className="inline-flex min-w-7 items-center justify-center rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-300 cursor-not-allowed select-none"
								>
									{renderLabel(link.label, isPrevious, isNext)}
								</span>
							);
						}

						return (
							<Link
								key={idx}
								href={link.url}
								preserveScroll
								preserveState
								className={`inline-flex min-w-7 items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
									link.active
										? 'bg-purple-700 text-white shadow-2xs'
										: 'text-slate-600 hover:bg-slate-200'
								}`}
							>
								{renderLabel(link.label, isPrevious, isNext)}
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default AdminPagination;
