export interface Category {
	id: string;
	name: string;
	slug: string;
	type: 'post' | 'event' | 'gallery' | 'general';
	color?: string | null;
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
	content_source?: string | null;
	cover_image_url?: string | null;
	cover_image_public_id?: string | null;
	cover_image_source?: string | null;
	cover_url?: string | null;
	cover_public_id?: string | null;
	tags: string[];
	status?: 'draft' | 'published' | 'archived';
	is_published?: boolean;
	is_featured?: boolean;
	published_at?: string | null;
	post_date?: string | null;
	author_name?: string | null;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
}
