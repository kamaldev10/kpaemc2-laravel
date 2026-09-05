import { ImagePlaceholder } from '@/Components/Public/UI/ImagePlaceholder';
import { mockHomeEvents } from '@/mocks/homeMock';
import { Event } from '@/types/event';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { FC } from 'react';

interface EventHighlightProps {
	events?: Event[] | null;
}

export const EventHighlight: FC<EventHighlightProps> = ({ events = mockHomeEvents }) => {
	const currentEvents = events && events.length > 0 ? events : mockHomeEvents;

	if (!currentEvents || currentEvents.length === 0) {
		return null;
	}

	return (
		<section className="py-20 bg-slate-900 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-purple-900/80 border border-purple-500/30 px-3.5 py-1 text-xs font-semibold text-purple-200 uppercase">
							<Sparkles className="h-3.5 w-3.5 text-amber-400" />
							<span>Agenda & Kegiatan Terbuka</span>
						</div>
						<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
							Kegiatan Mendatang KPA EMC²
						</h2>
						<p className="mt-3 text-base text-slate-300">
							Ikuti workshop konservasi, pelatihan navigasi darat, pendaftaran Sekolah Lingkungan, dan kegiatan
							lapangan lainnya yang terbuka untuk umum.
						</p>
					</div>

					<div>
						<Link
							href="/events"
							className="inline-flex items-center gap-2 text-sm font-bold text-purple-300 transition hover:text-white hover:underline"
						>
							<span>Lihat Semua Jadwal</span>
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				{/* Event Cards Grid */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{currentEvents.map((event) => {
						const cover = event.cover_url;
						const rawDate = event.start_date || event.event_date;
						const dateFormatted = rawDate
							? new Date(rawDate).toLocaleDateString('id-ID', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})
							: 'Jadwal Menyusul';

						return (
							<article
								key={event.id}
								className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 shadow-xl transition-all duration-200 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/20 md:flex-row"
							>
								{/* Image or Placeholder */}
								<div className="relative aspect-video w-full md:aspect-auto md:w-2/5 overflow-hidden bg-slate-900">
									{cover ? (
										<img
											src={cover}
											alt={event.title}
											loading="lazy"
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									) : (
										<ImagePlaceholder type="event" title={event.title} />
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 md:bg-gradient-to-r md:from-transparent md:to-slate-950/80 pointer-events-none" />
									<div className="absolute top-3 left-3 z-10">
										<span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow">
											Pendaftaran Dibuka
										</span>
									</div>
								</div>

								{/* Content */}
								<div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
									<div>
										{/* Date & Location Badges */}
										<div className="space-y-1.5 text-xs text-purple-300">
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-purple-400 shrink-0" />
												<span>{dateFormatted}</span>
											</div>
											{event.location && (
												<div className="flex items-center gap-2 text-slate-400">
													<MapPin className="h-4 w-4 text-amber-400 shrink-0" />
													<span className="line-clamp-1">{event.location}</span>
												</div>
											)}
										</div>

										{/* Title */}
										<h3 className="mt-3 text-lg font-bold leading-snug text-white transition group-hover:text-purple-300">
											<Link href={`/events/${event.slug}`}>{event.title}</Link>
										</h3>

										{/* Description */}
										<p className="mt-2.5 line-clamp-2 text-sm text-slate-400">
											{event.description || 'Pendaftaran kegiatan terbuka KPA EMC²...'}
										</p>
									</div>

									{/* Action Footer */}
									<div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
										<div>
											{Number(event.payment_amount) > 0 || (event.fee && event.fee > 0) ? (
												<span className="text-sm font-extrabold text-amber-400">
													Rp {Number(event.payment_amount || event.fee).toLocaleString('id-ID')}
												</span>
											) : (
												<span className="text-sm font-bold text-emerald-400">Gratis</span>
											)}
										</div>

										<Link
											href={`/events/${event.slug}`}
											className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-purple-600"
										>
											<span>Daftar Sekarang</span>
											<ArrowRight className="h-3.5 w-3.5" />
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

export default EventHighlight;
