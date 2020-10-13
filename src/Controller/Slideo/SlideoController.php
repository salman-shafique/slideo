<?php

namespace App\Controller\Slideo;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;


class SlideoController extends AbstractController
{
    /**
     * @Route("/api/{className}/{methodName}",methods={"POST"})
     */
    public function call(Request $request, String $className, String $methodName, HttpClientInterface $client)
    {
        $response = $client->request(
            'POST',
            "http://localhost:8080/call/$className/$methodName",
            [
                'json' => $request->request->all()
            ]
        );

        return new JsonResponse($response->toArray());
    }
}
