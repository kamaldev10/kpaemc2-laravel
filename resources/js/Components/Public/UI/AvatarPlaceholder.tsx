import { User } from 'lucide-react';
import { FC } from 'react';

interface AvatarPlaceholderProps {
	name: string;
	className?: string;
	showInitials?: boolean;
}

export const AvatarPlaceholder: FC<AvatarPlaceholderProps> = ({
	name,
	className = 'h-full w-full',
	showInitials = true,
}) => {
	const getInitials = (str: string) => {
		if (!str) return 'EM';
		const parts = str
			.trim()
			.split(/\s+/)
			.filter(Boolean);
		if (parts.length === 1) {
			return parts[0].substring(0, 2).toUpperCase();
		}
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	};

	const initials = getInitials(name);

	return (
		<div
			className={`flex items-center justify-center bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 font-extrabold text-white select-none shadow-inner ${className}`}
		>
			{showInitials ? (
				<span className="tracking-wider">{initials}</span>
			) : (
				<User className="h-1/2 w-1/2 text-purple-200" />
			)}
		</div>
	);
};

export default AvatarPlaceholder;
