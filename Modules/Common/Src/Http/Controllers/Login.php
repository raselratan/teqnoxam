<?php

namespace Common\Src\Http\Controllers;

use Inertia\Response;

class Login extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Authentication/LoginPage');
    }
}
