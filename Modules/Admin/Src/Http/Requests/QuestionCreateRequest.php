<?php

namespace Admin\Src\Http\Requests;

use Admin\Src\Http\Requests\CustomRules\AtLeastOneCorrectOption;
use Illuminate\Foundation\Http\FormRequest;

class QuestionCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "question" => "required|string|max:255",

            "options" => ["required", "array", "min:2", new AtLeastOneCorrectOption],
            "options.*.is_correct" => "required|boolean",
            "options.*.option_text" => "required|string",

            "explanation_text" => "nullable|string",

            "category_ids" => "required|array",
            "category_ids.*" => "required|numeric|exists:categories,id",

            "exam_year_ids" => "nullable|array",
            "exam_year_ids.*" => "numeric|exists:exam_years,id",
        ];
    }
}
