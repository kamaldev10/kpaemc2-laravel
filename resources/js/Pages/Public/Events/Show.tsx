import { EventCard } from '@/Components/Public/Cards/EventCard';
import { PublicLayout } from '@/Components/Public/Layout/PublicLayout';
import { TagList } from '@/Components/Public/UI/TagList';
import { mockEvents } from '@/mocks/eventMock';
import { Event } from '@/types/event';
import { PageProps } from '@/types';
import { useIsMockDataEnabled } from '@/utils/mockData';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
	Calendar,
	CheckCircle2,
	ChevronLeft,
	Clock,
	FileText,
	Info,
	MapPin,
	Send,
	ShieldAlert,
	Sparkles,
	Wallet,
} from 'lucide-react';
import { FC, FormEventHandler, useMemo } from 'react';

interface CustomPageProps extends PageProps {
	flash?: { success?: string; error?: string };
}

interface EventsShowProps {
	event?: Event | null;
	relatedEvents?: Event[] | null;
}

export const EventsShow: FC<EventsShowProps> = ({ event = null, relatedEvents = [] }) => {
	const isMockEnabled = useIsMockDataEnabled();
	const { flash } = usePage<CustomPageProps>().props;

	const currentEvent: Event = useMemo(() => {
		if (event) return event;
		if (isMockEnabled) return mockEvents[0];
		return mockEvents[0];
	}, [event, isMockEnabled]);

	const currentRelated: Event[] = useMemo(() => {
		if (relatedEvents && relatedEvents.length > 0) return relatedEvents;
		if (isMockEnabled) {
			return mockEvents.filter((e) => e.id !== currentEvent.id).slice(0, 3);
		}
		return [];
	}, [relatedEvents, isMockEnabled, currentEvent.id]);

	// Registration form setup
	const { data, setData, post, processing, reset } = useForm({
		full_name: '',
		email: '',
		phone: '',
		gender: 'male',
		institution: '',
		major: '',
		motivation: '',
		extra_data: {} as Record<string, string>,
	});

	const handleSubmitRegistration: FormEventHandler = (e) => {
		e.preventDefault();
		post(`/events/${currentEvent.slug}/register`, {
			preserveScroll: true,
			onSuccess: () => reset(),
		});
	};

	const startDateFormatted = currentEvent.start_date
		? new Date(currentEvent.start_date).toLocaleDateString('id-ID', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
		: 'Segera Diumumkan';

	const endDateFormatted = currentEvent.end_date
		? new Date(currentEvent.end_date).toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
		: null;

	const deadlineFormatted = currentEvent.registration_close_at
		? new Date(currentEvent.registration_close_at).toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
		: 'Sebelum kuota terpenuhi';

	const isPaid = currentEvent.requires_payment && Number(currentEvent.payment_amount) > 0;
	const isRegistrationOpen = currentEvent.is_registration_open !== false;

	return (
		<PublicLayout>
			<Head>
				<title>{`${currentEvent.title} — KPA EMC²`}</title>
				<meta name="description" content={currentEvent.description || currentEvent.title} />
				<meta property="og:title" content={`${currentEvent.title} — KPA EMC²`} />
				<meta property="og:description" content={currentEvent.description || currentEvent.title} />
				<meta property="og:type" content="article" />
				{currentEvent.cover_url && (
					<meta property="og:image" content={currentEvent.cover_url} />
				)}
			</Head>

			<div className="min-h-screen bg-slate-50/50 pb-20">
				{/* Top Header & Breadcrumb */}
				<header className="border-b border-slate-200 bg-white py-8">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<Link
							href="/events"
							className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-purple-100 hover:text-purple-900 mb-6"
						>
							<ChevronLeft className="h-4 w-4" />
							<span>Kembali ke Katalog Agenda</span>
						</Link>

						<div className="flex flex-wrap items-center gap-3 mb-4">
							{currentEvent.category && (
								<span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-900">
									{currentEvent.category.name}
								</span>
							)}
							{currentEvent.division && (
								<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
									Diselenggarakan oleh {currentEvent.division.name}
								</span>
							)}
							<span
								className={`rounded-full px-3 py-1 text-xs font-bold ${
									isRegistrationOpen
										? 'bg-emerald-100 text-emerald-900'
										: 'bg-slate-200 text-slate-700'
								}`}
							>
								{isRegistrationOpen ? 'Pendaftaran Sedang Dibuka' : 'Pendaftaran Ditutup'}
							</span>
						</div>

						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
							{currentEvent.title}
						</h1>
					</div>
				</header>

				{/* Flash Message Banner */}
				{flash?.success && (
					<div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
						<div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-5 border border-emerald-200 text-emerald-900 shadow-sm">
							<CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
							<div>
								<h4 className="text-sm font-bold">Pendaftaran Berhasil Dikirim!</h4>
								<p className="mt-1 text-xs sm:text-sm leading-relaxed">{flash.success}</p>
							</div>
						</div>
					</div>
				)}

				{/* Main Content Layout */}
				<main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
						{/* Left Column: Event Details */}
						<div className="space-y-8 lg:col-span-7">
							{/* Cover Image */}
							<div className="relative aspect-16/9 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-sm">
								<img
									src={
										currentEvent.cover_url ||
										'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80'
									}
									alt={currentEvent.title}
									className="h-full w-full object-cover"
								/>
							</div>

							{/* Key Metrics Quick Cards */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
										<Calendar className="h-5 w-5" />
									</div>
									<div>
										<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
											Waktu Pelaksanaan
										</p>
										<p className="text-sm font-bold text-slate-900 mt-0.5">
											{startDateFormatted}
											{endDateFormatted && ` s/d ${endDateFormatted}`}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
										<MapPin className="h-5 w-5" />
									</div>
									<div>
										<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
											Lokasi Kegiatan
										</p>
										<p className="text-sm font-bold text-slate-900 mt-0.5">
											{currentEvent.location || 'Sekretariat KPA EMC²'}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
										<Wallet className="h-5 w-5" />
									</div>
									<div>
										<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
											Biaya Kontribusi
										</p>
										<p className="text-sm font-bold text-slate-900 mt-0.5">
											{isPaid
												? `Rp ${Number(currentEvent.payment_amount).toLocaleString('id-ID')}`
												: 'Gratis / Bebas Biaya'}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800">
										<Clock className="h-5 w-5" />
									</div>
									<div>
										<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
											Batas Registrasi
										</p>
										<p className="text-sm font-bold text-slate-900 mt-0.5">
											{deadlineFormatted}
										</p>
									</div>
								</div>
							</div>

							{/* Narrative Description */}
							<div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
								<h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
									<FileText className="h-5 w-5 text-purple-700" />
									<span>Deskripsi & Informasi Pelaksanaan</span>
								</h3>
								<div className="prose prose-purple max-w-none text-sm leading-relaxed text-slate-700 space-y-4">
									<p>{currentEvent.description}</p>
								</div>

								{/* Tags */}
								{currentEvent.tags && currentEvent.tags.length > 0 && (
									<div className="mt-8 pt-6 border-t border-slate-100">
										<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Topik Terkait:
										</p>
										<TagList tags={currentEvent.tags} />
									</div>
								)}
							</div>
						</div>

						{/* Right Column: Registration Form & Organizer Info */}
						<div className="space-y-6 lg:col-span-5">
							{/* Form Card */}
							<div className="rounded-3xl border border-purple-200/80 bg-white p-6 sm:p-8 shadow-lg shadow-purple-950/5">
								<div className="mb-6 border-b border-slate-100 pb-4">
									<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
										<Sparkles className="h-4 w-4" />
										<span>Formulir Pendaftaran Peserta</span>
									</div>
									<h3 className="text-xl font-extrabold text-slate-900 mt-1">
										Daftar Kegiatan Ini
									</h3>
									<p className="text-xs text-slate-500 mt-1">
										{isRegistrationOpen
											? 'Lengkapi data diri Anda di bawah untuk mengamankan kuota kepesertaan.'
											: 'Pendaftaran untuk kegiatan ini saat ini telah ditutup.'}
									</p>
								</div>

								{isRegistrationOpen ? (
									<form onSubmit={handleSubmitRegistration} className="space-y-4">
										{/* Full Name */}
										<div>
											<label
												htmlFor="full_name"
												className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
											>
												Nama Lengkap *
											</label>
											<input
												id="full_name"
												type="text"
												required
												value={data.full_name}
												onChange={(e) => setData('full_name', e.target.value)}
												placeholder="Contoh: Muhammad Farhan"
												className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
											/>
										</div>

										{/* Email & Phone */}
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div>
												<label
													htmlFor="email"
													className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
												>
													Email Aktif *
												</label>
												<input
													id="email"
													type="email"
													required
													value={data.email}
													onChange={(e) => setData('email', e.target.value)}
													placeholder="nama@email.com"
													className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
												/>
											</div>

											<div>
												<label
													htmlFor="phone"
													className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
												>
													No. WhatsApp / HP *
												</label>
												<input
													id="phone"
													type="tel"
													required
													value={data.phone}
													onChange={(e) => setData('phone', e.target.value)}
													placeholder="081234567890"
													className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
												/>
											</div>
										</div>

										{/* Institution & Major */}
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div>
												<label
													htmlFor="institution"
													className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
												>
													Universitas / Instansi
												</label>
												<input
													id="institution"
													type="text"
													value={data.institution}
													onChange={(e) => setData('institution', e.target.value)}
													placeholder="FMIPA UNRI"
													className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
												/>
											</div>

											<div>
												<label
													htmlFor="major"
													className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
												>
													Jurusan / Prodi
												</label>
												<input
													id="major"
													type="text"
													value={data.major}
													onChange={(e) => setData('major', e.target.value)}
													placeholder="Biologi / Informatika"
													className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
												/>
											</div>
										</div>

										{/* Dynamic Custom Form Fields */}
										{currentEvent.form_fields &&
											currentEvent.form_fields.map((field) => (
												<div key={field.key}>
													<label
														htmlFor={field.key}
														className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
													>
														{field.label} {field.required && '*'}
													</label>
													<input
														id={field.key}
														type={field.type === 'number' ? 'number' : 'text'}
														required={field.required}
														value={data.extra_data[field.key] || ''}
														onChange={(e) =>
															setData('extra_data', {
																...data.extra_data,
																[field.key]: e.target.value,
															})
														}
														placeholder={`Masukkan ${field.label.toLowerCase()}`}
														className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
													/>
												</div>
											))}

										{/* Motivation */}
										<div>
											<label
												htmlFor="motivation"
												className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
											>
												Motivasi & Harapan Mengikuti Kegiatan
											</label>
											<textarea
												id="motivation"
												rows={3}
												value={data.motivation}
												onChange={(e) => setData('motivation', e.target.value)}
												placeholder="Ceritakan motivasi singkat Anda bergabung dalam kegiatan ini..."
												className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
											/>
										</div>

										{/* Submit Button */}
										<div className="pt-2">
											<button
												type="submit"
												disabled={processing}
												className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-purple-900 py-3.5 text-sm font-bold text-white shadow-md shadow-purple-900/20 transition hover:bg-purple-800 disabled:opacity-50"
											>
												<Send className="h-4 w-4" />
												<span>{processing ? 'Memproses Pendaftaran...' : 'Kirim Pendaftaran Sekarang'}</span>
											</button>
										</div>
									</form>
								) : (
									<div className="rounded-2xl bg-slate-100 p-6 text-center text-slate-600">
										<ShieldAlert className="mx-auto h-10 w-10 text-slate-400 mb-2" />
										<p className="text-sm font-semibold">Pendaftaran Telah Ditutup</p>
										<p className="mt-1 text-xs text-slate-500">
											Batas waktu pendaftaran telah berakhir atau kuota peserta telah penuh.
										</p>
									</div>
								)}
							</div>

							{/* Help / Information Box */}
							<div className="rounded-3xl border border-purple-100 bg-purple-50/60 p-6 text-xs text-purple-900 space-y-2">
								<div className="flex items-center gap-2 font-bold text-purple-950">
									<Info className="h-4 w-4 text-purple-700" />
									<span>Bantuan Pendaftaran & Verifikasi</span>
								</div>
								<p className="leading-relaxed">
									Setelah formulir dikirim, panitia KPA EMC² akan mengirimkan instruksi teknis
									dan konfirmasi grup peserta melalui WhatsApp atau Email resmi.
								</p>
							</div>
						</div>
					</div>

					{/* Related Events Section */}
					{currentRelated.length > 0 && (
						<section className="mt-20 border-t border-slate-200 pt-14">
							<div className="mb-8">
								<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase text-purple-900">
									<Calendar className="h-3.5 w-3.5 text-purple-700" />
									<span>Agenda Pilihan Lainnya</span>
								</div>
								<h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
									Kegiatan Terbuka Mendatang
								</h2>
							</div>

							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{currentRelated.map((relEvent) => (
									<EventCard key={relEvent.id} event={relEvent} />
								))}
							</div>
						</section>
					)}
				</main>
			</div>
		</PublicLayout>
	);
};

export default EventsShow;
