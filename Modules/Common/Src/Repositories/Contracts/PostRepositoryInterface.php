<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\Post;

interface PostRepositoryInterface
{
    public function create(array $data): Post;

    public function posts($search, $sortBy, $sortDirection);
}
