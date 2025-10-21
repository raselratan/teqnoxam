<?php

namespace Common\Services\PostService;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PostService extends BaseService
{
    public function create(array $data)
    {
        try {
            return DB::transaction(function () use ($data) {
                // $data['creator_id'] = auth()->user()->id;
                $post = $this->postRepository->create($data);
                // Cache::tags(['categories'])->flush();
                // Cache::tags(['tree_categories'])->flush();
                return $post;
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function categories(array $params = [])
    {
        // $cacheKey = 'categories_' . md5(serialize($params));
        // $cacheTime = 60 * 24; // 24 hours = 1440 minutes

        // return Cache::tags(['categories'])->remember($cacheKey, $cacheTime, function () use ($params) {
        //     return $this->categoryRepository->categories(
        //         $params['search'] ?? '',
        //         $params['sort_by'] ?? 'id',
        //         $params['sort_direction'] ?? 'asc'
        //     );
        // });
    }
}
