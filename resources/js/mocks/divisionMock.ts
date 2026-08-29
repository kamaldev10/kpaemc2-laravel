import { Division } from '@/types/division';

export const mockDivisions: Division[] = [
	{
		id: '00000000-0000-0000-0001-000000000001',
		slug: 'kaderisasi',
		name: 'Divisi Kaderisasi',
		icon_name: 'Users',
		cover_url:
			'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
		short_description:
			'Pilar utama regenerasi, pembinaan karakter, dan penanaman nilai-nilai kode etik pecinta alam.',
		full_description:
			'Divisi Kaderisasi bertugas merencanakan, melaksanakan, dan mengevaluasi seluruh tahapan kaderisasi anggota KPA EMC². Mulai dari masa bimbingan, Sekolah Lingkungan ruang dan lapangan, hingga pembinaan berkelanjutan guna membentuk kader yang berkarakter, bermoral, berintelektual, dan memiliki loyalitas tinggi terhadap organisasi.',
		study_materials: [
			'Sejarah & Keorganisasian KPA EMC²',
			'Kode Etik Pecinta Alam Indonesia',
			'Manajemen Perjalanan & Ekspedisi Alam Bebas',
			'Survival Dasar & Psikologi Bertahan Hidup',
			'Navigasi Darat (Peta Kompas & GPS)',
			'Pertolongan Pertama Gawat Darurat (PPGD/First Aid)',
		],
		equipment: [
			'Kompas Bidik & Prisma Silva',
			'Peta Topografi Skala 1:25.000 & 1:50.000',
			'Tenda Dome Regu & Dome Kapasitas 4 Orang',
			'Nesting Lapangan & Kompor Gas Portable',
			'Carrier 60L - 80L & Matras Lapangan',
			'Medkit Lapangan Lengkap (Standar Wilderness First Aid)',
		],
		sort_order: 1,
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0001-000000000002',
		slug: 'sklh',
		name: 'Divisi SKLH',
		icon_name: 'TreePine',
		cover_url:
			'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
		short_description:
			'Sosial Kemasyarakatan & Lingkungan Hidup yang berfokus pada konservasi, advokasi, dan edukasi ekologi.',
		full_description:
			'Divisi SKLH (Sosial Kemasyarakatan dan Lingkungan Hidup) berfokus pada perwujudan kepedulian sosial dan kelestarian alam melalui aksi konservasi nyata, reboisasi DAS dan mangrove, edukasi lingkungan di sekolah binaan (Sekolah Lingkungan Hidup), mitigasi kebencanaan, serta pemberdayaan masyarakat di sekitar kawasan hutan konservasi.',
		study_materials: [
			'Ekologi Hutan Tropis & Mangrove Pesisir',
			'Analisis Mengenai Dampak Lingkungan (AMDAL) Dasar',
			'Manajemen Bank Sampah & Pengomposan Organik',
			'Advokasi Kebijakan Lingkungan & Konflik Lahan',
			'Pemberdayaan Masyarakat Desa Penyangga Kawasan',
			'Pendidikan Lingkungan Hidup Usia Dini',
		],
		equipment: [
			'Bibit Pohon Endemik & Polybag Semai',
			'Alat Pengukur Kualitas Air (pH Meter, TDS Meter)',
			'Trash Bag Ramah Lingkungan & Sarung Tangan Karet',
			'Perangkat Komposter Anaerob & Aerob',
			'Megafon Lapangan & Sound System Portabel Edukasi',
			'Banner & Materi Ajar Modul Konservasi',
		],
		sort_order: 2,
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0001-000000000003',
		slug: 'litbang',
		name: 'Divisi Litbang',
		icon_name: 'Compass',
		cover_url:
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
		short_description:
			'Penelitian & Pengembangan yang mengintegrasikan sains, pemetaan GIS, dan dokumentasi ekspedisi.',
		full_description:
			'Divisi Litbang (Penelitian dan Pengembangan) bertanggung jawab atas eksplorasi ilmiah di alam bebas. Mengembangkan metodologi pemetaan bentang karst, inventarisasi keanekaragaman hayati (flora dan fauna endemik), penerapan sistem informasi geografis (GIS) dalam perintisan jalur, serta publikasi artikel dan laporan riset ekspedisi.',
		study_materials: [
			'Sistem Informasi Geografis (ArcGIS & QGIS)',
			'Metode Sampling Biodiversitas & Analisis Vegetasi',
			'Speleologi & Hidrologi Kawasan Karst',
			'Fotografi & Penulisan Artikel Ekspedisi Lapangan',
			'Penyusunan Artikel & Laporan Riset Ilmiah',
			'Teknik Penginderaan Jauh (Remote Sensing) Citra Satelit',
		],
		equipment: [
			'Perangkat GPS Handheld Garmin Etrex/64s',
			'Kamera DSLR & Drone Pemetaan Udara',
			'Binokular Pengamatan Satwa & Teleskop Lapangan',
			'Alat Ukur Hidrologi & Laser Rangefinder',
			'Buku Identifikasi Lapangan Burung, Mamalia & Karst',
			'Laptop Analisis Spasial & Database Riset',
		],
		sort_order: 3,
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0001-000000000004',
		slug: 'karata',
		name: 'Divisi Karata',
		icon_name: 'Home',
		cover_url:
			'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
		short_description:
			'Kepala Rumah Tangga pengelola inventaris teknis, perlengkapan ekspedisi, dan sekretariat.',
		full_description:
			'Divisi Karata (Kepala Rumah Tangga) mengelola operasional sekretariat organisasi, tata kelola logistik ekspedisi, pemeliharaan alat teknis pendakian berstandar UIAA/CE, administrasi peminjaman perlengkapan, serta menciptakan lingkungan sekretariat yang nyaman, tertib, dan produktif.',
		study_materials: [
			'Standarisasi Keamanan Alat Outdoor (UIAA & CE)',
			'Perawatan Tali Prusik, Karmantel, dan Webbing',
			'Manajemen Logistik & Nutrisi Ekspedisi Gunung Hutan',
			'Tata Kelola Inventaris & Sistem Pergudangan',
			'Prosedur Kalibrasi Alat Teknis Pemanjatan & Caving',
			'Kearsipan Surat & Logistik Rumah Tangga Sekretariat',
		],
		equipment: [
			'Tali Dinamis & Statis 50m - 100m',
			'Carabiner Screw & Autolock, Figure Eight, ATC',
			'Harness Sit & Full Body Standar Petzl',
			'Helm Panjat & Caving Petzl Elios/Boreas',
			'Lemari Kering Penyimpanan Alat Logam & Tali',
			'Toolkit Reparasi Tenda & Mesin Jahit Lapangan',
		],
		sort_order: 4,
		is_active: true,
	},
];
