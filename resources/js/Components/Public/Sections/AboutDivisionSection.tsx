import { ImagePlaceholder } from '@/Components/Public/UI/ImagePlaceholder';
import { mockHomeDivisions } from '@/mocks/homeMock';
import { Division } from '@/types/division';
import {
	ArrowUpRight,
	BookOpen,
	Compass,
	GraduationCap,
	Home,
	Sparkles,
	TreePine,
} from 'lucide-react';
import { FC, useState } from 'react';

interface AboutDivisionSectionProps {
	divisions?: Division[] | null;
}

const divisionMeta: Record<
	string,
	{
		badge: string;
		icon: FC<{ className?: string; strokeWidth?: number }>;
		focusAreas: string[];
		colorBorder: string;
		colorBadge: string;
		colorIcon: string;
	}
> = {
	kaderisasi: {
		badge: 'Pendidikan & Pembinaan',
		icon: GraduationCap,
		focusAreas: [
			'Sekolah Lingkungan Ruang & Lapangan',
			'Pelatihan Survival, Navigasi Darat, & Mountain Safety',
			'Penanaman Nilai Kode Etik & Loyalitas Organisasi',
			'Monitoring & Evaluasi Perkembangan Anggota Muda',
		],
		colorBorder: 'border-purple-200 hover:border-purple-400',
		colorBadge: 'bg-purple-100 text-purple-900 border-purple-200',
		colorIcon: 'bg-purple-800 text-white',
	},
	sklh: {
		badge: 'Konservasi & Sosial',
		icon: TreePine,
		focusAreas: [
			'Program Unggulan Sekolah Lingkungan Hidup (SLH)',
			'Aksi Penanaman Mangrove & Reboisasi Hutan',
			'Advokasi Konservasi Alam & Mitigasi Kebakaran Hutan',
			'Bakti Sosial & Pemberdayaan Masyarakat Sekitar Hutan',
		],
		colorBorder: 'border-emerald-200 hover:border-emerald-400',
		colorBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
		colorIcon: 'bg-emerald-700 text-white',
	},
	litbang: {
		badge: 'Riset & Eksplorasi Ilmiah',
		icon: Compass,
		focusAreas: [
			'Pemetaan Jalur Ekspedisi & Analisis Geografis (GIS)',
			'Inventarisasi Keanekaragaman Hayati (Flora & Fauna)',
			'Kajian Ilmiah Hidrologi & Kawasan Karst/Perguaan',
			'Publikasi Artikel & Catatan Ekspedisi Lapangan',
		],
		colorBorder: 'border-indigo-200 hover:border-indigo-400',
		colorBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
		colorIcon: 'bg-indigo-800 text-white',
	},
	karata: {
		badge: 'Rumah Tangga & Logistik',
		icon: Home,
		focusAreas: [
			'Manajemen & Pemeliharaan Fasilitas Sekretariat',
			'Inventarisasi & Standardisasi Kelayakan Alat Outdoor',
			'Pengelolaan Logistik Operasional Lapangan & Ekspedisi',
			'Sistem Peminjaman & Perawatan Alat Teknis Berkala',
		],
		colorBorder: 'border-amber-200 hover:border-amber-400',
		colorBadge: 'bg-amber-100 text-amber-900 border-amber-200',
		colorIcon: 'bg-amber-600 text-white',
	},
};

