<?php

namespace App\Controller\Editor;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Security\PresentationSecurity;
use App\Service\FlaskService;
use App\Service\PresentationService;
use App\Service\SlideService;
use App\Service\StyleService;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\JWTService;

/**
 * @Route("/api/editor/slide", methods={"POST"})
 */
class SlideApiController extends AbstractController
{
    /**
     * @Route("/delete")
     */
    public function deleteSlide(Request $request, PresentationSecurity $presentationSecurity, SessionInterface $sessionInterface, SlideService $slideService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $slideService->deleteSlide($request, $presentation);
        return new JsonResponse($r);
    }

    /**
     * @Route("/restore")
     */
    public function restoreSlide(Request $request, PresentationSecurity $presentationSecurity, SessionInterface $sessionInterface, SlideService $slideService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $slideService->restoreSlide($request, $presentation);
        return new JsonResponse($r);
    }
}
