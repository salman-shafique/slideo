<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class PostService
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function execute(String $class, String $method, array $body = [])
    {
        $body['class'] = $class;
        $body['method'] = $method;

        $response = $this->client->request(
            'POST',
            "http://127.0.0.1:8080/pyro/Slideo/call",
            [
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Accept' => '*/*'
                ],
                'body' => $body
            ]
        );
        return $response->toArray();
    }
}
