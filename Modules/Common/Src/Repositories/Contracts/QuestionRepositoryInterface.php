<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\Question;

interface QuestionRepositoryInterface
{
    public function create(array $data): Question;

    public function questions(string $search, string $sortBy, string $sortDirection, int $perPage, int $page);
}
