<?php

namespace Admin\Src\Http\Controllers\Institutions;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class Institutions extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Institution/Institutes', [
            'institutes' =>  $this->instituteService->institutes()
        ]);
    }
}
