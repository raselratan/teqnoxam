<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Option;
use Common\Src\Repositories\Contracts\QuestionOptionRepositoryInterface;

class QuestionOptionRepository implements QuestionOptionRepositoryInterface
{
    public function create(array $data): Option
    {
        return Option::create($data);
    }

    public function insert(array $data): bool
    {
        return Option::insert($data);
    }
}
