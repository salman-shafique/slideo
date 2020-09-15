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
    public function index()
    {
//         var_dump(openssl_get_cert_locations());
//         echo "openssl.cafile: ", ini_get('openssl.cafile'), "\n";
// echo "curl.cainfo: ", ini_get('curl.cainfo'), "\n";
        return $this->render('index.html.twig');
    }



}
