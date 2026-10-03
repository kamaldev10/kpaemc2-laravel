import ImageUploader from '@/Components/Admin/Form/ImageUploader';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Building2,
    Check,
    Globe,
    Info,
    Mail,
    Phone,
    Plus,
    Save,
    Share2,
    Sparkles,
    Trash2,
} from 'lucide-react';
import React, { FC, useState } from 'react';

interface SettingItem {
    id: string;
    key: string;
    value: string | null;
    group: string;
    description: string | null;
}

interface AboutInfoData {
    id?: string;
    org_name: string;
    founded_date: string;
    motto: string;
    description: string;
    vision: string;
    mission: string[];
    active_term: string;
    org_structure: Array<{ image?: string; period: string; chairmanName: string }>;
    logo_url?: string;
    cover_url?: string;
}

interface SettingsPageProps {
    settings: SettingItem[];
    settingsMap: Record<string, string | null>;
    aboutInfo: AboutInfoData | null;
}

export const SettingsIndex: FC<SettingsPageProps> = ({
    settingsMap,
    aboutInfo,
}) => {
    const [activeTab, setActiveTab] = useState<'general' | 'about'>('general');

    // General & SEO Settings Form
    const generalForm = useForm({
        settings: {
            site_title: settingsMap.site_title ?? 'Kelompok Pecinta Alam EMC²',
            site_tagline: settingsMap.site_tagline ?? 'Bergerak Satu Asa, Berbekal Alam Lestari!',
            site_description: settingsMap.site_description ?? '',
            contact_email: settingsMap.contact_email ?? 'sekretariat@kpa-emc2.org',
            contact_whatsapp: settingsMap.contact_whatsapp ?? '6281234567890',
            contact_address: settingsMap.contact_address ?? '',
            social_instagram: settingsMap.social_instagram ?? '',
            social_youtube: settingsMap.social_youtube ?? '',
            social_github: settingsMap.social_github ?? '',
            google_analytics_id: settingsMap.google_analytics_id ?? '',
            google_site_verification: settingsMap.google_site_verification ?? '',
        },
    });

    const submitGeneral = (e: React.FormEvent) => {
        e.preventDefault();
        generalForm.put(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    // About Info Form
    const aboutForm = useForm<{
        org_name: string;
        founded_date: string;
        motto: string;
        description: string;
        vision: string;
        mission: string[];
        active_term: string;
        org_structure: Array<{ image?: string; period: string; chairmanName: string }>;
        logo: File | null;
        cover: File | null;
    }>({
        org_name: aboutInfo?.org_name ?? 'KPA EMC²',
        founded_date: aboutInfo?.founded_date ?? '10 Oktober 1984',
        motto: aboutInfo?.motto ?? '',
        description: aboutInfo?.description ?? '',
        vision: aboutInfo?.vision ?? '',
        mission: aboutInfo?.mission?.length ? aboutInfo.mission : [''],
        active_term: aboutInfo?.active_term ?? '2025/2026',
        org_structure: aboutInfo?.org_structure?.length ? aboutInfo.org_structure : [],
        logo: null,
        cover: null,
    });

    const handleAddMission = () => {
        aboutForm.setData('mission', [...aboutForm.data.mission, '']);
    };

    const handleMissionChange = (index: number, val: string) => {
        const updated = [...aboutForm.data.mission];
        updated[index] = val;
        aboutForm.setData('mission', updated);
    };

    const handleRemoveMission = (index: number) => {
        const updated = aboutForm.data.mission.filter((_, i) => i !== index);
        aboutForm.setData('mission', updated.length > 0 ? updated : ['']);
    };

    const submitAbout = (e: React.FormEvent) => {
        e.preventDefault();
        aboutForm.post(route('admin.settings.about.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            title="Pengaturan Situs"
            headerTitle="Pengaturan Situs & Profil"
            headerDescription="Kelola konfigurasi umum situs web, kontak, media sosial, SEO, dan profil tentang organisasi."
            breadcrumbs={[
                { label: 'Admin', href: '/admin' },
                { label: 'Pengaturan' },
            ]}
        >
            <Head title="Pengaturan Situs" />

            <div className="space-y-6">
                {/* Tabs */}
                <div className="flex border-b border-slate-200">
                    <button
                        type="button"
                        onClick={() => setActiveTab('general')}
                        className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
                            activeTab === 'general'
                                ? 'border-purple-600 text-purple-600'
                                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                        }`}
                    >
                        <Globe className="h-4 w-4" />
                        <span>Umum, Kontak & SEO</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('about')}
                        className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
                            activeTab === 'about'
                                ? 'border-purple-600 text-purple-600'
                                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                        }`}
                    >
                        <Building2 className="h-4 w-4" />
                        <span>Profil & Tentang Kami</span>
                    </button>
                </div>

                {/* Tab 1: General & SEO */}
                {activeTab === 'general' && (
                    <form onSubmit={submitGeneral} className="space-y-6">
                        {/* Section: Identitas Situs */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                                <Globe className="h-5 w-5 text-purple-600" />
                                <span>Identitas Portal & SEO</span>
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Informasi dasar yang tampil pada header situs dan meta tag search engine.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Judul Situs (Site Title)
                                    </label>
                                    <input
                                        type="text"
                                        value={generalForm.data.settings.site_title}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                site_title: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Tagline / Slogan
                                    </label>
                                    <input
                                        type="text"
                                        value={generalForm.data.settings.site_tagline}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                site_tagline: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Deskripsi Meta Situs (SEO)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={generalForm.data.settings.site_description}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                site_description: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Google Analytics 4 Measurement ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="G-XXXXXXXXXX"
                                        value={generalForm.data.settings.google_analytics_id}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                google_analytics_id: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                    <p className="mt-1 text-[11px] text-slate-400">Contoh: G-ABC123XYZ</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Google Search Console Verification
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Kode verifikasi Google"
                                        value={generalForm.data.settings.google_site_verification}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                google_site_verification: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Kontak & Sekretariat */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                                <Mail className="h-5 w-5 text-purple-600" />
                                <span>Kontak & Sekretariat</span>
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Informasi kontak resmi yang ditampilkan pada footer dan halaman Hubungi Kami.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Email Sekretariat
                                    </label>
                                    <input
                                        type="email"
                                        value={generalForm.data.settings.contact_email}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                contact_email: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Nomor WhatsApp (Format 62...)
                                    </label>
                                    <input
                                        type="text"
                                        value={generalForm.data.settings.contact_whatsapp}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                contact_whatsapp: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Alamat Lengkap Sekretariat
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={generalForm.data.settings.contact_address}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                contact_address: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Media Sosial */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                                <Share2 className="h-5 w-5 text-purple-600" />
                                <span>Tautan Media Sosial</span>
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                URL profil media sosial resmi KPA EMC².
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Instagram URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://instagram.com/..."
                                        value={generalForm.data.settings.social_instagram}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                social_instagram: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        YouTube URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://youtube.com/..."
                                        value={generalForm.data.settings.social_youtube}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                social_youtube: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        value={generalForm.data.settings.social_github}
                                        onChange={(e) =>
                                            generalForm.setData('settings', {
                                                ...generalForm.data.settings,
                                                social_github: e.target.value,
                                            })
                                        }
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={generalForm.processing}
                                className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                <span>{generalForm.processing ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Tab 2: About Info */}
                {activeTab === 'about' && (
                    <form onSubmit={submitAbout} className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                                <Building2 className="h-5 w-5 text-purple-600" />
                                <span>Profil & Visi Misi Organisasi</span>
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Kelola konten yang tampil pada halaman Tentang Kami (/about).
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Nama Organisasi <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={aboutForm.data.org_name}
                                        onChange={(e) => aboutForm.setData('org_name', e.target.value)}
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        required
                                    />
                                    {aboutForm.errors.org_name && (
                                        <p className="mt-1 text-xs text-rose-500">{aboutForm.errors.org_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Tanggal Pendirian <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={aboutForm.data.founded_date}
                                        onChange={(e) => aboutForm.setData('founded_date', e.target.value)}
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        required
                                    />
                                    {aboutForm.errors.founded_date && (
                                        <p className="mt-1 text-xs text-rose-500">{aboutForm.errors.founded_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Motto / Semboyan
                                    </label>
                                    <input
                                        type="text"
                                        value={aboutForm.data.motto}
                                        onChange={(e) => aboutForm.setData('motto', e.target.value)}
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Periode Kepengurusan Aktif <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2025/2026"
                                        value={aboutForm.data.active_term}
                                        onChange={(e) => aboutForm.setData('active_term', e.target.value)}
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        required
                                    />
                                    {aboutForm.errors.active_term && (
                                        <p className="mt-1 text-xs text-rose-500">{aboutForm.errors.active_term}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Deskripsi / Profil Lengkap <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={aboutForm.data.description}
                                        onChange={(e) => aboutForm.setData('description', e.target.value)}
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        required
                                    />
                                    {aboutForm.errors.description && (
                                        <p className="mt-1 text-xs text-rose-500">{aboutForm.errors.description}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Visi Organisasi <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={aboutForm.data.vision}
                                        onChange={(e) => aboutForm.setData('vision', e.target.value)}
                                        className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        required
                                    />
                                    {aboutForm.errors.vision && (
                                        <p className="mt-1 text-xs text-rose-500">{aboutForm.errors.vision}</p>
                                    )}
                                </div>

                                {/* Dynamic Mission List */}
                                <div className="md:col-span-2 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                            Misi Organisasi <span className="text-rose-500">*</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleAddMission}
                                            className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>Tambah Poin Misi</span>
                                        </button>
                                    </div>

                                    {aboutForm.data.mission.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-xs font-bold text-purple-600">
                                                {idx + 1}
                                            </span>
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleMissionChange(idx, e.target.value)}
                                                placeholder={`Poin misi ke-${idx + 1}`}
                                                className="block flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                                required
                                            />
                                            {aboutForm.data.mission.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveMission(idx)}
                                                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {aboutForm.errors.mission && (
                                        <p className="mt-1 text-xs text-rose-500">{aboutForm.errors.mission}</p>
                                    )}
                                </div>

                                {/* Media Uploads */}
                                <div>
                                    <ImageUploader
                                        id="logo_image"
                                        label="Logo Organisasi"
                                        currentImageUrl={aboutInfo?.logo_url}
                                        onFileSelect={(file: File | null) => aboutForm.setData('logo', file)}
                                        imageUrlValue=""
                                        onImageUrlChange={() => {}}
                                        error={aboutForm.errors.logo}
                                    />
                                </div>

                                <div>
                                    <ImageUploader
                                        id="cover_image"
                                        label="Cover Banner Halaman Tentang Kami"
                                        currentImageUrl={aboutInfo?.cover_url}
                                        onFileSelect={(file: File | null) => aboutForm.setData('cover', file)}
                                        imageUrlValue=""
                                        onImageUrlChange={() => {}}
                                        error={aboutForm.errors.cover}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={aboutForm.processing}
                                className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                <span>{aboutForm.processing ? 'Menyimpan...' : 'Simpan Profil Tentang Kami'}</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default SettingsIndex;
