<?php

namespace Admin\Src\Http\Controllers\Users;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;
use Illuminate\Http\Request;

class Users extends BaseAction
{
    public function __invoke(Request $request): Response
    {
        // Get paginated users with sorting and filtering
        return inertia('Admin/Users', $this->userServices->paginate($request->all()));
    }
}
