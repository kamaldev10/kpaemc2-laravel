import { OrgHistoryPeriod } from '@/types/about';
import { Member } from '@/types/member';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
	Calendar,
	ChevronRight,
	ExternalLink,
	Eye,
	IdCard,
	Maximize2,
	ShieldCheck,
	X,
} from 'lucide-react';
import { FC, useState } from 'react';

interface PeriodStructure {
	image?: string;
	period?: string;
	chairmanName?: string;
	department?: string;
	description?: string;
}

interface AboutStructureSectionProps {
	orgStructure?: OrgHistoryPeriod[] | null;
	featuredMembers?: Member[] | null;
}

const defaultPeriods: PeriodStructure[] = [
	{
		period: '2025',
		chairmanName: 'Desti Seri Fatimah',
		department: 'Jurusan Fisika FMIPA UNRI',
		image: '/images/struktur-2025.png',
		description:
			'Kepengurusan periode aktif KPA EMC² yang berfokus pada digitalisasi arsip, peningkatan kapasitas kaderisasi, dan penguatan riset konservasi.',
	},
	{
		period: '2023-2024',
		chairmanName: 'Muhammad Farhan',
		department: 'Program Studi Sistem Informasi FMIPA UNRI',
		image: '/images/struktur-2024.png',
		description:
			'Periode ekspansi kolaborasi publik, pembaharuan kurikulum Sekolah Lingkungan, dan penyelenggaraan program pengabdian masyarakat berskala regional.',
	},
	{
		period: '2022-2023',
		chairmanName: 'Rina Noviana',
		department: 'Jurusan Fisika FMIPA UNRI',
		image: '/images/struktur-2023.png',
		description:
			'Periode kebangkitan pasca-pandemi dengan penjelajahan ekstensif, keterlibatan aktif dalam Ekspedisi Atap Negeri Gunung Djadi bersama Fiersa Besari.',
	},
	{
		period: '2021',
		chairmanName: 'Muhammad Ahlunnazah',
		department: 'Jurusan Fisika FMIPA UNRI',
		image: '/images/struktur-2023.png',
		description:
			'Periode konsolidasi organisasi, pemeliharaan soliditas anggota, dan adaptasi kegiatan lapangan dengan protokol keselamatan ketat.',
	},
];

