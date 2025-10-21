<?php

namespace Admin\Src\Http\Controllers\Questions;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class CreatePage extends BaseAction
{
    public function __invoke(): Response
    {
        $categories = $this->categoryService->categories();
        return inertia('Admin/Question/CreateQuestionPage', [
            'categories' => $categories
        ]);
    }
}
