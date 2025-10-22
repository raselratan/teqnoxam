<?php

namespace Admin\Src\Http\Controllers\ExamYears;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class CreatePage extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/ExamYears/CreateExamYears', [
            'institutes' => $this->instituteService->institutes(),
            'posts' => $this->postService->posts(),
        ]);
    }
}
