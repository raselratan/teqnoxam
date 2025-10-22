<?php

namespace Common\Services\ExamYearService;

use Common\Src\Repositories\Contracts\ExamYearRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected ExamYearRepositoryInterface $examYearRepository,
    ) {}
}
