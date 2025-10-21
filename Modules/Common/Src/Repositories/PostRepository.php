<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Post;
use Common\Src\Repositories\Contracts\PostRepositoryInterface;

class PostRepository implements PostRepositoryInterface
{
    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function posts($search, $sortBy, $sortDirection) {}
}
