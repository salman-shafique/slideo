<?php

namespace App\Controller\Editor;

use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Enum\LanguagesEnum;

/**
 * @Route("/editor")
 */
class HomeController extends AbstractController
{
    /**
     * @Route("/",name="editor")
     */
    public function index()
    {
        return $this->render('editor/index.html.twig');
    }
}
