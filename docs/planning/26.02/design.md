# Design Specification — Admin Dashboard Layout (Sprint 26.02)

> **Tech Stack:** Laravel 13 + React 19 + Inertia.js v2 + Tailwind CSS + Lucide React  
> **Target Path:** `resources/js/Layouts/AdminLayout.tsx` & subkomponen di `resources/js/Components/Admin/Layout/`

---

## 1. Architecture Overview

Layout Admin Dashboard dirancang khusus untuk operasional manajemen konten internal KPA EMC² (`SUPER_ADMIN`, `ADMIN`, `EDITOR`). Desain arsitektur menganut prinsip:
- **Clean Separation**: Terpisah dari `AuthenticatedLayout` bawaan Breeze maupun `PublicLayout`.
- **Modular Components**: Terdiri dari 3 bagian utama:
  1. **Sidebar (`AdminSidebar.tsx`)**: Navigasi vertikal hirarkis (menu items, collapsible pada mobile/drawer, state active link berbasis Inertia route).
  2. **Navbar (`AdminNavbar.tsx`)**: Bagian atas sticky berisi tombol toggle hamburger (mobile/collapse), Breadcrumbs dinamis, search/quick action, badge role user, serta Dropdown Profil & Logout.
  3. **Main Content Canvas (`AdminLayout.tsx`)**: Kontainer responsif dengan scrolling mandiri, padding ergonomis, support page header action buttons, dan transisi smooth.

```
+-----------------------------------------------------------------------------+
|                                  AdminLayout                                |
+-----------------------+-----------------------------------------------------+
|                       |  AdminNavbar                                        |
|                       |  [≡] Breadcrumbs: Admin / Postingan       [User v]  |
|  AdminSidebar         +-----------------------------------------------------+
|  - Logo KPA EMC²      |  Page Header (Title + Action Buttons)               |
|  - Role Badge         +-----------------------------------------------------+
|                       |                                                     |
|  [Navigation Menu]    |  Main Content Canvas                                |
|  • Dashboard          |  - Data Table / Form Editor                         |
|  • Artikel & Post     |  - Card Metrics                                     |
|  • Anggota Organisasi |  - Filter & Pagination                              |
|  • Kegiatan / Events  |                                                     |
|  • Pengaturan         |                                                     |
|                       |                                                     |
+-----------------------+-----------------------------------------------------+
```

---

## 2. Struktur File & Komponen

```
resources/js/
├── Layouts/
│   └── AdminLayout.tsx                     # Wrapper utama (Sidebar + Navbar + Content Container)
├── Components/
│   └── Admin/
│       └── Layout/
│           ├── AdminSidebar.tsx            # Navigasi vertikal (menu group, role filtering)
│           ├── AdminNavbar.tsx             # Topbar (breadcrumbs, user avatar/dropdown, logout)
│           ├── AdminBreadcrumbs.tsx        # Breadcrumb renderer otomatis
│           └── AdminUserDropdown.tsx       # Dropdown profil, role info, link settings, logout
├── types/
│   └── admin.d.ts                          # Interface menu navigation, breadcrumbs props
```

---

## 3. Rincian Desain Komponen

### 3.1 AdminSidebar (`AdminSidebar.tsx`)
- **Brand Header**: Logo resmi KPA EMC² + Teks "Portal Pengurus" + Versi/Sprint badge.
- **Navigasi Berdasarkan Role**:
  - **Overview**:
    - Dashboard (`/admin`) → Icon: `LayoutDashboard`
  - **Manajemen Konten**:
    - Artikel & Postingan (`/admin/posts` & `/admin/articles`) → Icon: `FileText`
    - Kegiatan & Registrasi (`/admin/events`) → Icon: `Calendar`
  - **Organisasi**:
    - Data Pengurus & Anggota (`/admin/members`) → Icon: `Users`
  - **Sistem (Hanya SUPER_ADMIN)**:
    - Manajemen User Admin (`/admin/users`) → Icon: `ShieldAlert`
    - Pengaturan Situs (`/admin/settings`) → Icon: `Settings`
- **Tampilan Luar**:
  - Desktop (`>= 1024px`): Fixed sidebar lebar 64 (16rem / 256px), background gelap/navy modern (`bg-slate-900` atau `bg-purple-950` bernuansa KPA EMC²).
  - Mobile (`< 1024px`): Slide-over drawer dengan backdrop blur & tombol close.

### 3.2 AdminNavbar (`AdminNavbar.tsx`)
- **Left Section**:
  - Mobile hamburger toggle button.
  - Desktop collapse/expand toggle button.
  - **`AdminBreadcrumbs`**: Menampilkan posisi halaman saat ini (misal: `Dashboard > Artikel > Buat Baru`).
- **Right Section**:
  - Badge role aktif: `SUPER_ADMIN` (Amber), `ADMIN` (Blue), `EDITOR` (Emerald).
  - Tombol Quick Action / Shortcut (misal: "Lihat Web Publik" link ke `/`).
  - **`AdminUserDropdown`**:
    - Menampilkan nama lengkap, email, avatar Cloudinary (fallback inisial).
    - Menu item: "Edit Profil", "Ganti Password", "Panduan".
    - Separator.
    - Tombol "Keluar / Log Out" via Inertia POST `/logout`.

### 3.3 Main Content Canvas (`AdminLayout.tsx`)
- Menggunakan flex column yang membentang `min-h-screen`.
- Background canvas: `bg-slate-50` / `bg-gray-100`.
- Kontainer `main` memiliki batas lebar maksimal (`max-w-7xl` atau fluid dengan padding `px-4 sm:px-6 lg:px-8`).
- Menerima props:
  - `title`: String (untuk tag `<Head title={...} />`).
  - `headerTitle`: String atau ReactNode (judul di canvas).
  - `headerActions`: ReactNode opsional (misal: tombol "+ Tambah Data").
  - `breadcrumbs`: Array item breadcrumb opsional.
  - `children`: Konten halaman.

---

## 4. Spesifikasi Tipe Data (TypeScript Interface)

```typescript
// resources/js/types/admin.d.ts

export interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
}

export interface AdminNavItem {
    name: string;
    href: string;
    icon: string; // Lucide icon identifier
    activeMatcher: string; // Pola URL / route name untuk active state
    minRole?: 'super_admin' | 'admin' | 'editor';
    badge?: string | number;
}

export interface AdminNavGroup {
    groupName: string;
    items: AdminNavItem[];
}
```

---

## 5. MockData First & Responsivitas

- **Mock Layout Data**: Disediakan mock user & breadcrumb di `resources/js/mocks/adminDashboardMock.ts`.
- **Mobile First**:
  - Layar `< 640px`: Navbar minimalis, sidebar full drawer terisolasi, breadcrumb hanya menampilkan halaman induk & aktif.
  - Layar `640px - 1024px`: Tablet layout dengan drawer toggle.
  - Layar `> 1024px`: Persistent dual-column (sidebar kiri + main konten kanan).
- **A11y & UX**:
  - Focus trap pada mobile drawer.
  - Keyboard accessibility (Esc untuk menutup dropdown dan mobile menu).
