import { EventCard } from '@/Components/Public/Cards/EventCard';
import { PublicLayout } from '@/Components/Public/Layout/PublicLayout';
import { CTABanner } from '@/Components/Public/UI/CTABanner';
import { PageHero } from '@/Components/Public/UI/PageHero';
import { Pagination } from '@/Components/Public/UI/Pagination';
import { SearchBar } from '@/Components/Public/UI/SearchBar';
import { useSearch } from '@/hooks/useSearch';
import { mockEvents } from '@/mocks/eventMock';
import { Event } from '@/types/event';
import { PaginatedData } from '@/types/pagination';
import { useIsMockDataEnabled } from '@/utils/mockData';
import { Head, router } from '@inertiajs/react';
import { Calendar, Compass, Sparkles } from 'lucide-react';
import { FC, useMemo } from 'react';

interface EventsIndexProps {
	events?: PaginatedData<Event> | Event[] | null;
	filters?: {
		search?: string;
	};
}

export const EventsIndex: FC<EventsIndexProps> = ({ events = null, filters = {} }) => {
	const isMockEnabled = useIsMockDataEnabled();

	const isPaginated = events !== null && typeof events === 'object' && 'data' in events;

	const resolvedEvents = useMemo(() => {
		if (isPaginated) {
			return (events as PaginatedData<Event>).data;
		}
		if (Array.isArray(events)) {
			return events;
		}
		if (isMockEnabled) {
			return mockEvents;
		}
		return [];
	}, [events, isPaginated, isMockEnabled]);

	const paginationLinks = isPaginated ? (events as PaginatedData<Event>).links : [];

	// Search handler
	const { term, setTerm } = useSearch({
		baseUrl: '/events',
		initialValue: filters.search || '',
		paramName: 'search',
		delay: 350,
	});

	return (
		<PublicLayout>
			<Head>
				<title>Katalog Agenda & Kegiatan Terbuka — KPA EMC²</title>
				<meta
					name="description"
					content="Jadwal pelatihan navigasi alam bebas, rekrutmen Sekolah Lingkungan, seminar konservasi, dan agenda penjelajahan alam terbuka KPA EMC² FMIPA Universitas Riau."
				/>
				<meta property="og:title" content="Katalog Agenda & Kegiatan Terbuka — KPA EMC²" />
				<meta
					property="og:description"
					content="Temukan agenda dan ikuti kegiatan terbuka KPA EMC² FMIPA Universitas Riau."
				/>
				<meta property="og:type" content="website" />
			</Head>

			{/* Page Hero */}
			<PageHero
				title="Agenda & Kegiatan Terbuka"
				subtitle="Tingkatkan wawasan konservasi, keterampilan teknis penjelajahan, dan jalin persaudaraan melalui kegiatan resmi KPA EMC²."
			/>

			{/* Search Bar Section */}
			<section className="shadow-xs sticky top-20 z-30 border-b border-purple-100 bg-white/95 py-4 backdrop-blur-md">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl">
						<SearchBar
							value={term}
							onChange={setTerm}
							placeholder="Cari kegiatan, lokasi, atau topik pelaksanaan..."
						/>
					</div>
				</div>
			</section>

			{/* Events Grid Section */}
			<section className="min-h-[500px] bg-slate-50/60 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Active Search Indicator */}
					{filters.search && (
						<div className="mb-8 flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50 p-4 text-xs text-purple-900">
							<div className="flex items-center gap-2">
								<Compass className="h-4 w-4 text-purple-700" />
								<span>
									Menampilkan hasil pencarian untuk "
									<strong>{filters.search}</strong>"
								</span>
							</div>
							<button
								type="button"
								onClick={() => router.get('/events')}
								className="cursor-pointer font-bold text-purple-800 underline hover:text-purple-950"
							>
								Reset Pencarian
							</button>
						</div>
					)}

					{/* Event Cards Grid */}
					{resolvedEvents.length > 0 ? (
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{resolvedEvents.map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</div>
					) : (
						/* Empty State */
						<div className="shadow-xs rounded-3xl border border-slate-200 bg-white p-16 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
								<Calendar className="h-8 w-8" />
							</div>
							<h3 className="mt-4 text-lg font-bold text-slate-900">
								Tidak Ada Kegiatan yang Sesuai
							</h3>
							<p className="mx-auto mt-2 max-w-md text-xs text-slate-500 sm:text-sm">
								{filters.search
									? 'Coba gunakan kata kunci pencarian yang lain atau lebih umum.'
									: 'Saat ini belum ada agenda kegiatan yang terpublikasi.'}
							</p>
							{filters.search && (
								<button
									type="button"
									onClick={() => router.get('/events')}
									className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-900 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-purple-800"
								>
									<Sparkles className="h-4 w-4" />
									<span>Lihat Semua Agenda</span>
								</button>
							)}
						</div>
					)}

					{/* Pagination */}
					{isPaginated && (
						<div className="mt-12">
							<Pagination links={paginationLinks} />
						</div>
					)}
				</div>
			</section>

			{/* CTA Banner */}
			<CTABanner
				title="Ingin Mengajukan Kolaborasi atau Kegiatan Bersama?"
				description="KPA EMC² membuka peluang kerja sama riset lingkungan, pelatihan navigasi lapangan, dan aksi sosial konservasi dengan lembaga sekolah maupun instansi."
				primaryButtonText="Hubungi Pengurus"
				primaryButtonHref="/contact"
				secondaryButtonText="Pelajari Nilai Organisasi"
				secondaryButtonHref="/about"
			/>
		</PublicLayout>
	);
};

export default EventsIndex;
