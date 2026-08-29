import { Tag } from 'lucide-react';
import { FC } from 'react';

interface TagListProps {
	tags: string[];
	className?: string;
	onTagClick?: (tag: string) => void;
}

export const TagList: FC<TagListProps> = ({ tags, className = '', onTagClick }) => {
	if (!tags || tags.length === 0) {
		return null;
	}

	return (
		<div className={`flex flex-wrap items-center gap-2 ${className}`}>
			{tags.map((tag, idx) => (
				<span
					key={idx}
					onClick={() => onTagClick && onTagClick(tag)}
					className={`inline-flex items-center gap-1.5 rounded-lg border border-purple-100 bg-purple-50/70 px-2.5 py-1 text-xs font-semibold text-purple-900 ${
						onTagClick
							? 'cursor-pointer transition hover:bg-purple-100 hover:border-purple-200'
							: ''
					}`}
				>
					<Tag className="h-3 w-3 text-purple-600" />
					<span>#{tag}</span>
				</span>
			))}
		</div>
	);
};

export default TagList;
