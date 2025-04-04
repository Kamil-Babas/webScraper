<?php

namespace App\Http\Controllers;
use App\Http\Requests\UrlRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpClient\Exception\TransportException;

class ScrapController extends Controller
{

    public function scrapUrl(UrlRequest $request) : JsonResponse {

        $web = new \Spekulatius\PHPScraper\PHPScraper;
        $web->setConfig(['timeout' => 30]);

        try
        {
            $url = $request->url;
            $web->go($url);

            $data = [
                'success' => true,
                'message' => 'Website scrapped successfully',
                'website_data' => [

                    'title' => $web->title,
                    'description' => $web->description,

                    'header_tags' => [
                        'h1' => $web->h1,
                        'h2' => $web->h2,
                        'h3' => $web->h3
                    ],

                    'links' => $web->linksWithDetails,
                    'images' => $web->imagesWithDetails
                ]
            ];

            return response()->json($data, 200);

        }
        catch(TransportException $exception)
        {
            $data = [
                'success' => false,
                'errors' => [
                    'url' => 'Website not found'
                ]
            ];

            return response()->json($data, 400);
        }
        catch(\Exception $e)
        {
            $data = [
                'success' => false,
                'message' => 'Unknown error occured'
            ];

            return response()->json($data, 500);
        }

    }

}
