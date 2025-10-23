<?php

namespace Admin\Src\Http\Requests\CustomRules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AtLeastOneCorrectOption implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // $value will be your options array
        if (!is_array($value)) {
            $fail('The :attribute must be an array.');
            return;
        }

        $hasCorrect = collect($value)->contains(function ($option) {
            return isset($option['is_correct']) && $option['is_correct'] == true;
        });

        if (!$hasCorrect) {
            $fail('At least one option must be marked as correct.');
        }
    }
}
