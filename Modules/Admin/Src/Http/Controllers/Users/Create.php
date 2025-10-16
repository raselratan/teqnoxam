<?php

namespace Admin\Src\Http\Controllers\Users;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\UserCreateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class Create extends BaseAction
{
    public function __invoke(UserCreateRequest $request): RedirectResponse
    {
        try {
            $this->userServices->create($request->validated());
            return back()->with("success", "Successfully Created.");
        } catch (\Exception $e) {
            return back()
                ->with("error", "Something went wrong!!!")->withInput();
        }
    }
}
