import { mockAboutFull } from '@/mocks/aboutMock';
import { AboutInfo } from '@/types/about';
import { Calendar, Compass, ShieldCheck, TreePine } from 'lucide-react';
import { FC } from 'react';

interface ProfilSectionProps {
	aboutInfo?: AboutInfo | null;
}

export const ProfilSection: FC<ProfilSectionProps> = ({ aboutInfo = mockAboutFull }) => {
	const currentInfo = aboutInfo ?? mockAboutFull;

	return (
		<section className="bg-white py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
					{/* Left: Narrative */}
					<div className="space-y-6 lg:col-span-7">
						<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase text-purple-900">
							<Compass className="h-3.5 w-3.5 text-purple-700" />
							<span>Profil & Sejarah Organisasi</span>
						</div>

						<h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
							Mengenal Lebih Dekat {currentInfo.org_name}
						</h2>

						<div className="space-y-4 text-base leading-relaxed text-slate-600">
							<p>
								{currentInfo.description ||
									'Kelompok Pecinta Alam EMC² adalah organisasi mahasiswa yang berdedikasi pada eksplorasi rimba raya, pendidikan karakter, dan perlindungan lingkungan.'}
							</p>
							<p>
								{currentInfo.history ||
									'Didirikan oleh mahasiswa lintas disiplin ilmu dengan semangat persaudaraan dan cinta tanah air, KPA EMC² terus aktif menyelenggarakan ekspedisi gunung hutan, pemetaan gua karst, arung jeram, serta riset keanekaragaman hayati.'}
							</p>
						</div>

						<div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
							<div className="flex items-center gap-3.5 rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-800 text-white">
									<Calendar className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs font-medium text-slate-500">
										Berdiri Sejak
									</p>
									<p className="text-sm font-bold text-slate-900">
										{currentInfo.founded_date ||
											(currentInfo.established_at
												? new Date(
														currentInfo.established_at
													).toLocaleDateString('id-ID', {
														year: 'numeric',
														month: 'long',
														day: 'numeric',
													})
												: '10 Oktober 1984')}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3.5 rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
									<ShieldCheck className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs font-medium text-slate-500">
										Status Organisasi
									</p>
									<p className="text-sm font-bold text-slate-900">
										lembaga Semi Otonom (LSO)
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Visual Accent Card */}
					<div className="lg:col-span-5">
						<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 p-8 text-white shadow-2xl">
							<div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-purple-600/30 blur-2xl" />
							<div className="relative z-10 space-y-6">
								<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-amber-400 backdrop-blur-md">
									<TreePine className="h-8 w-8" />
								</div>

								<h3 className="text-2xl font-bold text-white">
									{currentInfo?.motto}
								</h3>

								<p className="text-sm leading-relaxed text-purple-200/90">
									"Bukan tentang menaklukkan puncak, melainkan menaklukkan ego dan
									keraguan di dalam diri sendiri demi menjaga alam lestari."
								</p>

								<div className="border-t border-purple-800/80 pt-4 text-xs text-purple-300">
									<p className="font-semibold text-white">Nilai Inti KPA EMC²:</p>
									<p className="mt-1">
										Integritas • Persaudaraan • Ketangguhan • Konservasi
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfilSection;
