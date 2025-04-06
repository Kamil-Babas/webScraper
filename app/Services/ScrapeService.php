<?php

namespace App\Services;

use App\Http\Requests\UrlRequest;
use Exception;
use Spekulatius\PHPScraper\PHPScraper;
use Symfony\Component\HttpClient\Exception\TransportException;

class ScrapeService
{

    public function scrapeWebsite(UrlRequest $request): array
    {
        $web = new PHPScraper;
        $web->setConfig(['timeout' => 60]);

        try
        {

            $url = $request->url;
            $web->go($url);

            $data = [
                'success' => true,
                'message' => 'Website scrapped successfully',
                'website_data' => [

                    'title' => $web->title,
                    // includes description, author, image, keywords
                    'meta_tags' => $web->metaTags(),

                    'header_tags' => [
                        'h1' => $web->h1,
                        'h2' => $web->h2,
                        'h3' => $web->h3
                    ],

                    'links' => $web->linksWithDetails
                ]
            ];

            $scrapeWithImagesBool = $request->scrapeWithImages;

            if($scrapeWithImagesBool){
                $data['website_data']['images'] = $web->imagesWithDetails;
            }

            return $data;
        }
        catch (TransportException $exception)
        {
            $data = [
                'success' => false,
                'errors' => [
                    'url' => ['Website not found or connection took too long']
                ]
            ];

            return $data;
        }
        catch (Exception $e)
        {
            $data = [
                'success' => false,
                'errors' => [
                    'message' => ['Unknown error occurred']
                ]
            ];

            return $data;
        }

    }

}
