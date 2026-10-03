import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import ArticleHighlight from '@/Components/Public/Sections/ArticleHighlight';
import DivisionHighlight from '@/Components/Public/Sections/DivisionHighlight';
import EventHighlight from '@/Components/Public/Sections/EventHighlight';
import HeroSection from '@/Components/Public/Sections/HeroSection';
import StatsBar from '@/Components/Public/Sections/StatsBar';
import CTABanner from '@/Components/Public/UI/CTABanner';
import { AboutInfo } from '@/types/about';
import { Division } from '@/types/division';
import { Event } from '@/types/event';
import { Post } from '@/types/post';
import { Head } from '@inertiajs/react';
import { FC } from 'react';

interface HomeProps {
	aboutInfo?: AboutInfo | null;
	divisions?: Division[] | null;
	latestPosts?: Post[] | null;
	upcomingEvents?: Event[] | null;
	siteSettings?: Record<string, string | null> | null;
}

export const Home: FC<HomeProps> = ({
	aboutInfo,
	divisions,
	latestPosts,
	upcomingEvents,
	siteSettings,
}) => {
	const orgName = aboutInfo?.org_name || 'KPA EMC²';
	const tagline = aboutInfo?.motto || 'Bergerak Satu Asa, Berbekal Alam Lestari!';
	const pageTitle = `${orgName} — ${tagline}`;
	const pageDescription =
		aboutInfo?.description ||
		'Portal resmi KPA EMC² (Kelompok Pecinta Alam FMIPA Universitas Riau). Informasi organisasi, 4 divisi operasional, artikel & postingan kegiatan alam, dan pendaftaran agenda.';

	return (
		<PublicLayout>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content={pageDescription} />
				<meta property="og:title" content={pageTitle} />
				<meta property="og:description" content={pageDescription} />
				{aboutInfo?.hero_banner_url || aboutInfo?.cover_url || aboutInfo?.logo_url ? (
					<meta
						property="og:image"
						content={
							aboutInfo?.hero_banner_url ||
							aboutInfo?.cover_url ||
							aboutInfo?.logo_url ||
							''
						}
					/>
				) : null}
				<meta property="og:type" content="website" />
			</Head>

			{/* 1. Hero Section */}
			<HeroSection aboutInfo={aboutInfo} />

			{/* 2. Stats Bar */}
			<StatsBar siteSettings={siteSettings} />

			{/* 3. Recent Articles & Expedition Journals */}
			<ArticleHighlight posts={latestPosts} />

			{/* 4. 4 Divisions Highlight */}
			<DivisionHighlight divisions={divisions} />

			{/* 5. Upcoming Open Events */}
			<EventHighlight events={upcomingEvents} />

			{/* 6. Call to Action Banner */}
			<CTABanner
				title="Mulai Petualangan & Pengabdianmu Bersama KPA EMC²"
				description="Dapatkan pengalaman berharga di alam terbuka, pelatihan teknik berkualifikasi, dan jalinan persaudaraan seumur hidup."
				primaryButtonText="Lihat Agenda Terbuka"
				primaryButtonHref="/events"
				secondaryButtonText="Hubungi Kami"
				secondaryButtonHref="/contact"
			/>
		</PublicLayout>
	);
};

export default Home;
