<?php

namespace Common\Services\InstituteService;

use Common\Src\Repositories\Contracts\InstituteRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected InstituteRepositoryInterface $instituteRepository,
    ) {}
}
