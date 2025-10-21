<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exam_year_question', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('exam_year_id');
            $table->unsignedBigInteger('question_id');
            $table->timestamps();

            $table->foreign('exam_year_id')->references('id')->on('exam_years')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            $table->unique(['exam_year_id', 'question_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_year_question');
    }
};
