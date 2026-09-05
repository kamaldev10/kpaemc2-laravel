import { Config } from 'ziggy-js';

export interface User {
	id: string;
	name: string;
	email: string;
	role?: 'super_admin' | 'admin' | 'editor';
	avatar_url?: string | null;
	avatar_public_id?: string | null;
	email_verified_at?: string | null;
	is_active?: boolean;
}

export interface PaginatedResource<T> {
	data: T[];
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
	from: number | null;
	to: number | null;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
	auth: {
		user: User;
	};
	ziggy: Config & { location: string };
	use_mock_data?: boolean;
	app_logo_url?: string;
};
