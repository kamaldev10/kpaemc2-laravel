# Frontend Patterns — React + Inertia.js + TypeScript

## Stack

- **React 19** (with concurrent features)
- **Inertia.js v2** (Laravel adapter) — SSR enabled via `ssr.tsx`
- **TypeScript 5** — strict mode, no `any` without justification
- **Ziggy v2** — typed route helpers (`route('posts.index')`)
- **Headless UI v2** — accessible modal, dialog, listbox components
- **Lucide React v1** — icons

---

## Data Flow — Inertia Props

**Only use Inertia props for page data.** No raw `fetch()` or Axios AJAX to JSON endpoints unless there is a documented performance reason.

```tsx
// Controller sends data
return Inertia::render('Public/Posts/Index', [
    'posts' => PostResource::collection($posts),
    'categories' => CategoryResource::collection($categories),
]);

// React page receives typed props
interface Props {
    posts: PaginatedResource<Post>;
    categories: Category[];
}

export default function Index({ posts, categories }: Props) {
    // ...
}
```

---

## TypeScript Conventions

### Interfaces over Types

```tsx
// ✅ Use interface for props and data shapes
interface PostCardProps {
	post: Post;
	className?: string;
}

// ❌ Avoid type aliases for object shapes
type PostCardProps = { post: Post; className?: string };
```

### No `any`

```tsx
// ❌ Never
const data: any = response;

// ✅ Use unknown + type guard, or proper type
const data: unknown = response;
if (isPost(data)) {
	/* ... */
}
```

If `any` is absolutely unavoidable, add an inline comment:

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyData: any = externalLibResult; // TODO: type this when lib adds typings
```

### Type Definitions Location

All shared TypeScript interfaces live in `resources/js/types/`:

```
resources/js/types/
  index.d.ts        ← global types (PageProps, User, etc.)
  post.ts           ← Post, PostCategory interfaces
  event.ts          ← Event, Registration interfaces
  member.ts         ← Member, Division interfaces
  gallery.ts        ← Gallery, GalleryItem interfaces
```

---

## MockData First Workflow (Mandatory)

**Aturan Wajib:** Sebelum menghubungkan halaman/komponen React dengan server controller atau database sungguhan, frontend developer **wajib** membuat dan menerapkan `MockData` per fitur di direktori `resources/js/mocks/`.

### Struktur File Mock:

```
resources/js/mocks/
  homeMock.ts       ← Mock dataset Beranda (Hero, Stats, Highlights)
  aboutMock.ts      ← Mock dataset Tentang Kami (Profil, Visi Misi, Logo)
  divisionMock.ts   ← Mock dataset 4 Divisi + Detail
  memberMock.ts     ← Mock dataset Pengurus & Struktur Organisasi
  postMock.ts       ← Mock dataset Artikel & Jurnal
  eventMock.ts      ← Mock dataset Kegiatan & Form Fields
```

### Pola Penerapan MockData:

1. **Definisikan Interface TypeScript** terlebih dahulu di `resources/js/types/`.
2. **Buat file Mock Data** di `resources/js/mocks/{feature}Mock.ts` dengan data realistis sesuai domain KPA EMC².
3. **Bangun UI / Komponen** menggunakan mock data ini (sebagai prop default atau import lokal saat prototyping).
4. **Verifikasi Visual & Responsivitas** pada layar mobile (`375px`), tablet (`768px`), dan desktop (`1280px`).
5. **Setelah UI tuntas dan teruji**, hubungkan Controller Laravel untuk passing Inertia props sungguhan.
6. Pertahankan file mock sebagai fixture untuk unit testing komponen dan story-testing visual.

```tsx
// Contoh: resources/js/mocks/homeMock.ts
import type { Division } from '@/types/division';
import type { Post } from '@/types/post';

export const mockHomeDivisions: Division[] = [
	{
		id: 1,
		name: 'Kaderisasi',
		slug: 'kaderisasi',
		description: 'Pendidikan dan pelatihan...',
		is_active: true,
	},
	{ id: 2, name: 'SKLH', slug: 'sklh', description: 'Sosial kemasyarakatan...', is_active: true },
	// ...
];

// Contoh komponen dengan mock fallback
interface Props {
	divisions?: Division[];
}

