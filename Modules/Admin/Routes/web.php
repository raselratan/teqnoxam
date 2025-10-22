<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

$namespace = Config::get('config.ADMIN_NAMESPACE');

Route::group(['namespace' => $namespace,  'prefix' => 'admin'], function () {
    // Guarded Route
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/', 'Dashboard')->name('admin.dashboard');
        // Users Route
        Route::group(['namespace' => 'Users',  'prefix' => 'users'], function () {
            Route::get('/', 'Users')->name('admin.users');
            Route::get('/create', 'CreatePage')->name('admin.users.create');
            Route::post('/create', 'Create')->name('admin.users.store');
        });
        // Category Route
        Route::group(['namespace' => 'Categories',  'prefix' => 'categories'], function () {
            Route::get('/', 'Categories')->name('admin.categories');
            Route::get('/create', 'CreatePage')->name('admin.categories.create');
            Route::post('/create', 'Create')->name('admin.categories.store');
        });

        Route::group(['namespace' => 'Questions', 'prefix' => 'question'], function () {
            Route::get('/create', 'CreatePage')->name('admin.question.create');
        });
        // Institutes
        Route::group(['namespace' => 'Institutions', 'prefix' => 'institute'], function () {
            Route::get('/', 'Institutions')->name('admin.institutes');
            Route::get('/create', 'CreatePage')->name('admin.institute.create');
            Route::post('/create', 'Create')->name('admin.institute.store');
        });
        // Posts
        Route::group(['namespace' => 'Posts', 'prefix' => 'post'], function () {
            Route::get('/', 'Posts')->name('admin.posts');
            Route::get('/create', 'CreatePage')->name('admin.post.create');
            Route::post('/create', 'Create')->name('admin.post.store');
        });

        // Exan Years
        Route::group(['namespace' => 'ExamYears', 'prefix' => 'exam-years'], function () {
            Route::get('/', 'ExamYears')->name('admin.exam_years');
            Route::get('/create', 'CreatePage')->name('admin.exam_years.create');
            Route::post('/create', 'Create')->name('admin.exam_years.store');
        });
    });
});
