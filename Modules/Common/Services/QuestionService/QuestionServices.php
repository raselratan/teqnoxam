<?php

namespace Common\Services\QuestionService;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class QuestionServices extends BaseService
{
    public function create(array $questions)
    {

        try {
            return DB::transaction(function () use ($questions) {
                // Main Question
                $question['question'] = $questions['question'];
                $question['creator_id'] = auth()->user()->id;
                $newQuestion = $this->questionRepository->create($question);
                // Category Sync
                $newQuestion->categories()->sync($questions['category_ids']);

                // Exam Year Sync
                $newQuestion->examYears()->sync($questions['exam_year_ids']);

                // Options
                $options = $questions['options'];
                $options = Arr::map($options, fn($option) => $option + ['question_id' => $newQuestion->id, 'created_at' => now(), 'updated_at' => now()]);
                $this->questionOptionRepository->insert($options);

                // Explanation
                $explanation_text = $questions['explanation_text'];
                if (isset($explanation_text)) {
                    $this->explanationTextRepository->create([
                        "question_id" => $newQuestion->id,
                        "explanation_text" => $explanation_text
                    ]);
                }

                return $newQuestion;
            }, 3);
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function paginatedQuestions(array $params = [])
    {
        $perPage = $params['per_page'] ?? 10;
        $page = $params['page'] ?? 1;
        $sortBy = $params['sort_by'] ?? 'id';
        $sortDirection = $params['sort_direction'] ?? 'asc';
        $search = $params['search'] ?? '';

        $questions = $this->questionRepository->questions($search, $sortBy, $sortDirection, $perPage, $page);
        // dd($questions->items());
        return [
            'questions' => $questions->items(),
            'pagination' => [
                'current_page' => $questions->currentPage(),
                'last_page' => $questions->lastPage(),
                'per_page' => $questions->perPage(),
                'total' => $questions->total(),
                'from' => $questions->firstItem(),
                'to' => $questions->lastItem(),
            ],
            'filters' => [
                'sort_by' => $sortBy, // Return original frontend column name
                'sort_direction' => $sortDirection,
                'search' => $search,
            ],
        ];
    }
}
