<?php

namespace Admin\Src\Http\Controllers\Categories;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\CategoryCreateRequest;
use Illuminate\Http\RedirectResponse;

class Create extends BaseAction
{
    public function __invoke(CategoryCreateRequest $request): RedirectResponse
    {
        try {
            $this->categoryService->create($request->validated());
            return back()->with("success", "Successfully Created.");
        } catch (\Exception $e) {
            return back()
                ->with("error", "Something went wrong!!!")->withInput();
        }
    }
}
