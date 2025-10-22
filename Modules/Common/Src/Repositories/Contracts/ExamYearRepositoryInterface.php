<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\ExamYear;

interface ExamYearRepositoryInterface
{
    public function create(array $data): ExamYear;

    public function examYears($search, $sortBy, $sortDirection);
}
