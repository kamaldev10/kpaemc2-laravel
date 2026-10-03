import PublicLayout from '@/Components/Public/Layout/PublicLayout';
import CTABanner from '@/Components/Public/UI/CTABanner';
import PageHero from '@/Components/Public/UI/PageHero';
import { Head, router } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Compass,
    Eye,
    FolderKanban,
    Images,
    MapPin,
    Search,
    Tag,
    X,
} from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';

interface GalleryItem {
    id: string;
    image_url: string;
    caption?: string | null;
    sort_order?: number;
}

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
}

interface DivisionItem {
    id: string;
    name: string;
    code?: string;
}

interface GalleryAlbum {
    id: string;
    title: string;
    description?: string | null;
    cover_url?: string | null;
    event_date?: string | null;
    location?: string | null;
    category?: CategoryItem | null;
    division?: DivisionItem | null;
    items_count?: number;
    items?: GalleryItem[];
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface GalleryIndexProps {
    galleries: {
        data: GalleryAlbum[];
        meta?: PaginationMeta;
        links?: Array<{ url: string | null; label: string; active: boolean }>;
    };
    categories: CategoryItem[];
    filters: {
        search: string;
        category: string;
    };
    aboutInfo?: {
        org_name?: string;
        cover_url?: string;
    } | null;
}

export const GalleryIndex: FC<GalleryIndexProps> = ({
    galleries,
    categories = [],
    filters,
    aboutInfo,
}) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
    const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

