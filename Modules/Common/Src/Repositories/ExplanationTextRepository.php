<?php

namespace Common\Src\Repositories;

use Common\Models\Exam\QuestionExplanation;
use Common\Src\Repositories\Contracts\ExplanationTextRepositoryInterface;

class ExplanationTextRepository implements ExplanationTextRepositoryInterface
{
    public function create(array $data): QuestionExplanation
    {
        return QuestionExplanation::create($data);
    }
}
