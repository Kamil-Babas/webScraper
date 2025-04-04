<?php

use App\Http\Controllers\ScrapController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;

Route::get('/', [IndexController::class, 'index']);
Route::post('/api/scrape/url', [ScrapController::class, 'scrapUrl']);

