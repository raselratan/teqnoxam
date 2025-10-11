<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

$namespace = Config::get('config.COMMON_NAMESPACE');

Route::group(['namespace' => $namespace], function () {
    Route::get('/', 'Landing')->name('landing');
    Route::get('/register', 'Register')->name('auth.register');
    Route::get('/login', 'Login')->name('auth.login');
    Route::group(['namespace' => 'Authentication'], function () {
        Route::post('/login', 'Login')->name('auth.signin');
        Route::post('/logout', 'Logout')->name('auth.signout');
    });
});
