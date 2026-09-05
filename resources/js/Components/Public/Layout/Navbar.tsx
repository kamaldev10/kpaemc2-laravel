import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Menu, Shield, X } from 'lucide-react';
import { FC, useState } from 'react';

interface NavItem {
	name: string;
	href: string;
	route_name: string;
}

const navItems: NavItem[] = [
	{ name: 'Beranda', href: '/', route_name: 'home' },
	{ name: 'Tentang Kami', href: '/about', route_name: 'about' },
	{ name: 'Artikel', href: '/posts', route_name: 'posts' },
	{ name: 'Kegiatan', href: '/events', route_name: 'events' },
	{ name: 'Kontak', href: '/contact', route_name: 'contact' },
];

export const Navbar: FC = () => {
	const { url } = usePage();
	const [isOpen, setIsOpen] = useState(false);

	const isCurrent = (href: string) => {
		if (href === '/') {
			return url === '/';
		}
		if (href.startsWith('/about')) {
			return url === '/about' || url.startsWith('/about');
		}
		if (href.startsWith('/posts')) {
			return url.startsWith('/posts');
		}
		if (href.startsWith('/events')) {
			return url.startsWith('/events');
		}
		if (href.startsWith('/galleries')) {
			return url.startsWith('/galleries');
		}
		if (href.startsWith('/contact')) {
			return url.startsWith('/contact');
		}
		return url.startsWith(href);
	};

	return (
		<header className="shadow-xs sticky top-0 z-40 w-full border-b border-purple-100 bg-white/95 backdrop-blur-md transition-all">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-10 lg:px-8">
				{/* Brand Logo */}
				<Link href="/" className="group flex items-center gap-3">
					<div className="shadow-xs flex h-11 w-11 items-center justify-center rounded-xl border border-purple-100 bg-purple-900 p-1.5 transition-transform group-hover:scale-105">
						<ApplicationLogo className="h-8 w-8 object-contain" />
					</div>
					<div>
						<div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-900">
							<span className="text-xl font-extrabold text-purple-900">KPA EMC²</span>
						</div>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-1 lg:flex">
					{navItems.map((item) => {
						const active = isCurrent(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
									active
										? 'shadow-xs bg-purple-50 font-semibold text-purple-900'
										: 'text-slate-600 hover:bg-slate-50 hover:text-purple-800'
								}`}
							>
								{item.name}
							</Link>
						);
					})}
				</nav>

				{/* Desktop Action Buttons */}
				<div className="hidden items-center gap-3 lg:flex">
					<a
						href="/admin"
						className="inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50/60 px-4 py-2 text-xs font-semibold text-purple-900 transition-colors hover:border-purple-300 hover:bg-purple-100"
					>
						<Shield className="h-3.5 w-3.5 text-purple-700" />
						Portal Pengurus
					</a>
				</div>

				{/* Mobile Hamburger Button */}
				<div className="flex items-center gap-2 lg:hidden">
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle navigation menu"
						className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>
			</div>

			{/* Mobile Drawer Menu */}
			{isOpen && (
				<div className="border-b border-purple-100 bg-white px-4 pb-6 pt-2 shadow-xl lg:hidden">
					<div className="flex flex-col space-y-1">
						{navItems.map((item) => {
							const active = isCurrent(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
										active
											? 'bg-purple-100 font-semibold text-purple-900'
											: 'text-slate-700 hover:bg-slate-50 hover:text-purple-800'
									}`}
								>
									<span>{item.name}</span>
									<ChevronRight className="h-4 w-4 text-slate-400" />
								</Link>
							);
						})}
						<div className="pt-3">
							<a
								href="/admin"
								className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-800 py-3 text-sm font-semibold text-white shadow-md shadow-purple-900/20 hover:bg-purple-700"
							>
								<Shield className="h-4 w-4" />
								Masuk Portal Pengurus
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
