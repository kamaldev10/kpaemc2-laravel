<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $destination = $request->user()->isAtLeast(\App\Enums\RoleTypeEnum::ADMIN)
                ? route('admin.dashboard', absolute: false) . '?verified=1'
                : route('home', absolute: false) . '?verified=1';

            return redirect()->intended($destination);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        $destination = $request->user()->isAtLeast(\App\Enums\RoleTypeEnum::ADMIN)
            ? route('admin.dashboard', absolute: false) . '?verified=1'
            : route('home', absolute: false) . '?verified=1';

        return redirect()->intended($destination);
    }
}
