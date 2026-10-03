import { PublicLayout } from '@/Components/Public/Layout/PublicLayout';
import { Registration } from '@/types/event';
import { Head, useForm } from '@inertiajs/react';
import {
	AlertCircle,
	Calendar,
	CheckCircle2,
	ClipboardList,
	Clock,
	MapPin,
	Search,
	XCircle,
} from 'lucide-react';
import { FC } from 'react';

interface RegistrationWithEvent extends Omit<Registration, 'event'> {
	event?: {
		id: string;
		title: string;
		slug: string;
		start_date?: string | null;
		end_date?: string | null;
		location?: string | null;
		cover_url?: string | null;
	} | null;
}

interface CheckStatusProps {
	registration?: RegistrationWithEvent | null;
	searched: boolean;
}

const StatusBadge: FC<{ status: string }> = ({ status }) => {
	const config: Record<string, { label: string; icon: FC<{ className?: string }>; className: string }> = {
		pending: {
			label: 'Menunggu Verifikasi',
			icon: Clock,
			className: 'bg-amber-50 text-amber-800 border-amber-200',
		},
		verified: {
			label: 'Terverifikasi',
			icon: CheckCircle2,
			className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
		},
		rejected: {
			label: 'Ditolak',
			icon: XCircle,
			className: 'bg-red-50 text-red-800 border-red-200',
		},
	};

	const cfg = config[status] ?? config['pending'];
	const Icon = cfg.icon;

	return (
		<span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${cfg.className}`}>
			<Icon className="h-3.5 w-3.5" />
			{cfg.label}
		</span>
	);
};

export const CheckStatus: FC<CheckStatusProps> = ({ registration, searched }) => {
	const { data, setData, post, processing, errors } = useForm({
		registration_code: '',
		email: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route('events.lookup-status'), { preserveScroll: true });
	};

	const formatDate = (dateStr?: string | null) => {
		if (!dateStr) return null;
		return new Date(dateStr).toLocaleDateString('id-ID', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	return (
		<PublicLayout>
			<Head>
				<title>Cek Status Pendaftaran — KPA EMC²</title>
				<meta name="description" content="Cek status pendaftaran kegiatan KPA EMC² menggunakan kode registrasi dan email Anda." />
				<meta property="og:title" content="Cek Status Pendaftaran — KPA EMC²" />
				<meta property="og:description" content="Cek status pendaftaran kegiatan KPA EMC² menggunakan kode registrasi dan email Anda." />
			</Head>

			<div className="min-h-screen bg-slate-50/50 pb-20">
				{/* Page Header */}
				<header className="border-b border-slate-200 bg-white py-10">
					<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
						<div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-purple-100 text-purple-800 mb-4">
							<ClipboardList className="h-7 w-7" />
						</div>
						<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
							Cek Status Pendaftaran
						</h1>
						<p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
							Masukkan kode registrasi dan email yang Anda gunakan saat mendaftar untuk melihat status verifikasi kepesertaan.
						</p>
					</div>
				</header>

				<main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
					{/* Lookup Form */}
					<div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label
									htmlFor="registration_code"
									className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
								>
									Kode Registrasi *
								</label>
								<input
									id="registration_code"
									type="text"
									required
									value={data.registration_code}
									onChange={(e) => setData('registration_code', e.target.value.toUpperCase())}
									placeholder="Contoh: REG-ABCD1234"
									className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-mono tracking-wider text-slate-900 uppercase focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
								/>
								{errors.registration_code && (
									<p className="mt-1 text-xs text-red-600">{errors.registration_code}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
								>
									Email Pendaftaran *
								</label>
								<input
									id="email"
									type="email"
									required
									value={data.email}
									onChange={(e) => setData('email', e.target.value)}
									placeholder="nama@email.com"
									className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
								/>
								{errors.email && (
									<p className="mt-1 text-xs text-red-600">{errors.email}</p>
								)}
							</div>

							<button
								type="submit"
								disabled={processing}
								className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-purple-900 py-3 text-sm font-bold text-white shadow-md shadow-purple-900/20 transition hover:bg-purple-800 disabled:opacity-50"
							>
								<Search className="h-4 w-4" />
								<span>{processing ? 'Mencari...' : 'Cek Status Pendaftaran'}</span>
							</button>
						</form>
					</div>

					{/* Search Result */}
					{searched && !registration && (
						<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
							<AlertCircle className="mx-auto h-12 w-12 text-slate-300 mb-3" />
							<h3 className="text-base font-bold text-slate-700">Data Pendaftaran Tidak Ditemukan</h3>
							<p className="mt-1 text-sm text-slate-500">
								Pastikan kode registrasi dan email yang Anda masukkan sesuai dengan data pendaftaran Anda.
							</p>
						</div>
					)}

					{registration && (
						<div className="rounded-3xl border border-purple-200/60 bg-white shadow-sm overflow-hidden">
							{/* Status Header */}
							<div className={`px-6 py-5 sm:px-8 border-b ${
								registration.status === 'verified'
									? 'bg-emerald-50 border-emerald-100'
									: registration.status === 'rejected'
										? 'bg-red-50 border-red-100'
										: 'bg-amber-50 border-amber-100'
							}`}>
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div>
										<p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
											Kode Registrasi
										</p>
										<p className="text-xl font-black tracking-widest text-slate-900 font-mono">
											{registration.registration_code}
										</p>
									</div>
									<StatusBadge status={registration.status} />
								</div>
							</div>

							<div className="p-6 sm:p-8 space-y-6">
								{/* Event Info */}
								{registration.event && (
									<div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
										<p className="text-xs font-bold uppercase tracking-wider text-slate-500">
											Kegiatan yang Didaftarkan
										</p>
										<p className="text-base font-bold text-slate-900">{registration.event.title}</p>
										<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
											{registration.event.start_date && (
												<span className="flex items-center gap-1">
													<Calendar className="h-3.5 w-3.5 text-purple-600" />
													{formatDate(registration.event.start_date)}
													{registration.event.end_date &&
														` — ${formatDate(registration.event.end_date)}`}
												</span>
											)}
											{registration.event.location && (
												<span className="flex items-center gap-1">
													<MapPin className="h-3.5 w-3.5 text-purple-600" />
													{registration.event.location}
												</span>
											)}
										</div>
									</div>
								)}

								{/* Participant Info */}
								<div>
									<p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
										Data Peserta
									</p>
									<dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
										<div>
											<dt className="text-xs text-slate-500">Nama Lengkap</dt>
											<dd className="font-semibold text-slate-900">{registration.full_name}</dd>
										</div>
										<div>
											<dt className="text-xs text-slate-500">Email</dt>
											<dd className="font-semibold text-slate-900">{registration.email}</dd>
										</div>
										{registration.phone && (
											<div>
												<dt className="text-xs text-slate-500">No. HP / WhatsApp</dt>
												<dd className="font-semibold text-slate-900">{registration.phone}</dd>
											</div>
										)}
										{registration.gender && (
											<div>
												<dt className="text-xs text-slate-500">Jenis Kelamin</dt>
												<dd className="font-semibold text-slate-900">
													{registration.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
												</dd>
											</div>
										)}
										{registration.institution && (
											<div>
												<dt className="text-xs text-slate-500">Universitas / Instansi</dt>
												<dd className="font-semibold text-slate-900">{registration.institution}</dd>
											</div>
										)}
										{registration.major && (
											<div>
												<dt className="text-xs text-slate-500">Jurusan / Prodi</dt>
												<dd className="font-semibold text-slate-900">{registration.major}</dd>
											</div>
										)}
										{registration.created_at && (
											<div>
												<dt className="text-xs text-slate-500">Tanggal Daftar</dt>
												<dd className="font-semibold text-slate-900">
													{new Date(registration.created_at).toLocaleDateString('id-ID', {
														day: 'numeric',
														month: 'long',
														year: 'numeric',
														hour: '2-digit',
														minute: '2-digit',
													})}
												</dd>
											</div>
										)}
									</dl>
								</div>

								{/* Reviewer Notes (if any) */}
								{registration.reviewer_notes && (
									<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
										<p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
											Catatan Panitia
										</p>
										<p className="text-sm text-slate-700 leading-relaxed">{registration.reviewer_notes}</p>
									</div>
								)}

								{/* Status explanation */}
								<div className={`rounded-2xl p-4 text-xs leading-relaxed ${
									registration.status === 'verified'
										? 'bg-emerald-50 text-emerald-800'
										: registration.status === 'rejected'
											? 'bg-red-50 text-red-800'
											: 'bg-amber-50 text-amber-800'
								}`}>
									{registration.status === 'verified' && (
										<p>
											✅ Selamat! Pendaftaran Anda telah <strong>diverifikasi</strong> oleh panitia KPA EMC². 
											Silakan pantau grup peserta atau email resmi untuk informasi teknis selanjutnya.
										</p>
									)}
									{registration.status === 'pending' && (
										<p>
											⏳ Pendaftaran Anda sedang <strong>menunggu verifikasi</strong> dari panitia. 
											Proses verifikasi biasanya membutuhkan 1–3 hari kerja. Harap bersabar.
										</p>
									)}
									{registration.status === 'rejected' && (
										<p>
											❌ Mohon maaf, pendaftaran Anda <strong>tidak dapat diterima</strong>. 
											Hubungi panitia KPA EMC² via WhatsApp atau email untuk informasi lebih lanjut.
										</p>
									)}
								</div>
							</div>
						</div>
					)}
				</main>
			</div>
		</PublicLayout>
	);
};

export default CheckStatus;
