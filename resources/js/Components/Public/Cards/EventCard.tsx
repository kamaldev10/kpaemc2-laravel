import { ImagePlaceholder } from '@/Components/Public/UI/ImagePlaceholder';
import { Event } from '@/types/event';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';
import { FC } from 'react';

interface EventCardProps {
	event: Event;
	featured?: boolean;
	className?: string;
}

export const EventCard: FC<EventCardProps> = ({ event, featured = false, className = '' }) => {
	const formattedDate = event.start_date
		? new Date(event.start_date).toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
			})
		: event.event_date
			? new Date(event.event_date).toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				})
			: 'Jadwal Menyusul';

	const isPaid =
		(event.requires_payment && Number(event.payment_amount) > 0) ||
		(event.fee && event.fee > 0);
	const paymentDisplay = isPaid
		? `Rp ${Number(event.payment_amount || event.fee).toLocaleString('id-ID')}`
		: 'Gratis / Terbuka';
	const isRegistrationOpen = event.is_registration_open !== false;

	return (
		<article
			className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-950/10 ${className}`}
		>
			{/* Event Cover Image or Placeholder */}
			<div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
				{event.cover_url ? (
					<img
						src={event.cover_url}
						alt={event.title}
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<ImagePlaceholder type="event" title={event.title} />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

				{/* Top Badges */}
				<div className="absolute left-3.5 top-3.5 z-10 flex flex-wrap items-center gap-2">
					{event.category && (
						<span className="inline-flex items-center rounded-full bg-purple-900/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
							{event.category.name}
						</span>
					)}
					<span
						className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow-md backdrop-blur-md ${
							isPaid
								? 'bg-amber-500/95 text-slate-950'
								: 'bg-emerald-600/95 text-white'
						}`}
					>
						{paymentDisplay}
					</span>
				</div>

				{/* Registration Status Pill */}
				<div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-xs text-white drop-shadow-md">
					<span className="flex items-center gap-1.5 font-semibold">
						<Calendar className="h-3.5 w-3.5 text-purple-300" />
						<span>{formattedDate}</span>
					</span>

					<span
						className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
							isRegistrationOpen
								? 'bg-emerald-500 text-white'
								: 'bg-slate-700 text-slate-200'
						}`}
					>
						{isRegistrationOpen ? 'Pendaftaran Dibuka' : 'Ditutup'}
					</span>
				</div>
			</div>

			{/* Event Body Content */}
			<div className="flex flex-1 flex-col justify-between p-6">
				<div>
					{/* Location */}
					{event.location && (
						<div className="mb-2.5 flex items-center gap-1.5 text-xs text-slate-500">
							<MapPin className="h-3.5 w-3.5 text-purple-700 shrink-0" />
							<span className="truncate">{event.location}</span>
						</div>
					)}

					{/* Title */}
					<h3
						className={`font-bold tracking-tight text-slate-900 transition-colors group-hover:text-purple-900 ${
							featured ? 'text-xl line-clamp-2' : 'text-base sm:text-lg line-clamp-2'
						}`}
					>
						<Link href={`/events/${event.slug}`}>{event.title}</Link>
					</h3>

					{/* Description */}
					<p className="mt-3 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600">
						{event.description || 'Pelajari detail informasi pelaksanaan kegiatan ini selengkapnya...'}
					</p>

					{/* Tags */}
					{event.tags && event.tags.length > 0 && (
						<div className="mt-4 flex flex-wrap items-center gap-1.5">
							{event.tags.slice(0, 3).map((tag, idx) => (
								<span
									key={idx}
									className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-800"
								>
									<Tag className="h-2.5 w-2.5" />
									<span>#{tag}</span>
								</span>
							))}
						</div>
					)}
				</div>

				{/* Footer CTA */}
				<div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
					<div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
						{event.division && (
							<span className="truncate max-w-[150px] font-semibold text-purple-900">
								{event.division.name}
							</span>
						)}
					</div>

					<Link
						href={`/events/${event.slug}`}
						className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 transition group-hover:text-purple-600 group-hover:gap-2.5"
					>
						<span>Detail & Daftar</span>
						<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
					</Link>
				</div>
			</div>
		</article>
	);
};

export default EventCard;
