<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Question;
use Common\Src\Repositories\Contracts\QuestionRepositoryInterface;

class QuestionRepository implements QuestionRepositoryInterface
{
    public function create(array $data): Question
    {
        return Question::create($data);
    }
}
