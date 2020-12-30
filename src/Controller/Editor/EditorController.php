<?php

namespace App\Controller\Editor;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Security\PresentationSecurity;
use App\Service\PresentationService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class EditorController extends AbstractController
{
    /**
     * @Route("/editor", name="editor", methods={"GET"})
     */
    public function index()
    {
        return $this->render('editor/index_pre.html.twig');
    }

    /**
     * @Route("/editor/{presentationId}")
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
}
