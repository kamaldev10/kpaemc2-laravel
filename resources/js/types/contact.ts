export interface ContactMessage {
	id?: string;
	name: string;
	email: string;
	subject: string;
	message: string;
	is_read?: boolean;
	ip_address?: string | null;
	created_at?: string;
}
