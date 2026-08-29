import { AboutInfo } from '@/types/about';
import { Division } from '@/types/division';
import { Event } from '@/types/event';
import { Post } from '@/types/post';

export const mockHomeAboutInfo: AboutInfo = {
	id: '00000000-0000-0000-0000-000000000001',
	org_name: 'KPA EMC²',
	short_name: 'EMC²',
	tagline: 'Bergerak Satu Asa, Berbekal Alam Lestari',
	motto: 'Bergerak Satu Asa, Berbekal Alam Lestari',
	description:
		'KPA EMC² adalah organisasi kemahasiswaan milik FMIPA UNRI yang bertujuan menghimpun, membina, mengedukasi, dan menyalurkan potensi mahasiswa FMIPA UNRI, serta berkontribusi menjaga kelestarian dan keseimbangan lingkungan hidup.',
	history:
		'Didirikan pada tanggal 10 Oktober 1984 di lingkungan Fakultas Matematika dan Ilmu Pengetahuan Alam Universitas Riau (FMIPA UNRI), KPA EMC² telah melalui berbagai dekade pengabdian dalam membina kader pecinta alam yang bermoral, berkarakter, serta mengedepankan riset ilmiah dan aksi pelestarian lingkungan hidup.',
	vision: 'Terwujudnya organisasi pecinta alam yang bertakwa kepada Tuhan Yang Maha Esa, berkarakter, berkualitas, serta berpartisipasi dalam pengembangan ilmu pengetahuan dan teknologi untuk mendukung pelestarian lingkungan hidup.',
	mission: [
		'Mengembangkan eksistensi organisasi di dalam maupun di luar universitas.',
		'Membentuk generasi yang bermoral, berkarakter dan intelektual.',
		'Berkontribusi dalam kegiatan sosial dan menjaga pelestarian lingkungan hidup.',
		'Menjalin silaturahmi baik kepada sesama pecinta alam maupun lembaga lain.',
	],
	founded_date: '10 Oktober 1984',
	established_at: '1984-10-10',
	active_term: '2025',
	address: 'Sekretariat KPA EMC², Kampus FMIPA Universitas Riau, Pekanbaru, Riau, Indonesia',
	email: 'sekretariat@kpa-emc2.org',
	phone: '+62 812-3456-7890',
	logo_url: 'https://res.cloudinary.com/dh7fjuxue/image/upload/v1788021964/logoemc.png',
	is_active: true,
};

export const mockHomeDivisions: Division[] = [
	{
		id: '00000000-0000-0000-0001-000000000001',
		name: 'Divisi Kaderisasi',
		slug: 'kaderisasi',
		description:
			'Pilar pembinaan, rekrutmen anggota baru, pendidikan dasar ruang & lapangan, serta penanaman kode etik dan loyalitas organisasi.',
		icon_name: 'Users',
		cover_url:
			'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0001-000000000002',
		name: 'Divisi SKLH',
		slug: 'sklh',
		description:
			'Sosial Kemasyarakatan & Lingkungan Hidup. Fokus pada advokasi konservasi, penanaman pohon, mitigasi bencana, dan pemberdayaan masyarakat desa hutan.',
		icon_name: 'TreePine',
		cover_url:
			'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0001-000000000003',
		name: 'Divisi Litbang',
		slug: 'litbang',
		description:
			'Penelitian & Pengembangan. Mengelola riset keanekaragaman hayati, pemetaan jalur ekspedisi, analisis data teknis lapangan, dan publikasi artikel/catatan ekspedisi.',
		icon_name: 'Compass',
		cover_url:
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0001-000000000004',
		name: 'Divisi Karata',
		slug: 'karata',
		description:
			'Kepala Rumah Tangga. Mengelola manajemen fasilitas sekretariat, pemeliharaan alat teknis pendakian, logistik ekspedisi, dan inventaris organisasi.',
		icon_name: 'Home',
		cover_url:
			'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
		is_active: true,
	},
];

