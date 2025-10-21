<?php

namespace Common\Services\PostService;

use Common\Src\Repositories\Contracts\PostRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected PostRepositoryInterface $postRepository,
    ) {}
}
