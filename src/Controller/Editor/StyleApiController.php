<?php

namespace App\Controller\Editor;

use App\Entity\Style;
use App\Service\StyleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Security\PresentationSecurity;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * @Route("/api/style")
 */
class StyleApiController extends AbstractController
{
    /**
     * @Route("/add",methods={"POST"})
     */
    public function addStyle(Request $request, StyleService $styleService)
    {
        $r = $styleService->add($request);
        return  new JsonResponse($r);
    }

    /**
     * @Route("/get")
     */
    public function getStyles(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, StyleService $styleService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $styleService->get($request);
        
        return new JsonResponse($r);
    }
}
