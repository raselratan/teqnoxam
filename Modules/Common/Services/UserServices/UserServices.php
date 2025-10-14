<?php

namespace Common\Services\UserServices;

use Common\Models\User;

class UserServices extends BaseService
{
    public function create(array $user): User
    {
        return $this->userRepository->create($user);
    }
}
