<?php

namespace Common\Models\Exam;

use Common\Models\Category;
use Common\Models\Exam\ExamYear;
use Common\Models\Exam\Option;
use Common\Models\Exam\QuestionExplanation;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = ['id'];

    // One question has many options
    public function options()
    {
        return $this->hasMany(Option::class)->inRandomOrder();
    }

    // One-to-one relationship for explanation
    public function explanation()
    {
        return $this->hasOne(QuestionExplanation::class);
    }

    /**
     * A question can belong to many categories.
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_question')
            ->withTimestamps();
    }

    // Question Year
    public function examYears()
    {
        return $this->belongsToMany(ExamYear::class, 'exam_year_question')
            ->withTimestamps();
    }
}
