<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\ExamYear;
use Common\Models\Exam\Institute;
use Common\Src\Repositories\Contracts\ExamYearRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ExamYearRepository implements ExamYearRepositoryInterface
{
    public function create(array $data): ExamYear
    {
        return ExamYear::create($data);
    }

    public function examYears($search, $sortBy, $sortDirection)
    {
        return ExamYear::query()
            ->leftJoin('posts',  'posts.id', '=', 'exam_years.post_id')
            ->leftJoin('institutes', 'institutes.id', '=', 'exam_years.institute_id')
            ->select(
                'exam_years.*',
                DB::raw("
                    CASE
                        WHEN institutes.title_in_english IS NOT NULL 
                            AND institutes.title_in_bangla IS NOT NULL
                        THEN CONCAT(institutes.title_in_english, ' (', institutes.title_in_bangla, ')')
                        ELSE COALESCE(institutes.title_in_english, institutes.title_in_bangla)
                    END AS institute_title
                "),
                DB::raw("
                    CASE
                        WHEN posts.title_in_english IS NOT NULL 
                            AND posts.title_in_bangla IS NOT NULL
                        THEN CONCAT(posts.title_in_english, ' (', posts.title_in_bangla, ')')
                        ELSE COALESCE(posts.title_in_english, posts.title_in_bangla)
                    END AS post_title
                "),

                DB::raw("
                    CONCAT(
                        COALESCE(institutes.title_in_english, ''),
                        ' (',
                        COALESCE(posts.title_in_english, ''),
                        ') - ',
                        exam_years.year
                    ) AS combined_title_english
                "),
                DB::raw("
                    CONCAT(
                        COALESCE(institutes.title_in_bangla, ''),
                        ' (',
                        COALESCE(posts.title_in_bangla, ''),
                        ') - ',
                        exam_years.year
                    ) AS combined_title_bangla
                ")
            )
            ->when($search, function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('posts.title_in_english', 'like', "%{$search}%")
                        ->where('posts.title_in_bangla', 'like', "%{$search}%")
                        ->where('institutes.title_in_english', 'like', "%{$search}%")
                        ->orWhere('institutes.title_in_bangla', 'like', "%{$search}%")
                        ->orWhere('exam_years.year', 'like', "%{$search}%")
                        ->orWhere('exam_years.comments', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortBy, $sortDirection)
            ->toBase()
            ->get();
    }
}
