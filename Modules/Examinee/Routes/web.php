<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

$namespace = Config::get('config.EXAMINEE_NAMESPACE');

Route::group(['namespace' => $namespace,  'prefix' => 'examinee'], function () {
    Route::middleware(['auth', 'examinee'])->group(function () {
        Route::get('/', 'Dashboard')->name('examinee.dashboard');
    });
});
