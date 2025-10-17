<?php

namespace Common\Services\CategoryService;

use Common\Src\Repositories\Contracts\CategoryRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected CategoryRepositoryInterface $categoryRepository,
    ) {}
}
