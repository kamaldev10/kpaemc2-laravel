import { mockAboutFull } from '@/mocks/aboutMock';
import { AboutInfo } from '@/types/about';
import {
	Compass,
	Flame,
	GraduationCap,
	Layers,
	Quote,
	Sparkles,
	Trees,
	Triangle,
} from 'lucide-react';
import { FC, useMemo, useState } from 'react';

interface LogoSectionProps {
	aboutInfo?: AboutInfo | null;
}

type TabCategory = 'all' | 'colors' | 'geometry';

export const LogoSection: FC<LogoSectionProps> = ({ aboutInfo = mockAboutFull }) => {
	const currentInfo = aboutInfo ?? mockAboutFull;
	const logoUrl = currentInfo.logo_url;
	const [activeTab, setActiveTab] = useState<TabCategory>('all');

	const colorElements = useMemo(
		() => [
			{
				category: 'color',
				title: 'Warna Putih',
				subtitle: 'Kesucian & Bakti Ketuhanan',
				desc: 'Melambangkan perwujudan bakti luhur kepada Tuhan Yang Maha Esa yang didasari niat hati tulus, bersih, suci, dan tanpa pamrih.',
				badge: 'Spiritualitas',
				badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
				icon: Sparkles,
				iconColor: 'text-slate-700 bg-slate-100',
				swatchStyle: 'bg-white border-2 border-slate-300 ring-4 ring-slate-100',
				cardBorder: 'border-slate-200 hover:border-slate-400 hover:shadow-slate-200/50',
			},
			{
				category: 'color',
				title: 'Warna Hijau',
				subtitle: 'Kemakmuran & Harmoni Alam',
				desc: 'Melambangkan kelestarian ekosistem alam raya, kemakmuran bumi, serta kedamaian jiwa dalam menjaga kelangsungan flora dan fauna.',
				badge: 'Konservasi',
				badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
				icon: Trees,
				iconColor: 'text-emerald-700 bg-emerald-100',
				swatchStyle: 'bg-emerald-600 ring-4 ring-emerald-100',
				cardBorder:
					'border-emerald-200/80 hover:border-emerald-400 hover:shadow-emerald-900/5',
			},
			{
				category: 'color',
				title: 'Warna Merah',
				subtitle: 'Keberanian & Daya Juang',
				desc: 'Melambangkan keberanian moral, ketangguhan fisik dalam menjelajahi rimba raya, dan semangat juang yang berkobar menghadapi tantangan.',
				badge: 'Karakter',
				badgeColor: 'bg-rose-100 text-rose-900 border-rose-200',
				icon: Flame,
				iconColor: 'text-rose-700 bg-rose-100',
				swatchStyle: 'bg-rose-600 ring-4 ring-rose-100',
				cardBorder: 'border-rose-200/80 hover:border-rose-400 hover:shadow-rose-900/5',
			},
			{
				category: 'color',
				title: 'Warna Ungu',
				subtitle: 'Identitas Almamater FMIPA UNRI',
				desc: 'Menunjukkan kedudukan, identitas resmi, kehormatan intelektual, dan naungan organisasi di lingkungan FMIPA Universitas Riau.',
				badge: 'Akademik',
				badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
				icon: GraduationCap,
				iconColor: 'text-purple-700 bg-purple-100',
				swatchStyle: 'bg-purple-700 ring-4 ring-purple-100',
				cardBorder:
					'border-purple-200/80 hover:border-purple-400 hover:shadow-purple-900/5',
			},
		],
		[]
	);

	const geometryElements = useMemo(
		() => [
			{
				category: 'geometry',
				title: 'Setengah Lingkaran (Busur & Tali Busur)',
				subtitle: 'Fleksibilitas Adaptasi & Ketegasan Tujuan',
				desc: 'Busur melambangkan fleksibilitas dan ketangkasan adaptasi setiap anggota KPA EMC² di berbagai medan alam terbuka, sedangkan tali busur menegaskan ketegasan arah, disiplin, dan komitmen organisasi dalam menggapai tujuan mulia.',
				badge: 'Prinsip Gerak',
				badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
				icon: Compass,
				iconColor: 'text-amber-700 bg-amber-100',
				swatchStyle: 'bg-amber-500 ring-4 ring-amber-100',
				cardBorder: 'border-amber-200/80 hover:border-amber-400 hover:shadow-amber-900/5',
			},
			{
				category: 'geometry',
				title: 'Segitiga Sama Kaki Kokoh Menembus Busur',
				subtitle: 'Orientasi Ilmu Eksak & Batasan Diri',
				desc: 'Merupakan perwujudan orientasi keilmuan eksak terhadap eksplorasi alam bebas, sekaligus pengingat luhur bahwa ada batasan moral yang kokoh pada diri manusia serta kesadaran akan keterbatasan insan di hadapan kebesaran semesta.',
				badge: 'Dimensi Sains',
				badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
				icon: Triangle,
				iconColor: 'text-indigo-700 bg-indigo-100',
				swatchStyle: 'bg-indigo-600 ring-4 ring-indigo-100',
				cardBorder:
					'border-indigo-200/80 hover:border-indigo-400 hover:shadow-indigo-900/5',
			},
			{
				category: 'geometry',
				title: 'Segitiga Terbalik',
				subtitle: 'Keterbatasan Aturan Duniawi',
				desc: 'Bermakna keterbatasan aturan di dunia fana ini, mengajarkan kerendahan hati bahwa ilmu pengetahuan manusia selalu memiliki batas sehingga harus senantiasa tunduk pada hukum alam dan norma etika kepecintaalaman.',
				badge: 'Kearifan Moral',
				badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-200',
				icon: Layers,
				iconColor: 'text-cyan-700 bg-cyan-100',
				swatchStyle: 'bg-cyan-600 ring-4 ring-cyan-100',
				cardBorder: 'border-cyan-200/80 hover:border-cyan-400 hover:shadow-cyan-900/5',
			},
		],
		[]
	);

	const displayedElements = useMemo(() => {
		if (activeTab === 'colors') return colorElements;
		if (activeTab === 'geometry') return geometryElements;
		return [...colorElements, ...geometryElements];
	}, [activeTab, colorElements, geometryElements]);

	return (
		<section className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white via-purple-50/25 to-white py-24">
			{/* Subtle Background Elements */}
			<div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/30 blur-3xl" />
			<div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-100/40 blur-2xl" />

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<div className="shadow-xs inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-900">
						<Sparkles className="h-3.5 w-3.5 text-purple-700" />
						<span>Filosofi & Identitas Visual</span>
					</div>
					<h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
						Makna & Filosofi Lambang KPA EMC²
					</h2>
					<p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
						Setiap sapuan warna dan konstruksi geometri lambang menyimpan ikrar
						spiritual, integritas intelektual FMIPA UNRI, serta komitmen abadi terhadap
						kelestarian alam.
					</p>
				</div>

				{/* Interactive Filter Pills */}
				<div className="mb-12 flex justify-center">
					<div className="shadow-xs inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5">
						<button
							type="button"
							onClick={() => setActiveTab('all')}
							className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
								activeTab === 'all'
									? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
									: 'text-slate-600 hover:bg-slate-50 hover:text-purple-900'
							}`}
						>
							Semua Filosofi (7 Elemen)
						</button>
						<button
							type="button"
							onClick={() => setActiveTab('colors')}
							className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
								activeTab === 'colors'
									? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
									: 'text-slate-600 hover:bg-slate-50 hover:text-purple-900'
							}`}
						>
							<span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
							<span>Palet Warna (4)</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveTab('geometry')}
							className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
								activeTab === 'geometry'
									? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
									: 'text-slate-600 hover:bg-slate-50 hover:text-purple-900'
							}`}
						>
							<Triangle className="h-3 w-3 text-indigo-600" />
							<span>Bentuk Geometri (3)</span>
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
					{/* Left: Emblem Official Showcase */}
					<div className="lg:sticky lg:top-28 lg:col-span-5">
						<div className="relative overflow-hidden rounded-3xl border border-purple-900/20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-8 text-white shadow-2xl shadow-purple-950/20">
							{/* Ambient Decorative Rings */}
							<div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-600/20 blur-2xl" />
							<div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-2xl" />

							{/* Logo Center Display */}
							<div className="relative z-10 flex flex-col items-center text-center">
								<div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-4 shadow-inner backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:h-44 sm:w-44">
									{logoUrl ? (
										<img
											src={logoUrl}
											alt="Lambang Resmi KPA EMC²"
											className="h-full w-full object-contain drop-shadow-xl filter"
											loading="lazy"
										/>
									) : (
										<span className="text-4xl font-black text-white">EMC²</span>
									)}
								</div>

								<h3 className="text-2xl font-black tracking-wide text-white sm:text-3xl">
									{currentInfo.org_name || 'KPA EMC²'}
								</h3>
								<p className="mt-1 text-xs font-medium text-purple-200">
									Kelompok Pecinta Alam Einstein Mapalindup Ceria Club
								</p>

								<div className="mt-6 flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-xs">
									<div className="flex items-center justify-between">
										<span className="text-slate-400">Didirikan Pada:</span>
										<span className="font-semibold text-white">
											{currentInfo.founded_date || '10 Oktober 1984'}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-400">Status Kelembagaan:</span>
										<span className="font-semibold text-amber-400">
											Lembaga Semi Otonom (LSO)
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-400">Fokus Keilmuan:</span>
										<span className="font-semibold text-purple-300">
											Eksak & Konservasi Alam
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Breakdown Cards */}
					<div className="space-y-4 lg:col-span-7">
						<div className="grid grid-cols-1 gap-4">
							{displayedElements.map((elem, idx) => {
								const IconComp = elem.icon;
								return (
									<article
										key={idx}
										className={`shadow-xs group relative overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-6 ${elem.cardBorder}`}
									>
										<div className="flex items-start gap-4">
											{/* Color / Geometric Indicator Swatch */}
											<div className="shrink-0 pt-0.5">
												<div
													className={`shadow-xs flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${elem.iconColor}`}
												>
													<IconComp className="h-5 w-5" />
												</div>
											</div>

											{/* Detail Info */}
											<div className="flex-1">
												<div className="flex flex-wrap items-center justify-between gap-2">
													<div className="flex items-center gap-2">
														<div
															className={`h-3.5 w-3.5 rounded-full ${elem.swatchStyle}`}
															title="Color/Shape Swatch"
														/>
														<h4 className="text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-purple-950">
															{elem.title}
														</h4>
													</div>
													<span
														className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${elem.badgeColor}`}
													>
														{elem.badge}
													</span>
												</div>

												<p className="mt-1 text-xs font-semibold text-purple-900">
													{elem.subtitle}
												</p>

												<p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
													{elem.desc}
												</p>
											</div>
										</div>
									</article>
								);
							})}
						</div>

						{/* Philosophical Summary Quote Card */}
						{currentInfo.logo_philosophy && (
							<div className="relative mt-6 overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 p-6 text-white shadow-xl sm:p-8">
								<div className="absolute right-4 top-4 text-purple-700/30">
									<Quote className="h-24 w-24 -rotate-12" />
								</div>
								<div className="relative z-10 space-y-2">
									<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
										<Sparkles className="h-4 w-4" />
										<span>Ikrar Nilai Filosofis</span>
									</div>
									<p className="text-sm italic leading-relaxed text-purple-100 sm:text-base">
										"{currentInfo.logo_philosophy}"
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LogoSection;
