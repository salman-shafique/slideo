<?php

namespace App\Controller\Slideo;

use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\SlideoService;

class SlideoController extends AbstractController
{


    /**
     * @Route("/api/test",methods={"POST"})
     */
    public function test(Request $request, SlideoService $slideo)
    {
        dump($slideo->getTranslator()->test($request->request->all()));
        die;
    }
    /**
     * @Route("/api/translate",methods={"POST"})
     */
    public function translate(Request $request, SlideoService $slideo)
    {
        return $slideo->getTranslator()->translate($request->get("originalSentence"));
        die;
    }
}
