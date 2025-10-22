<?php

namespace Common\Services\ExamYearService;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ExamYearService extends BaseService
{
    public function create(array $data)
    {
        try {
            return DB::transaction(function () use ($data) {
                $examYear = $this->examYearRepository->create($data);
                Cache::tags(['exam_year'])->flush();
                return $examYear;
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function examYears(array $params = [])
    {
        $cacheKey = 'exam_years_' . md5(serialize($params));
        $cacheTime = 60 * 24; // 24 hours = 1440 minutes

        return Cache::tags(['exam_year'])->remember($cacheKey, $cacheTime, function () use ($params) {
            return $this->examYearRepository->examYears(
                $params['search'] ?? '',
                $params['sort_by'] ?? 'id',
                $params['sort_direction'] ?? 'asc'
            );
        });
    }
}
