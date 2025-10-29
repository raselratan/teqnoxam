<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\Question;
use Common\Src\Repositories\Contracts\QuestionRepositoryInterface;

class QuestionRepository implements QuestionRepositoryInterface
{
    public function create(array $data): Question
    {
        return Question::create($data);
    }

    public function questions(string $search, string $sortBy, string $sortDirection, int $perPage, int $page)
    {
        $questions = Question::query();

        $questions->join('users', 'questions.creator_id', '=', 'users.id')
            ->select('questions.*', 'users.name as added_by')
            ->with([
                "options",
                "explanation"
            ])
            ->when($search, function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('questions.question', 'like', "%{$search}%")
                        ->orWhere('users.name', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortBy, $sortDirection)
            ->toBase();

        return $questions->paginate($perPage, ['*'], 'page', $page);
    }
}
