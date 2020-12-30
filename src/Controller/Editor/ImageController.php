<?php

namespace App\Controller\Editor;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Security\PresentationSecurity;
use App\Service\ImageService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


/**
 * @Route("/api/editor/image",methods={"POST"})
 */
class ImageController extends AbstractController
{
    /**
     * @Route("/h1Image")
     */
    public function h1Image(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, ImageService $imageService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $imageService->h1Image($presentation, $request);
        return new JsonResponse($r);
    }

    /**
     * @Route("/userimages/upload")
     */
    public function userImagesUpload(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, ImageService $imageService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $imageService->userImagesUpload($request);
        return new JsonResponse($r);
    }

    /**
     * @Route("/userimages/get")
     */
    public function userImagesGet(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, ImageService $imageService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $imageService->userImagesGet($this->getUser());
        return new JsonResponse($r);
    }
}
