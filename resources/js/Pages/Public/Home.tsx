import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import ArticleHighlight from '@/Components/Public/Sections/ArticleHighlight';
import DivisionHighlight from '@/Components/Public/Sections/DivisionHighlight';
import EventHighlight from '@/Components/Public/Sections/EventHighlight';
import HeroSection from '@/Components/Public/Sections/HeroSection';
import StatsBar from '@/Components/Public/Sections/StatsBar';
import CTABanner from '@/Components/Public/UI/CTABanner';
import {
	mockHomeAboutInfo,
	mockHomeDivisions,
	mockHomeEvents,
	mockHomePosts,
	mockHomeSiteSettings,
} from '@/mocks/homeMock';
import { AboutInfo } from '@/types/about';
import { Division } from '@/types/division';
import { Event } from '@/types/event';
import { Post } from '@/types/post';
import { resolveData, useIsMockDataEnabled } from '@/utils/mockData';
import { Head } from '@inertiajs/react';
import { FC } from 'react';

interface HomeProps {
	aboutInfo?: AboutInfo | null;
	divisions?: Division[] | null;
	latestPosts?: Post[] | null;
	upcomingEvents?: Event[] | null;
	siteSettings?: Record<string, string> | null;
}

export const Home: FC<HomeProps> = ({
	aboutInfo,
	divisions,
	latestPosts,
	upcomingEvents,
	siteSettings,
}) => {
	const isMockEnabled = useIsMockDataEnabled();

	const currentInfo = resolveData(aboutInfo, mockHomeAboutInfo, isMockEnabled);
	const currentSettings = resolveData(siteSettings, mockHomeSiteSettings, isMockEnabled);
	const currentDivisions = resolveData(divisions, mockHomeDivisions, isMockEnabled) ?? [];
	const currentPosts = resolveData(latestPosts, mockHomePosts, isMockEnabled) ?? [];
	const currentEvents = resolveData(upcomingEvents, mockHomeEvents, isMockEnabled) ?? [];

	const orgName = currentInfo?.org_name || 'KPA EMC²';
	const tagline = currentInfo?.motto;
	const pageTitle = `${orgName} — ${tagline}`;
	const pageDescription =
		currentInfo?.description ||
		'Portal resmi KPA EMC² (Kelompok Pecinta Alam FMIPA Universitas Riau). Informasi organisasi, 4 divisi operasional, artikel & postingan kegiatan alam, dan pendaftaran agenda.';

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

			{/* 1. Hero Section */}
			<HeroSection aboutInfo={currentInfo} />

			{/* 2. Stats Bar */}
			<StatsBar siteSettings={currentSettings} />

			{/* 3. 4 Divisions Highlight */}
			<DivisionHighlight divisions={currentDivisions} />

			{/* 4. Recent Articles & Expedition Journals */}
			<ArticleHighlight posts={currentPosts} />

			{/* 5. Upcoming Open Events */}
			<EventHighlight events={currentEvents} />

			{/* 6. Call to Action Banner */}
			<CTABanner
				title="Mulai Petualangan & Pengabdianmu Bersama KPA EMC²"
				description="Dapatkan pengalaman berharga di alam terbuka, pelatihan teknik berkualifikasi, dan jalinan persaudaraan seumur hidup."
				primaryButtonText="Lihat Agenda Terbuka"
				primaryButtonHref="/events"
				secondaryButtonText="Hubungi Kami"
				secondaryButtonHref="/kontak"
			/>
		</PublicLayout>
	);
};

export default Home;
