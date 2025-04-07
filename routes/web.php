<?php

use App\Http\Controllers\ScrapeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;

Route::get('/', [IndexController::class, 'index']);
Route::post('/api/scrape/url', [ScrapeController::class, 'scrapeUrl'])->middleware('throttle:15,1');

