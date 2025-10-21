<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\Institute;

interface InstituteRepositoryInterface
{
    public function create(array $data): Institute;

    public function institutes($search, $sortBy, $sortDirection);
}
