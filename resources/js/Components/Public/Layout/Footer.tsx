import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { FC } from 'react';

export const Footer: FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-purple-950/40 bg-slate-950 text-slate-300">
			{/* Main Footer Links */}
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
					{/* Col 1: About Organization */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-800/60 bg-purple-900/60 p-1.5">
								<ApplicationLogo className="h-7 w-7 object-contain" />
							</div>
							<h4 className="text-base font-bold tracking-wide text-white">
								KPA EMC²
							</h4>
						</div>
						<p className="text-sm leading-relaxed text-slate-400">
							Wadah pembinaan kepemimpinan, kepribadian tangguh, ekspedisi ilmiah,
							serta aksi nyata pelestarian lingkungan hidup mahasiswa FMIPA
							Universitas Riau sejak 1984.
						</p>
						<div className="pt-2">
							<Link
								href="/about"
								className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 transition hover:text-purple-300 hover:underline"
							>
								<span>Baca Profil Selengkapnya</span>
								<span>&rarr;</span>
							</Link>
						</div>
					</div>

					{/* Col 2: 4 Divisi Operasional */}
					<div className="space-y-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider text-white">
							Divisi Operasional
						</h4>
						<ul className="space-y-2.5 text-sm">
							<li>
								<a
									href="/about#divisi"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Divisi Kaderisasi (Pendidikan & Sekolah Lingkungan)
								</a>
							</li>
							<li>
								<a
									href="/about#divisi"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Divisi SKLH (Sosial & Lingkungan Hidup)
								</a>
							</li>
							<li>
								<a
									href="/about#divisi"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Divisi Litbang (Riset & Eksplorasi)
								</a>
							</li>
							<li>
								<a
									href="/about#divisi"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Divisi Karata (Rumah Tangga & Logistik)
								</a>
							</li>
							<li>
								<a
									href="/about#struktur"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Struktur Inti Pimpinan & Pengurus
								</a>
							</li>
						</ul>
					</div>

					{/* Col 3: Publikasi & Kegiatan */}
					<div className="space-y-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider text-white">
							Publikasi & Agenda
						</h4>
						<ul className="space-y-2.5 text-sm">
							<li>
								<Link
									href="/posts"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Artikel & Postingan Ekspedisi
								</Link>
							</li>
							<li>
								<Link
									href="/events"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Katalog Agenda & Workshop
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Kode Etik Pecinta Alam
								</Link>
							</li>
							<li>
								<a
									href="/admin"
									className="text-slate-400 transition hover:text-purple-300"
								>
									Portal CMS Admin
								</a>
							</li>
						</ul>
					</div>

					{/* Col 4: Sekretariat & Kontak */}
					<div className="space-y-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider text-white">
							Sekretariat & Hubungi
						</h4>
						<ul className="space-y-3 text-sm text-slate-400">
							<li className="flex items-start gap-3">
								<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
								<span>Sekretariat KPA EMC², Kampus FMIPA UNRI</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail className="h-4 w-4 shrink-0 text-purple-400" />
								<a
									href="mailto:sekretariat@kpa-emc2.org"
									className="transition hover:text-white"
								>
									kpaemc2fmipaunri@gmail.com
								</a>
							</li>
							<li className="flex items-center gap-3">
								<Phone className="h-4 w-4 shrink-0 text-purple-400" />
								<a
									href="tel:+6281234567890"
									className="transition hover:text-white"
								>
									+62 812-3456-7890
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom Copyright Bar */}
			<div className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
					<p>© {currentYear} KPA EMC² FMIPA UNRI. Hak Cipta Dilindungi.</p>
					<p className="flex items-center gap-1">
						<span>Didedikasikan untuk Kelestarian Alam Indonesia</span>
						<Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
