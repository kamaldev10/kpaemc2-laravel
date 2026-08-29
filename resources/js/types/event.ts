import { Division } from './division';
import { Category } from './post';

export interface EventFormField {
	key: string;
	label: string;
	type: 'text' | 'number' | 'email' | 'tel' | 'select' | 'textarea';
	required: boolean;
	options?: string[];
	placeholder?: string;
}

export interface Event {
	id: string;
	slug: string;
	category_id?: string | null;
	category?: Category | null;
	division_id?: string | null;
	division?: Division | null;
	title: string;
	type?: string;
	description?: string | null;
	cover_url?: string | null;
	cover_public_id?: string | null;
	location?: string | null;
	start_date?: string | null;
	end_date?: string | null;
	event_date?: string | null;
	registration_open_at?: string | null;
	registration_close_at?: string | null;
	registration_deadline?: string | null;
	max_participants?: number | null;
	quota?: number | null;
	requires_payment?: boolean;
	payment_amount?: number | string | null;
	fee?: number | null;
	form_fields?: EventFormField[] | null;
	tags?: string[] | null;
	is_published?: boolean;
	is_active?: boolean;
	status?: 'draft' | 'open' | 'closed' | 'ongoing' | 'completed' | string;
	is_registration_open?: boolean;
	registrations_count?: number;
	created_at?: string;
	updated_at?: string;
}

export interface Registration {
	id: string;
	event_id: string;
	event?: Event | null;
	registration_code: string;
	full_name: string;
	email: string;
	phone?: string | null;
	gender?: 'male' | 'female' | null;
	birth_date?: string | null;
	place_of_birth?: string | null;
	address?: string | null;
	institution?: string | null;
	major?: string | null;
	occupation?: string | null;
	motivation?: string | null;
	photo_url?: string | null;
	photo_public_id?: string | null;
	document_url?: string | null;
	document_public_id?: string | null;
	extra_data?: Record<string, unknown> | null;
	payment_proof_url?: string | null;
	payment_proof_public_id?: string | null;
	status: 'pending' | 'verified' | 'rejected';
	reviewer_notes?: string | null;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
}
