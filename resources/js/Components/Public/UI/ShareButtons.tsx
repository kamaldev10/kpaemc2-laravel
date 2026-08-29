import { Check, Link2, MessageCircle } from 'lucide-react';
import { FC, useState } from 'react';

interface ShareButtonsProps {
	title: string;
	url?: string;
	className?: string;
}

export const ShareButtons: FC<ShareButtonsProps> = ({ title, url, className = '' }) => {
	const [copied, setCopied] = useState(false);
	const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch (err) {
			console.error('Failed to copy URL', err);
		}
	};

	const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
		`${title} - Baca selengkapnya di KPA EMC²: ${shareUrl}`
	)}`;

	return (
		<div className={`flex items-center gap-2.5 ${className}`}>
			<span className="text-xs font-bold uppercase tracking-wider text-slate-500">
				Bagikan:
			</span>

			{/* WhatsApp */}
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
			>
				<MessageCircle className="h-4 w-4 text-emerald-600" />
				<span>WhatsApp</span>
			</a>

			{/* Copy Link */}
			<button
				type="button"
				onClick={handleCopy}
				className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:border-purple-200 hover:text-purple-900"
			>
				{copied ? (
					<>
						<Check className="h-4 w-4 text-emerald-600" />
						<span className="text-emerald-700">Tersalin!</span>
					</>
				) : (
					<>
						<Link2 className="h-4 w-4 text-slate-500" />
						<span>Salin Tautan</span>
					</>
				)}
			</button>
		</div>
	);
};

export default ShareButtons;
