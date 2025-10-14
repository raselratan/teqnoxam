<?php

namespace Common\Services\UserServices;

use Common\Src\Repositories\Contracts\UserRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository,
    ) {}
}
