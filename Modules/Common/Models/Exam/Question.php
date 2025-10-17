<?php

namespace Common\Models\Exam;

use Common\Models\Exam\ExamYear;
use Common\Models\Exam\Option;
use Common\Models\Exam\QuestionExplanation;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['question_text', 'creator_id'];

    // One question has many options
    public function options()
    {
        return $this->hasMany(Option::class);
    }

    // Question belongs to many exam years
    public function examYears()
    {
        return $this->belongsToMany(ExamYear::class);
    }
    // One-to-one relationship for explanation
    public function explanation()
    {
        return $this->hasOne(QuestionExplanation::class);
    }
}
