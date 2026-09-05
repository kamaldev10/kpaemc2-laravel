import { AvatarPlaceholder } from '@/Components/Public/UI/AvatarPlaceholder';
import { Member } from '@/types/member';
import { Award, ShieldCheck } from 'lucide-react';
import { FC } from 'react';

interface MemberCardProps {
	member: Member;
	variant?: 'default' | 'leadership' | 'compact';
	className?: string;
}

export const MemberCard: FC<MemberCardProps> = ({
	member,
	variant = 'default',
	className = '',
}) => {
	const isLeadership = variant === 'leadership' || member.is_leader;
	const avatar = member.avatar_url || member.photo_url;

	return (
		<div
			className={`group relative flex flex-col items-center rounded-3xl border bg-white text-center transition-all duration-300 ${
				isLeadership
					? 'border-purple-200 p-6 shadow-md shadow-purple-900/5 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl'
					: 'border-slate-200/80 p-5 shadow-xs hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg'
			} ${className}`}
		>
			{/* Avatar Container */}
			<div className="relative mb-4">
				<div
					className={`overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-slate-100 shadow-inner ${
						isLeadership ? 'h-28 w-28 ring-4 ring-purple-100' : 'h-20 w-20'
					}`}
				>
					{avatar ? (
						<img
							src={avatar}
							alt={member.name}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
					) : (
						<AvatarPlaceholder name={member.name} className="h-full w-full" />
					)}
				</div>

				{/* Leadership Badge Indicator */}
				{isLeadership && (
					<div
						className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-purple-900 text-white shadow-md"
						title="Inti Pimpinan"
					>
						<ShieldCheck className="h-4 w-4 text-purple-200" />
					</div>
				)}
			</div>

			{/* Member Info */}
			<h4
				className={`font-bold tracking-tight text-slate-900 ${
					isLeadership ? 'text-base sm:text-lg' : 'text-sm'
				}`}
			>
				{member.name}
			</h4>

			{/* Position / Role */}
			{member.position && (
				<p
					className={`mt-1 font-semibold ${
						isLeadership ? 'text-xs text-purple-800' : 'text-xs text-purple-700'
					}`}
				>
					{member.position}
				</p>
			)}

			{/* Member Number / NRP */}
			{(member.member_number || member.nrp) && (
				<div className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-mono text-slate-600">
					<Award className="h-3 w-3 text-slate-400" />
					<span>{member.member_number || member.nrp}</span>
				</div>
			)}

			{/* Major & Batch */}
			{(member.major || member.batch_year) && (
				<p className="mt-2 text-xs text-slate-500">
					{member.major}
					{member.batch_year ? ` (${member.batch_year})` : ''}
				</p>
			)}
		</div>
	);
};

export default MemberCard;
