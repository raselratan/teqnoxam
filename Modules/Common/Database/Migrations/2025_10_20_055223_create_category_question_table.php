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
        Schema::create('category_question', function (Blueprint $table) {
            $table->id();

            // Foreign keys
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('question_id');

            // Define relationships
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->foreign('question_id')
                ->references('id')
                ->on('questions')
                ->onDelete('cascade');

            // Optional: ensure unique combination (no duplicate pairs)
            $table->unique(['category_id', 'question_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_question');
    }
};
