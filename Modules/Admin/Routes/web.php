<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

$namespace = Config::get('config.ADMIN_NAMESPACE');

Route::group(['namespace' => $namespace,  'prefix' => 'admin'], function () {
    // Guarded Route
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/', 'Dashboard')->name('admin.dashboard');
        Route::group(['namespace' => 'Users',  'prefix' => 'users'], function () {
            Route::get('/', 'Users')->name('admin.users');
        });
    });
});
