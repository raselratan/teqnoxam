<?php

namespace Common\Models\Course;

use Common\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    protected $guarded = ['id'];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