export default function DivisionHighlight({ divisions = mockHomeDivisions }: Props) {
	return (
		<section className="...">
			{divisions.map((div) => (
				<DivisionCard key={div.id} division={div} />
			))}
		</section>
	);
}
```

---

## Component Conventions

### File Naming

| Type              | Location                                   | Format           |
| ----------------- | ------------------------------------------ | ---------------- |
| Page              | `resources/js/Pages/Public/`               | `PascalCase.tsx` |
| Layout component  | `resources/js/Components/Public/Layout/`   | `PascalCase.tsx` |
| Card component    | `resources/js/Components/Public/Cards/`    | `PascalCase.tsx` |
| Section component | `resources/js/Components/Public/Sections/` | `PascalCase.tsx` |
| Reusable UI       | `resources/js/Components/Public/UI/`       | `PascalCase.tsx` |
| Custom hook       | `resources/js/hooks/`                      | `camelCase.ts`   |

### Component Template

```tsx
import { type FC } from 'react';

interface PostCardProps {
	post: Post;
	className?: string;
}

const PostCard: FC<PostCardProps> = ({ post, className = '' }) => {
	return (
		<article className={`overflow-hidden rounded-xl shadow-md ${className}`}>
			{/* content */}
		</article>
	);
};

export default PostCard;
```

---

## SEO — Mandatory on Every Page

Every public page must include `<Head>` with title, description, and OpenGraph tags:

```tsx
import { Head } from '@inertiajs/react';

export default function PostShow({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.excerpt ?? post.title} />
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.excerpt ?? ''} />
				<meta property="og:image" content={post.cover_url ?? ''} />
				<meta property="og:type" content="article" />
			</Head>
			{/* page content */}
		</>
	);
}
```

---

## Cloudinary Images

All `<img>` tags consuming Cloudinary URLs must use `f_auto,q_auto` transformation at minimum:

```tsx
// Helper function (add to resources/js/hooks/useCloudinary.ts)
function cloudinaryUrl(publicId: string, transforms: string = 'f_auto,q_auto'): string {
	return `https://res.cloudinary.com/{CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

// Usage
<img
	src={cloudinaryUrl(item.photo_public_id, 'f_auto,q_auto,w_800')}
	alt={item.title}
	loading="lazy"
	className="h-48 w-full object-cover"
/>;
```

For thumbnails add size: `f_auto,q_auto,w_400,h_300,c_fill`
For hero images: `f_auto,q_auto,w_1920`

---

## Routing — Ziggy

Use Ziggy's `route()` helper instead of hardcoded paths:

```tsx
import { Link } from '@inertiajs/react';

// ✅
<Link href={route('posts.index')}>Semua Artikel</Link>
<Link href={route('posts.show', { slug: post.slug })}>Baca Selengkapnya</Link>

// ❌
<Link href="/posts">Semua Artikel</Link>
```

---

## Tailwind CSS Rules

- **No inline styles.** Tailwind utility classes only.
- **No arbitrary values** without justification: prefer `text-sm` over `text-[13px]`.
- **Mobile-first:** Start with base (mobile) styles, add `md:` and `lg:` breakpoints.
- Custom values that repeat more than 3 times → add to `tailwind.config.js` theme extension.
- Color palette (project design system — Purple Dominant):
  - Primary (royal/deep purple): `purple-900`, `purple-800`, `purple-700`
  - Primary Muted (lavender tint): `purple-100`, `purple-50`
  - Accent (warm amber / sunset gold): `amber-600`, `amber-500`
  - Secondary Accent (violet / indigo): `violet-600`, `indigo-500`
  - Background: `white`, `slate-50`, `gray-50`
  - Text dark: `gray-900`, `slate-800`

---

## Custom Hooks Pattern

```ts
// resources/js/hooks/usePosts.ts
import { router } from '@inertiajs/react';
import { useState } from 'react';

export function usePostFilter() {
	const [category, setCategory] = useState<number | null>(null);

	const filterBy = (categoryId: number | null) => {
		setCategory(categoryId);
		router.get(route('posts.index'), { category: categoryId }, { preserveState: true });
	};

	return { category, filterBy };
}
```

---

## Inertia Navigation

```tsx
import { router, Link } from '@inertiajs/react';

// Programmatic navigation
router.visit(route('posts.show', { slug }));

// Link component (preferred for anchor tags)
<Link href={route('posts.index')} className="text-purple-700 hover:text-purple-900 hover:underline">
	Artikel
</Link>;

// Preserve scroll position on filter
router.get(
	route('posts.index'),
	{ tag: 'ekspedisi' },
	{
		preserveState: true,
		preserveScroll: true,
	}
);
```

---

## SSR Considerations

- Entry point: `resources/js/ssr.tsx` — all pages are SSR-rendered by default.
- Avoid `window`, `document`, `localStorage` at top-level — wrap in `useEffect` or check `typeof window !== 'undefined'`.
- Hydration errors surface as console warnings — always check during dev.

```tsx
// ✅ Safe browser API access
useEffect(() => {
	const saved = localStorage.getItem('theme');
	// ...
}, []);

// ❌ Not SSR-safe
const saved = localStorage.getItem('theme');
```
