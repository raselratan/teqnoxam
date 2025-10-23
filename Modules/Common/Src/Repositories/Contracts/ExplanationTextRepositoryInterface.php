<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\Exam\QuestionExplanation;

interface ExplanationTextRepositoryInterface
{
    public function create(array $data): QuestionExplanation;
}
