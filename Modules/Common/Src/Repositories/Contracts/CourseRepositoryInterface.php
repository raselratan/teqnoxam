<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Course\Course;

interface CourseRepositoryInterface
{
    public function create(array $data): Course;
    public function courses();
    public function getPaginateCourses(string $search, string $sortBy, string $sortDirection, int $perPage, int $page);
}
