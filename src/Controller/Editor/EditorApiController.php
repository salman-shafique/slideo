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
use Symfony\Component\HttpFoundation\Session\SessionInterface;


/**
 * @Route("/api/editor", methods={"POST"})
 */
class EditorApiController extends AbstractController
{
    /**
     * @Route("/create/slides")
     */
    public function createSlides(Request $request, SessionInterface $sessionInterface, FlaskService $flaskService, PresentationSecurity $presentationSecurity, SlideService $slideService, PresentationService $presentationService)
    {
        $arr = explode("/", $request->server->get("HTTP_REFERER"));
        $latestKey = array_key_last($arr);
        $presentationId = $arr[$latestKey];

        $fresh = false;
        if ($presentationId == "editor") {
            $presentation = $presentationService->create($this->getUser(), $sessionInterface->getId());
            $fresh = true;
        } else {
            $presentation = $presentationSecurity->getPresentation($presentationId, $sessionInterface->getId(), $this->getUser());
            if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');
        }

        $r = $flaskService->call("NLP", "prepare_slides", $request->request->all());
        if (isset($r['Error']))
            return new JsonResponse($r, 500);

        $slides = $slideService->createSlides($r['slides'], $presentation);

        if ($fresh)
            return new JsonResponse(['presentationId' => $presentation->getPresentationId()]);

        return new JsonResponse($slides);
    }

    /**
     * @Route("/call/{className}/{methodName}")
     */
    public function call(Request $request, String $className, String $methodName, FlaskService $flaskService)
    {
        // By pass the symfony controllers
        $response = array();
        $response['body'] = $flaskService->call($className, $methodName, $request->request->all());
        $response['request'] = $request->request->all();
        return new JsonResponse($response);
    }
}
