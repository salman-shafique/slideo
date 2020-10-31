<?php

namespace App\Controller\Style;

use App\Entity\Style;
use App\Service\StyleService;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api/style")
 */
class StyleController extends AbstractController
{
    /**
     * @Route("/add",methods={"POST"})
     */
    public function addStyle(Request $request, StyleService $styleService)
    {
        $r = $styleService->add($request);
        return  new JsonResponse($r);
    }
}
