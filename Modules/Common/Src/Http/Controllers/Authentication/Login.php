<?php

namespace Common\Src\Http\Controllers\Authentication;

use Common\Models\User;
use Common\Src\Http\Controllers\BaseAction;
use Common\Src\Http\Requests\Authentication\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class Login extends BaseAction
{
    public function __invoke(LoginRequest $request): RedirectResponse
    {
        if (Auth::attempt($request->validated(), $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::user();

            // Redirect based on role
            return match ($user->role) {
                'admin'     => redirect()->intended(route('admin.dashboard')),
                'examinee'  => redirect()->intended(route('examinee.dashboard')),
                default     => redirect()->route('dashboard'), // or abort(403)
            };
        }

        return back()->withErrors([
            'mobile' => 'Invalid credentials.',
        ]);
    }
}
