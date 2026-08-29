export interface Category {
	id: string;
	name: string;
	slug: string;
	type: 'post' | 'event' | 'gallery' | 'general';
	description?: string | null;
	is_active: boolean;
}

export interface Post {
	id: string;
	category_id?: string | null;
	category?: Category | null;
	division_id?: string | null;
	title: string;
	slug: string;
	excerpt?: string | null;
	content: string;
	cover_url?: string | null;
	cover_public_id?: string | null;
	tags: string[];
	status: 'draft' | 'published' | 'archived';
	published_at?: string | null;
	author_name?: string | null;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
}
