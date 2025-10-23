<?php

namespace Common\Services\QuestionService;

use Common\Src\Repositories\Contracts\ExplanationTextRepositoryInterface;
use Common\Src\Repositories\Contracts\QuestionOptionRepositoryInterface;
use Common\Src\Repositories\Contracts\QuestionRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected QuestionRepositoryInterface $questionRepository,
        protected ExplanationTextRepositoryInterface $explanationTextRepository,
        protected QuestionOptionRepositoryInterface $questionOptionRepository
    ) {}
}
