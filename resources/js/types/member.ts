import { Division } from './division';

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
	major?: string | null;
	phone?: string | null;
	email?: string | null;
	status?: string | null;
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
}
