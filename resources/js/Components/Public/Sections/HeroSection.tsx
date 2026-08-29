import { mockHomeAboutInfo } from '@/mocks/homeMock';
import { AboutInfo } from '@/types/about';
import { Link } from '@inertiajs/react';
import { ArrowRight, Compass, Mountain } from 'lucide-react';
import { FC } from 'react';

interface HeroSectionProps {
	aboutInfo?: AboutInfo | null;
}

export const HeroSection: FC<HeroSectionProps> = ({ aboutInfo = mockHomeAboutInfo }) => {
	const currentInfo = aboutInfo ?? mockHomeAboutInfo;
	const bannerImage =
		currentInfo.hero_banner_url ||
		'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80';

	return (
		<section className="relative flex min-h-[85vh] items-center overflow-hidden bg-slate-950 text-white">
			{/* High-Resolution Background Image with Purple Radial/Gradient Overlay */}
			<div className="absolute inset-0 z-0">
				<img
					src={bannerImage}
					alt="KPA EMC² Hero Banner"
					className="h-full w-full object-cover object-center brightness-75 filter"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-purple-950/80 to-slate-950/90" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-black/80" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					{/* Title / Tagline */}
					<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
						{currentInfo.motto}
					</h1>

					{/* Description */}
					<p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
						{currentInfo.description ||
							'Menumbuhkan ketangguhan fisik, kemandirian mental, dan integritas ilmiah dalam menjelajahi alam terbuka serta menjaga kelestarian ekosistem Indonesia.'}
					</p>

					{/* CTA Buttons */}
					<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
						<Link
							href="/#posts"
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-purple-800 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-purple-900/50 transition-all hover:from-purple-600 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
						>
							<Compass className="h-5 w-5 text-purple-200" />
							<span>Berita / Artikel Terbaru</span>
							<ArrowRight className="h-4 w-4" />
						</Link>

						<Link
							href="/events"
							className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/30 bg-purple-950/40 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-purple-300 hover:bg-purple-900/50"
						>
							<Mountain className="h-5 w-5 text-amber-400" />
							<span>Lihat Agenda Kegiatan</span>
						</Link>

						<Link
							href="/tentang"
							className="inline-flex items-center justify-center px-5 py-4 text-sm font-semibold text-purple-300 transition hover:text-white hover:underline"
						>
							<span>Tentang Kami</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
