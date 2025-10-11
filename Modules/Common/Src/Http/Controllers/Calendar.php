<?php

namespace Common\Src\Http\Controllers;

use Inertia\Response;

class Calendar extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Calendar');
    }
}
