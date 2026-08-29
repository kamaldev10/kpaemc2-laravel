import { Category } from '@/types/post';
import { FC } from 'react';

interface CategoryFilterProps {
	categories: Category[];
	selectedCategory?: string;
	onSelect: (categorySlug: string) => void;
	allLabel?: string;
	className?: string;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
	categories,
	selectedCategory = '',
	onSelect,
	allLabel = 'Semua Kategori',
	className = '',
}) => {
	return (
		<div className={`flex flex-wrap items-center gap-2 ${className}`}>
			<button
				type="button"
				onClick={() => onSelect('')}
				className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
					!selectedCategory
						? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
						: 'border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:bg-purple-50/50 hover:text-purple-900'
				}`}
			>
				{allLabel}
			</button>
			{categories.map((cat) => {
				const isSelected = selectedCategory === cat.slug;
				return (
					<button
						key={cat.id}
						type="button"
						onClick={() => onSelect(cat.slug)}
						className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
							isSelected
								? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
								: 'border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:bg-purple-50/50 hover:text-purple-900'
						}`}
					>
						{cat.name}
					</button>
				);
			})}
		</div>
	);
};

export default CategoryFilter;
