<?php

namespace App\Controller\Editor;

use App\Entity\ColorTemplate;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Enum\LanguagesEnum;
use App\Repository\PresentationRepository;
use App\Repository\SlideRepository;
use App\Security\PresentationSecurity;
use App\Service\FlaskService;
use App\Service\PresentationService;
use App\Service\SlideService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


/**
 * @Route("/api/editor/colorTemplate")
 */
class ColorTemplateController extends AbstractController
{
    /**
     * @Route("/add",methods={"POST"})
     */
    public function addColorTemplate(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, PresentationService $presentationService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $presentationService->addColorTemplate($this->getUser(), $request);

        return new JsonResponse($r);
    }
}
