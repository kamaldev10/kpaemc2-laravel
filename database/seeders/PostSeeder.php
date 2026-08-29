<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Division;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
	public function run(): void
	{
		$admin = User::first();
		$categories = Category::where('type', 'post')->get()->keyBy('slug');
		$divisions = Division::all()->keyBy('slug');

		$kolaborasiCat = Category::firstOrCreate(
			['slug' => 'kolaborasi'],
			['name' => 'Kolaborasi', 'type' => 'post', 'color' => '#6B21A8', 'sort_order' => 5]
		);

		$posts = [
			[
				'title' => 'Ekspedisi Gunung Djadi #1',
				'slug' => 'ekspedisi-gunung-djadi-1',
				'excerpt' => 'Riau memiliki kekayaan alam yang sangat melimpah, siapa sangka kalau Riau memiliki Gunung dan berbagai pemandangan alam yang memanjakan mata, hati dan pikiran, Selama ini orang tidak tau kalau Riau ada gunungnya. Kebanyakan dari kita tau kalau Riau memiliki banyak tempat wisata air terjun saja.',
				'content' => <<<MARKDOWN
## Ternyata di Riau Ada Gunungnya?

Provinsi Riau merupakan sebuah provinsi di Indonesia yang terletak di bagian tengah pulau Sumatra, yaitu di sepanjang pesisir Selat Melaka. Ibu kota dan kota terbesar Riau adalah Pekanbaru. Kota besar lainnya antara lain Dumai, Selat panjang, Bagansiapiapi, Bengkalis, Bangkinang, Tembilahan, dan Rengat. Posisi Geografis Provinsi Riau adalah antara 01°31 – 02°25 Lintang Selatan atau antara 100° – 105° Bujur Timur.

Adapun batas-batas wilayah Provinsi Riau antara lain :

- •	Sebelah Utara : Berbatasan dengan Provinsi Sumatera Utara
- •	Sebelah Selatan : Berbatasan dengan Provinsi Jambi
- •	Sebelah Barat : Berbatasan dengan Provinsi Sumatera Barat
- •	Sebelah Timur : Berbatasan dengan Provinsi Kepulauan Riau.

Provinsi Riau saat ini merupakan salah satu provinsi terkaya di Indonesia, dan sumber dayanya didominasi oleh sumber daya alam, terutama minyak bumi, gas alam, karet, kelapa sawit dan perkebunan serat. Provinsi Riau yang memiliki luas wilayah sebesar 87.023,66 km2. Disisi lain, keindahan alam Riau belum diketahui oleh khalayak umum.

KPA EMC2 FMIPA Universitas Riau sebagai salah satu LSO (Lembaga Semi Otonom) yang berada di bawah naungan Fakultas Matematika dan Ilmu Pengetahuan Alam dan secara garis koordinasi berhubungan dengan UKM Mapalindup, yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi untuk mendukung pelestarian lingkungan hidup ikut andil dalam Upaya pelestarian lingkungan hidup.

Untuk membuktikan kalau di Riau ada Gunungnya, KPA EMC2 bersama Tim Atap Negeri melakukan ekspedisi ke puncak tertinggi di Provinsi Riau, puncak tersebut bernama Puncak Gunung Djadi, yang memiliki ketinggian 1091 mdpl. Gunung ini merupakan salah satu gunung yang terletak di Hulu Sungai Kampar, Kecamatan Kampar Kiri Hulu, Provinsi Riau. Karena Gunung Djadi termasuk ke dalam kawasan Suaka Margasatwa Bukit Rimbang Bukit Baling, ada baiknya kami berkoordinasi dengan BBKSDA Provinsi Riau, agar tercipta kerja sama yang baik untuk memperkenalkan keindahan Gunung Djadi.
Kawasan ini secara administratif pemerintahan, terletak di Kecamatan Kampar Kiri Hulu dan Kecamatan Kampar Kiri pada Kabupaten Kampar serta Kecamatan Singingi Hilir, Kecamatan Singingi, dan Kecamatan Hulu Kuantan pada Kabupaten Kuantan Singingi, Provinsi Riau. Bukit Rimbang Bukit Baling berbatasan dengan Provinsi Sumatera Barat pada bagian barat, pada bagian utara berbatasan dengan Kabupaten Kampar, bagian timur berbatasan dengan Kabupaten Kampar dan Kabupaten Kuantan Singingi serta bagian selatan berbatasan dengan Kabupaten Kuantan Singingi.

Ekspedisi ini bukanlah ekspedisi pertama untuk pendakian Gunung Djadi. Gunung Djadi sudah beberapa kali di-explore. Tim XPDC 12-12 yang terdiri dari Riven Devender, Brimapala Sungkai Fakultas Pertanian Universitas Riau, Telapak BT, Yayasan Mitra Insani dan Gurindam12 merupakan tim pertama yang melakukan ekspedisi ini dalam ekspedisi Discovery First Mountain in Riau. Tim XPDC 12-12 berangkat pada tanggal 29 Desember 2012 dan sampai puncak pada 4 Januari 2012.

Ekspedisi lainnya menyusul dari Purnama PA Riau pada tanggal 15 sampai 22 Desember 2015. Selang 5 tahun kemudian, Ekspedisi Hikemate melakukan ekspedisi pada bulan Juli 2020 dengan total perjalanan 8 hari.

Mapalindup Universitas Riau ikut andil dalam Ekspedisi Gunung Djadi yang beranggotakan Rina Noviana dari KPA EMC2 FMIPA UNRI, Erik Rachman dari Mapala Sakai FISIP UNRI, Armand dan Siti dari Mapala Phylomina FPK UNRI, serta Wahyudi Akhirat dan Husnul Fikri dari Kommapala Winnetou FT UNRI, dengan Husnul Fikri sebagai ketua Ekspedistor. Total ekspedisi ini dilalui oleh tim selama 8 hari 7 malam yang dimulai tanggal 22 – 30 Oktober 2020.

Ekspedisi Atap Negeri merupakan ekspedisi Gunung Djadi yang terakhir hingga saat berita ini dirilis Ekspedisi ini dilaksanakan pada bulan Mei dan berlangsung hanya selama 5 hari (3 hari perjalanan menuju puncak dan 2 hari perjalanan pulang menuju Desa Pangkalan Serai).

Ekspedisi ini terdiri dari  Tim Atap Negeri dan Tim dari KPA EMC2 FMIPA UNRI., untuk tim atap negeri beranggotakan Fiersa Besari atau yang biasa kita kenal dengan bung Fiersa, Reza Dwi Yanda atau yang kita kenal dengan Ejak atau Mas Kumis, serta Muh. Misbahuddin sebagai ahli navigasi/Navigator yang merupakan anggota Wanadri, Eki Sulistina sebagai Ahli Kamera/cameraman dan Hendra Sianipar yang merupakan anggota Wanadri. Sedangkan Tim dari KPA EMC2 beranggotakan Rina Noviana sebagai koordinator dan Ali Musthafa Kamal.

Nantikan cerita kami di episode selanjutnya. Salam Lestari !!!
MARKDOWN,
				'category_id' => $kolaborasiCat->id,
				'division_id' => $divisions['litbang']->id ?? null,
				'cover_image_url' => 'https://res.cloudinary.com/dh7fjuxue/image/upload/v1753174565/post-images/ekspedisi-gunung-djadi-1-2025072208560.jpg',
				'cover_image_public_id' => 'post-images/ekspedisi-gunung-djadi-1-2025072208560',
				'cover_image_source' => null,
				'content_source' => null,
				'author_name' => 'Ali Musthafa Kamal',
				'tags' => ['kpaemc2', 'djadi', 'fiersa besari', 'mapala'],
				'is_featured' => true,
				'is_published' => true,
				'published_at' => Carbon::parse('2025-07-22 08:50:53.659'),
				'post_date' => Carbon::parse('2025-07-22 08:50:53.659'),
				'created_at' => Carbon::parse('2025-07-22 08:56:07.653'),
				'updated_at' => Carbon::parse('2025-07-22 09:36:42.547'),
			],
			[
				'title' => 'Ekspedisi Gunung Djadi #2',
				'slug' => 'ekspedisi-gunung-djadi-2',
				'excerpt' => 'Atap negeri merupakan salah satu projek Bung yang di Sponsori oleh Eiger, dengan tujuan untuk mengekplor dan mempublikasikan keindahan dan keunikan berbagai gunung di 33 Provinsi di Indonesia. Serta Ejak, seorang konten creator yang awalnya membuat konten memasak, hingga berpindah Haluan menjadi seorang petualang yang hobi mendaki gunung.',
				'content' => <<<MARKDOWN
## GUNUNG DJADI RIAU : Djadi Kenangan, Djadi Cerita, untung tidak menDjadi Berita

Masa depan Memang misteri, kita tidak dapat menebak apa yang akan datang.
Tapi pernahkah kamu berfikir bahwa masa depan itu datangnya dari masa lalu yang telah kamu lalui….

Semua berawal sejak Rina Noviana, Ketua Umum KPA EMC2 saat itu, yang di hubungi oleh Misbahhuddin, Tim ahli Atap Negeri. Mereka berkomunikasi seperti akan ada projek besar yang akan di jalankan.

ATAP NEGERI RIAU. Hal yang membingungkan serta menakjubkan untuk didengar bagi kami yang hanya seorang mahasiswa yang setiap harinya melakukan aktifitas di kampus. Tidak disangka, KPA EMC2 akan ikut dalam ekspedisi yang di jalankan oleh orang seterkenal Bung Fiersa. Ditambah dengan nama Ejak, seorang konten creator Tiktok yang Namanya lagi naik daun saat itu.

Atap negeri merupakan salah satu projek Bung yang di Sponsori oleh Eiger, dengan tujuan untuk mengekplor dan mempublikasikan keindahan dan keunikan berbagai gunung di 33 Provinsi di Indonesia. Serta Ejak, seorang konten creator yang awalnya membuat konten memasak, hingga berpindah Haluan menjadi seorang petualang yang hobi mendaki gunung.

Pendakian kami ini bukanlah petualangan biasa. Ada Tujuan yang harus dicapai selain mencapai puncaknya, yaitu Mengeksplor serta mempublikasikan bahwa betapa indah dan uniknya flora dan fauna yang ada di Kawasan Suaka Margasatwa Bukit Rimbang Bukit Baling, terkhusus di Gunung Djadi.  Untuk melakukan ekspedisi ini, butuh banyak serta rumit persiapan yang harus disediakan agar pendakian kali ini dapat disetujui oleh BBKSDA Riau. Jadi bagi kamu-kamu yang ingin mendaki Gunung Djadi, haruslah ada tujuan yang jelas serta persiapan yang matang.

Persiapan awal yang kami lakukan adalah menyiapkan administrasi dan bahan presentasi di BBKSDA Riau untuk perizinan pendakian. Persiapan fisik dan mental haruslah sudah matang karena pendakian kali ini akan berat…

Tim Atap Negeri dari Bandung telah tiba di Pekanbaru dan langsung menuju rumah Ejak. Sementara itu, kami berbelanja beberapa logistic yang akan kami butuhkan selama pendakian. Tim sengaja membeli beberapa logistic di pekanbaru karena sulit dan ribetnya membawa logistic yang terlalu banyak dari Bandung.

Logistic yang kami beli bukanlah logistic biasa para pendaki yang identic dengan “Indomie”. Logistic pada pendakian kali ini merupakan logistic yang bisa dikatakan “mewah”. Bukan karena ingin berfoya-foya, tapi memang dibutuhkan nutrisi yang tepat untuk menaklukkan Gunung Djadi yang masih terbilang jarang diketahui orang.

Selepas segala logistic sudah lengkap, kami berangkat menuju rumah Ejak untuk bertemu dengan tim. Kami disambut hangat oleh tim, yang mayoritas pendaki di Indonesia itu ramah-ramah. Sudah seperti saudara. Kami pun saling berkenalan satu sama lain.

Di rumah Ejak, Rina menjelaskan kepada tim mengenai Gunung Djadi dan bercerita tentang Ekspedisi Mapalindup UNRI 2020 yang diikutinya. Jalur yang dilalui dan vegetasi hutan yang rapat dan lebat ,sudah pasti akan berakibat pada pendakian kami kali ini. Bang Misbah, Sebagai navigator membentangkan peta dan menjelaskan kepada tim, jalur yang akan kami lalui. Kami terpana dengan berbagai alat sederhana nan cangih yang diciptakan olehnya.
Setelah beberapa saat berkenalan dan bersenda gurau, kami mulai mempersiapkan keberangkatan kami menuju Tanjung Belit, Desa yang berada di pangkal Sungai yang akan kami arungi.

Di sepanjang perjalanan, kami tertawa dengan lelucon Bang Hendra, seorang anggota Wanadri yang berasal dari Sumatera Utara yang di sambut cepat oleh kawan-kawan yang lain. Sembari itu kami juga masih merasa tak percaya akan melakukan ekspedisi Bersama 2 orang terkenal yang sama-sama kami kagumi karyanya.

Butuh waktu 3,5 jam untuk sampai di rumah Bang Anto, salah seorang warga di Tanjung Belit yang telah Kak Rina kenal semenjak Ekspedisi Mapalindup UNRI 2020.

Setiba di rumah di rumah Bang Anto, kami di sambut hangat serta di berikan tempat untuk beristirahat sejenak sebelum melanjutkan perjalanan. Kami pun beristirahat. Sementara itu beberapa tim melakukan komunikasi dengan Bang Anto terkait pendakian kami ini.

Tiba saatnya kami untuk Bersiap-siap untuk packing dan loading barang ke dalam piyau, sampan Panjang yang menjadi transportasi utama bagi warga disana. Tujuan kami selanjutnya adalah Desa Pangkalan Serai, yang merupakan desa terakhir.  Butuh waktu 4 jam dengan piyau untuk sampai kesana.

Ada sedikit kendala yang kami alami Ketika loading barang ke piyau, yang menyebabkan kami harap-harap cemas. Mobil truk pembawa batu terguling dan menyebabkan akses keluar mobil kami terhalang. Mobil yang digunakan harus di pindahkan ke rumah bang anto, dan tidak mungkin di parkir di tepian Sungai karena takut akan adanya air pasang, ditambah Bang Hendra yang tidak mau melepas kunci, karena belum sepenuhnya percaya pada orang yang baru dikenal. Bang Hendra pun terpaksa melalui jalur menanjak yang sebenarnya sulit untuk dinaiki, tapi itu bukan masalah besar bagi SUV yang merupakan mobil gagah dengan ban dan mesin yang mumpuni. Masalah mobil sudah aman.

Masalah selanjutnya datang lagi. Karena memindahkan mobil tadi yang memakan waktu yang cukup lama, abang piyau nya berfikir kembali untuk mengantarkan kami. Kenapa tidak, dengan perjalanan 4 jam menuju desa dan saat itu waktu sudah sore, ditambah dengan air pasang Sungai dan deras karena harus melawan arus.
Setelah cukup lama Menimbang, akhirnya abang perahunya mau untuk mengantar kami.Perjalanan

Mengarungi Sungai pun dimulai

Sepanjang perjalanan Mengarungi Sungai, Kami memandang pemandangan yang sangat indah dan burung-burung yang jarang di temui di tempat lain. Terbersit pertanyaan oleh saya, apakah akses ke sana hanya memakai piyau, kenapa tidak membuat jalan saja? Ah, daripada memikirkan apa pekerjaan pemerintahan disana, mending kami tidur, sembari memulihkan energi yang sudah terkuras selama mempersiapkan perjalanan.

Perjalanan tidak berjalan ke Desa Pangkalan Serai tidak berjalan dengan cukup mulus. Beberapa kali abang piyau harus berhenti untuk menarik piyaunya karena melewati jalur yang airnya dangkal dan berbatu. Sekali juga mengganti mesin piyau agar piyau dapat mengantar kami dengan selamat. Arus yang deras juga menjadi tantangan yang tidak dapat kami remehkan.

Diluar memang terlihat tenang, tapi didalam berkhayal panik. Bagaimana tidak, piyau seperti pesawat saat turbulensi, bergetar saat dasarnya menabrak batu, yang menyebabkan air harus masuk piyau. Air pasang yang terjadi juga membuat pakaian kami basah. Bagaimana kalau piyau kami oleng dan terbalik? Rusak semua perencanaan, sebelum kami dapat memulai perjalanan.

Alhamdulillah, kami sampai di Desa Pangkalan Serai dengan selamat tepat saat sebelum Magrib, hanya saja baju kami basah karena terkena cipratan air yang tidak bisa dihitung berapa kalinya. Setelah menurunkan barang serta membayar piyau, kami pun segera menuju ke rumah Amak, rumah yang pernah di tempati Kak Rina saat Ekspedisi sebelumnya.

Kami pun berberes serta bersih-bersih, sembari beristirahat melepas penat.
Logistic mulai diatur dan dibagi-bagi pada masing-masing carrier agar beban yang ditanggung sama. Setelah semua usai, kami pun bersantai. Dengan lelucon aneh dan khas dari masing-masing kami, kami pun tertawa bersama sembari mencicipi masakan dari koki Ejak. Hehe.

Perjalanan masih Panjang, dan akan dimulai di esok hari. Butuh naik piyau lagi agar sampai ke depan pintu rimba dan butuh waktu sekitar 40 menit untuk sampai disana. Sulit, adalah kata yang cocok untuk ekspedisi kali ini. Gunung Djadi yang berada di Tengah hutan dengan akses yang begitu sulit, menjadikan ekspedisi kali ini menjadi ekspedisi yang menguji kesabaran kami. Tetapi, bagaimanapun sulitnya ekspedisi ini, tidak membuat kami putus asa atas keputusan awal yang kami buat.

“Kalau Sungai itu ada sampai puncak gunung, mending kita naik piyau sampai puncak” ujar Bung, lalu kami tertawa sembari membayangkan perjalanan yang akan di tempuh esok hari, semoga perjalanannya tenang, hehe

Langit mulai menampakkan kemilau kuning disertai matahari yang perlahan naik di balik awan yang menutupi, sisa hujan semalaman masih tampak didesa, langit yang berkabut di pagi hari mengawali hari dengan tidak cukup baik.
Sebelum kami mulai petualangan, ternyata ada miskom antara Rina dan Misbah, misbah mengira Rina dan Ali yang membeli beras, Rina mengira Misbahlah yang membawa beras dari Bandung. Aduh, memang miskom yang seharusnya tidak terjadi, malah kami rasakan.

Untung saja, Amak, memiliki persediaan beras yang cukup, jadi kami bisa membeli beras amak tanpa harus terlalu pusing mencari kemana beras harus dibeli. Untung ada amak, kalau tidak, mau makan apa kami? makan tanah? Hehehe

Perjalanan dimulai, barang-barang sudah di packing sesuai carrier dengna sama rata. Kami mulai menaiki piyau menuju pintu rimba Gunung Djadi, akan memakan waktu +- 40 menit.
Kami menargetkan akan mendaki selama 5 hari, dan tukang piyau akan menjemput kami 5 hari kemudian. Hal tersebut dilakukan karena tidak adanya sinyal disana. Apabila tidak,ataupun kami pulang terlalu lama, maka kita akan kesulitan untuk pulang.

Setelah sampai di titik penurunan barang terakhir, kami berjalan menuju pintu rimba sebagai awalan pendakian kami di Gunung Djadi. Jalur yang dimbil Misbah agak sedikit berbeda dengan jalur yang pernah digunakan oleh Ekspedisi Mapalindup 2020.

Kami terus menaiki pendakian, dengan kemiringan sekitar 45 derajat. Baru awal, susah disuguhi dengan track yang sangat menguji betis. Tujuan kami menuju check point 2. Disini tidak ada pos, karena Gunung Djadi bukanlah gunung yang biasa didaki oleh orang banyak.

Pendakian berjalan sangat lama, dengan suasana yang panas, dengan ketinggian yang tidak terlalu tinggi, Gunung Djadi menjadikan kami bermandikan keringat. Pacet yang menjadi hewan popular dalam pendakian, menempel kepada beberapa anggota kami, mengakibatkan gatal dan bekas yang cukup berarti.

Dalam pendakian ini, kami harus memperhatikan fisik dan barang-barang yang kami bawa. Fisik yang kuat dan stamina yang oke, haruslah terjaga.pakaian dan safety yang lain haruslah tepat dan sesuai, dengan suhu yang relative panas, sudah sebaiknya tidak menggunakan baju yang menyerap panas, seperti kemeja.

Logistic yang dibawa pun haruslah sudah di rencanakan secara matang, jangan sampai dengan makanan yang kurang, dapat membuat kita menjadi kelaparan.  Perjalanan terus berlanjut, dengan kontur yang awalnya naik tajam, kemudian turun, kemudian naik lebih tajam lagi. Memang membuat mental dan fisik orang yang tidak kuat, akan mudah menyerah dan merasa tak akan ingin melanjutkan perjalanan.

Hari hampir gelap, tetapi tujuan utama kami, check point 2, tidak bisa tercapai, kamipun terpaksa berhenti dan mendirikan tenda. Tempat kami mendirikan tenda juga terbilang sempit, tapi cukup untuk mendirikan 3 tenda. Sebaiknya begitu, daripada harus melanjutkan perjalanan malam dengan jalur yang tidak diketahui bagaimana bentuknya, dan bernavigasi pada malam hari juga sangat tidak direkomendasikan.

Malam itu, kami bermalam disana dan menikmati masakan Ejak dan Rina yang sangat berguna bagi perbaikan gizi kami. kami pun beristirahat dengan perasaan yang sedikit senang, sedikit tidak tenang. Keesokan hari kami packing  dan sarapan, memulai perjalanan selanjutnya dengan tantangan dan rintangan yang lebih berat dari sebelumnya.

Disini kami kesulitan mencari air, Ali dan Hendra turun sejauh kurang lebih 200 meter ke bawah jurang, dan mencari air. Syukurnya kami menemukan air yang menetes cukup deras dari beberapa akar. Kami pun mengisi persediaan air dengan thumbler. Memakan waktu yang cukup lama untuk mengisi semua thumbler sampai penuh.
Setelah persediaan air cukup, kami pun melanjutkan perjalanan, kami terus turun melewati treck curam. Perjalanan kali ini cukup menyiksa fisik dan batin. Bagi kami yang sudah biasa menjajahi hutan saja, cukup membuat kami frustasi.

Perjalanan kami lanjutkan, kami menemukan aliran air yang sangat jernih. Kami merasa seperti dikerjai saat mencari air sampai ka jurang tadi. Tapi begitulah alam, kita tidak tahu apa yang akan ada di depan sana, bisa baik, bisa juga bahaya,Kami berhenti sejenak, sembari menikmati persediaan air yang melimpah. Kami berendam. Ada juga yang bersih-bersih.

Perjalanan kami lanjutkan, kami diharuskan melewati tebing yang cukup tinggi dan juga membuat mental kami ciut, tapia pa boleh buat, kalau kembali atau memutar, itu akan memakan waktu yang cukup lama, yasudah, lewati saja.
Belum sampai situ, kami dihadang lagi oleh jalur dihambat oleh pohon tumbang.dengan hiasan dibawah adalah jurang. Keahlian kami diuji satu-satu, salah sedikit saja, sangat fatal akibatnya.
Tidak jauh dari pohon tumbang, kami memutuskan untuk berkemah. Kami terpaksa untuk berhenti karena hari yang mulai gelap dan kami pun belum sampai di check point 3.
Malam itu, kami berbivak tanpa tenda, awalnya kami saling bercanda dan tertawa, sambal menikmati masakan Ejak dan Rina yang membuat perut kami tertawa.
Tetapi itu hanya bertahan sebentar, setelah kami terlelap tidur, kami diserang oleh agas, serangga yang sangat kecil, yang apabila menggigit, sangat membuat gatal dan sakit. Tidur kami tidak nyenyak. Ditambah dengan beberapa saat hujan mengguyur. Kami terpaksa hanya tidur sejenak malam itu dan mempersiapkan bivak agar tidak terendam air hujang dengan membuat parit.
Begitulah alam, kita harus siap akan apa yang akan kita hadapi.Semangat untuk Esok hari

Setelah sarapan dengan oatmeal dan sisa makanan semalam, dan hanya mendapat sedikit tidur serta harus banyak terbangun, kami melanjutkan perjalanan kami dengan tujuan puncak dengan meninggalkan carrier dan makanan berat di camp. Kami tidak sadar bahwa inilah awal malapetaka yang akan kami hadapi.

Karakteristik pegunungan membuat kami harus rela naik lalu turun lalu naik lalu turun lagi dan begitu seterusnya. Selama perjalanan, kami tidak menemukan jalur yang di buat oleh manusia, Saat itu kamilah hanya manusia yang membuka dan melalui jalur yang kami buat.

Kami juga menemukan aliran air yang lumayan deras dan cukup untuk membuat kami bisa menyegarkan kerongkongan. Jalur yang naik dan curam, juga mengharuskan kami untuk menggunakan webbing untuk dapat melanjutkan perjalanan. Tidak terasa lamanya perjalanan, dan laparnya perut, membuat kami tidak sadar bahwa kami sudah berada di depan puncak tertinggi Gunung Djadi. Kami pun bersyukur karena sampai puncak dengan selamat dan berswafoto Bersama-sama sejenak.

Bersenang-senang di puncak sudah selesai, malapetaka pun di mulai. Kami yang turun dari puncak dan hari yang menunjukan kian gelap, membuat kami kesulitan dalam bernavigasi. Hingga tanpa diketahui kami sampai di ujung tebing yang tidak tau ada apa didepannya. Apakah itu ada jurang dengan tebing yang tinggi, atau apapun itu, kami tidak tahu.

Demi menjaga keselamatan Bersama dan tidak ingin mengambil resiko yang lebih tinggi, kami memutuskan untuk kembali naik keatas dan membuat bivak alam. Sungguh malang, tidak membawa tenda, untung nya kami memiliki ilmu yang cukup mumpuni untuk bertahan di Tengah hutan dalam keadaan darurat. Kami pun membuat bivak……
Matahari mulai naik, perut terasa lapar, kepala pening, kaki terasa kebas, kami akhirnya melanjutkan perjalanan. Setelah jauh, kami salah arah dan sampai salah punggungan yang membuat kami harus mencari lagi arah yang benar. Kami lemah, tidak makan, istirahat tidak nyenyak, membuat rombongan terasa renggang dan beberapa kami mengutuk, menciptakan suasana yang mencekam, kami seperti mayat hidup, yang sudah lama tidak makan bertahun-tahun….

Hari menunjukan pukul 3 sore, dari kejauhan terlihat seperti tenda, dan membuat kami merasa lega. Tanpa babibu, kami langsung memakan apapun makanan yang bisa dimakan secara instan. Lalu kami menikmati makanan berat setelah 2 hari tidak makan.
Kami beristirahat, tapi tidak dengan fikiran. Kami sudah 4 hari di hutan dan kami mengingat bahwa perahu akan menjemput di hari kelima, waduhh. Sangat menguras fisik dan fikiran, bagaimana ini?
Setelah diskusi, kami memutuskan untuk berangkat esok pagi dengan harapan sampai titik penjemputan jam 10 pagi.

Tidak masuk akal….

Pagi datang, kami memulai perjalanan turun dengan doa dan harapan agar dapat di tunggu untuk penjemputan. Bermodalkan peta dan Kompas, kami mencoba-coba jalan yang dirasa lebih cepat. Sehingga di jalur kami menemukan hidden gems.Hidden gems tersebut adalah bonus kami. Air terjun yang sangat jernih membuat kami harus melepas dahaga dan bermain air sejenak. Sungguh asik, disertai takut. Kami pun melanjutkan perjalanan.
Perjalanan kali ini, kami harus melewati jalur Sungai yang cukup Panjang. Beberapa rintangan seperti pohon tumbang dan celah-celah bebatuan memacu skill kami. Dan akhirnya kami menemukan langit biru dan artinya kami telah sampai di ujung jalur, yaitu Sungai. Tapi petualangan belum berakhir, kami harus mencapai titik penjemputan kurang lebih sejauh 400 meter lagi. Waduhh.

Takut terlambat, Hendra dan Ali berenang menuju titik penjemputan melalui Sungai tersebut. Sungguh memacu adrenalin. Sungai yang belum diketahui berapa dalamnya, belum dikatahui ada apa di dalamnya, harus di renangi demi keselamatan Bersama.
Sementara tim Atap Negeri yang lain menunggu Hendra dan Ali. Sampai jam 5, Bang Hendra dan Ali belum kembali membawa perahu. Tim sadar perahu tidak akan datang dan memutuskan untuk berjalan kaki menuju titik penjemputan.

Syukurnya di Tengah perjalanan, Tim menemukan 2 buah perahu yang berjejer rapi di pinggir Sungai. Ternyata perahu tersebut milik warga sekitar. Tatkala gelap, Tim akhirnya naik perahu tersebut dan menyusuri Sungai.
Tepat di tempat penjemputan perahu yang seharusnya, terlihat Bang Hendra dan Ali. Tim lalu meneriaki Bang Hendra dan Ali. Bang Hendra dan Ali tampak kegirangan karena tidak akan bermalam semalam lagi karena terdampar.
Seketika Bang Hendra dan Ali menghampiri, mereka sudah memakai setelan santai, Ali bahkan sudah tidak memakai baju, tapi memakai sepatu mendaki.

Seketika Ali bercerita apa yang dilalui nya selama berenang. Dia hampir mati karena di jalur Sungai yang kami lalui itu ternyata dalamnya 6 meter. Tapi alhamdulillah dia selamat.

Malam sudah penuh, kami kembali ke desa, rasanya senang sekali kami dapat berinteraksi lagi dengan manusia lain. Malam semakin larut, kami terbawa suasana hingga kealam mimpi.

Esoknya kami berangkat dengan perahu menuju titik awal penyebrangan. Drama seolah tidak mau berakhir, mobil bang Hendra ternyata tidak mau nyala. Ternyata selama 5 hari lampu kecil di mobil bang Hendra lupa dimatikan. Setelah berjam-jam, akhirnya mobil berhasil di perbaiki, dengan bantuan tukang bengkel juga.

Kami pun berangsur menuju pekanbaru dengan hati yang lega.

Tim yang bermalam di rumah ejak, menjadi insiden terakhir bagi bang eki. Sepatu gunung yang baru dibelinya, digondol maling saat di jemur di depan rumah ejak.nasib malang siapa yang tahu.
Tim akhirnya berpamitan hendak pulang kerumah masing-masing.

Semua Kesialan yang kami dapat akan menjadi kisah yang akan di kenang,  Itu berlaku kalau kami pulang dengan selamat, beda cerita kalau tidak. Orang lain yang akan mengenang kisah kami.

“Derita kalau tidak menjadi cerita, ya berita” begitu tutur bung Fiersa Besari
MARKDOWN,
				'category_id' => $kolaborasiCat->id,
				'division_id' => $divisions['litbang']->id ?? null,
				'cover_image_url' => 'https://res.cloudinary.com/dh7fjuxue/image/upload/v1753175079/post-images/ekspedisi-gunung-djadi-2-2025072209043.jpg',
				'cover_image_public_id' => 'post-images/ekspedisi-gunung-djadi-2-2025072209043',
				'cover_image_source' => null,
				'content_source' => null,
				'author_name' => 'Ali Musthafa Kamal',
				'tags' => ['kpaemc2', 'djadi', 'fiersa besari', 'mapala'],
				'is_featured' => true,
				'is_published' => true,
				'published_at' => Carbon::parse('2025-07-22 08:56:26.725'),
				'post_date' => Carbon::parse('2025-07-22 08:56:26.725'),
				'created_at' => Carbon::parse('2025-07-22 09:04:42.368'),
				'updated_at' => Carbon::parse('2025-07-22 09:36:21.569'),
			],
			[
				'title' => 'Hasil Riset Lapangan Litbang: Analisis Kualitas Air dan Hidrologi Kawasan Karst',
				'slug' => 'hasil-riset-lapangan-litbang-analisis-kualitas-air',
				'excerpt' => 'Kajian mendalam Divisi Litbang KPA EMC² mengenai tandon air bawah tanah dan keanekaragaman biota perguaan.',
				'content' => '<p>Divisi Penelitian dan Pengembangan (Litbang) KPA EMC² telah merampungkan survei berkala kualitas air tanah pada kawasan tangkapan karst. Hasil uji menunjukkan tingkat kemurnian alami yang tinggi namun rentan terhadap pencemaran limbah permukaan.</p><p>Rekomendasi konservasi telah diserahkan kepada pihak pengelola kawasan dan masyarakat setempat guna menjaga keberlanjutan sumber air bersih.</p>',
				'category_id' => $categories['ekspedisi']->id ?? null,
				'division_id' => $divisions['litbang']->id ?? null,
				'cover_image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
				'cover_image_public_id' => 'samples/landscapes/nature-mountains',
				'cover_image_source' => 'Dokumentasi Divisi Litbang KPA EMC²',
				'author_name' => 'Bayu Wicaksono',
				'tags' => ['litbang', 'riset-alam', 'karst', 'hidrologi', 'konservasi'],
				'is_featured' => false,
				'is_published' => true,
				'published_at' => now()->subDays(10),
				'post_date' => now()->subDays(10),
				'created_at' => now()->subDays(10),
				'updated_at' => now()->subDays(10),
			],
			[
				'title' => 'Aksi Nyata Divisi SKLH: Penanaman 1.000 Mangrove Bersama Siswa Sekolah Lingkungan',
				'slug' => 'aksi-nyata-divisi-sklh-penanaman-1000-mangrove',
				'excerpt' => 'Kolaborasi generasi muda dalam memitigasi abrasi pantai dan memulihkan ekosistem pesisir utara.',
				'content' => '<p>Divisi Sosial Kemasyarakatan & Lingkungan Hidup (SKLH) KPA EMC² kembali menggelar aksi lapangan penanaman 1.000 bibit mangrove. Kegiatan ini diikuti oleh 60 siswa perwakilan SMA/SMK dalam rangkaian program Sekolah Lingkungan.</p>',
				'category_id' => $categories['konservasi-alam']->id ?? null,
				'division_id' => $divisions['sklh']->id ?? null,
				'cover_image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
				'cover_image_public_id' => 'samples/landscapes/beach-boat',
				'cover_image_source' => 'Dokumentasi Divisi SKLH',
				'author_name' => 'Siti Aisyah',
				'tags' => ['sklh', 'sekolah-lingkungan', 'mangrove', 'pengabdian-masyarakat'],
				'is_featured' => false,
				'is_published' => true,
				'published_at' => now()->subDays(5),
				'post_date' => now()->subDays(5),
				'created_at' => now()->subDays(5),
				'updated_at' => now()->subDays(5),
			],
		];

		foreach ($posts as $postData) {
			$postData['user_id'] = $admin->id ?? null;
			$postData['is_active'] = true;

			$slug = $postData['slug'];
			Post::updateOrCreate(['slug' => $slug], $postData);
		}
	}
}
