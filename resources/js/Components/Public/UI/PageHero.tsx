import { FC } from 'react';

interface PageHeroProps {
	title: string;
	subtitle?: string | null;
	backgroundImageUrl?: string | null;
	className?: string;
}

export const PageHero: FC<PageHeroProps> = ({
	title,
	subtitle,
	backgroundImageUrl = null,
	className = '',
}) => {
	return (
		<section
			className={`relative overflow-hidden bg-slate-950 py-20 text-white md:py-28 ${className}`}
		>
			{/* Background Image / Ambient Gradient */}
			<div className="absolute inset-0 z-0">
				{backgroundImageUrl ? (
					<img
						src={backgroundImageUrl}
						alt={title}
						className="h-full w-full object-cover object-center opacity-30"
					/>
				) : (
					/* Placeholder Gradient with Decorative Elements when no image from server */
					<div className="h-full w-full bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-950">
						<div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
						<div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
						<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/70 to-slate-950/90" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					<h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
						{title}
					</h1>
					{subtitle && (
						<p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
							{subtitle}
						</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default PageHero;
