<?php

namespace App\Providers;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->extend(\Illuminate\Database\Migrations\MigrationCreator::class, function ($creator, $app) {
            return new \App\Support\CustomMigrationCreator($app['files'], $app->basePath('stubs'));
        });

        $this->app->extend('migration.creator', function ($creator, $app) {
            return new \App\Support\CustomMigrationCreator($app['files'], $app->basePath('stubs'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        \Illuminate\Http\Resources\Json\JsonResource::withoutWrapping();

        \Illuminate\Support\Facades\Gate::policy(\App\Models\Post::class, \App\Policies\PostPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Member::class, \App\Policies\MemberPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Event::class, \App\Policies\EventPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Category::class, \App\Policies\CategoryPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Gallery::class, \App\Policies\GalleryPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\SiteSetting::class, \App\Policies\SettingPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\AboutInfo::class, \App\Policies\SettingPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Contact::class, \App\Policies\ContactPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\User::class, \App\Policies\UserPolicy::class);

        // Robust Eloquent User Provider that handles legacy / invalid UUID session IDs safely
        Auth::provider('eloquent', function ($app, array $config) {
            return new class($app['hash'], $config['model']) extends EloquentUserProvider {
                public function retrieveById($identifier)
                {
                    if (empty($identifier) || ! is_scalar($identifier) || ! Str::isUuid((string) $identifier)) {
                        return null;
                    }

                    return parent::retrieveById($identifier);
                }

                public function retrieveByToken($identifier, #[\SensitiveParameter] $token)
                {
                    if (empty($identifier) || ! is_scalar($identifier) || ! Str::isUuid((string) $identifier)) {
                        return null;
                    }

                    return parent::retrieveByToken($identifier, $token);
                }
            };
        });
    }
}
