<?php

namespace Admin\Src\Http\Controllers\Courses;

use Admin\Src\Http\Controllers\BaseAction;
use Illuminate\Http\Request;
use Inertia\Response;

class Courses extends BaseAction
{
    public function __invoke(Request $request): Response
    {
        // Get paginated users with sorting and filtering
        return inertia('Admin/Courses/Courses', $this->courseService->paginate($request->all()));
    }
}
