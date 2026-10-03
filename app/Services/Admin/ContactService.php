<?php

namespace App\Services\Admin;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ContactService
{
    /**
     * Get paginated contacts with filters.
     *
     * @param  string|null  $search
     * @param  string|null  $status  'read', 'unread', or null (all)
     * @param  int  $perPage
     * @return LengthAwarePaginator
     */
    public function getPaginatedContacts(?string $search = null, ?string $status = null, int $perPage = 15): LengthAwarePaginator
    {
        $query = Contact::query()->orderByDesc('created_at');

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                    ->orWhere('email', 'ilike', "%{$search}%")
                    ->orWhere('subject', 'ilike', "%{$search}%")
                    ->orWhere('message', 'ilike', "%{$search}%");
            });
        }

        if ($status === 'unread') {
            $query->where('is_read', false);
        } elseif ($status === 'read') {
            $query->where('is_read', true);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get unread inquiries count.
     */
    public function getUnreadCount(): int
    {
        return Contact::where('is_read', false)->count();
    }

    /**
     * Mark a contact inquiry as read.
     */
    public function markAsRead(Contact $contact, User $user): bool
    {
        $contact->is_read = true;
        $contact->updated_by = $user->id;
        return $contact->save();
    }

    /**
     * Mark all inquiries as read.
     */
    public function markAllAsRead(User $user): int
    {
        return Contact::where('is_read', false)->update([
            'is_read' => true,
            'updated_by' => $user->id,
            'updated_at' => now(),
        ]);
    }

    /**
     * Delete a contact inquiry.
     */
    public function deleteContact(Contact $contact, User $user): bool
    {
        $contact->updated_by = $user->id;
        $contact->save();

        return (bool) $contact->delete();
    }
}
