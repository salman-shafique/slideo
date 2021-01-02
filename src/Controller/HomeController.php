<?php

namespace App\Controller;

use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Enum\LanguagesEnum;

class HomeController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function index()
    {
        return $this->render('homepage/index.html.twig');
    }
    /**
     * @Route("/locale/{lang}")
     * @return Response
     */
    public function locale(Request $request, String $lang)
    {

        if (in_array($lang, LanguagesEnum::ENABLED_LOCALES)) {
            $referer = $request->headers->get('referer');

            $request->setLocale($lang);
            $request->getSession()->set('_locale', $lang);

            if (strpos($referer, "slideo.co.il") !== false || strpos($referer, "localhost") !== false) {
                return $this->redirect($referer);
            } else {
                return $this->redirectToRoute('index');
            }
        } else
            throw $this->createNotFoundException('The language does not exist.');
    }

    /**
     * @Route("/pricing", name="pricing")
     */
    public function pricing()
    {
        return $this->render('pricing/index.html.twig');
    }

}
