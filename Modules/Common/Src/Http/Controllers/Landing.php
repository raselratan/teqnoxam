<?php

namespace Common\Src\Http\Controllers;

use Inertia\Response;

class Landing extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Home');
    }
}
