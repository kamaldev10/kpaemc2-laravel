import { mockAboutFull } from '@/mocks/aboutMock';
import { AboutInfo } from '@/types/about';
import { CheckCircle2, Compass, Scroll, Target } from 'lucide-react';
import { FC } from 'react';

interface VisiMisiSectionProps {
	aboutInfo?: AboutInfo | null;
}

export const VisiMisiSection: FC<VisiMisiSectionProps> = ({ aboutInfo = mockAboutFull }) => {
	const currentInfo = aboutInfo ?? mockAboutFull;
	const missions = currentInfo.mission && currentInfo.mission.length > 0
		? currentInfo.mission
		: (mockAboutFull.mission ?? []);
	const ethics = currentInfo.code_of_ethics && currentInfo.code_of_ethics.length > 0
		? currentInfo.code_of_ethics
		: (mockAboutFull.code_of_ethics ?? []);

	return (
		<section className="py-20 bg-slate-50">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold text-purple-900 uppercase">
						<Target className="h-3.5 w-3.5 text-purple-700" />
						<span>Landasan & Arah Organisasi</span>
					</div>
					<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						Visi, Misi & Kode Etik Pecinta Alam
					</h2>
					<p className="mt-3 text-base text-slate-600">
						Prinsip moral dan panduan operasional yang menjadi kompas dalam setiap langkah penjelajahan
						kami.
					</p>
				</div>

				{/* Visi Card */}
				<div className="mb-12 overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-900 to-indigo-900 p-8 text-white shadow-xl sm:p-10">
					<div className="flex flex-col md:flex-row md:items-center gap-6">
						<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-400 backdrop-blur-md">
							<Target className="h-8 w-8" />
						</div>
						<div>
							<h3 className="text-xs font-bold tracking-wider text-purple-300 uppercase">
								Visi KPA EMC²
							</h3>
							<p className="mt-2 text-xl font-bold leading-relaxed text-white sm:text-2xl">
								"{currentInfo.vision || 'Menjadi organisasi mahasiswa pecinta alam yang unggul, berintegritas, mandiri, dan berdaya saing dalam eksplorasi alam serta konservasi lingkungan hidup.'}"
							</p>
						</div>
					</div>
				</div>

				{/* Misi Grid */}
				<div className="mb-16">
					<h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
						<Compass className="h-5 w-5 text-purple-700" />
						<span>Misi Organisasi</span>
					</h3>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{missions.map((item, idx) => (
							<div
								key={idx}
								className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-purple-200 hover:shadow-md"
							>
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800 font-extrabold text-sm">
									{idx + 1}
								</div>
								<p className="text-sm leading-relaxed text-slate-700">{item}</p>
							</div>
						))}
					</div>
				</div>

				{/* Kode Etik Pecinta Alam */}
				<div className="rounded-3xl border border-amber-200/60 bg-amber-50/50 p-8 sm:p-10 shadow-sm">
					<div className="flex items-center gap-3 mb-6">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold">
							<Scroll className="h-5 w-5" />
						</div>
						<div>
							<h3 className="text-xl font-extrabold text-slate-900">
								Kode Etik Pecinta Alam Indonesia
							</h3>
							<p className="text-xs text-amber-800 font-medium">Ikrar Bersama Gladian Nasional Pecinta Alam</p>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{ethics.map((item, idx) => (
							<div key={idx} className="flex items-start gap-3 bg-white/80 rounded-xl p-4 border border-amber-100">
								<CheckCircle2 className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
								<p className="text-sm leading-relaxed text-slate-700">{item}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default VisiMisiSection;
