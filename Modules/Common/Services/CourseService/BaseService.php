<?php

namespace Common\Services\CourseService;

use Common\Src\Repositories\Contracts\CourseRepositoryInterface;

class BaseService
{
    public function __construct(
        protected CourseRepositoryInterface $courseRepository
    ) {}
}
