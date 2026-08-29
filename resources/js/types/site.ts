export interface SiteSetting {
	id: string;
	key: string;
	value: string | null;
	group?: string;
	description?: string | null;
	is_public: boolean;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
}

export type SiteStatsMap = Record<string, string>;
