import { mockHomeSiteSettings } from '@/mocks/homeMock';
import { Calendar, Compass, Mountain, Users } from 'lucide-react';
import { FC } from 'react';

interface StatsBarProps {
	siteSettings?: Record<string, string> | null;
}

export const StatsBar: FC<StatsBarProps> = ({ siteSettings = mockHomeSiteSettings }) => {
	const settings = siteSettings ?? mockHomeSiteSettings;

	const stats = [
		{
			id: 1,
			label: 'Tahun Berdiri & Pengabdian',
			value: settings.stats_years_active ?? '15',
			unit: 'Tahun',
			icon: Calendar,
			color: 'text-purple-700 bg-purple-100',
		},
		{
			id: 2,
			label: 'Anggota Aktif & Kader',
			value: settings.stats_members_count ?? '140+',
			unit: 'Orang',
			icon: Users,
			color: 'text-indigo-700 bg-indigo-100',
		},
		{
			id: 3,
			label: 'Ekspedisi & Riset Lapangan',
			value: settings.stats_expeditions_count ?? '52',
			unit: 'Ekspedisi',
			icon: Compass,
			color: 'text-amber-700 bg-amber-100',
		},
		{
			id: 4,
			label: 'Puncak & Gua Terjelajahi',
			value: settings.stats_summits_count ?? '86',
			unit: 'Kawasan',
			icon: Mountain,
			color: 'text-emerald-700 bg-emerald-100',
		},
	];

	return (
		<section className="relative z-20 -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-950/5 md:p-8">
				<div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
					{stats.map((item) => {
						const Icon = item.icon;
						return (
							<div
								key={item.id}
								className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-4"
							>
								<div
									className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl ${item.color} mb-3 sm:mb-0`}
								>
									<Icon className="h-6 w-6" strokeWidth={2} />
								</div>
								<div>
									<div className="flex items-baseline justify-center sm:justify-start gap-1">
										<span className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
											{item.value}
										</span>
									</div>
									<p className="text-xs font-medium text-slate-500">{item.label}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default StatsBar;
