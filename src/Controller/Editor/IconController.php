<?php

namespace App\Controller\Editor;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Security\PresentationSecurity;
use App\Service\IconService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


/**
 * @Route("/api/editor/icon")
 */
class IconController extends AbstractController
{
    /**
     * @Route("/find",methods={"POST"})
     */
    public function find(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, IconService $iconService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $iconService->find($presentation, $request);
        return new JsonResponse($r);
    }
}
