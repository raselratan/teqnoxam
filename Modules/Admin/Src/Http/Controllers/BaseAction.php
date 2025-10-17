<?php

namespace Admin\Src\Http\Controllers;

use App\Http\Controllers\Controller;
use Common\Services\CategoryService\CategoryService;
use Common\Services\UserServices\UserServices;

abstract class BaseAction extends Controller
{
    public function __construct(
        protected UserServices $userServices,
        protected CategoryService $categoryService,
    ) {}
}
