import { FC, PropsWithChildren } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface PublicLayoutProps {
	className?: string;
}

export const PublicLayout: FC<PropsWithChildren<PublicLayoutProps>> = ({
	children,
	className = '',
}) => {
	return (
		<div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-purple-800 selection:text-white">
			<Navbar />
			<main className={`flex-1 ${className}`}>{children}</main>
			<Footer />
		</div>
	);
};

export default PublicLayout;
