<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Institute;
use Common\Src\Repositories\Contracts\InstituteRepositoryInterface;
use Illuminate\Support\Facades\DB;

class InstituteRepository implements InstituteRepositoryInterface
{
    public function create(array $data): Institute
    {
        return Institute::create($data);
    }

    public function institutes($search, $sortBy, $sortDirection)
    {
        return Institute::query()
            ->select(
                'institutes.*',
                DB::raw("
                    CASE
                        WHEN institutes.title_in_english IS NOT NULL 
                            AND institutes.title_in_bangla IS NOT NULL
                        THEN CONCAT(institutes.title_in_english, ' (', institutes.title_in_bangla, ')')
                        ELSE COALESCE(institutes.title_in_english, institutes.title_in_bangla)
                    END AS title
                ")
            )
            ->when($search, function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('institutes.title_in_english', 'like', "%{$search}%")
                        ->orWhere('institutes.title_in_bangla', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortBy, $sortDirection)
            ->toBase()
            ->get();
    }
}
