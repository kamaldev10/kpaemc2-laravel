export interface ContactInfo {
	org_name: string;
	address: string;
	map_embed_url: string;
	google_maps_url: string;
	email: string;
	phone: string;
	whatsapp: string;
	instagram: string;
	youtube: string;
	operational_hours: string;
}

export const mockContactInfo: ContactInfo = {
	org_name: 'KPA EMC² (Kelompok Pecinta Alam FMIPA Universitas Riau)',
	address:
		'Gedung Lembaga Mahasiswa (Kav. KPA EMC²), Fakultas Matematika dan Ilmu Pengetahuan Alam, Kampus Bina Widya UNRI, Jl. HR. Soebrantas KM 12.5, Simpang Baru, Kec. Tampan, Kota Pekanbaru, Riau 28293',
	map_embed_url:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.658607147775!2d101.37894227496464!3d0.4795240995159159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a8fb442b0d87%3A0xe5a3c05c03c58253!2sFMIPA%20Universitas%20Riau!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
	google_maps_url: 'https://maps.google.com/?q=FMIPA+Universitas+Riau',
	email: 'kpaemc2fmipaunri@gmail.com',
	phone: '+62 812-3456-7890',
	whatsapp: '+6281234567890',
	instagram: 'https://instagram.com/kpa_emc2',
	youtube: 'https://youtube.com/@kpaemc2',
	operational_hours: 'Senin - Sabtu: 09.00 - 21.00 WIB (Minggu & Hari Libur: Lapangan/Ekspedisi)',
};
