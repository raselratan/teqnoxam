<?php

namespace Common\Src\Http\Controllers;

use Inertia\Response;

class Register extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Authentication/RegisterPage');
    }
}
