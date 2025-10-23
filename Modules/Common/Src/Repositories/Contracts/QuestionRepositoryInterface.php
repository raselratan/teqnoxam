<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\Question;

interface QuestionRepositoryInterface
{
    public function create(array $data): Question;
}
