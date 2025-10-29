<?php

namespace Admin\Src\Http\Controllers\Questions;

use Admin\Src\Http\Controllers\BaseAction;
use Illuminate\Http\Request;
use Inertia\Response;

class Questions extends BaseAction
{
    public function __invoke(Request $request): Response
    {
        return inertia('Admin/Question/Questions', [
            "questions" => $this->questionServices->paginatedQuestions($request->all())
        ]);
    }
}
