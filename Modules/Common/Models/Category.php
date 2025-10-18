<?php

namespace Common\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $guarded = ['id'];

    public function creator()
    {
        return $this->hasOne(User::class, 'id', 'creator_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id', 'id')->with([
            'children',
            'creator'
        ]);
    }
}