export const AboutStructureSection: FC<AboutStructureSectionProps> = ({
	orgStructure,
	featuredMembers = [],
}) => {
	const periods: PeriodStructure[] =
		orgStructure && Array.isArray(orgStructure) && orgStructure.length > 0
			? orgStructure
			: defaultPeriods;

	const [selectedPeriodIndex, setSelectedPeriodIndex] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const currentPeriod = periods[selectedPeriodIndex] ?? periods[0];

	return (
		<section id="struktur" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Title */}
				<div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase text-purple-900">
							<ShieldCheck className="h-3.5 w-3.5 text-purple-700" />
							<span>Tata Kelola & Regenerasi</span>
						</div>
						<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
							Struktur Organisasi & Jejak Kepengurusan
						</h2>
						<p className="mt-3 text-base leading-relaxed text-slate-600">
							Kepemimpinan KPA EMC² dijalankan secara demokratis dan berasaskan
							kekeluargaan dengan regenerasi berkala untuk memastikan estafet
							pengabdian tetap menyala.
						</p>
					</div>

					{/* Period Pill Switcher */}
					<div className="shadow-xs flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5">
						{periods.map((p, idx) => {
							const isSelected = selectedPeriodIndex === idx;
							return (
								<button
									key={idx}
									type="button"
									onClick={() => setSelectedPeriodIndex(idx)}
									className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150 ${
										isSelected
											? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
											: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
									}`}
								>
									<span>Periode {p.period}</span>
									{idx === 0 && (
										<span className="py-0.2 ml-1.5 rounded-full bg-amber-400 px-1.5 text-[10px] font-extrabold text-slate-950">
											Aktif
										</span>
									)}
								</button>
							);
						})}
					</div>
				</div>

				{/* Active Period Leadership Detail Card */}
				<div className="shadow-xs mb-16 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 lg:p-12">
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
						{/* Left: Leader & Period Narrative */}
						<div className="space-y-6 lg:col-span-6">
							<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
								<Calendar className="h-4 w-4" />
								<span>Kepengurusan Periode {currentPeriod.period}</span>
							</div>

							<div>
								<span className="text-xs font-medium text-slate-500">
									Ketua Terpilih
								</span>
								<h3 className="mt-0.5 text-2xl font-extrabold text-slate-900 sm:text-3xl">
									{currentPeriod.chairmanName}
								</h3>
								<p className="mt-1 text-sm font-medium text-purple-700">
									{currentPeriod.department || 'FMIPA Universitas Riau'}
								</p>
							</div>

							<p className="text-sm leading-relaxed text-slate-600">
								{currentPeriod.description ||
									`Dewan kepengurusan KPA EMC² periode ${currentPeriod.period} bertugas memimpin seluruh kegiatan operasional, kaderisasi mahasiswa, dan program konservasi.`}
							</p>

							<div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
								<button
									type="button"
									onClick={() => setIsModalOpen(true)}
									className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-900 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
								>
									<Eye className="h-4 w-4" />
									<span>Lihat Bagan Struktur Lengkap</span>
								</button>

								<span className="text-xs font-medium text-slate-400">
									Bagan resmi terverifikasi FMIPA UNRI
								</span>
							</div>
						</div>

						{/* Right: Structure Diagram Interactive Preview Thumbnail */}
						<div className="lg:col-span-6">
							<div
								onClick={() => setIsModalOpen(true)}
								className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md transition-all hover:border-purple-300 hover:shadow-xl"
							>
								<div className="aspect-16/10 flex w-full items-center justify-center bg-gradient-to-br from-purple-950 to-slate-950 p-8">
									<div className="space-y-3 text-center">
										<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-transform group-hover:scale-110">
											<Maximize2 className="h-6 w-6 text-purple-300" />
										</div>
										<p className="text-sm font-bold text-white">
											Bagan Struktur Periode {currentPeriod.period}
										</p>
										<span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 group-hover:underline">
											<span>Klik untuk memperbesar gambar</span>
											<ChevronRight className="h-3.5 w-3.5" />
										</span>
									</div>
								</div>

								<div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-400">
									<span>Format: Bagan Diagram Organisasi</span>
									<span className="flex items-center gap-1 font-semibold text-purple-400">
										<ExternalLink className="h-3 w-3" />
										Buka Preview
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/*
				========================================================================
				[STATUS: HIDDEN / DISEMBUNYIKAN SEMENTARA]
				Section: Kader & Anggota Terdata (Showcase Direktori Anggota)
				Alasan: Disembunyikan sementara atas permintaan pengguna hingga data
				        dan dokumentasi foto seluruh anggota tervalidasi lengkap.
				========================================================================
				{featuredMembers && featuredMembers.length > 0 && (
					<div>
						<div className="flex items-center justify-between gap-4 mb-8">
							<div>
								<div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-wider">
									<Users className="h-4 w-4" />
									<span>Kader & Anggota Terdata</span>
								</div>
								<h3 className="text-xl font-extrabold text-slate-900 mt-1">
									Keluarga Besar Mahasiswa Pecinta Alam
								</h3>
							</div>

							<span className="text-xs text-slate-500 font-medium hidden sm:inline">
								Menampilkan {featuredMembers.length} kader dengan dokumentasi foto aktif
							</span>
						</div>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{featuredMembers.map((member) => (
								<div
									key={member.id}
									className="group flex flex-col items-center text-center rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-md"
								>
									<div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-purple-100 bg-purple-50 shadow-inner group-hover:border-purple-500 transition-colors">
										<img
											src={
												member.avatar_url ||
												'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg'
											}
											alt={member.name}
											loading="lazy"
											className="h-full w-full object-cover object-top"
										/>
									</div>

									<h4 className="line-clamp-1 text-xs font-bold text-slate-900 group-hover:text-purple-900">
										{member.name}
									</h4>
									<p className="mt-0.5 text-[11px] font-medium text-purple-700">
										{member.major || 'FMIPA UNRI'}
									</p>
									<span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
										{member.member_number ? member.member_number.split('/')[0] : `Angk. ${member.batch_year}`}
									</span>
								</div>
							))}
						</div>
					</div>
				)}
				*/}
			</div>

			{/* Modal Full Structure Viewer */}
			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				className="relative z-50"
			>
				<div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl">
						<div className="flex items-center justify-between border-b border-slate-100 pb-4">
							<div>
								<DialogTitle className="text-lg font-bold text-slate-900">
									Bagan Struktur Organisasi Periode {currentPeriod.period}
								</DialogTitle>
								<p className="text-xs text-slate-500">
									Ketua: {currentPeriod.chairmanName} ({currentPeriod.department})
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsModalOpen(false)}
								className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="my-6 flex max-h-[70vh] items-center justify-center overflow-auto rounded-2xl bg-slate-950 p-6">
							<div className="space-y-4 p-12 text-center text-slate-300">
								<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-900/60 text-amber-400">
									<IdCard className="h-8 w-8" />
								</div>
								<h4 className="text-xl font-bold text-white">
									Bagan Kepengurusan Periode {currentPeriod.period}
								</h4>
								<p className="mx-auto max-w-md text-xs text-slate-300">
									Tersusun atas Pimpinan Inti (Ketua, Sekretaris, Staff Ahli,
									Bendahara) dan 4 Divisi Operasional (Kaderisasi, SKLH, Litbang,
									Karata).
								</p>
								<div className="pt-2">
									<span className="inline-block rounded-full bg-purple-900 px-4 py-1.5 text-xs font-bold text-white">
										Ketua: {currentPeriod.chairmanName}
									</span>
								</div>
							</div>
						</div>

						<div className="flex justify-end pt-2">
							<button
								type="button"
								onClick={() => setIsModalOpen(false)}
								className="cursor-pointer rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
							>
								Tutup Preview
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</section>
	);
};

export default AboutStructureSection;
