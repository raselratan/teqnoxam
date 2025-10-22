<?php

namespace Admin\Src\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamYearCreateRequest extends FormRequest
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
            'institute_id' => 'required|numeric|exists:institutes,id',
            'post_id'  => 'required|numeric|exists:posts,id',
            'year'  => 'required|numeric',
            'comments'  => 'nullable|string|max:255',
        ];
    }
}
