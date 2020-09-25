<?php

namespace App\Controller;

use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function index(Request $request)
    {

        $locale = $request->getLocale();
        //$request->setLocale('en');
        // $request->getSession()->set('_locale', 'he');
        return $this->render('index.html.twig');
    }
    /**
     * @Route("/locale/{lang}")
     * @return Response
     */
    public function locale(Request $request, String $lang)
    {
        $locales = $this->container->get('twig')->getGlobals()['enabled_locales'];
        $referer = $request->headers->get('referer');

        if (in_array($lang, $locales)) {
            $request->setLocale($lang);
            $request->getSession()->set('_locale', $lang);
            
            if (strpos($referer,"slideo.co.il" ) !== false || strpos($referer,"localhost") !== false) {
                return $this->redirect($referer);
            } else {
                return $this->redirectToRoute('index');
            }
        } else
            throw $this->createNotFoundException('The language does not exist.');
    }
}
