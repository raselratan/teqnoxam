<?php

namespace Common\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['id'];

    public function creator()
    {
        return $this->hasOne(User::class, 'creator_id');
    }
}
