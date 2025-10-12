<?php

namespace Common\Src\Http\Services\UserServices;

use Common\Src\Http\Controllers\Users\UserRepositoryInterface;

abstract class BaseService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository,
    )
    {}
}