    const albumList = galleries?.data ?? [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('gallery.index'),
            { search: searchTerm, category: filters.category },
            { preserveState: true }
        );
    };

    const handleCategoryClick = (categorySlug: string) => {
        const nextCat = filters.category === categorySlug ? '' : categorySlug;
        router.get(
            route('gallery.index'),
            { search: searchTerm, category: nextCat },
            { preserveState: true }
        );
    };

    const openAlbumLightbox = (album: GalleryAlbum, initialIndex = 0) => {
        setActiveAlbum(album);
        setActivePhotoIndex(initialIndex);
    };

    const closeLightbox = () => {
        setActiveAlbum(null);
        setActivePhotoIndex(0);
    };

    const nextPhoto = () => {
        if (!activeAlbum || !activeAlbum.items?.length) return;
        setActivePhotoIndex((prev) => (prev + 1) % activeAlbum.items!.length);
    };

    const prevPhoto = () => {
        if (!activeAlbum || !activeAlbum.items?.length) return;
        setActivePhotoIndex((prev) =>
            prev === 0 ? activeAlbum.items!.length - 1 : prev - 1
        );
    };

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeAlbum) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'ArrowLeft') prevPhoto();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeAlbum]);

    const currentPhoto = activeAlbum?.items?.[activePhotoIndex];

    const pageTitle = `Galeri Kegiatan — ${aboutInfo?.org_name || 'KPA EMC²'}`;
    const pageDescription =
        'Dokumentasi visual, rekam jejak ekspedisi, pendakian, susur gua, konservasi, dan kegiatan mahasiswa pecinta alam KPA EMC² FMIPA UNRI.';

    return (
        <PublicLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
            </Head>

            {/* Header Hero */}
            <PageHero
                title="Galeri Dokumentasi"
                subtitle="Rekam jejak visual ekspedisi, penjelajahan alam bebas, pembinaan kader, dan aksi pelestarian lingkungan hidup."
                backgroundImageUrl={aboutInfo?.cover_url}
            />

            {/* Filter & Search Bar */}
            <div className="bg-slate-50 border-b border-slate-200 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Categories */}
                        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                            <button
                                type="button"
                                onClick={() => handleCategoryClick('')}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
                                    !filters.category
                                        ? 'bg-purple-600 text-white shadow-xs'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                Semua Dokumentasi
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => handleCategoryClick(cat.slug)}
                                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
                                        filters.category === cat.slug
                                            ? 'bg-purple-600 text-white shadow-xs'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari album, lokasi..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-3 text-xs focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 shrink-0"
                            >
                                Cari
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {albumList.length === 0 ? (
                    <div className="py-20 text-center">
                        <Images className="mx-auto h-16 w-16 text-slate-300" />
                        <h3 className="mt-4 text-base font-bold text-slate-800">
                            Belum Ada Dokumentasi
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Tidak ada album foto yang ditemukan untuk kata kunci atau kategori ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {albumList.map((album) => {
                            const itemCount = album.items?.length ?? album.items_count ?? 0;
                            const cover =
                                album.cover_url ||
                                album.items?.[0]?.image_url ||
                                'https://res.cloudinary.com/demo/image/upload/sample.jpg';

                            return (
                                <div
                                    key={album.id}
                                    onClick={() => openAlbumLightbox(album)}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                                >
                                    {/* Cover Image Container */}
                                    <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={cover}
                                            alt={album.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                        {/* Photo count badge */}
                                        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                                            <Images className="h-3 w-3" />
                                            <span>{itemCount} Foto</span>
                                        </div>

                                        {/* Category badge */}
                                        {album.category && (
                                            <div className="absolute top-3 left-3 rounded-full bg-purple-900/85 px-2.5 py-1 text-[10px] font-bold text-purple-200 backdrop-blur-xs">
                                                {album.category.name}
                                            </div>
                                        )}

                                        {/* Bottom info inside overlay */}
                                        <div className="absolute bottom-3 left-3 right-3 text-white">
                                            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-300">
                                                {album.event_date && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3 text-purple-400" />
                                                        <span>{album.event_date}</span>
                                                    </div>
                                                )}
                                                {album.location && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3 text-purple-400" />
                                                        <span className="truncate">{album.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="mt-1 text-base font-bold leading-snug line-clamp-2">
                                                {album.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Content & Description */}
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        {album.description && (
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                                                {album.description}
                                            </p>
                                        )}

                                        {album.division && (
                                            <div className="flex items-center gap-1.5 mt-auto text-[11px] text-purple-700 font-semibold">
                                                <Compass className="h-3.5 w-3.5" />
                                                <span>Divisi: {album.division.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Fullscreen Lightbox Modal */}
            {activeAlbum && activeAlbum.items && activeAlbum.items.length > 0 && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
                    onClick={closeLightbox}
                >
                    {/* Top bar */}
                    <div
                        className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <h4 className="text-sm font-bold text-white">
                                {activeAlbum.title}
                            </h4>
                            <p className="text-xs text-slate-400">
                                Foto {activePhotoIndex + 1} dari {activeAlbum.items.length}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Main Image Container */}
                    <div
                        className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {currentPhoto && (
                            <div className="relative group flex flex-col items-center">
                                <img
                                    src={currentPhoto.image_url}
                                    alt={currentPhoto.caption || activeAlbum.title}
                                    className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
                                />

                                {currentPhoto.caption && (
                                    <div className="mt-3 max-w-2xl rounded-xl bg-black/60 px-4 py-2 text-center text-xs text-slate-200 backdrop-blur-xs">
                                        {currentPhoto.caption}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Prev / Next Buttons */}
                    {activeAlbum.items.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevPhoto();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
                                aria-label="Sebelumnya"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextPhoto();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
                                aria-label="Selanjutnya"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}

                    {/* Thumbnail Strip */}
                    {activeAlbum.items.length > 1 && (
                        <div
                            className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 overflow-x-auto py-2 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeAlbum.items.map((item, idx) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActivePhotoIndex(idx)}
                                    className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                        activePhotoIndex === idx
                                            ? 'border-purple-500 scale-105 opacity-100'
                                            : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.caption || `Thumbnail ${idx + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* CTA Banner */}
            <CTABanner
                title="Ingin Bergabung dalam Petualangan Berikutnya?"
                description="KPA EMC² membuka kesempatan seluas-luasnya bagi mahasiswa FMIPA UNRI untuk belajar, menjelajah, dan berkontribusi bagi kelestarian alam."
                primaryButtonText="Lihat Agenda Terbuka"
                primaryButtonHref="/events"
                secondaryButtonText="Hubungi Kami"
                secondaryButtonHref="/contact"
            />
        </PublicLayout>
    );
};

export default GalleryIndex;
