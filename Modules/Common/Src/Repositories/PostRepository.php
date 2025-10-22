<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Post;
use Common\Src\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Support\Facades\DB;

class PostRepository implements PostRepositoryInterface
{
    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function posts($search, $sortBy, $sortDirection)
    {
        return Post::query()
            ->select(
                'posts.*',
                DB::raw("
                    CASE
                        WHEN posts.title_in_english IS NOT NULL 
                            AND posts.title_in_bangla IS NOT NULL
                        THEN CONCAT(posts.title_in_english, ' (', posts.title_in_bangla, ')')
                        ELSE COALESCE(posts.title_in_english, posts.title_in_bangla)
                    END AS title
                ")
            )
            ->when($search, function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('posts.title_in_english', 'like', "%{$search}%")
                        ->orWhere('posts.title_in_bangla', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortBy, $sortDirection)
            ->toBase()
            ->get();
    }
}
