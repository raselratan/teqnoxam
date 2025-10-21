<?php

namespace Admin\Src\Http\Controllers\Posts;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\PostCreateRequest;
use Illuminate\Http\RedirectResponse;

class Create extends BaseAction
{
    public function __invoke(PostCreateRequest $request): RedirectResponse
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
