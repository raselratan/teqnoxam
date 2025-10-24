<?php

namespace Common\Services\UserServices;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserServices extends BaseService
{
    public function create(array $user)
    {
        try {
            return DB::transaction(function () use ($user) {
                $user['password'] = Hash::make('12345678');
                $user['role'] = 'admin';
                $user['creator_id'] = auth()->user()->id;
                Cache::tags(['users'])->flush();
                return $this->userRepository->create($user);
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function users()
    {
        return $this->userRepository->all();
    }

    /**
     * Get paginated users with caching.
     */
    public function paginate(array $params = [])
    {
        $cacheKey = 'users_page_' . md5(serialize($params));
        $cacheTime = 60 * 24; // 24 hours

        return Cache::tags(['users'])->remember($cacheKey, $cacheTime, function () use ($params) {
            $perPage = $params['per_page'] ?? 10;
            $page = $params['page'] ?? 1;
            $sortBy = $params['sort_by'] ?? 'id';
            $sortDirection = $params['sort_direction'] ?? 'asc';
            $search = $params['search'] ?? '';

            $users = $this->userRepository->getPaginatedUsers(
                $search,
                $sortBy,
                $sortDirection,
                $perPage,
                $page
            );

            return [
                'users' => $users->items(),
                'pagination' => [
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'per_page' => $users->perPage(),
                    'total' => $users->total(),
                    'from' => $users->firstItem(),
                    'to' => $users->lastItem(),
                ],
                'filters' => [
                    'sort_by' => $sortBy,
                    'sort_direction' => $sortDirection,
                    'search' => $search,
                ],
            ];
        });
    }
}
