<?php

namespace Admin\Src\Http\Controllers\Posts;

use Admin\Src\Http\Controllers\BaseAction;
use Inertia\Response;

class Posts extends BaseAction
{
    public function __invoke(): Response
    {
        return inertia('Admin/Post/Posts', [
            'posts' =>  $this->postService->posts()
        ]);
    }
}
