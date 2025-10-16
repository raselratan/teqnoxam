<?php

namespace Common\Src\Repositories\Contracts;

use Common\Models\User;

interface UserRepositoryInterface
{
    public function create(array $data): User;

    public function update(User $user, array $data): User;

    public function delete(User $user): bool;

    public function find(int $id): ?User;

    public function all();

    public function getPaginatedUsers($search, $sortBy, $sortDirection, $perPage, $page);
}
