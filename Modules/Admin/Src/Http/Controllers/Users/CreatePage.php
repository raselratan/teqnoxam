<?php

namespace Admin\Src\Http\Controllers\Users;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class CreatePage extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/CreateUser');
    }
}
