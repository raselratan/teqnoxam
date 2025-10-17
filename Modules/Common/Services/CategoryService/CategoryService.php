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
                return $this->categoryRepository->create($data);
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function categories(array $params = [])
    {
        $cacheKey = 'categories_' . md5(serialize($params));
        $cacheTime = 300; // 5 minutes

        return Cache::remember($cacheKey, $cacheTime, function () use ($params) {
            $sortBy = $params['sort_by'] ?? 'id';
            $sortDirection = $params['sort_direction'] ?? 'asc';
            $search = $params['search'] ?? '';

            $categories = $this->categoryRepository->categories($search, $sortBy, $sortDirection);

            return $categories;
        });
    }
}
