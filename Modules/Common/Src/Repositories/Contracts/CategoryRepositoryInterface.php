<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Category;


interface CategoryRepositoryInterface
{
    public function create(array $data): Category;

    public function categories($search, $sortBy, $sortDirection);

    public function treeCategories();
}
