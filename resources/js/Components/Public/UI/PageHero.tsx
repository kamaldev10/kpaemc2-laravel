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
	backgroundImageUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
	className = '',
}) => {
	return (
		<section
			className={`relative overflow-hidden bg-slate-950 py-20 text-white md:py-28 ${className}`}
		>
			{/* Background Image with Dark Purple Gradient Overlay */}
			<div className="absolute inset-0 z-0">
				<img
					src={
						backgroundImageUrl ??
						'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80'
					}
					alt={title}
					className="h-full w-full object-cover object-center opacity-30"
				/>
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
