<?php

namespace Common\Models\Exam;

use Illuminate\Database\Eloquent\Model;

class ExamYear extends Model
{
    protected $fillable = ['title', 'year'];

    // Exam year has many questions
    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }
}
