import { Calendar, Camera, Compass, FileText, Mountain, Sparkles } from 'lucide-react';
import { FC } from 'react';

export type PlaceholderType = 'post' | 'event' | 'division' | 'gallery' | 'general';

interface ImagePlaceholderProps {
	type?: PlaceholderType;
	title?: string;
	className?: string;
	showBadge?: boolean;
}

export const ImagePlaceholder: FC<ImagePlaceholderProps> = ({
	type = 'general',
	title,
	className = '',
	showBadge = true,
}) => {
	const getIcon = () => {
		switch (type) {
			case 'post':
				return <FileText className="h-8 w-8 text-purple-300 sm:h-10 sm:w-10" />;
			case 'event':
				return <Calendar className="h-8 w-8 text-amber-300 sm:h-10 sm:w-10" />;
			case 'division':
				return <Compass className="h-8 w-8 text-purple-300 sm:h-10 sm:w-10" />;
			case 'gallery':
				return <Camera className="h-8 w-8 text-purple-300 sm:h-10 sm:w-10" />;
			default:
				return <Mountain className="h-8 w-8 text-purple-300 sm:h-10 sm:w-10" />;
		}
	};

	const getLabel = () => {
		switch (type) {
			case 'post':
				return 'Artikel & Postingan';
			case 'event':
				return 'Agenda Kegiatan';
			case 'division':
				return 'Divisi Operasional';
			case 'gallery':
				return 'Dokumentasi Ekspedisi';
			default:
				return 'KPA EMC²';
		}
	};

	return (
		<div
			className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white select-none ${className}`}
		>
			{/* Ambient Ambient Glow */}
			<div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-600/20 blur-xl" />
			<div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-indigo-600/20 blur-xl" />

			{/* Subtle Grid / Texture Pattern */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

			{/* Center Content */}
			<div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
				<div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
					{getIcon()}
				</div>

				{showBadge && (
					<span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-purple-400/25 bg-purple-900/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-200 backdrop-blur-sm">
						<Sparkles className="h-2.5 w-2.5 text-amber-400" />
						<span>{getLabel()}</span>
					</span>
				)}

				{title && (
					<p className="mt-1 line-clamp-1 max-w-[85%] text-[11px] font-medium text-slate-300/80">
						{title}
					</p>
				)}
			</div>
		</div>
	);
};

export default ImagePlaceholder;
