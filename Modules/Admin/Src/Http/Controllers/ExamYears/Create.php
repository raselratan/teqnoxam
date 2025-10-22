<?php

namespace Admin\Src\Http\Controllers\ExamYears;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\ExamYearCreateRequest;
use Illuminate\Http\RedirectResponse;

class Create extends BaseAction
{
    public function __invoke(ExamYearCreateRequest $request): RedirectResponse
    {
        try {
            $this->examYearService->create($request->validated());
            return back()->with("success", "Successfully Created.");
        } catch (\Exception $e) {
            return back()
                ->with("error", "Something went wrong!!!")->withInput();
        }
    }
}
