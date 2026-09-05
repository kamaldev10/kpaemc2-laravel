<?php

namespace App\Http\Middleware;

use App\Enums\RoleTypeEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ensure the authenticated user has at least the "admin" role.
 *
 * This middleware is lightweight and aborts early (403) to avoid any
 * further processing, satisfying the performance‑first requirement.
 */
class EnsureAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->isAtLeast(RoleTypeEnum::ADMIN)) {
            abort(403, 'Admin access required.');
        }

        return $next($request);
    }
}
