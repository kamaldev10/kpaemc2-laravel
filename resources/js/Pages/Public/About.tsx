import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import AboutDivisionSection from '@/Components/Public/Sections/AboutDivisionSection';
import AboutStructureSection from '@/Components/Public/Sections/AboutStructureSection';
import LogoSection from '@/Components/Public/Sections/LogoSection';
import ProfilSection from '@/Components/Public/Sections/ProfilSection';
import VisiMisiSection from '@/Components/Public/Sections/VisiMisiSection';
import CTABanner from '@/Components/Public/UI/CTABanner';
import PageHero from '@/Components/Public/UI/PageHero';
import { mockAboutFull } from '@/mocks/aboutMock';
import { mockHomeDivisions } from '@/mocks/homeMock';
import { AboutInfo } from '@/types/about';
import { Division } from '@/types/division';
import { Member } from '@/types/member';
import { resolveData, useIsMockDataEnabled } from '@/utils/mockData';
import { Head } from '@inertiajs/react';
import { BookOpen, Compass, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { FC } from 'react';

interface AboutProps {
	aboutInfo?: AboutInfo | null;
	divisions?: Division[] | null;
	featuredMembers?: Member[] | null;
	siteSettings?: Record<string, string> | null;
}

const sectionNav = [
	{ label: 'Profil & Sejarah', href: '#profil', icon: BookOpen },
	{ label: 'Visi & Kode Etik', href: '#visimisi', icon: Target },
	{ label: '4 Divisi Operasional', href: '#divisi', icon: Compass },
	{ label: 'Struktur Kepengurusan', href: '#struktur', icon: ShieldCheck },
	{ label: 'Filosofi Lambang', href: '#filosofi', icon: Sparkles },
];

export const About: FC<AboutProps> = ({ aboutInfo, divisions, featuredMembers = [] }) => {
	const isMockEnabled = useIsMockDataEnabled();

	const currentInfo = resolveData(aboutInfo, mockAboutFull, isMockEnabled);
	const currentDivisions = resolveData(divisions, mockHomeDivisions, isMockEnabled) ?? [];

	const orgName = currentInfo?.org_name || 'KPA EMC²';
	const pageTitle = `Tentang Kami — ${orgName}`;
	const pageDescription =
		currentInfo?.description ||
		'Mengenal sejarah, visi, misi, 4 divisi operasional, struktur kepengurusan, dan filosofi lambang KPA EMC² (LSO FMIPA Universitas Riau).';

	return (
		<PublicLayout>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content={pageDescription} />
				<meta property="og:title" content={pageTitle} />
				<meta property="og:description" content={pageDescription} />
				<meta
					property="og:image"
					content={
						currentInfo?.hero_banner_url ||
						currentInfo?.cover_url ||
						'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
					}
				/>
				<meta property="og:type" content="website" />
			</Head>

			{/* 1. Page Header Banner */}
			<PageHero
				title="Tentang KPA EMC²"
				subtitle="Organisasi kemahasiswaan pecinta alam FMIPA Universitas Riau yang berdedikasi dalam pendidikan karakter, riset ilmiah, dan pelestarian lingkungan hidup."
				backgroundImageUrl={currentInfo?.hero_banner_url || currentInfo?.cover_url}
			/>

			{/* Sticky Section Sub-Navigation Bar */}
			<nav className="shadow-xs sticky top-20 z-30 hidden border-b border-purple-100 bg-white/95 backdrop-blur-md md:block">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-center gap-1 overflow-x-auto py-3">
						{sectionNav.map((item) => {
							const Icon = item.icon;
							return (
								<a
									key={item.href}
									href={item.href}
									className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-purple-50 hover:text-purple-900"
								>
									<Icon className="h-3.5 w-3.5 text-purple-700" />
									<span>{item.label}</span>
								</a>
							);
						})}
					</div>
				</div>
			</nav>

			{/* 2. Profil & Sejarah Organisasi */}
			<div id="profil" className="scroll-mt-36">
				<ProfilSection aboutInfo={currentInfo} />
			</div>

			{/* 3. Visi, Misi & Kode Etik Pecinta Alam */}
			<div id="visimisi" className="scroll-mt-36">
				<VisiMisiSection aboutInfo={currentInfo} />
			</div>

			{/* 4. 4 Divisi Operasional (Integrated) */}
			<AboutDivisionSection divisions={currentDivisions} />

			{/* 5. Struktur Kepengurusan & Jejak Periode (Integrated) */}
			<AboutStructureSection
				orgStructure={
					currentInfo && Array.isArray(currentInfo.org_structure) ? currentInfo.org_structure : null
				}
				featuredMembers={featuredMembers}
			/>

			{/* 6. Filosofi & Makna Lambang EMC² */}
			<div id="filosofi" className="scroll-mt-36">
				<LogoSection aboutInfo={currentInfo} />
			</div>

			{/* 7. CTA Banner */}
			<CTABanner
				title="Mari Bersinergi & Melangkah Bersama KPA EMC²"
				description="Buka wawasan kepecintaalaman, tingkatkan keterampilan teknis lapangan, dan berkontribusi nyata bagi konservasi alam Indonesia."
				primaryButtonText="Daftar Kegiatan Terbuka"
				primaryButtonHref="/events"
				secondaryButtonText="Hubungi Sekretariat"
				secondaryButtonHref="/contact"
			/>
		</PublicLayout>
	);
};

export default About;
