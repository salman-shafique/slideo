<?php

namespace App\Controller\Editor;

use App\Entity\Style;
use App\Service\LayoutService;
use App\Service\StyleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api/layout",methods={"POST"})
 */
class LayoutApiController extends AbstractController
{
    /**
     * @Route("/add")
     */
    public function add(Request $request, LayoutService $layoutService)
    {
        $r = $layoutService->add($request);
        return  new JsonResponse($r);
    }

    /**
     * @Route("/get")
     */
    public function getLayouts(Request $request, LayoutService $layoutService)
    {
        $r = $layoutService->get($request);   
        return new JsonResponse($r);
    }
}
