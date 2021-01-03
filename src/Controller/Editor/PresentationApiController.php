<?php

namespace App\Controller\Editor;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Security\PresentationSecurity;
use App\Service\FlaskService;
use App\Service\PresentationService;
use App\Service\SerializerService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * @Route("/api/presentation", methods={"POST"})
 */
class PresentationApiController extends AbstractController
{
    /**
     * @Route("/init")
     */
    public function initPresentation(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $serializer = new SerializerService();
        return new JsonResponse($serializer->normalize($presentation));
    }


    /**
     * @Route("/download/start/{presenationId}")
     */
    public function downloadPresentation(string $presenationId, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($presenationId, $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->downloadStart($presentation);

        return new JsonResponse($r);
    }

    /**
     * @Route("/download/get/{presenationId}")
     */
    public function getDownloadedPresentation(string $presenationId, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($presenationId, $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->getDownloadedPresentation($presentation);

        return new JsonResponse($r);
    }

    /**
     * @Route("/download/get/{presenationId}/{downloadPresentationId}")
     */
    public function getOneDownloadedPresentation(string $presenationId, string $downloadPresentationId, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($presenationId, $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->getOneDownloadedPresentation($downloadPresentationId);

        return new JsonResponse($r);
    }

    /**
     * @Route("/save/slide")
     */
    public function saveSlide(Request $request, PresentationSecurity $presentationSecurity, SessionInterface $sessionInterface, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->saveSlide($request);
        return new JsonResponse($r);
    }


    /**
     * @Route("/change_name")
     */
    public function changeName(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $presentation->setTitle($request->request->get("presentation_name"));
        $this->getDoctrine()->getManager()->persist($presentation);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/remove/{presentationId}")
     */
    public function remove(string $presentationId, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($presentationId, $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $presentation->setIsActive(false);
        $this->getDoctrine()->getManager()->persist($presentation);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(['success' => true]);
    }
}
