<?php

namespace Common\Models;

use Common\Models\Exam\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $guarded = ['id'];

    public function creator()
    {
        return $this->hasOne(User::class, 'id', 'creator_id');
    }

    /**
     * A category may belong to a parent category.
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id')->with([
            'creator' => function ($q) {
                $q->select('id', 'name');
            }
        ]);
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id', 'id')->with([
            'children',
            'creator' => function ($q) {
                $q->select('id', 'name');
            }
        ]);
    }

    /**
     * A category can have many questions.
     */
    public function questions()
    {
        return $this->belongsToMany(Question::class, 'category_question')
            ->withTimestamps();
    }
}
