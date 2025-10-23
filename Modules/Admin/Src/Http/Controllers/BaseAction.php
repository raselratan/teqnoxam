<?php

namespace Admin\Src\Http\Controllers;

use App\Http\Controllers\Controller;
use Common\Services\CategoryService\CategoryService;
use Common\Services\ExamYearService\ExamYearService;
use Common\Services\InstituteService\InstituteService;
use Common\Services\PostService\PostService;
use Common\Services\QuestionService\QuestionServices;
use Common\Services\UserServices\UserServices;

abstract class BaseAction extends Controller
{
    public function __construct(
        protected UserServices $userServices,
        protected CategoryService $categoryService,
        protected InstituteService $instituteService,
        protected PostService $postService,
        protected ExamYearService $examYearService,
        protected QuestionServices $questionServices
    ) {}
}
