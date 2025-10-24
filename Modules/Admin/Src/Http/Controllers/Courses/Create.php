<?php

namespace Admin\Src\Http\Controllers\Courses;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\CourseCreateRequest;
use Illuminate\Http\RedirectResponse;

class Create extends BaseAction
{
    public function __invoke(CourseCreateRequest $request): RedirectResponse
    {
        try {
            $this->courseService->create($request->validated());
            return back()->with("success", "Successfully Created.");
        } catch (\Exception $e) {
            return back()
                ->with("error", "Something went wrong!!!")->withInput();
        }
    }
}