export const mockHomePosts: Post[] = [
	{
		id: '00000000-0000-0000-0002-000000000018',
		title: 'Ekspedisi Gunung Djadi #1',
		slug: 'ekspedisi-gunung-djadi-1',
		excerpt:
			'Riau memiliki kekayaan alam yang sangat melimpah, siapa sangka kalau Riau memiliki Gunung dan berbagai pemandangan alam yang memanjakan mata, hati dan pikiran.',
		content:
			'<p>Ternyata di Riau Ada Gunungnya? Ekspedisi pembuktian KPA EMC² bersama Tim Atap Negeri di Puncak Gunung Djadi 1091 mdpl.</p>',
		cover_url:
			'https://res.cloudinary.com/dh7fjuxue/image/upload/v1753174565/post-images/ekspedisi-gunung-djadi-1-2025072208560.jpg',
		tags: ['kpaemc2', 'djadi', 'fiersa besari', 'mapala'],
		status: 'published',
		published_at: '2025-07-22 08:50:53',
		author_name: 'Ali Musthafa Kamal',
		is_active: true,
		category: {
			id: '00000000-0000-0000-0003-000000000005',
			name: 'Kolaborasi',
			slug: 'kolaborasi',
			type: 'post',
			is_active: true,
		},
	},
	{
		id: '00000000-0000-0000-0002-000000000019',
		title: 'Ekspedisi Gunung Djadi #2',
		slug: 'ekspedisi-gunung-djadi-2',
		excerpt:
			'Atap negeri merupakan salah satu projek Bung yang di Sponsori oleh Eiger, dengan tujuan untuk mengekplor dan mempublikasikan keindahan dan keunikan berbagai gunung di 33 Provinsi di Indonesia.',
		content:
			'<p>GUNUNG DJADI RIAU : Djadi Kenangan, Djadi Cerita, untung tidak menDjadi Berita.</p>',
		cover_url:
			'https://res.cloudinary.com/dh7fjuxue/image/upload/v1753175079/post-images/ekspedisi-gunung-djadi-2-2025072209043.jpg',
		tags: ['kpaemc2', 'djadi', 'fiersa besari', 'mapala'],
		status: 'published',
		published_at: '2025-07-22 08:56:26',
		author_name: 'Ali Musthafa Kamal',
		is_active: true,
		category: {
			id: '00000000-0000-0000-0003-000000000005',
			name: 'Kolaborasi',
			slug: 'kolaborasi',
			type: 'post',
			is_active: true,
		},
	},
	{
		id: '00000000-0000-0000-0002-000000000001',
		title: 'Hasil Riset Lapangan Litbang: Analisis Kualitas Air dan Hidrologi Kawasan Karst',
		slug: 'hasil-riset-lapangan-litbang-analisis-kualitas-air',
		excerpt:
			'Kajian mendalam Divisi Litbang KPA EMC² mengenai tandon air bawah tanah dan keanekaragaman biota perguaan.',
		content: '<p>Laporan lengkap riset hidrologi kawasan karst...</p>',
		cover_url:
			'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
		tags: ['Litbang', 'Karst', 'Riset'],
		status: 'published',
		published_at: '2026-08-15 10:00:00',
		author_name: 'Bayu Wicaksono',
		is_active: true,
		category: {
			id: '00000000-0000-0000-0003-000000000001',
			name: 'Ekspedisi & Penjelajahan',
			slug: 'ekspedisi',
			type: 'post',
			is_active: true,
		},
	},
];

export const mockHomeEvents: Event[] = [
	{
		id: '00000000-0000-0000-0004-000000000001',
		title: 'Sekolah Lingkungan Hidup 2026: Restorasi Ekosistem Pesisir & Mangrove',
		slug: 'sekolah-lingkungan-hidup-2026',
		description:
			'Pelatihan intensif 3 hari mengenai identifikasi mangrove, pengukuran karbon biru, serta penanaman bibit mangrove terbuka untuk pelajar dan mahasiswa.',
		location: 'Kawasan Konservasi Hutan Mangrove Pantai Utara',
		event_date: '2026-09-20 08:00:00',
		registration_deadline: '2026-09-15 23:59:00',
		quota: 60,
		fee: 75000,
		cover_url:
			'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
		tags: ['Konservasi', 'Mangrove', 'SKLH'],
		form_fields: [],
		status: 'open',
		is_active: true,
		category: {
			id: '00000000-0000-0000-0003-000000000002',
			name: 'Konservasi',
			slug: 'konservasi',
			type: 'event',
			is_active: true,
		},
	},
	{
		id: '00000000-0000-0000-0004-000000000002',
		title: 'Seminar Nasional Karst: Perlindungan Ekosistem Perguaan Indonesia',
		slug: 'seminar-nasional-karst-2026',
		description:
			'Simposium ilmiah menghadirkan pakar speleologi, akademisi geologi, dan perwakilan kementerian untuk merumuskan aksi perlindungan bentang alam karst.',
		location: 'Auditorium Utama Kampus & Hybrid Zoom',
		event_date: '2026-10-05 09:00:00',
		registration_deadline: '2026-10-01 23:59:00',
		quota: 200,
		fee: 0,
		cover_url:
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		tags: ['Seminar', 'Litbang', 'Karst'],
		form_fields: [],
		status: 'open',
		is_active: true,
		category: {
			id: '00000000-0000-0000-0003-000000000003',
			name: 'Edukasi',
			slug: 'edukasi',
			type: 'event',
			is_active: true,
		},
	},
];

export const mockHomeSiteSettings: Record<string, string> = {
	stats_years_active: '15',
	stats_members_count: '140+',
	stats_expeditions_count: '52',
	stats_summits_count: '86',
	organization_tagline: 'Bergerak Satu Asa, Berbekal Alam Lestari',
	contact_email: 'sekretariat@kpa-emc2.org',
	contact_phone: '+62 812-3456-7890',
	contact_address:
		'Sekretariat KPA EMC², Kampus FMIPA Universitas Riau, Pekanbaru, Riau, Indonesia',
	social_instagram: 'https://instagram.com/kpa_emc2',
};
