<?php

namespace Common\Services\CourseService;

use Illuminate\Support\Facades\Cache;

class CourseService extends BaseService
{
    public function create(array $data)
    {
        $data['creator_id'] = auth()->user()->id;
        Cache::tags(['courses'])->flush();
        return $this->courseRepository->create($data);
    }

    public function paginate(array $params = [])
    {
        $cacheKey = 'course_page_' . md5(serialize($params));
        $cacheTime = 60 * 24;

        return Cache::tags(['courses'])->remember($cacheKey, $cacheTime, function () use ($params) {
            $perPage = $params['per_page'] ?? 10;
            $page = $params['page'] ?? 1;
            $sortBy = $params['sort_by'] ?? 'id';
            $sortDirection = $params['sort_direction'] ?? 'asc';
            $search = $params['search'] ?? '';

            // Map frontend column names to database columns
            $dbSortBy = match ($sortBy) {
                'creator_name' => 'users.name',
                default => $sortBy,
            };

            $courses = $this->courseRepository->getPaginateCourses(
                $search,
                $dbSortBy, // Pass the database column name
                $sortDirection,
                $perPage,
                $page
            );

            return [
                'courses' => $courses->items(),
                'pagination' => [
                    'current_page' => $courses->currentPage(),
                    'last_page' => $courses->lastPage(),
                    'per_page' => $courses->perPage(),
                    'total' => $courses->total(),
                    'from' => $courses->firstItem(),
                    'to' => $courses->lastItem(),
                ],
                'filters' => [
                    'sort_by' => $sortBy, // Return original frontend column name
                    'sort_direction' => $sortDirection,
                    'search' => $search,
                ],
            ];
        });
    }
}
