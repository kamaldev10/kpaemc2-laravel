import { ImagePlaceholder } from '@/Components/Public/UI/ImagePlaceholder';
import { Division } from '@/types/division';
import { Link } from '@inertiajs/react';
import { ArrowRight, Compass, Home, TreePine, Users } from 'lucide-react';
import { FC } from 'react';

interface DivisionCardProps {
	division: Division;
	className?: string;
}

const iconMap: Record<string, typeof Users> = {
	Users: Users,
	TreePine: TreePine,
	Compass: Compass,
	Home: Home,
};

export const DivisionCard: FC<DivisionCardProps> = ({ division, className = '' }) => {
	const IconComponent = (division.icon_name && iconMap[division.icon_name]) || Users;

	return (
		<div
			className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 ${className}`}
		>
			{/* Cover Image or Placeholder */}
			<div className="relative h-48 w-full overflow-hidden bg-slate-900">
				{division.cover_url ? (
					<img
						src={division.cover_url}
						alt={division.name}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<ImagePlaceholder type="division" title={division.name} showBadge={false} />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

				{/* Floating Badge */}
				<div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
					<div className="flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 backdrop-blur-md shadow-xs">
						<IconComponent className="h-4 w-4 text-purple-700" />
						<span className="text-xs font-bold text-slate-900">{division.name}</span>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col justify-between p-6">
				<div>
					<p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
						{division.short_description || division.description}
					</p>

					{/* Material Preview Tag Chips */}
					{division.study_materials && division.study_materials.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-1.5">
							{division.study_materials.slice(0, 3).map((item, idx) => (
								<span
									key={idx}
									className="rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-800"
								>
									{item}
								</span>
							))}
							{division.study_materials.length > 3 && (
								<span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
									+{division.study_materials.length - 3} materi
								</span>
							)}
						</div>
					)}
				</div>

				<div className="mt-6 pt-4 border-t border-slate-100">
					<Link
						href="/about#divisi"
						className="inline-flex items-center gap-2 text-xs font-bold text-purple-800 transition group-hover:text-purple-600 group-hover:gap-3"
					>
						<span>Lihat Profil & Fokus Divisi</span>
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DivisionCard;
