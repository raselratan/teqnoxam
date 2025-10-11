<?php

namespace Examinee\Src\Http\Controllers;

use Inertia\Response;

class Dashboard extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Examinee/Dashboard');
    }
}
