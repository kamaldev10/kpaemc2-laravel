import MemberCard from '@/Components/Public/Cards/MemberCard';
import { Division } from '@/types/division';
import { Member } from '@/types/member';
import { Compass, Home, TreePine, Users } from 'lucide-react';
import { FC } from 'react';

interface DivisionMemberGroupProps {
	division: Division;
	members: Member[];
	className?: string;
}

const iconMap: Record<string, typeof Users> = {
	Users: Users,
	TreePine: TreePine,
	Compass: Compass,
	Home: Home,
};

export const DivisionMemberGroup: FC<DivisionMemberGroupProps> = ({
	division,
	members,
	className = '',
}) => {
	const IconComponent = (division.icon_name && iconMap[division.icon_name]) || Users;

	return (
		<div
			className={`rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs ${className}`}
		>
			{/* Division Header Banner */}
			<div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
				<div className="flex items-center gap-3.5">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-900 shadow-xs">
						<IconComponent className="h-6 w-6" />
					</div>
					<div>
						<h3 className="text-xl font-bold tracking-tight text-slate-900">
							{division.name}
						</h3>
						<p className="text-xs text-slate-500 max-w-lg">
							{division.short_description || division.description}
						</p>
					</div>
				</div>
				<span className="self-start sm:self-auto rounded-full bg-purple-50 px-3.5 py-1 text-xs font-bold text-purple-900 border border-purple-100">
					{members.length} Personel
				</span>
			</div>

			{/* Member Cards Grid */}
			{members.length > 0 ? (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{members.map((member) => (
						<MemberCard key={member.id} member={member} />
					))}
				</div>
			) : (
				<div className="py-8 text-center text-xs text-slate-400">
					Belum ada anggota terdaftar untuk divisi ini.
				</div>
			)}
		</div>
	);
};

export default DivisionMemberGroup;
