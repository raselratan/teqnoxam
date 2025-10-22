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
                $post = $this->postRepository->create($data);
                Cache::tags(['posts'])->flush();
                return $post;
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function posts(array $params = [])
    {
        $cacheKey = 'posts_' . md5(serialize($params));
        $cacheTime = 60 * 24; // 24 hours = 1440 minutes

        return Cache::tags(['posts'])->remember($cacheKey, $cacheTime, function () use ($params) {
            return $this->postRepository->posts(
                $params['search'] ?? '',
                $params['sort_by'] ?? 'id',
                $params['sort_direction'] ?? 'asc'
            );
        });
    }
}
