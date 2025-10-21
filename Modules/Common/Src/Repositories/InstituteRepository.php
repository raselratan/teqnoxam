<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Institute;
use Common\Src\Repositories\Contracts\InstituteRepositoryInterface;

class InstituteRepository implements InstituteRepositoryInterface
{
    public function create(array $data): Institute
    {
        return Institute::create($data);
    }

    public function institutes($search, $sortBy, $sortDirection) {}
}
