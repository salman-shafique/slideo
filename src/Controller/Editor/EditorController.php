<?php

namespace App\Controller\Editor;

use App\Entity\Presentation;
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
 * @Route("/editor")
 */
class EditorController extends AbstractController
{
    /**
     * @Route("/",name="editor")
     */
    public function index(SessionInterface $sessionInterface, PresentationService $presentationService)
    {
        // Create a presentation and redirect the user.
        $presentation = $presentationService->create($this->getUser(), $sessionInterface->getId());
        return $this->redirect("/editor" . "/" . $presentation->getPresentationId());
    }

    /**
     * @Route("/{presentationId}")
     */
    public function editor(string $presentationId, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity)
    {
        $presentation = $presentationSecurity->getPresentation($presentationId, $sessionInterface->getId(), $this->getUser());

        if ($presentation) {
            return $this->render('editor/index.html.twig', ['presentation' => $presentation]);
        } else {
            // Redirect to editor page in order to create a new presentation
            return $this->redirect("/editor");
        }
    }


    /**
     * @Route("/create/slides",methods={"POST"})
     */
    public function createSlides(Request $request, SessionInterface $sessionInterface, FlaskService $flaskService, PresentationSecurity $presentationSecurity, SlideService $slideService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $rawSlides = $flaskService->call("NLP", "prepare_slides", $request->request->all());
        
        $slides = $slideService->createSlides($rawSlides['slides'], $presentation);

        return new JsonResponse($slides);
    }

    /**
     * @Route("/api/{className}/{methodName}",methods={"POST"})
     */
    public function call(Request $request, String $className, String $methodName, FlaskService $flaskService)
    {
        // By pass the symfony controllers
        $response = $flaskService->call($className, $methodName, $request->request->all());
        return new JsonResponse($response);
    }
}
