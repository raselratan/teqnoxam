<?php

namespace Admin\Src\Http\Controllers\Categories;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class Categories extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Category/Categories');
    }
}
