import { Search, X } from 'lucide-react';
import { FC, InputHTMLAttributes } from 'react';

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	value: string;
	onChange: (val: string) => void;
	placeholder?: string;
	className?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
	value,
	onChange,
	placeholder = 'Cari artikel, topik, atau penulis...',
	className = '',
	...props
}) => {
	return (
		<div className={`relative flex items-center ${className}`}>
			<Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 shadow-xs transition focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/10"
				{...props}
			/>
			{value && (
				<button
					type="button"
					onClick={() => onChange('')}
					className="absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
					aria-label="Hapus pencarian"
				>
					<X className="h-3.5 w-3.5" />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
