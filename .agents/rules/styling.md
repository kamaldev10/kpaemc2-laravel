# Styling Rules — Tailwind CSS + Design System

## Setup

- **Tailwind CSS v3.x** with `@tailwindcss/forms` plugin
- Config: `tailwind.config.js`
- Content sources: `resources/views/**/*.blade.php`, `resources/js/**/*.tsx`
- Base font: `Figtree` (loaded via CSS, extended in Tailwind theme)
- PostCSS: `postcss.config.js` (autoprefixer)

---

## Hard Rules

1. **No inline styles** — Tailwind utility classes only.
2. **No arbitrary values** without documented justification: use `text-sm` not `text-[13px]`.
3. **Mobile-first** — base classes are for `< 640px`, use `sm:`, `md:`, `lg:`, `xl:` for larger.
4. **No `!important`** — restructure component hierarchy instead.
5. Classes that repeat across 3+ components → extract to a reusable component or add to `tailwind.config.js`.

---

## Design System — Color Palette (Purple Dominant)

| Role           | Tailwind Class       | Hex       | Usage                                      |
| -------------- | -------------------- | --------- | ------------------------------------------ |
| Primary        | `purple-800`         | `#6b21a8` | Main CTA buttons, headings, active nav     |
| Primary dark   | `purple-900`         | `#581c87` | Deep hero headers, dark accents            |
| Primary light  | `purple-700`         | `#7e22ce` | Hover states, primary interactive elements |
| Primary muted  | `purple-100`         | `#f3e8ff` | Badge backgrounds, highlights, pill active |
| Primary soft   | `purple-50`          | `#faf5ff` | Card tinted surfaces, alternate rows       |
| Accent         | `amber-600`          | `#d97706` | Secondary CTA, icons, badges, tags         |
| Accent light   | `amber-50`           | `#fffbeb` | Warning/featured section backgrounds       |
| Secondary      | `violet-600`         | `#7c3aed` | Gradient overlays, secondary highlights    |
| Background     | `white` / `slate-50` | —         | Page background                            |
| Surface        | `white`              | —         | Card backgrounds                           |
| Text primary   | `slate-900`          | `#0f172a` | Body text, headings                        |
| Text secondary | `slate-600`          | `#475569` | Captions, metadata                         |
| Text muted     | `slate-400`          | `#94a3b8` | Placeholder, disabled                      |
| Border         | `slate-200`          | `#e2e8f0` | Card borders, dividers                     |
| Danger         | `rose-600`           | —         | Error states, delete actions               |
| Success        | `emerald-600`        | —         | Success states, verified badges            |

---

## Typography Scale

| Element              | Classes                                                       |
| -------------------- | ------------------------------------------------------------- |
| Page title (H1)      | `text-3xl font-bold text-slate-900 md:text-4xl`               |
| Section heading (H2) | `text-2xl font-semibold text-slate-900`                       |
| Card title (H3)      | `text-lg font-semibold text-slate-900`                        |
| Body text            | `text-base text-slate-700 leading-relaxed`                    |
| Small / Caption      | `text-sm text-slate-500`                                      |
| Label                | `text-xs font-medium text-purple-800 uppercase tracking-wide` |
| Link                 | `text-purple-700 hover:text-purple-900 hover:underline`       |

---

## Spacing Conventions

| Element             | Pattern                                  |
| ------------------- | ---------------------------------------- |
| Section padding (Y) | `py-16 md:py-24`                         |
| Container           | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Card padding        | `p-6`                                    |
| Card gap in grid    | `gap-6`                                  |
| Stack spacing       | `space-y-4` or `flex flex-col gap-4`     |

---

## Component Patterns

### Card

```tsx
<article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
    <div className="aspect-video w-full overflow-hidden">
        <img className="w-full h-full object-cover" ... />
    </div>
    <div className="p-6">
        {/* content */}
    </div>
</article>
```

### Button — Primary

```tsx
<button className="inline-flex items-center gap-2 rounded-lg bg-purple-800 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:outline-none">
	Daftar Sekarang
</button>
```

### Button — Secondary

```tsx
<button className="inline-flex items-center gap-2 rounded-lg border border-purple-800 px-5 py-2.5 text-sm font-medium text-purple-800 transition-colors duration-150 hover:bg-purple-50">
	Pelajari Lebih Lanjut
</button>
```

### Badge / Tag

```tsx
<span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
	Kaderisasi
</span>
```

### Section Container

```tsx
<section className="bg-white py-16 md:py-24">
	<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{/* content */}</div>
</section>
```

---

## Responsive Breakpoints

| Prefix | Min-width | Target                       |
| ------ | --------- | ---------------------------- |
| (base) | 0px       | Mobile phones                |
| `sm:`  | 640px     | Large phones / small tablets |
| `md:`  | 768px     | Tablets                      |
| `lg:`  | 1024px    | Laptops                      |
| `xl:`  | 1280px    | Desktops                     |

Grid patterns:

```tsx
// 1 col mobile → 2 col tablet → 3 col desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// 1 col mobile → 3 col desktop (skip sm)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
```

---

## Accessibility

- All interactive elements: minimum touch target `44×44px` (use `min-h-[44px] min-w-[44px]`)
- All `<img>`: descriptive `alt` attribute required
- Focus rings: `focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2`
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`)
- Color contrast: text on backgrounds must meet WCAG AA (4.5:1 for body text)

---

## Headless UI v2 Usage

For modals, dialogs, dropdowns, listboxes — use Headless UI components:

```tsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

<Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
	<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
	<div className="fixed inset-0 flex items-center justify-center p-4">
		<DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
			<DialogTitle className="text-lg font-semibold text-slate-900">Judul Modal</DialogTitle>
			{/* content */}
		</DialogPanel>
	</div>
</Dialog>;
```

---

## Lucide React Icons

```tsx
import { Mountain, TreePine, ChevronRight, Calendar, Users } from 'lucide-react';

// Always include size + stroke props for consistency
<Mountain className="w-5 h-5 text-purple-700" strokeWidth={1.5} />

// In buttons
<button className="...">
    <Calendar className="w-4 h-4" />
    Jadwal Kegiatan
</button>
```

Standard sizes:

- Inline with text: `w-4 h-4`
- Standalone icon: `w-5 h-5`
- Large decorative: `w-8 h-8` or `w-10 h-10`
