<?php

namespace Admin\Src\Http\Controllers\Questions;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class CreatePage extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Question/CreateQuestionPage', [
            'categories' => $this->categoryService->categories(),
            'exam_years' => $this->examYearService->examYears(),
        ]);
    }
}
