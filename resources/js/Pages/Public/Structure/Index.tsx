import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import DivisionMemberGroup from '@/Components/Public/Sections/DivisionMemberGroup';
import OrgChart from '@/Components/Public/Sections/OrgChart';
import CTABanner from '@/Components/Public/UI/CTABanner';
import PageHero from '@/Components/Public/UI/PageHero';
import { mockAboutFull } from '@/mocks/aboutMock';
import { mockDivisions } from '@/mocks/divisionMock';
import { mockMembers } from '@/mocks/memberMock';
import { AboutInfo } from '@/types/about';
import { Division } from '@/types/division';
import { Member } from '@/types/member';
import { resolveData, useIsMockDataEnabled } from '@/utils/mockData';
import { Head } from '@inertiajs/react';
import { Filter, Users } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

interface StructureIndexProps {
	aboutInfo?: AboutInfo | null;
	divisions?: Division[] | null;
	members?: Member[] | null;
}

export const StructureIndex: FC<StructureIndexProps> = ({ aboutInfo, divisions, members }) => {
	const isMockEnabled = useIsMockDataEnabled();

	const currentAbout = resolveData(aboutInfo, mockAboutFull, isMockEnabled);
	const currentDivisions = resolveData(divisions, mockDivisions, isMockEnabled) ?? [];
	const currentMembers = resolveData(members, mockMembers, isMockEnabled) ?? [];

	const [selectedDivision, setSelectedDivision] = useState<string>('all');

	// Group members into Leadership and Divisions
	const leadershipMembers = useMemo(() => {
		return currentMembers.filter((m) => m.is_leader || !m.division_id);
	}, [currentMembers]);

	const divisionMap = useMemo(() => {
		const map: Record<string, Member[]> = {};
		currentDivisions.forEach((div) => {
			map[div.id] = currentMembers.filter((m) => m.division_id === div.id);
		});
		return map;
	}, [currentDivisions, currentMembers]);

	const visibleDivisions = useMemo(() => {
		if (selectedDivision === 'all') {
			return currentDivisions;
		}
		if (selectedDivision === 'leadership') {
			return [];
		}
		return currentDivisions.filter(
			(d) => d.id === selectedDivision || d.slug === selectedDivision
		);
	}, [currentDivisions, selectedDivision]);

	const showLeadership = selectedDivision === 'all' || selectedDivision === 'leadership';

	return (
		<PublicLayout>
			<Head>
				<title>Struktur Kepengurusan & Anggota — KPA EMC²</title>
				<meta
					name="description"
					content={`Struktur organisasi dan susunan kepengurusan KPA EMC² Periode ${
						currentAbout?.active_term || '2025'
					}. Mengenal Dewan Pengurus Harian dan 4 Divisi Operasional.`}
				/>
			</Head>

			{/* Page Hero */}
			<PageHero
				title="Struktur Kepengurusan"
				subtitle={`Bagan hierarki kepemimpinan, Badan Pengurus Harian, dan personil operasional 4 divisi KPA EMC² Periode ${
					currentAbout?.active_term || '2025'
				}.`}
				backgroundImageUrl="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1920&q=80"
			/>

			{/* Filter Bar */}
			<div className="sticky top-20 z-30 border-b border-purple-100 bg-white/95 backdrop-blur-md shadow-xs py-3.5">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-2 overflow-x-auto">
						<div className="flex items-center gap-1 text-xs font-bold text-slate-400 mr-2 shrink-0">
							<Filter className="h-3.5 w-3.5" />
							<span>Filter:</span>
						</div>

						<button
							type="button"
							onClick={() => setSelectedDivision('all')}
							className={`rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
								selectedDivision === 'all'
									? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
									: 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900'
							}`}
						>
							Semua Pengurus ({currentMembers.length})
						</button>

						<button
							type="button"
							onClick={() => setSelectedDivision('leadership')}
							className={`rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
								selectedDivision === 'leadership'
									? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
									: 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900'
							}`}
						>
							Inti Pimpinan / BPH ({leadershipMembers.length})
						</button>

						{currentDivisions.map((div) => {
							const count = divisionMap[div.id]?.length || 0;
							const isSelected = selectedDivision === div.id || selectedDivision === div.slug;
							return (
								<button
									key={div.id}
									type="button"
									onClick={() => setSelectedDivision(div.id)}
									className={`rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
										isSelected
											? 'bg-purple-900 text-white shadow-md shadow-purple-900/20'
											: 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900'
									}`}
								>
									{div.name} ({count})
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="py-16 bg-slate-50/50 space-y-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
					{/* Leadership Section */}
					{showLeadership && leadershipMembers.length > 0 && (
						<OrgChart leaders={leadershipMembers} />
					)}

					{/* Division Groups */}
					{visibleDivisions.length > 0 && (
						<div className="space-y-12">
							{visibleDivisions.map((division) => (
								<DivisionMemberGroup
									key={division.id}
									division={division}
									members={divisionMap[division.id] || []}
								/>
							))}
						</div>
					)}

					{/* Empty State */}
					{!showLeadership && visibleDivisions.length === 0 && (
						<div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
							<Users className="mx-auto h-12 w-12 text-slate-300" />
							<p className="mt-4 text-sm font-semibold text-slate-600">
								Tidak ada data pengurus yang sesuai dengan filter ini.
							</p>
						</div>
					)}
				</div>
			</div>

			<CTABanner
				title="Ingin Menjadi Bagian dari Kepengurusan Berikutnya?"
				description="Tingkatkan kapasitas kepemimpinan dan dedikasimu melalui regenerasi organisasi KPA EMC²."
				primaryButtonText="Pelajari Nilai Organisasi"
				primaryButtonHref="/about"
				secondaryButtonText="Hubungi Pengurus"
				secondaryButtonHref="/contact"
			/>
		</PublicLayout>
	);
};

export default StructureIndex;
