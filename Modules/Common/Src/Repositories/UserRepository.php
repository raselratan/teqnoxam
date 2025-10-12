<?php

namespace Common\Src\Repositories;

use Common\Models\User;
use Common\Src\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function create(array $data) : User
    {
        return User::create($data);
    }

    public function update(User $user, array $data) : User
    {
        $user->update($data);
        return $user;
    }

    public function delete(User $user) : bool
    {
        return $user->delete();
    }

    public function find(int $id) : ?User
    {
        return User::find($id);
    }

    public function all() : array
    {
        return User::all()->toArray();
    }
}