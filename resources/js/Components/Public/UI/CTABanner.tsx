import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';

interface CTABannerProps {
	title?: string;
	description?: string;
	primaryButtonText?: string;
	primaryButtonHref?: string;
	secondaryButtonText?: string;
	secondaryButtonHref?: string;
	className?: string;
}

export const CTABanner: FC<CTABannerProps> = ({
	title = 'Siap Menjelajahi Alam Bebas Bersama KPA EMC²?',
	description = 'Bergabunglah dalam kegiatan pendidikan dasar, ekspedisi ilmiah, dan aksi konservasi lingkungan hidup bersama keluarga besar KPA EMC².',
	primaryButtonText = 'Daftar Kegiatan Terbuka',
	primaryButtonHref = '/events',
	secondaryButtonText = 'Hubungi Sekretariat',
	secondaryButtonHref = '/contact',
	className = '',
}) => {
	return (
		<section className={`py-16 md:py-24 ${className}`}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 p-8 shadow-2xl sm:p-12 lg:p-16">
					{/* Ambient Decorative Shapes */}
					<div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
					<div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

					<div className="relative z-10 mx-auto max-w-3xl text-center">
						<h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
							{title}
						</h2>

						<p className="mt-4 text-base leading-relaxed text-purple-200/90 sm:text-lg">
							{description}
						</p>

						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Link
								href={primaryButtonHref}
								className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-150 hover:from-amber-400 hover:to-amber-500 hover:shadow-xl sm:w-auto"
							>
								<span>{primaryButtonText}</span>
								<ArrowRight className="h-4 w-4" />
							</Link>

							<Link
								href={secondaryButtonHref}
								className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/40 bg-purple-950/50 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-purple-300 hover:bg-purple-900/60 sm:w-auto"
							>
								<span>{secondaryButtonText}</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTABanner;
