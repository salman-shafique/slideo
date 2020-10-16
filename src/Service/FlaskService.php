<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class FlaskService
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function call(String $className, String $methodName, array $data): ?array
    {
        $response = $this->client->request(
            'POST',
            "http://localhost:8080/call/$className/$methodName",
            [
                'json' =>  $data
            ]
        );
        return $response->toArray();
    }
}
