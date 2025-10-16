<?php

namespace Common\Src\Repositories;

use Common\Models\User;
use Common\Src\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $user, array $data): User
    {
        $user->update($data);
        return $user;
    }

    public function delete(User $user): bool
    {
        return $user->delete();
    }

    public function find(int $id): ?User
    {
        return User::find($id);
    }

    public function all()
    {
        return User::all();
    }

    public function getPaginatedUsers($search, $sortBy, $sortDirection, $perPage, $page)
    {
        $query = User::query();

        // Apply search filter
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('mobile', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%");
            });
        }

        // Apply sorting
        $query->orderBy($sortBy, $sortDirection);

        return $query->whereNot('id', auth()->user()->id)->paginate($perPage, ['*'], 'page', $page);
    }
}
