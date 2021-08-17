<?php

namespace App\Controller\Editor;

use App\Repository\PresentationRepository;
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
    public function downloadPresentation(Request $request, string $presenationId, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($presenationId, $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->downloadStart($presentation, $request->request->get("isPaid") === "true");

        return new JsonResponse($r);
    }

    /**
     * @Route("/generate/thumbnail/{presenationId}")
     */
    public function generatePresentationThumbnail(Request $request, string $presenationId, PresentationRepository $presentationRepository, PresentationService $presentationService)
    {
        $presentation = $presentationRepository->findOneBy(['presentationId' => $presenationId]);
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $presentationService->generateThumbnail($presentation, $request->request->get("isPaid") === "true");

        return new JsonResponse(['success' => true]);
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
     * @Route("/flask/save")
     */
    public function saveFromFlask(Request $request, PresentationService $presentationService)
    {
        $presentationService->saveFromFlask($request);
        return new JsonResponse(["Thanks flask"]);
    }

    /**
     * @Route("/flask/save/thumbnail")
     */
    public function saveFromFlaskThumbnail(Request $request, PresentationService $presentationService)
    {
        $presentationService->saveFromFlaskThumbnail($request);
        return new JsonResponse(["Thanks flask"]);
    }

    /**
     * @Route("/save/slide")
     */
    public function saveSlide(Request $request, PresentationSecurity $presentationSecurity, SessionInterface $sessionInterface, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->saveSlide($request);
        $presentationService->generateThumbnail($presentation);

        return new JsonResponse($r);
    }

    /**
     * @Route("/save/settings")
     */
    public function saveSettings(Request $request, PresentationSecurity $presentationSecurity, SessionInterface $sessionInterface, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->saveSettings($request, $presentation);
        return new JsonResponse($r);
    }

    /**
     * @Route("/save/brandLogo")
     */
    public function saveBrandLogo(Request $request, PresentationSecurity $presentationSecurity, SessionInterface $sessionInterface, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->saveBrandLogo($request, $presentation);
        return new JsonResponse($r);
    }


    /**
     * @Route("/change_name/{presentationId}")
     */
    public function changeName(string $presentationId, Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($presentationId, $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        if ($request->request->get("presentation_name")) {
            $presentation->setTitle($request->request->get("presentation_name"));
            $this->getDoctrine()->getManager()->persist($presentation);
            $this->getDoctrine()->getManager()->flush();
            return new JsonResponse(['success' => true]);
        }
        return new JsonResponse(['success' => false]);
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
