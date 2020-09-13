<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DemoController extends AbstractController
{
    /**
     * @Route("/demos/smart-sonar")
     */
    public function smartSonar()
    {
        return $this->render('demos/smart-sonar.html.twig');
    }

    /**
     * @Route("/demos/covid-19")
     */
    public function covid19()
    {
        return $this->render('demos/covid-19.html.twig');
    }


}
