import { Category, Post } from '@/types/post';

export const mockCategories: Category[] = [
	{
		id: '00000000-0000-0000-0003-000000000005',
		name: 'Kolaborasi',
		slug: 'kolaborasi',
		type: 'post',
		description: 'Kegiatan kolaborasi dan ekspedisi bersama organisasi luar.',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0003-000000000001',
		name: 'Ekspedisi & Penjelajahan',
		slug: 'ekspedisi',
		type: 'post',
		description: 'Laporan perjalanan dan penjelajahan rimba gunung.',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0003-000000000002',
		name: 'Konservasi & Lingkungan',
		slug: 'konservasi',
		type: 'post',
		description: 'Aksi nyata pelestarian ekosistem dan lingkungan hidup.',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0003-000000000003',
		name: 'Riset & Litbang',
		slug: 'riset',
		type: 'post',
		description: 'Kajian ilmiah bentang alam, goa, dan flora-fauna.',
		is_active: true,
	},
];

export const mockPosts: Post[] = [
	{
		id: '00000000-0000-0000-0002-000000000018',
		category_id: '00000000-0000-0000-0003-000000000005',
		category: mockCategories[0],
		division_id: '00000000-0000-0000-0001-000000000003',
		title: 'Ekspedisi Gunung Djadi #1',
		slug: 'ekspedisi-gunung-djadi-1',
		excerpt:
			'Riau memiliki kekayaan alam yang sangat melimpah, siapa sangka kalau Riau memiliki Gunung dan berbagai pemandangan alam yang memanjakan mata, hati dan pikiran, Selama ini orang tidak tau kalau Riau ada gunungnya. Kebanyakan dari kita tau kalau Riau memiliki banyak tempat wisata air terjun saja.',
		content: `
<h2>Ternyata di Riau Ada Gunungnya?</h2>
<p>Provinsi Riau merupakan sebuah provinsi di Indonesia yang terletak di bagian tengah pulau Sumatra, yaitu di sepanjang pesisir Selat Melaka. Ibu kota dan kota terbesar Riau adalah Pekanbaru. Posisi Geografis Provinsi Riau adalah antara 01°31 – 02°25 Lintang Selatan atau antara 100° – 105° Bujur Timur.</p>
<p>Untuk membuktikan kalau di Riau ada Gunungnya, <strong>KPA EMC² bersama Tim Atap Negeri</strong> melakukan ekspedisi ke puncak tertinggi di Provinsi Riau, puncak tersebut bernama <strong>Puncak Gunung Djadi</strong>, yang memiliki ketinggian 1.091 mdpl. Gunung ini terletak di Hulu Sungai Kampar, Kecamatan Kampar Kiri Hulu, Provinsi Riau.</p>
<p>Ekspedisi ini terdiri dari Tim Atap Negeri dan Tim dari KPA EMC² FMIPA UNRI. Tim Atap Negeri beranggotakan Fiersa Besari (Bung Fiersa), Reza Dwi Yanda (Ejak), Muh. Misbahuddin (ahli navigasi/Wanadri), Eki Sulistina (cameraman), dan Hendra Sianipar (Wanadri). Sedangkan tim dari KPA EMC² beranggotakan Rina Noviana dan Ali Musthafa Kamal.</p>
<p>Nantikan cerita kami di episode selanjutnya. Salam Lestari!</p>
`,
		cover_url:
			'https://res.cloudinary.com/dh7fjuxue/image/upload/v1753174565/post-images/ekspedisi-gunung-djadi-1-2025072208560.jpg',
		cover_public_id: 'post-images/ekspedisi-gunung-djadi-1-2025072208560',
		tags: ['kpaemc2', 'djadi', 'fiersa besari', 'mapala', 'ekspedisi'],
		status: 'published',
		published_at: '2025-07-22 08:50:53',
		author_name: 'Ali Musthafa Kamal',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0002-000000000019',
		category_id: '00000000-0000-0000-0003-000000000005',
		category: mockCategories[0],
		division_id: '00000000-0000-0000-0001-000000000003',
		title: 'Ekspedisi Gunung Djadi #2',
		slug: 'ekspedisi-gunung-djadi-2',
		excerpt:
			'Atap negeri merupakan salah satu projek Bung yang di Sponsori oleh Eiger, dengan tujuan untuk mengekplor dan mempublikasikan keindahan dan keunikan berbagai gunung di 33 Provinsi di Indonesia. Serta Ejak, seorang konten creator yang awalnya membuat konten memasak, hingga berpindah Haluan menjadi seorang petualang yang hobi mendaki gunung.',
		content: `
<h2>GUNUNG DJADI RIAU : Djadi Kenangan, Djadi Cerita, untung tidak menDjadi Berita</h2>
<p>Masa depan memang misteri, kita tidak dapat menebak apa yang akan datang. Tapi pernahkah kamu berfikir bahwa masa depan itu datangnya dari masa lalu yang telah kamu lalui...</p>
<p>Semua berawal sejak Rina Noviana, Ketua Umum KPA EMC² saat itu, dihubungi oleh Misbahhuddin, Tim ahli Atap Negeri. Mereka berkomunikasi tentang rencana penjelajahan atap tertinggi di bumi Lancang Kuning.</p>
<p>Perjalanan menembus lebatnya hutan tropis Rimbang Baling mengajarkan kami arti ketangguhan, kerjasama tim, dan kerendahan hati di hadapan alam raya.</p>
`,
		cover_url:
			'https://res.cloudinary.com/dh7fjuxue/image/upload/v1753175079/post-images/ekspedisi-gunung-djadi-2-2025072209043.jpg',
		cover_public_id: 'post-images/ekspedisi-gunung-djadi-2-2025072209043',
		tags: ['kpaemc2', 'djadi', 'fiersa besari', 'atap negeri'],
		status: 'published',
		published_at: '2025-07-22 08:56:26',
		author_name: 'Ali Musthafa Kamal',
		is_active: true,
	},
	{
		id: '00000000-0000-0000-0002-000000000001',
		category_id: '00000000-0000-0000-0003-000000000003',
		category: mockCategories[3],
		division_id: '00000000-0000-0000-0001-000000000003',
		title: 'Hasil Riset Lapangan Litbang: Analisis Kualitas Air Kawasan Karst',
		slug: 'hasil-riset-lapangan-litbang-analisis-kualitas-air',
		excerpt:
			'Kajian mendalam Divisi Litbang KPA EMC² mengenai tandon air bawah tanah dan keanekaragaman biota perguaan di bentang karst.',
		content: `
<h2>Hidrologi dan Ekosistem Perguaan Karst</h2>
<p>Kawasan bentang alam karst memiliki peranan ekologis vital sebagai spons penyimpan air tanah bagi masyarakat sekitar. Melalui pengukuran pH, TDS, dan inventarisasi mikroklimat goa, riset ini merangkum potret kualitas air tanah perguaan.</p>
`,
		cover_url:
			'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
		tags: ['Litbang', 'Karst', 'Riset', 'Hidrologi'],
		status: 'published',
		published_at: '2026-08-15 10:00:00',
		author_name: 'Bayu Wicaksono',
		is_active: true,
	},
];
