<?php

namespace Common\Src\Repositories;

use Common\Models\Category;
use Common\Src\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function categories($search, $sortBy, $sortDirection)
    {
        return Category::query()
            ->leftJoin('categories as parent', 'categories.parent_id', '=', 'parent.id')
            ->leftJoin('users', 'categories.creator_id', '=', 'users.id')
            ->select('categories.*', 'parent.title as parent_category', 'users.name as creator_name')
            ->when($search, function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('categories.title', 'like', "%{$search}%")
                        ->orWhere('parent.title', 'like', "%{$search}%")
                        ->orWhere('users.name', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortBy, $sortDirection)
            ->toBase() // 👈 this ensures it returns a plain query builder result (not Eloquent models)
            ->get();
    }
}
