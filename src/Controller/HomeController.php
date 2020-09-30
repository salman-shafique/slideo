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
    public function index(SessionInterface $session)
    {
        $session->set('attribute-name', 'attribute-value');
        $session->set('user', $this->getUser());
        dump(
            $session->getId()
        );
        dump(
            $session->get('user')
        );
        die;
        return $this->render('index.html.twig');
    }
    /**
     * @Route("/locale/{lang}")
     * @return Response
     */
    public function locale(Request $request, String $lang)
    {

        if (in_array($lang, LanguagesEnum::CONSTANTS)) {
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
}
