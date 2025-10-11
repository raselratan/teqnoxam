<?php

namespace Admin\Src\Http\Controllers;

use Inertia\Response;

class Dashboard extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Dashboard');
    }
}
