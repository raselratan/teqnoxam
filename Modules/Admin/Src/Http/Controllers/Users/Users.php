<?php

namespace Admin\Src\Http\Controllers\Users;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class Users extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Users');
    }   
}