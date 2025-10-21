<?php

namespace Admin\Src\Http\Controllers\Institutions;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class CreatePage extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Institution/CreateInstitute');
    }
}
