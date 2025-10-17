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
    });
});
