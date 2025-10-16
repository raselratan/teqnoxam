<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authenticate extends Middleware
{
    /**
     * Handle an unauthenticated user.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (! $request->expectsJson()) {
            // Use your auth.login route instead of login
            return route('auth.login');
        }

        return null;
    }
}
