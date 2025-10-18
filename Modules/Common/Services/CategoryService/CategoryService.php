<?php

namespace Common\Services\CategoryService;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CategoryService extends BaseService
{
    public function create(array $data)
    {
        try {
            return DB::transaction(function () use ($data) {
                $data['creator_id'] = auth()->user()->id;
                $category = $this->categoryRepository->create($data);
                Cache::tags(['categories'])->flush();
                Cache::tags(['tree_categories'])->flush();
                return $category;
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function categories(array $params = [])
    {
        $cacheKey = 'categories_' . md5(serialize($params));
        $cacheTime = 60 * 24; // 24 hours = 1440 minutes

        return Cache::tags(['categories'])->remember($cacheKey, $cacheTime, function () use ($params) {
            return $this->categoryRepository->categories(
                $params['search'] ?? '',
                $params['sort_by'] ?? 'id',
                $params['sort_direction'] ?? 'asc'
            );
        });
    }

    public function treeCategories(array $params = [])
    {
        $cacheKey = 'categories_' . md5(serialize($params));
        $cacheTime = 60 * 24; // 24 hours = 1440 minutes

        return Cache::tags(['tree_categories'])->remember($cacheKey, $cacheTime, function () use ($params) {
            return $this->categoryRepository->treeCategories();
        });
    }
}
