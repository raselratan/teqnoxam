<?php

namespace Admin\Src\Http\Controllers\Questions;

use Admin\Src\Http\Controllers\BaseAction;
use Admin\Src\Http\Requests\QuestionCreateRequest;
use Illuminate\Http\RedirectResponse;

class Create extends BaseAction
{
    public function __invoke(QuestionCreateRequest $request): RedirectResponse
    {
        try {
            $this->questionServices->create($request->validated());
            return back()->with("success", "Successfully Created.");
        } catch (\Exception $e) {
            return back()
                ->with("error", "Something went wrong!!!")->withInput();
        }
    }
}
