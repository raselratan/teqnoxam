<?php

namespace Admin\Src\Http\Controllers\ExamYears;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class ExamYears extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/ExamYears/ExamYears', [
            'exam_years' =>  $this->examYearService->examYears()
        ]);
    }
}
