<?php

namespace Common\Models\Exam;

use Illuminate\Database\Eloquent\Model;

class ExamYear extends Model
{
    protected $guarded = ['id'];

    // Questions
    public function questions()
    {
        return $this->belongsToMany(Question::class, 'exam_year_question')
            ->withTimestamps();
    }
}
