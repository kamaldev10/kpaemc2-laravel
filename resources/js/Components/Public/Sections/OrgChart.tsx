import MemberCard from '@/Components/Public/Cards/MemberCard';
import { Member } from '@/types/member';
import { Shield } from 'lucide-react';
import { FC } from 'react';

interface OrgChartProps {
	leaders: Member[];
	className?: string;
}

export const OrgChart: FC<OrgChartProps> = ({ leaders, className = '' }) => {
	if (!leaders || leaders.length === 0) {
		return null;
	}

	const chairman = leaders.find(
		(m) =>
			(m.position && m.position.toLowerCase().includes('ketua')) ||
			(m.name && m.name.toLowerCase().includes('desti'))
	) || leaders[0];

	const staff = leaders.filter((m) => m.id !== chairman.id);

	return (
		<div className={`space-y-10 ${className}`}>
			<div className="text-center">
				<div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold text-purple-900 uppercase">
					<Shield className="h-3.5 w-3.5 text-purple-700" />
					<span>Inti Pimpinan Organisasi</span>
				</div>
				<h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
					Badan Pengurus Harian
				</h3>
				<p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
					Bertanggung jawab penuh dalam kepemimpinan, perumusan kebijakan, tata kelola kearsipan, dan
					keuangan organisasi.
				</p>
			</div>

			{/* Ketua Umum Center Card */}
			<div className="flex justify-center">
				<div className="w-full max-w-sm">
					<MemberCard member={chairman} variant="leadership" />
				</div>
			</div>

			{/* Staff / BPH Row (Sekretaris, Bendahara, Staff Ahli) */}
			{staff.length > 0 && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
					{staff.map((member) => (
						<MemberCard key={member.id} member={member} variant="leadership" />
					))}
				</div>
			)}
		</div>
	);
};

export default OrgChart;
