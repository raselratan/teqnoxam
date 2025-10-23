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
}
