import { mockHomeDivisions } from '@/mocks/homeMock';
import { Division } from '@/types/division';
import { Link } from '@inertiajs/react';
import { ArrowRight, Compass, Home, TreePine, Users } from 'lucide-react';
import { FC } from 'react';

interface DivisionHighlightProps {
	divisions?: Division[] | null;
}

const iconMap: Record<string, FC<{ className?: string }>> = {
	Users: Users,
	TreePine: TreePine,
	Compass: Compass,
	Home: Home,
};

export const DivisionHighlight: FC<DivisionHighlightProps> = ({
	divisions = mockHomeDivisions,
}) => {
	const currentDivisions = divisions && divisions.length > 0 ? divisions : mockHomeDivisions;

	return (
		<section className="bg-slate-50 py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase text-purple-900">
							<span>4 Pilar Divisi Operasional</span>
						</div>
						<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
							Fokus & Bidang Keilmuan Organisasi
						</h2>
						<p className="mt-3 text-base text-slate-600">
							Setiap divisi bertanggung jawab atas pembinaan, kegiatan spesifik alam bebas, riset,
							serta pengelolaan organisasi secara profesional.
						</p>
					</div>

					<div>
						<Link
							href="/about#divisi"
							className="inline-flex items-center gap-2 text-sm font-bold text-purple-800 transition hover:text-purple-950 hover:underline"
						>
							<span>Lihat Semua Divisi</span>
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				{/* 4 Cards Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{currentDivisions.map((div) => {
						const IconComponent =
							div.icon_name && iconMap[div.icon_name] ? iconMap[div.icon_name] : Compass;
						const cover =
							div.cover_url ||
							'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';

						return (
							<article
								key={div.id}
								className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-950/10"
							>
								{/* Image with Purple Gradient Overlay */}
								<div className="relative aspect-video w-full overflow-hidden bg-slate-100">
									<img
										src={cover}
										alt={div.name}
										loading="lazy"
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-purple-950/30 to-transparent" />
									<div className="absolute bottom-3 left-3 flex items-center gap-2">
										<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-800 text-white shadow-md">
											<IconComponent className="h-5 w-5" />
										</div>
										<span className="text-sm font-bold text-white drop-shadow-md">{div.name}</span>
									</div>
								</div>

								{/* Card Content */}
								<div className="flex flex-1 flex-col justify-between p-6">
									<p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
										{div.description || 'Deskripsi divisi operasional KPA EMC²...'}
									</p>

									<div className="mt-6 border-t border-slate-100 pt-4">
										<Link
											href="/about#divisi"
											className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 transition group-hover:text-purple-950"
										>
											<span>Lihat Profil Divisi</span>
											<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default DivisionHighlight;
