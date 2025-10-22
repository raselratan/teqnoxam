<?php

namespace Admin\Src\Http\Controllers\Institutions;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\InstituteCreateRequest;
use Illuminate\Http\RedirectResponse;

class Create extends BaseAction
{
    public function __invoke(InstituteCreateRequest $request): RedirectResponse
    {
        try {
            $this->instituteService->create($request->validated());
            return back()->with("success", "Successfully Created.");
        } catch (\Exception $e) {
            return back()
                ->with("error", "Something went wrong!!!")->withInput();
        }
    }
}
