import { PaginatedResource } from '@/types';
import { Link, router } from '@inertiajs/react';
import { FC } from 'react';

interface AdminPaginationProps {
	pagination: {
		from?: number | null;
		to?: number | null;
		total?: number;
		links?: Array<{ url: string | null; label: string; active: boolean }>;
		current_page?: number;
	};
	perPage?: number | string;
	onPerPageChange?: (perPage: number) => void;
	baseUrl?: string;
	filters?: Record<string, any>;
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
	const { from = 0, to = 0, total = 0, links = [] } = pagination;

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
					{links.map((link, idx) => (
						<Link
							key={idx}
							href={link.url || '#'}
							preserveScroll
							preserveState
							dangerouslySetInnerHTML={{ __html: link.label }}
							className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
								link.active
									? 'bg-purple-700 text-white shadow-2xs'
									: link.url
										? 'text-slate-600 hover:bg-slate-200'
										: 'cursor-not-allowed text-slate-300'
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AdminPagination;
