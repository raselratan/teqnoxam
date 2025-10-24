<?php

namespace Common\Src\Repositories;

use Common\Models\Course\Course;
use Common\Src\Repositories\Contracts\CourseRepositoryInterface;

class CourseRepository implements CourseRepositoryInterface
{
    public function create(array $data): Course
    {
        return Course::create($data);
    }

    public function courses()
    {
        return Course::join('users', 'users.id', '=', 'courses.creator_id')
            ->select('courses.*', 'users.name as creator_name')
            ->get();
    }

    public function getPaginateCourses(string $search, string $sortBy, string $sortDirection, int $perPage, int $page)
    {
        $query = Course::with(['creator:id,name']); // Eager load creator with only needed fields

        // Apply search filter
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhereHas('creator', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Handle sorting for different columns
        if ($sortBy === 'users.name' || $sortBy === 'creator_name') {
            // Sort by related model column
            $query->join('users', 'courses.creator_id', '=', 'users.id')
                ->orderBy('users.name', $sortDirection)
                ->select('courses.*');
        } else {
            // Sort by course column
            $query->orderBy($sortBy, $sortDirection);
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }
}
