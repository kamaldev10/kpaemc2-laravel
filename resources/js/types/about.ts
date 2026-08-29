export interface OrgLeader {
	role?: string;
	name?: string;
	title?: string;
	photo_url?: string | null;
	nrp?: string | null;
}

export interface OrgDivisionSummary {
	id: string;
	name: string;
	slug: string;
	head_name?: string;
	member_count?: number;
}

export interface OrgHistoryPeriod {
	image?: string;
	period?: string;
	chairmanName?: string;
	department?: string;
	description?: string;
}

export interface OrgStructure {
	leadership?: OrgLeader[];
	divisions?: OrgDivisionSummary[];
	[key: string]: unknown;
}

export interface AboutInfo {
	id: string;
	org_name: string;
	short_name?: string;
	tagline?: string | null;
	motto?: string | null;
	description?: string | null;
	history?: string | null;
	vision?: string | null;
	mission?: string[] | null;
	code_of_ethics?: string[] | null;
	active_term?: string | null;
	logo_url?: string | null;
	logo_public_id?: string | null;
	logo_philosophy?: string | null;
	cover_url?: string | null;
	cover_public_id?: string | null;
	hero_banner_url?: string | null;
	org_structure?: OrgStructure | OrgHistoryPeriod[] | null;
	founded_date?: string | null;
	established_at?: string | null;
	address?: string | null;
	email?: string | null;
	phone?: string | null;
	social_links?: Record<string, string> | null;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
}
