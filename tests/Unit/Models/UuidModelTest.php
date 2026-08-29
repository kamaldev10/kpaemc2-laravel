<?php

namespace Tests\Unit\Models;

use App\Models\AboutInfo;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Division;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\GalleryItem;
use App\Models\Member;
use App\Models\Post;
use App\Models\Registration;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Tests\TestCase;

class UuidModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_models_generate_valid_uuid_primary_keys(): void
    {
        $user = User::factory()->create();
        $this->assertTrue(Str::isUuid($user->id));

        $division = Division::factory()->create();
        $this->assertTrue(Str::isUuid($division->id));

        $category = Category::factory()->create();
        $this->assertTrue(Str::isUuid($category->id));

        $about = AboutInfo::factory()->create();
        $this->assertTrue(Str::isUuid($about->id));

        $member = Member::factory()->create(['division_id' => $division->id]);
        $this->assertTrue(Str::isUuid($member->id));
        $this->assertTrue(Str::isUuid($member->division_id));

        $post = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'division_id' => $division->id,
        ]);
        $this->assertTrue(Str::isUuid($post->id));
        $this->assertTrue(Str::isUuid($post->user_id));

        $event = Event::factory()->create([
            'category_id' => $category->id,
            'division_id' => $division->id,
        ]);
        $this->assertTrue(Str::isUuid($event->id));

        $gallery = Gallery::factory()->create([
            'category_id' => $category->id,
            'division_id' => $division->id,
        ]);
        $this->assertTrue(Str::isUuid($gallery->id));

        $galleryItem = GalleryItem::factory()->create([
            'gallery_id' => $gallery->id,
        ]);
        $this->assertTrue(Str::isUuid($galleryItem->id));
        $this->assertTrue(Str::isUuid($galleryItem->gallery_id));

        $registration = Registration::factory()->create([
            'event_id' => $event->id,
        ]);
        $this->assertTrue(Str::isUuid($registration->id));
        $this->assertTrue(Str::isUuid($registration->event_id));

        $contact = Contact::factory()->create();
        $this->assertTrue(Str::isUuid($contact->id));

        $siteSetting = SiteSetting::factory()->create();
        $this->assertTrue(Str::isUuid($siteSetting->id));
    }

    public function test_querying_with_invalid_uuid_returns_null_without_database_error(): void
    {
        $user = User::factory()->create();

        $this->assertNull(User::find('1'));
        $this->assertNull(User::find('invalid-uuid'));
        $this->assertNull(User::where('id', '1')->first());
        $this->assertNull(User::where('users.id', '1')->first());

        $this->assertNotNull(User::find($user->id));

        $provider = Auth::getProvider();
        $this->assertNull($provider->retrieveById('1'));
        $this->assertNull($provider->retrieveById('invalid-uuid'));
        $this->assertNotNull($provider->retrieveById($user->id));

        $this->assertNull(Post::find('1'));
        $this->assertNull(Division::find('999'));
        $this->assertNull(Member::find('legacy-integer-id'));
    }
}