export const AboutDivisionSection: FC<AboutDivisionSectionProps> = ({
	divisions = mockHomeDivisions,
}) => {
	const currentDivisions = divisions && divisions.length > 0 ? divisions : mockHomeDivisions;
	const [activeTab, setActiveTab] = useState<string>(currentDivisions[0]?.slug ?? 'kaderisasi');

	const activeDivision =
		currentDivisions.find((d) => d.slug === activeTab) ?? currentDivisions[0];
	const activeMeta = divisionMeta[activeDivision?.slug ?? ''] ?? {
		badge: 'Divisi Operasional',
		icon: Compass,
		focusAreas: ['Operasional kepecintaalaman', 'Pembinaan', 'Pengabdian'],
		colorBorder: 'border-purple-200 hover:border-purple-400',
		colorBadge: 'bg-purple-100 text-purple-900 border-purple-200',
		colorIcon: 'bg-purple-800 text-white',
	};

	const ActiveIcon = activeMeta.icon;

	return (
		<section id="divisi" className="scroll-mt-24 py-24 bg-white border-t border-slate-100">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold text-purple-900 uppercase">
							<Sparkles className="h-3.5 w-3.5 text-purple-700" />
							<span>4 Pilar Operasional Organisasi</span>
						</div>
						<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
							Divisi & Bidang Keilmuan KPA EMC²
						</h2>
						<p className="mt-3 text-base leading-relaxed text-slate-600">
							Struktur operasional KPA EMC² ditopang oleh 4 divisi terspesialisasi yang bekerja secara
							sinergis dalam pembinaan kader, aksi lingkungan, riset ilmiah, dan manajemen logistik.
						</p>
					</div>

					{/* Navigation Pill Selectors */}
					<div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
						{currentDivisions.map((div) => {
							const isActive = activeTab === div.slug;
							return (
								<button
									key={div.id}
									type="button"
									onClick={() => setActiveTab(div.slug)}
									className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150 ${
										isActive
											? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
											: 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
									}`}
								>
									{div.name.replace('Divisi ', '')}
								</button>
							);
						})}
					</div>
				</div>

				{/* Active Division Feature Card */}
				{activeDivision && (
					<div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 text-white p-8 sm:p-12 lg:p-14 shadow-2xl mb-16">
						<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
							{/* Left: Detailed Info */}
							<div className="lg:col-span-7 space-y-6">
								<div className="flex items-center gap-3">
									<div
										className={`flex h-13 w-13 items-center justify-center rounded-2xl ${activeMeta.colorIcon} shadow-lg`}
									>
										<ActiveIcon className="h-7 w-7" strokeWidth={1.75} />
									</div>
									<div>
										<span
											className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase border ${activeMeta.colorBadge}`}
										>
											{activeMeta.badge}
										</span>
										<h3 className="text-2xl font-extrabold text-white sm:text-3xl mt-1">
											{activeDivision.name}
										</h3>
									</div>
								</div>

								<p className="text-base leading-relaxed text-slate-200 sm:text-lg">
									{activeDivision.short_description || activeDivision.full_description}
								</p>

								<div className="pt-2">
									<h4 className="text-xs font-bold tracking-wider text-purple-300 uppercase mb-3 flex items-center gap-2">
										<BookOpen className="h-4 w-4" />
										<span>Ruang Lingkup & Fokus Kegiatan:</span>
									</h4>
									<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
										{activeMeta.focusAreas.map((item, idx) => (
											<div
												key={idx}
												className="flex items-start gap-2.5 rounded-xl bg-white/5 p-3 text-xs text-slate-200 border border-white/10"
											>
												<span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
												<span className="leading-snug">{item}</span>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Right: Visual Imagery / Card */}
							<div className="lg:col-span-5">
								<div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-inner">
									{activeDivision.cover_url ? (
										<img
											src={activeDivision.cover_url}
											alt={activeDivision.name}
											className="h-full w-full object-cover object-center filter brightness-90 transition-transform duration-300 hover:scale-105"
										/>
									) : (
										<ImagePlaceholder type="division" title={activeDivision.name} />
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
									<div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-purple-200">
										<span className="font-semibold">{activeDivision.name} • KPA EMC²</span>
										<span className="rounded-full bg-purple-900/80 px-2.5 py-1 text-[11px] font-bold text-white border border-purple-400/30">
											LSO FMIPA UNRI
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* 4 Cards Overview Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{currentDivisions.map((div) => {
						const meta = divisionMeta[div.slug] ?? {
							badge: 'Divisi',
							icon: Compass,
							focusAreas: [],
							colorBorder: 'border-slate-200',
							colorBadge: 'bg-slate-100 text-slate-800',
							colorIcon: 'bg-purple-800 text-white',
						};
						const Icon = meta.icon;
						const isSelected = activeTab === div.slug;

						return (
							<button
								key={div.id}
								type="button"
								onClick={() => setActiveTab(div.slug)}
								className={`cursor-pointer group flex flex-col justify-between text-left rounded-2xl border p-6 transition-all duration-200 ${
									isSelected
										? 'border-purple-600 bg-purple-50/50 shadow-lg shadow-purple-900/5 ring-2 ring-purple-600/20'
										: 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
								}`}
							>
								<div>
									<div className="flex items-center justify-between gap-2 mb-4">
										<div
											className={`flex h-11 w-11 items-center justify-center rounded-xl ${meta.colorIcon} shadow-md`}
										>
											<Icon className="h-5 w-5" />
										</div>
										<span
											className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${meta.colorBadge}`}
										>
											{meta.badge}
										</span>
									</div>

									<h4 className="text-base font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
										{div.name}
									</h4>

									<p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
										{div.short_description || div.full_description}
									</p>
								</div>

								<div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-800">
									<span>{isSelected ? 'Sedang Dilihat' : 'Lihat Detail'}</span>
									<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AboutDivisionSection;
