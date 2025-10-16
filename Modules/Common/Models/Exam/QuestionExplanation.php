<?php

namespace Common\Models\Exam;

use Illuminate\Database\Eloquent\Model;

class QuestionExplanation extends Model
{

    protected $fillable = ['question_id', 'explanation_text'];

    // Each explanation belongs to a question
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
