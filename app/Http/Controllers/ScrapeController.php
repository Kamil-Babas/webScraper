<?php

namespace App\Http\Controllers;

use App\Http\Requests\UrlRequest;
use App\Services\ScrapeService;
use Illuminate\Http\JsonResponse;

class ScrapeController extends Controller
{

    private ScrapeService $scrapeService;

    public function __construct(ScrapeService $scrapeService)
    {
        $this->scrapeService = $scrapeService;
    }

    public function scrapeUrl(UrlRequest $request): JsonResponse
    {
        $result = $this->scrapeService->scrapeWebsite($request);

        if (!$result['success'])
        {
            // url probably doesnt exist or connecting took to long (more than 60s)
            if (isset($result['errors']['url'])) {
                return response()->json($result, 400);
            }

            //unexpected error
            return response()->json($result, 500);
        }

        return response()->json($result, 200);
    }

}
