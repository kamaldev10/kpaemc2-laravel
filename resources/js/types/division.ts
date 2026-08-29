export interface Division {
	id: string;
	name: string;
	slug: string;
	description?: string | null;
	short_description?: string | null;
	full_description?: string | null;
	icon_name?: string | null;
	cover_url?: string | null;
	cover_public_id?: string | null;
	study_materials?: string[] | null;
	equipment?: string[] | null;
	sort_order?: number;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
}
