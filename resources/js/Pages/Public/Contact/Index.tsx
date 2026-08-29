import { PublicLayout } from '@/Components/Public/Layout/PublicLayout';
import { PageHero } from '@/Components/Public/UI/PageHero';
import { mockContactInfo } from '@/mocks/contactMock';
import { PageProps } from '@/types';
import { AboutInfo } from '@/types/about';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
	CheckCircle2,
	Clock,
	ExternalLink,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	Send,
	Share2,
	Sparkles,
	Video,
} from 'lucide-react';
import { FC, FormEventHandler } from 'react';

interface CustomPageProps extends PageProps {
	flash?: { success?: string; error?: string };
}

interface ContactIndexProps {
	aboutInfo?: AboutInfo | null;
	siteSettings?: Record<string, string> | null;
}

export const ContactIndex: FC<ContactIndexProps> = ({ aboutInfo = null, siteSettings = null }) => {
	const { flash, errors } = usePage<CustomPageProps>().props;

	const { data, setData, post, processing, reset } = useForm({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		post('/contact', {
			preserveScroll: true,
			onSuccess: () => reset(),
		});
	};

	const email = siteSettings?.contact_email || aboutInfo?.email || mockContactInfo.email;
	const phone = siteSettings?.contact_phone || aboutInfo?.phone || mockContactInfo.phone;
	const address = siteSettings?.contact_address || aboutInfo?.address || mockContactInfo.address;
	const mapEmbedUrl = mockContactInfo.map_embed_url;
	const googleMapsUrl = mockContactInfo.google_maps_url;
	const instagramUrl = mockContactInfo.instagram;
	const youtubeUrl = mockContactInfo.youtube;

	return (
		<PublicLayout>
			<Head>
				<title>Hubungi Kami & Sekretariat — KPA EMC²</title>
				<meta
					name="description"
					content="Informasi kontak resmi, lokasi sekretariat di Kampus FMIPA Universitas Riau, dan formulir pengajuan kolaborasi atau pertanyaan untuk KPA EMC²."
				/>
				<meta property="og:title" content="Hubungi Kami & Sekretariat — KPA EMC²" />
				<meta
					property="og:description"
					content="Hubungi pengurus KPA EMC² FMIPA Universitas Riau untuk kolaborasi kegiatan, riset, atau permohonan informasi."
				/>
				<meta property="og:type" content="website" />
			</Head>

			{/* Page Hero */}
			<PageHero
				title="Hubungi Sekretariat & Pengurus"
				subtitle="Punya pertanyaan seputar organisasi, agenda kegiatan, atau ingin berkolaborasi? Kami siap menyambut Anda dengan hangat."
				backgroundImageUrl="https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1920&q=80"
			/>

			{/* Quick Contact Cards */}
			<section className="border-b border-slate-200 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{/* Card 1: Alamat */}
						<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-purple-200 hover:bg-purple-50/40">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-900 shadow-xs mb-4">
								<MapPin className="h-5 w-5" />
							</div>
							<h3 className="text-sm font-bold text-slate-900">Sekretariat Utama</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
								{address}
							</p>
						</div>

						{/* Card 2: Email */}
						<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-purple-200 hover:bg-purple-50/40">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-900 shadow-xs mb-4">
								<Mail className="h-5 w-5" />
							</div>
							<h3 className="text-sm font-bold text-slate-900">Surel Resmi</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-600">
								<a
									href={`mailto:${email}`}
									className="font-semibold text-purple-800 hover:underline break-all"
								>
									{email}
								</a>
							</p>
							<p className="mt-1 text-[11px] text-slate-400">Respon dalam 1x24 jam kerja</p>
						</div>

						{/* Card 3: Telepon / WA */}
						<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-purple-200 hover:bg-purple-50/40">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-900 shadow-xs mb-4">
								<Phone className="h-5 w-5" />
							</div>
							<h3 className="text-sm font-bold text-slate-900">WhatsApp & Telepon</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-600">
								<a
									href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
									target="_blank"
									rel="noreferrer"
									className="font-semibold text-purple-800 hover:underline"
								>
									{phone}
								</a>
							</p>
							<p className="mt-1 text-[11px] text-slate-400">Layanan pengurus harian</p>
						</div>

						{/* Card 4: Jam Operasional */}
						<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-purple-200 hover:bg-purple-50/40">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-900 shadow-xs mb-4">
								<Clock className="h-5 w-5" />
							</div>
							<h3 className="text-sm font-bold text-slate-900">Jam Operasional</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-600">
								{mockContactInfo.operational_hours}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content: Form & Maps */}
			<section className="py-16 bg-slate-50/60">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						{/* Left Column: Contact Form */}
						<div className="lg:col-span-7">
							<div className="rounded-3xl border border-purple-100 bg-white p-8 sm:p-10 shadow-lg shadow-purple-950/5">
								<div className="mb-8">
									<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold uppercase text-purple-900">
										<MessageSquare className="h-3.5 w-3.5 text-purple-700" />
										<span>Kirim Pesan Langsung</span>
									</div>
									<h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
										Sampaikan Pertanyaan atau Ajakan Kerjasama
									</h2>
									<p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
										Silakan isi formulir di bawah ini. Pesan Anda akan langsung diterima oleh
										Dewan Pengurus Harian KPA EMC².
									</p>
								</div>

								{/* Flash Notification */}
								{flash?.success && (
									<div className="mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
										<CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
										<p>{flash.success}</p>
									</div>
								)}

								<form onSubmit={handleSubmit} className="space-y-5">
									{/* Name */}
									<div>
										<label
											htmlFor="name"
											className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
										>
											Nama Lengkap *
										</label>
										<input
											id="name"
											type="text"
											required
											value={data.name}
											onChange={(e) => setData('name', e.target.value)}
											placeholder="Contoh: Sarah Aulia"
											className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
										/>
										{errors.name && (
											<p className="mt-1 text-xs text-rose-600">{errors.name}</p>
										)}
									</div>

									{/* Email */}
									<div>
										<label
											htmlFor="email"
											className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
										>
											Alamat Email Aktif *
										</label>
										<input
											id="email"
											type="email"
											required
											value={data.email}
											onChange={(e) => setData('email', e.target.value)}
											placeholder="nama@domain.com"
											className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
										/>
										{errors.email && (
											<p className="mt-1 text-xs text-rose-600">{errors.email}</p>
										)}
									</div>

									{/* Subject */}
									<div>
										<label
											htmlFor="subject"
											className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
										>
											Subjek / Perihal *
										</label>
										<input
											id="subject"
											type="text"
											required
											value={data.subject}
											onChange={(e) => setData('subject', e.target.value)}
											placeholder="Contoh: Penawaran Kerjasama Workshop Lingkungan"
											className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
										/>
										{errors.subject && (
											<p className="mt-1 text-xs text-rose-600">{errors.subject}</p>
										)}
									</div>

									{/* Message */}
									<div>
										<label
											htmlFor="message"
											className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
										>
											Isi Pesan *
										</label>
										<textarea
											id="message"
											rows={5}
											required
											value={data.message}
											onChange={(e) => setData('message', e.target.value)}
											placeholder="Tuliskan pesan, rincian pertanyaan, atau proposal Anda secara lengkap..."
											className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
										/>
										{errors.message && (
											<p className="mt-1 text-xs text-rose-600">{errors.message}</p>
										)}
									</div>

									{/* Submit */}
									<div className="pt-2">
										<button
											type="submit"
											disabled={processing}
											className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-900 py-4 text-sm font-bold text-white shadow-md shadow-purple-950/20 transition hover:bg-purple-800 disabled:opacity-50"
										>
											<Send className="h-4 w-4" />
											<span>{processing ? 'Sedang Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
										</button>
									</div>
								</form>
							</div>
						</div>

						{/* Right Column: Maps Embed & Social Channels */}
						<div className="space-y-8 lg:col-span-5">
							{/* Location Map Box */}
							<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
								<div className="p-6 border-b border-slate-100 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<MapPin className="h-5 w-5 text-purple-700" />
										<h3 className="font-bold text-slate-900 text-sm">Lokasi Kampus UNRI</h3>
									</div>
									<a
										href={googleMapsUrl}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 hover:underline"
									>
										<span>Buka di Google Maps</span>
										<ExternalLink className="h-3.5 w-3.5" />
									</a>
								</div>
								<div className="aspect-16/11 w-full bg-slate-100">
									<iframe
										src={mapEmbedUrl}
										title="Lokasi Sekretariat KPA EMC2"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
							</div>

							{/* Social Media Official Channels */}
							<div className="rounded-3xl border border-purple-100 bg-white p-6 sm:p-8 shadow-xs space-y-4">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
									<Sparkles className="h-4 w-4" />
									<span>Saluran Resmi Media Sosial</span>
								</div>
								<p className="text-xs text-slate-600 leading-relaxed">
									Ikuti linimasa perjalanan, update cuaca jalur pendakian, dan agenda terbuka
									melalui kanal resmi KPA EMC²:
								</p>

								<div className="grid grid-cols-1 gap-3 pt-2">
									<a
										href={instagramUrl}
										target="_blank"
										rel="noreferrer"
										className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-purple-300 hover:bg-purple-50/50 group"
									>
										<div className="flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-700 text-white shadow-xs">
												<Share2 className="h-5 w-5" />
											</div>
											<div>
												<p className="text-xs font-bold text-slate-900 group-hover:text-purple-900">
													Instagram Resmi
												</p>
												<p className="text-[11px] text-slate-500">@kpa_emc2</p>
											</div>
										</div>
										<ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-purple-700" />
									</a>

									<a
										href={youtubeUrl}
										target="_blank"
										rel="noreferrer"
										className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-red-300 hover:bg-red-50/50 group"
									>
										<div className="flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
												<Video className="h-5 w-5" />
											</div>
											<div>
												<p className="text-xs font-bold text-slate-900 group-hover:text-red-900">
													YouTube Channel
												</p>
												<p className="text-[11px] text-slate-500">Dokumentasi Ekspedisi</p>
											</div>
										</div>
										<ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-red-700" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
};

export default ContactIndex;
