import { Division } from './division';

export type MemberStatus = 'regular' | 'honorary' | 'inactive';

export type DepartmentMajor =
	| 'sistem_informasi'
	| 'manajemen_informatika'
	| 'biologi'
	| 'fisika'
	| 'kimia'
	| 'matematika'
	| 'statistika';

export const MEMBER_STATUS_LABELS: Record<MemberStatus, string> = {
	regular: 'Anggota Biasa',
	honorary: 'Anggota Luar Biasa',
	inactive: 'Non Aktif',
};

export const DEPARTMENT_MAJOR_LABELS: Record<DepartmentMajor, string> = {
	sistem_informasi: 'Sistem Informasi',
	manajemen_informatika: 'Manajemen Informatika',
	biologi: 'Biologi',
	fisika: 'Fisika',
	kimia: 'Kimia',
	matematika: 'Matematika',
	statistika: 'Statistika',
};

export interface Member {
	id: string;
	member_number?: string | null;
	name: string;
	nrp?: string | null;
	division_id?: string | null;
	division?: Division | null;
	position?: string | null;
	role_title?: string;
	batch_year?: number | null;
	major?: DepartmentMajor | string | null;
	major_label?: string | null;
	phone?: string | null;
	email?: string | null;
	status?: MemberStatus | string | null;
	status_label?: string | null;
	is_leader?: boolean;
	photo_url?: string | null;
	photo_public_id?: string | null;
	avatar_url?: string | null;
	avatar_public_id?: string | null;
	bio?: string | null;
	is_pengurus?: boolean;
	sort_order?: number;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
	can?: {
		update?: boolean;
		delete?: boolean;
	};
}
