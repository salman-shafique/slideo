<?php

namespace App\Controller;

use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function index(\Swift_Mailer $mailer)
    {
        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('alperenberatdurmus@gmail.com')
            ->setTo('alperenberatdurmus@gmail.com')
            ->setBody("Hello alp");
        $mailer->send($message);

        return $this->render('index.html.twig');
    }
}
