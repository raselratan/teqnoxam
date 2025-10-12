<?php

namespace Common\Src\Http\Controllers;

use App\Http\Controllers\Controller;
use Common\Src\Repositories\Contracts\UserRepositoryInterface;

abstract class BaseAction extends Controller {
    public function __construct(
        protected UserRepositoryInterface $userRepository,
    ) {}
}
