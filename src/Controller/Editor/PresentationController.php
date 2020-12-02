<?php

namespace App\Controller\Editor;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Security\PresentationSecurity;
use App\Service\FlaskService;
use App\Service\SerializerService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * @Route("/api/presentation")
 */
class PresentationController extends AbstractController
{

    /**
     * @Route("/init", methods={"POST"})
     */
    public function initPresentation(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $serializer = new SerializerService();
        return new JsonResponse($serializer->normalize($presentation));
    }


    /**
     * @Route("/download",methods={"POST"})
     */
    public function downloadPresentation(Request $request, SessionInterface $sessionInterface, FlaskService $flaskService, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $request->request->add(['id' => $presentation->getId()]);

        $download = $flaskService->call(
            "Presentation",
            "download",
            $request->request->all()
        );

        return new JsonResponse($download);
    }
    /**
     * @Route("/change_name",methods={"POST"})
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
}
