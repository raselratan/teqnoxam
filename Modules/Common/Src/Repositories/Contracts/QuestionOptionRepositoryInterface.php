<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\Option;

interface QuestionOptionRepositoryInterface
{
    public function create(array $data): Option;

    public function insert(array $data): bool;
}
